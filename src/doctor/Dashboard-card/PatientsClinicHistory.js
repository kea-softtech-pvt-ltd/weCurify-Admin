import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import moment from 'moment';
import { Button } from 'react-bootstrap';
import AccessTimeRoundedIcon from '@material-ui/icons/AccessTimeRounded';
import AppointmentApi from '../../services/AppointmentApi';
import Sharing from './partial/Sharing';
const { getStorage, ref, getDownloadURL } = require("firebase/storage");



export default function PatientsClinicHistory(props) {
    const { doctorId } = props
    const [patientHistoryData, setPatientHistoryData] = useState([])

    const { downloadPrescription, getPatientListDetails } = AppointmentApi()
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
        getPatientListDetails({ doctorId })
            .then((result) => {
                const data = result.filter((patientData) => {
                    if (patientData.status === "Completed") {
                        return result;
                    }
                })
                setPatientHistoryData(data)
            })

    }

    // const downloadPdf = async (details) => {
    //     const reportId = details.medicalReportId
    //     await getDownloadURL(ref(storage, `files/invoice-${reportId}.pdf`))
    //         .then((url) => {
    //             // This can be downloaded directly:
    //             const xhr = new XMLHttpRequest();

    //             xhr.responseType = 'blob';
    //             xhr.open('GET', url);
    //             xhr.onload = function () {
    //                 var blob = new Blob([xhr.response], { type: 'application/pdf' });
    //                 // if (this.status == 200) {
    //                 //     var blob = new Blob([xhr.response], { type: 'application/pdf' });

    //                 // var link = document.createElement('a');
    //                 // link.href = url;
    //                 // link.download = "document.pdf";
    //                 // link.click();
    //                 // } else {
    //                 //     console.log("Error. Estatus " + this.status + ".");
    //                 // }
    //             }
    //             xhr.open('GET', url);
    //             xhr.send()
    //         })
    //         .catch((error) => {
    //             console.log("error", error)
    //         });
    // }

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
        <div className="">
            <div className='row'>
                {records && records.map((details, i) => {
                    return (
                        <>

                            <div className="col-md-4 ">
                                <div className="cardDiv">
                                    <span className='cardSpan'>
                                        <i className='icon-user color patientListIcon' />
                                        <span className=' patientName'>
                                            {details['patientDetails'][0].name}
                                        </span>
                                    </span>
                                    <span className='cardSpan'>
                                        <i className='icon-mobile-1 color patientListIcon' />
                                        {details['patientDetails'][0].mobile}
                                    </span>
                                    <span className='cardSpan '>
                                        <i className='icon-hospital-1 color patientListIcon' />
                                        {details['clinicList'][0].clinicName}
                                    </span>
                                    <span className='cardSpan time'>
                                        <i className='pe-7s-date m-1 color patientListIcon' />
                                        <span className='slotTime'>
                                            {moment(details.selectedDate).format('YYYY-MM-DD').toString()},
                                            <span className=' ml-2'>
                                                {details.slotTime}
                                            </span>
                                            <span className=' timeS'>
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
                                        <Sharing reportId={details.medicalReportId} />
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
                : <div className='clinicHistory'><b>Data is Not Available</b></div>}
        </div>
    )
}