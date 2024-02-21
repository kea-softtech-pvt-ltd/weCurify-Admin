import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import moment from 'moment';
import { Button } from 'react-bootstrap';
import AccessTimeRoundedIcon from '@material-ui/icons/AccessTimeRounded';
import PatientApi from '../../services/PatientApi';
import GetDoctorData from './getDoctorData';
import AppointmentApi from '../../services/AppointmentApi';
import ReactPaginate from 'react-paginate';

export default function Completed(props) {
    const { patientId } = props
    const [patientHistoryData, setPatientHistoryData] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0);
    const { downloadPrescription } = AppointmentApi()
    const { getpaymentData } = PatientApi()

    useEffect(() => {
        getPatientHistory(currentPage);
    }, [currentPage])

    const pageSize = 6;
    function getPatientHistory() {
        getpaymentData({ patientId }, currentPage, pageSize)
            .then((result) => {
                const totalPages = result.totalCompletedPages;
                setTotalPages(totalPages)
                setPatientHistoryData(result.completed)
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
    const handlePageClick = (data) => {
        setCurrentPage(data.selected + 1);
    }

    return (
        <>
            {patientHistoryData ?
                <div className='row'>
                    {patientHistoryData.map((details, i) => {
                        return (
                            <>
                                <div key={i} className="col-md-4 ">
                                    <div className="cardDiv">
                                        <GetDoctorData clinicId={details.clinicId} doctorId={details.doctorId} />
                                        <span className='cardSpan time'>
                                            <i className='pe-7s-date m-1 color patientListIcon' />
                                            <span className='slotTime'>
                                                {moment(details.selectedDate).format('YYYY-MM-DD').toString()},
                                                {details.slotTime}
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
                : null}
            {patientHistoryData.length > 0 ?
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
        </>
    )
}