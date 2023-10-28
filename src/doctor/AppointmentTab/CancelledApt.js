import React from 'react';
import { useEffect, useState } from "react";
import { Link, useParams} from "react-router-dom";
import moment from 'moment';
import AuthApi from "../../services/AuthApi";
import AccessTimeRoundedIcon from '@material-ui/icons/AccessTimeRounded';
import AppointmentApi from '../../services/AppointmentApi';
import ReportApi from '../../services/ReportApi';

export default function CancelledApt() {
    const { doctorId } = useParams()
    const [patientList, setPatientList] = useState([]);
    const [showDelete, setShowDelete] = useState(false);
    // const { MedicineReportData, } = ReportApi()
    const { cancelPatientAppointment, getPatientListDetails } = AppointmentApi()
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
    // const handleDeleteShow = (details) => {
    //     setId(details._id)
    //     setShowDelete(true)
    // }
    const handleDeleteClose = () => setShowDelete(false)

    // async function saveData(item) {
    //     const bodyData = {
    //         "doctorId": doctorId,
    //         "patientId": item.patientId,
    //         'patientAppointmentId': item._id,
    //         'clinicId': item.clinicId,
    //         "fees": item.fees
    //     }
    //     await MedicineReportData(bodyData)
    //         .then((res) => {
    //             history.push(`/consultation/${res._id}`, { data: { fees: item.fees } })
    //         })
    // }
    function getPatientDetails() {
        getPatientListDetails({ doctorId })
            .then((result) => {
                patientData(result)
            })
    }
    const patientData = (list) => {
        const data = list.filter((patient) => {
            if (patient.status === "Cancelled") {
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
                {records.map((details, i) => {
                    return (
                        <>
                            <div className="col-md-4 ">
                                <div className="cardDiv">
                                    <span className='cardSpan '>
                                        <i className='icon-user color patientListIcon' />
                                        <span className='patientName'>{details['patientDetails'][0].name}</span>
                                    </span>
                                    <span className='cardSpan'>
                                        <i className='icon-mobile-1 color patientListIcon' />
                                        <span className='patinetInfo'>{details['patientDetails'][0].mobile}</span>
                                    </span>
                                    <span className='cardSpan '>
                                        <i className='icon-hospital-1 color patientListIcon' />
                                        <span className='patinetInfo'>{details['clinicList'][0].clinicName}</span>
                                    </span>
                                    <span className='cardSpan time'>
                                        <i className='pe-7s-date m-1 color patientListIcon' />
                                        <span className='slotTime'>{moment(details.selectedDate).format('YYYY-MM-DD').toString()},{details.slotTime}
                                            <span className='timeS'>
                                                <AccessTimeRoundedIcon style={{ fontSize: 20, color: '#1a3c8b' }} />
                                                {details.timeSlot} Min.
                                            </span>
                                        </span>
                                    </span>

                                    {/* <div className='cardSpan appointmentBtn'>
                                        <Link to="#" onClick={() => saveData(details)}>
                                            <button className="btn appColor helperBtn ">Start Consultation</button>
                                        </Link>
                                        <Link onClick={() => handleDeleteShow(details)} >
                                            <button className='btn btn-default helperBtn ' >Cancel</button>
                                        </Link>

                                    </div> */}
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

        </>
    )
}