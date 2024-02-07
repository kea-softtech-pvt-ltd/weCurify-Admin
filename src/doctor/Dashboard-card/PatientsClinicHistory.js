import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import moment from 'moment';
import { Button } from 'react-bootstrap';
import AccessTimeRoundedIcon from '@material-ui/icons/AccessTimeRounded';
import AppointmentApi from '../../services/AppointmentApi';
import { FaClinicMedical } from 'react-icons/fa';
import Sharing from './partial/Sharing';
import ReactPaginate from 'react-paginate';
const { getStorage, ref, getDownloadURL } = require("firebase/storage");

export default function PatientsClinicHistory(props) {
    const { doctorId } = props
    const [patientHistoryData, setPatientHistoryData] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0);
    const { downloadPrescription, getPatientListDetails } = AppointmentApi()

    const storage = getStorage();

    useEffect(() => {
        getPatientHistory(currentPage);
    }, [currentPage])

    const pageSize = 6;
    function getPatientHistory(currentPage) {
        getPatientListDetails({ doctorId }, currentPage, pageSize)
            .then((result) => {
                const totalPages = result.totalCompletedPages;
                setTotalPages(totalPages)
                setPatientHistoryData(result.completed)
            })
    }

    const downloadPdf = (details) => {
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
    const handlePageClick = () => {
        setCurrentPage(currentPage + 1)
    }
    return (
        <div>
            {patientHistoryData ?
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
                                        <span className='cardSpan '>
                                            <i className=' color patientListIcon ml-1 mr-2' ><FaClinicMedical /> </i>
                                            <span className='patinetInfo '> {details['clinicList'][0].clinicName}</span>
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
                : null}
            {patientHistoryData ?
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
        </div>
    )
}