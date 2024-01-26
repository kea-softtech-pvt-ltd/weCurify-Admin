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
    console.log('==patientHistoryData==',patientHistoryData)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0);
    const { downloadPrescription, getPatientListDetails } = AppointmentApi()

    const storage = getStorage();

    useEffect(() => {
        getPatientHistory();
    }, [])

    const pageSize = 6;
    function getPatientHistory() {
        getPatientListDetails({ doctorId }, currentPage, pageSize)
            .then((result) => {
                console.log('=result=', result)
                const totalPages = result.totalCompletedPages;
                setTotalPages(totalPages)
                setPatientHistoryData(result.completed)
            })
    }


    const downloadPdf =  (details) => {
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


    const handlePrevPage = () => {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1);
        }
    };
    // function changeCPage() {
    //     setCurrentPage(currentPage * 15)
    // }
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
    return (
        <div className="">
            <div className='row'>
                {patientHistoryData.map((details, i) => {
                    return (
                        <>

                            <div className="col-md-4 " key={i}>
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
                                    {/* <span className='cardSpan '>
                                        <i className='icon-hospital-1 color patientListIcon' />
                                        {details['clinicList'][0].clinicName}
                                    </span> */}
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
            {patientHistoryData.length > 0 ?
                <ul className="pagination pagination-sm">
                    <li className="page-item">
                        <Link className="page-link"
                            to="#" onClick={handlePrevPage}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </Link>
                    </li>

                    {/* <li className='page-item '>
                    <Link className="page-link"
                        to="#" onClick={() => changeCPage()}>
                        {currentPage}
                    </Link>
                </li> */}
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
        </div>
    )
}