import React from 'react';
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import moment from 'moment';
import { Button, Modal } from 'react-bootstrap';
import AccessTimeRoundedIcon from '@material-ui/icons/AccessTimeRounded';
import { FaClinicMedical } from 'react-icons/fa';
import ReportApi from '../../services/ReportApi';
import AppointmentApi from '../../services/AppointmentApi';
import ReactPaginate from 'react-paginate';

export default function PatientList(props) {
    const { doctorId } = props
    let navigate = useNavigate();
    const [patientList, setPatientList] = useState(null);
    const [showCancel, setCancelDelete] = useState(false);
    const [id, setId] = useState()
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0);
    const { MedicineReportData, } = ReportApi()
    const { getPatientListDetails,
        cancelPatientAppointment,
        updateIncompleteStatus } = AppointmentApi()

    useEffect(() => {
        getPatientDetails(currentPage);
    }, [currentPage])

    const handleCancelShow = (details) => {
        setId(details._id)
        setCancelDelete(true)
    }

    const handleCancelClose = () => setCancelDelete(false)

    function saveData(item, e) {
        e.preventDefault();
        const bodyData = {
            "doctorId": doctorId,
            "patientId": item.patientId,
            'patientAppointmentId': item._id,
            'clinicId': item.clinicId,
            "fees": item.fees,
            'dependentId': item.dependentId
        }
        MedicineReportData(bodyData)
            .then((res) => {
                navigate(`consultation/${res._id}`, { state: { fees: item.fees } })
            })
    }

    const pageSize = 6;
    function getPatientDetails(currentPage) {
        getPatientListDetails({ doctorId }, currentPage, pageSize)
            .then((result, i) => {
                setTotalPages(result.totalOngoingPages)
                setPatientList(result.ongoing)
                result.test.filter((data) => {
                    const patientAppointmentId = data._id;
                    const currentDate = moment(new Date()).format("YYYY-MM-DD HH:mm")
                    const selectedDate = moment(data.selectedDate).format("YYYY-MM-DD") + " " + data.slotTime
                    if (selectedDate < currentDate && data.status !== "Completed" && data.status !== "Cancelled") {
                        const bodyData = {
                            'status': "Incomplete"
                        }
                        updateIncompleteStatus(patientAppointmentId, bodyData)
                    }

                })
            })
    }

    function cancelAppointment(id) {
        cancelPatientAppointment(id)
            .then(() => {
                getPatientDetails(currentPage)
                handleCancelClose()
            })
    }
    const handlePageClick = (data) => {
        setCurrentPage(data.selected + 1);
    }
    const handleShowProfile = (patientId) => {
        navigate(`patientinfo/${patientId}`)
    }
    return (
        <>
            {patientList ?
                <div className='row'>
                    {patientList.map((details, i) => {
                        return (
                            <>
                                {!details.dependentId ?
                                    <div className="col-md-4 " key={i}>
                                        <div className="cardDiv">
                                            <span className='cardSpan'>
                                                <i className='icon-user color patientListIcon' />
                                                <span className='patientName '>
                                                    <NavLink to="#" className='underLine' onClick={() => handleShowProfile(details.patientId)}>
                                                        {details['patientDetails'][0].name}
                                                    </NavLink>
                                                </span>
                                            </span>
                                            <span className='cardSpan'>
                                                <i className='icon-mobile-1 color patientListIcon' />
                                                <span className='patinetInfo'>{details['patientDetails'][0].mobile}</span>
                                            </span>
                                            <span className='cardSpan '>
                                                <i className=' color patientListIcon ml-1 mr-2' ><FaClinicMedical /> </i>
                                                <span className='patinetInfo '> {details['clinicList'][0].clinicName}</span>
                                            </span>
                                            <span className='cardSpan time'>
                                                <i className='pe-7s-date m-1 color patientListIcon' />
                                                <span className='slotTime'>
                                                    {moment(details.selectedDate).format('YYYY-MM-DD').toString()},
                                                    {details.slotTime}
                                                    <span className='timeSlot'>
                                                        <AccessTimeRoundedIcon style={{ fontSize: 20, color: '#1a3c8b' }} />
                                                        {details.timeSlot} Min.
                                                    </span>
                                                </span>
                                            </span>

                                            <div className='cardSpan appointmentBtn'>
                                                <NavLink to="#" onClick={(e) => saveData(details, e)}>
                                                    <button className="btn appColor helperBtn ">Start Consultation</button>
                                                </NavLink>
                                                <NavLink onClick={() => handleCancelShow(details)} >
                                                    <button className='btn btn-default helperBtn'>Cancel</button>
                                                </NavLink>

                                            </div>
                                        </div>
                                    </div>
                                    : <div className="col-md-4 ">
                                        <div className="cardDiv">
                                            <div className='cardSpan row'>
                                                <div align='left' className='col-md-9' >
                                                    <i className=' icon-user color patientListIcon' />
                                                    <span className=' patientName'>{details['dependentDetails'][0].name}</span>
                                                </div>
                                                <div className='col-md-3' >
                                                    <span className='dependent'>Dependent</span>
                                                </div>
                                            </div>
                                            <span className='cardSpan'>
                                                <i className='icon-mobile-1 color patientListIcon' />
                                                <span className='patinetInfo'>{details['patientDetails'][0].mobile}</span>
                                            </span>
                                            <span className='cardSpan '>
                                                <i className=' color patientListIcon ml-1 mr-2' ><FaClinicMedical /> </i>
                                                <span className='patinetInfo '> {details['clinicList'][0].clinicName}</span>
                                            </span>
                                            <span className='cardSpan time'>
                                                <i className='pe-7s-date m-1 color patientListIcon' />
                                                <span className='slotTime'>{moment(details.selectedDate).format('YYYY-MM-DD').toString()},{details.slotTime}
                                                    <span className='timeSlot'>
                                                        <AccessTimeRoundedIcon style={{ fontSize: 20, color: '#1a3c8b' }} />
                                                        {details.timeSlot} Min.
                                                    </span>
                                                </span>
                                            </span>

                                            <div className='cardSpan appointmentBtn'>
                                                <NavLink to="#" onClick={(e) => saveData(details, e)}>
                                                    <button className="btn appColor helperBtn">Start Consultation</button>
                                                </NavLink>
                                                <NavLink onClick={() => handleCancelShow(details)} >
                                                    <button className='btn btn-default helperBtn ' >Cancel</button>
                                                </NavLink>

                                            </div>
                                        </div>
                                    </div>}
                            </>

                        )

                    })}
                </div >
                : null}
            {patientList ?
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
                : <div className="clinicHistory" ><b>Data is Not Available</b></div>}

            <Modal show={showCancel} onHide={handleCancelClose} >
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
            </Modal >

        </>
    )
}