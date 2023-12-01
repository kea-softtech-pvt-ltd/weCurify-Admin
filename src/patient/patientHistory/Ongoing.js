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
    const { patientId, doctorId } = props
    const [patientList, setPatientList] = useState([]);
    const [showDelete, setShowDelete] = useState(false);
    const [id, setId] = useState()
    const { cancelPatientAppointment } = AppointmentApi()
    const { getpaymentData } = PatientApi()
    //For Pagination
    const [activePageNo, setActivePageNo] = useState(1)
    const recordsPerPage = 6;
    const lastIndex = activePageNo * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = patientList.slice(firstIndex, lastIndex)
    const nPage = Math.ceil(patientList.length / recordsPerPage)
    const number = [...Array(nPage + 1).keys()].slice(1)

    useEffect(() => {
        getPatientDetails();
    }, [])
    const handleDeleteShow = (details) => {
        setId(details._id)
        setShowDelete(true)
    }
    const handleDeleteClose = () => setShowDelete(false)

   
    function getPatientDetails() {
        getpaymentData({ patientId })
            .then((result) => {
                patientData(result)
            })
    }
    const patientData = (list) => {
        const data = list.filter((patient) => {
            if (patient.status === "Ongoing") {
                return patient;
            }
        })
        setPatientList(data)
    }
    function cancelAppointment(id) {
        cancelPatientAppointment(id)
            .then(() => {
                getPatientDetails()
                handleDeleteClose()
            })

    }
    //For Pagination
    function prePage() {
        if (activePageNo !== 1) {
            setActivePageNo(activePageNo - 1)
        }
    }
    function changeCPage(id) {
        setActivePageNo(id)
    }
    function nextPage() {
        if (activePageNo !== nPage) {
            setActivePageNo(activePageNo + 1)

        }
    }
    return (
        <>
            <div className='row'>
                {records && records.map((details, i) => {
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
            {records.length > 0 ?
                <nav aria-label="" className="add_top_20">
                    <ul className="pagination pagination-sm">
                        <li className="page-item">
                            <Link className="page-link"
                                to="#" onClick={prePage}>
                                Previous
                            </Link>
                        </li>
                        {
                            number.map((n, i) => {
                                return (
                                    <li className={`page-item ${activePageNo === n ? 'active' : ""}`} key={i}>
                                        <Link className="page-link"
                                            to="#" onClick={() => changeCPage(n)}>
                                            {n}</Link>
                                    </li>
                                )
                            })
                        }
                        <li className="page-item">
                            <Link className="page-link"
                                to="#" onClick={nextPage}>
                                Next
                            </Link>
                        </li>
                    </ul>
                </nav>
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