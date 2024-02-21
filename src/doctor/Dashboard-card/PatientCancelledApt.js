import React from 'react';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaClinicMedical } from 'react-icons/fa';
import moment from 'moment';
import AccessTimeRoundedIcon from '@material-ui/icons/AccessTimeRounded';
import AppointmentApi from '../../services/AppointmentApi';
import ReactPaginate from 'react-paginate';
import { AccessTimeRounded } from '@material-ui/icons';

export default function PatientCancelledApt(props) {
    const { doctorId } = props
    const [patientList, setPatientList] = useState(null);
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0);
    const { getPatientListDetails } = AppointmentApi()

    useEffect(() => {
        getPatientDetails(currentPage);
    }, [currentPage])

    const pageSize = 6;

    function getPatientDetails() {
        getPatientListDetails({ doctorId }, currentPage, pageSize)
            .then((result) => {
                setTotalPages(result.totalCancelledPages)
                setPatientList(result.cancelled)
            })

    }

    const handlePageClick = (data) => {
        setCurrentPage(data.selected + 1);
    }

    return (

        <div>
            {patientList ?
                <div className='row'>
                    {patientList.map((details, i) => {
                        return (
                            <>
                                {!details.dependentId ?
                                    <div key={i} className="col-md-4 ">
                                        <div className="cardDiv">
                                            <span className='cardSpan'>
                                                <i className='icon-user color patientListIcon' />
                                                <span className='patientName'>{details['patientDetails'][0].name}</span>
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
                                                        <AccessTimeRounded style={{ fontSize: 20, color: '#1a3c8b' }} />
                                                        {details.timeSlot} Min.
                                                    </span>
                                                </span>
                                            </span>

                                        </div>
                                    </div>
                                    : <div className="col-md-4 ">
                                        <div className="cardDiv">
                                            <div className='cardSpan row'>
                                                <div align='left' className='col-md-9' >
                                                    <i className=' icon-user color patientListIcon' />
                                                    <span className=' patientName'>{details['dependentDetails'][0].name}</span>
                                                </div>
                                                <div className='col-md-3'>
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
                                                        <AccessTimeRounded style={{ fontSize: 20, color: '#1a3c8b' }} />
                                                        {details.timeSlot} Min.
                                                    </span>
                                                </span>
                                            </span>
                                        </div>
                                    </div>
                                }
                            </>
                        )

                    })}
                </div>
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
                : <div className="clinicHistory" ><b>Data is not Available</b></div>}
        </div >

    )
}