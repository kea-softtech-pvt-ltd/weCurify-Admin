import React, { useEffect, useState } from 'react';
import { useParams, Link } from "react-router-dom";
import moment from 'moment';
import AuthApi from "../../services/AuthApi";
import { Button } from 'react-bootstrap';
import AccessTimeRoundedIcon from '@material-ui/icons/AccessTimeRounded';
import PatientApi from '../../services/PatientApi';
import GetDoctorData from './getDoctorData';
import AppointmentApi from '../../services/AppointmentApi';
const { getStorage, ref, getDownloadURL } = require("firebase/storage");

export default function Completed(props) {
    const { patientId, doctorId } = props
    const [patientHistoryData, setPatientHistoryData] = useState([])

    const { downloadPrescription } = AppointmentApi()
    const { getpaymentData } = PatientApi()
    //For Pagination
    const [activePageNo, setActivePageNo] = useState(1)
    const recordsPerPage = 5;
    const lastIndex = activePageNo * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = patientHistoryData.slice(firstIndex, lastIndex)
    const nPage = Math.ceil(patientHistoryData.length / recordsPerPage)
    const number = [...Array(nPage + 1).keys()].slice(1)
    const storage = getStorage();

    useEffect(() => {
        getPatientHistory();
    }, [])

    function getPatientHistory() {
        getpaymentData({ patientId })
            .then((result) => {
                const data = result.filter((patientData) => {
                    if (patientData.status === "Completed") {
                        return result;
                    }
                })
                setPatientHistoryData(data)
            })

    }

    const downloadPdf = async (details) => {
        const reportId = details.medicalReportId
        downloadPrescription(reportId)
            .then((result) => {
                let alink = document.createElement('a');
                alink.href = result;
                alink.setAttribute("target", "_blank")
                alink.download = 'Prescription.pdf';
                alink.click();
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
                {/* {records && records} */}
                {records.map((details, i) => {
                    return (
                        <>
                            <div key={i} className="col-md-4 ">
                                <div className="cardDiv">
                                    <span className='doctorCard'>
                                        <GetDoctorData doctorId={details.doctorId} />
                                    </span>
                                    {/* <span className='cardSpan'>
                                            <i className='icon-mobile-1 color patientListIcon' />
                                            {details['doctorDetails'][0].mobile}
                                        </span> */}
                                    {/* <span className='cardSpan '>
                                            <i className='icon-hospital-1 color patientListIcon' />
                                            {details['clinicList'][0].clinicName}
                                        </span> */}
                                    <span className='cardSpan time'>
                                        <i className='pe-7s-date m-1 color patientListIcon' />
                                        <span className='slotTime'>
                                            {moment(details.selectedDate).format('YYYY-MM-DD').toString()},{details.slotTime}
                                            <span className='timeS'>
                                                <AccessTimeRoundedIcon style={{ fontSize: 20, color: '#1a3c8b' }} />
                                                {details.timeSlot} Min.
                                            </span>
                                        </span>
                                    </span>

                                    <div className='cardSpan appointmentBtn historyBtn'>
                                        <Link to={`/patient-history/${details.medicalReportId}`}>
                                            <Button className="appColor helperBtn" > View</Button>
                                        </Link>
                                        <Button className="appColor helperBtn" onClick={() => downloadPdf(details)}> Download</Button>
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

        </>
    )
}