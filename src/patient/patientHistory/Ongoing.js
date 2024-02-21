import React from 'react';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from 'moment';
import { Button, Modal } from 'react-bootstrap';
import AccessTimeRoundedIcon from '@material-ui/icons/AccessTimeRounded';
import PatientApi from '../../services/PatientApi';
import GetDoctorData from './getDoctorData';
import AppointmentApi from '../../services/AppointmentApi';
import ReactPaginate from 'react-paginate';

export default function Ongoing(props) {
    const { patientId } = props
    const [patientList, setPatientList] = useState([]);
    const [showCancel, setCancelDelete] = useState(false);
    const [id, setId] = useState()
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0);
    const { cancelPatientAppointment } = AppointmentApi()
    const { getpaymentData } = PatientApi()


    useEffect(() => {
        getPatientDetails(currentPage);
    }, [currentPage])

    const handleCancelShow = (details) => {
        setId(details._id)
        setCancelDelete(true)
    }
    const handleCancelClose = () => setCancelDelete(false)

    const pageSize = 6;
    function getPatientDetails(currentPage) {
        getpaymentData({ patientId }, currentPage, pageSize)
            .then((result) => {
                const totalPages = result.totalOngoingPages;
                setTotalPages(totalPages)
                setPatientList(result.ongoing)
            })
    }
    const handlePageClick = (data) => {
        setCurrentPage(data.selected + 1);
    }

    function cancelAppointment(id) {
        cancelPatientAppointment(id)
            .then(() => {
                getPatientDetails()
                handleCancelClose()
            })
    }

    return (
        <>
            <div className='row'>
                {patientList.map((details, i) => {
                    return (
                        <>
                            <div key={i} className="col-md-4">
                                <div className="cardDiv">
                                    <GetDoctorData clinicId={details.clinicId} doctorId={details.doctorId} />

                                    <span className='cardSpan time'>
                                        <i className='pe-7s-date m-1 color patientListIcon' />
                                        <span className=''>
                                            {moment(details.selectedDate).format('YYYY-MM-DD').toString()}
                                            ,{details.slotTime}
                                            <span className='timeS'>
                                                <AccessTimeRoundedIcon style={{ fontSize: 20, color: '#1a3c8b' }} />
                                                {details.timeSlot} Min.
                                            </span>
                                        </span>
                                    </span>
                                    {!details.dependentId ?
                                        <div align='left' className='ml-3 '>
                                           <span className='patientName'>Patient:  </span> {details['patientDetails'][0].name}
                                        </div>
                                        :
                                        <div align='left' className='ml-3 fontSize'>
                                             <span className='patientName'>Patient:  </span>  {details['dependentDetails'][0].name}
                                        </div>}
                                    <div className=' appointmentBtn' align='right'>
                                        <Link to={`/doctorprofile/${details.doctorId}`}>
                                            <button className="btn appColor helperBtn ">View Profile</button>
                                        </Link>
                                        <Link onClick={() => handleCancelShow(details)} >
                                            <button className='btn btn-default btnMargin ' >Cancel</button>
                                        </Link>

                                    </div>
                                </div>
                            </div>
                        </>
                    )

                })}
            </div>
            {patientList.length > 0 ?
                <div>
                    <ReactPaginate
                        breakLabel="..."
                        nextLabel="Next >"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={5}
                        pageCount={totalPages}
                        previousLabel="< Previous"
                        renderOnZeroPageCount={null}
                        marginPagesDisplayed={2}
                        containerClassName="pagination "
                        pageClassName="page-item"
                        pageLinkClassName="page-link"
                        previousClassName="page-item"
                        previousLinkClassName="page-link"
                        nextClassName="page-item"
                        nextLinkClassName="page-link"
                        activeClassName="active"
                    />
                </div>
                : <div className="clinicHistory" ><b>Data is not Available</b></div>}

            <Modal show={showCancel} onHide={handleCancelClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Are You Sure?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="alert alert-danger">You Want To Delete This Appoinment. </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="default" className='appColor' onClick={() => cancelAppointment(id)}>
                        Yes
                    </Button>
                    <Button variant="default" style={{ border: '1px solid #1a3c8b' }} onClick={handleCancelClose}>
                        No
                    </Button>

                </Modal.Footer>
            </Modal>
        </>
    )
}