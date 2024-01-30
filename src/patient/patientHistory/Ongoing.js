import React from 'react';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from 'moment';
import { Button, Modal } from 'react-bootstrap';
import AccessTimeRoundedIcon from '@material-ui/icons/AccessTimeRounded';
import PatientApi from '../../services/PatientApi';
import GetDoctorData from './getDoctorData';
import AppointmentApi from '../../services/AppointmentApi';

export default function Ongoing(props) {
    const { patientId } = props
    const [patientList, setPatientList] = useState([]);
    const [showDelete, setShowDelete] = useState(false);
    const [id, setId] = useState()
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0);
    const { cancelPatientAppointment } = AppointmentApi()
    const { getpaymentData } = PatientApi()


    useEffect(() => {
        getPatientDetails(currentPage);
    }, [currentPage])

    const handleDeleteShow = (details) => {
        setId(details._id)
        setShowDelete(true)
    }
    const handleDeleteClose = () => setShowDelete(false)

    const pageSize = 6;
    function getPatientDetails(currentPage) {
        getpaymentData({ patientId }, currentPage, pageSize)
            .then((result) => {
                const totalPages = result.totalOngoingPages;
                setTotalPages(totalPages)
                setPatientList(result.ongoing)
            })
    }

    const handlePrevPage = () => {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1);
        }
    };
    const totalPagesCalculator = () => {
        const pages = [];
        for (let x = 1; x <= totalPages; x++) {
            pages.push(x)
        }

        return pages
    }
    const handleNextPage = () => {
        if (currentPage !== totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    function cancelAppointment(id) {
        cancelPatientAppointment(id)
            .then(() => {
                getPatientDetails()
                handleDeleteClose()
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
                                    <span className='doctorCard'>
                                        <GetDoctorData doctorId={details.doctorId} />
                                    </span>
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

                                    <div className=' appointmentBtn' align='right'>
                                        <Link to={`/doctorprofile/${details.doctorId}`}>
                                            <button className="btn appColor helperBtn ">View Profile</button>
                                        </Link>
                                        <Link onClick={() => handleDeleteShow(details)} >
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
                < ul className="pagination pagination-sm">
                    <li className="page-item">
                        <Link className="page-link"
                            to="#" onClick={handlePrevPage}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </Link>
                    </li>

                    {totalPagesCalculator(totalPages, pageSize).map(pageNo =>
                        <li className={`page-item${pageNo === currentPage ? 'active' : ''}`} >
                            <Link className="page-link"
                                key={pageNo}
                                to="#"
                                onClick={() => setCurrentPage(pageNo)}>
                                {pageNo}
                            </Link>
                        </li>
                    )}

                    <li className="page-item">
                        <Link className="page-link"
                            to="#" onClick={handleNextPage}
                            disabled={currentPage === totalPages}>
                            Next
                        </Link>
                    </li>
                </ul>
                : <div className="clinicHistory" ><b>Data is not Available</b></div>}

            <Modal show={showDelete} onHide={handleDeleteClose}>
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
                    <Button variant="default" style={{ border: '1px solid #1a3c8b' }} onClick={handleDeleteClose}>
                        No
                    </Button>

                </Modal.Footer>
            </Modal>
        </>
    )
}