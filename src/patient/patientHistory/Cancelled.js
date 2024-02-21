import React from 'react';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from 'moment';
import AccessTimeRoundedIcon from '@material-ui/icons/AccessTimeRounded';
import PatientApi from '../../services/PatientApi';
import GetDoctorData from './getDoctorData';
import ReactPaginate from 'react-paginate';

export default function Cancelled(props) {
    const { patientId } = props;
    const [patientList, setPatientList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0);
    const { getpaymentData } = PatientApi()


    useEffect(() => {
        getPatientHistory(currentPage);
    }, [currentPage])

    const pageSize = 6;
    function getPatientHistory(currentPage) {
        getpaymentData({ patientId }, currentPage, pageSize)
            .then((result) => {
                const totalPages = result.totalCancelledPages;
                setTotalPages(totalPages)
                setPatientList(result.cancelled)
            })
    }
    const handlePageClick = (data) => {
        setCurrentPage(data.selected + 1);
    }
    return (
        <>
            {patientList ?
                <div className='row'>
                    {patientList.map((details, i) => {
                        return (
                            <>
                                <div key={i} className="col-md-4 ">
                                    <div className="cardDiv">
                                        <GetDoctorData clinicId={details.clinicId} doctorId={details.doctorId} />
                                        <span className='cardSpan time'>
                                            <i className='pe-7s-date m-1 color patientListIcon' />
                                            <span className='slotTime'>{moment(details.selectedDate).format('YYYY-MM-DD').toString()},{details.slotTime}
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
                                    </div>
                                </div>

                            </>
                        )

                    })}
                </div>
                : null}
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
                : <div className="clinicHistory"><b>Data is not Available</b></div>}
        </>
    )
}