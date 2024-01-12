import React from 'react';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from 'moment';
import AccessTimeRoundedIcon from '@material-ui/icons/AccessTimeRounded';
import PatientApi from '../../services/PatientApi';
import GetDoctorData from './getDoctorData';



export default function Cancelled(props) {
    const { patientId } = props;
    const [patientList, setPatientList] = useState(null);
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0);
    const { getpaymentData } = PatientApi()


    useEffect(() => {
        getPatientHistory();
    }, [])

    function getPatientHistory() {
        const pageSize = 6;
        getpaymentData({ patientId }, currentPage, pageSize)
            .then((result) => {
                const totalPages = result.totalCancelledPages;
                setTotalPages(totalPages)
                setPatientList(result.cancelled)
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
    const handleNextPage = () => {
        if (currentPage !== totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <>
            {patientList ?
                <div className='row'>
                    {patientList.map((details, i) => {
                        return (
                            <>
                                <div key={i} className="col-md-4 ">
                                    <div className="cardDiv">
                                        <span className='doctorCard'>
                                            <GetDoctorData doctorId={details.doctorId} />
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
                                    </div>
                                </div>

                            </>
                        )

                    })}
                </div>
                : null}
            {patientList?
                < ul className="pagination pagination-sm">
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

            <li className="page-item">
                <Link className="page-link"
                    to="#" onClick={handleNextPage}
                    disabled={currentPage === totalPages}>
                    Next
                </Link>
            </li>

        </ul >
            : <div className="clinicHistory" ><b>Data is not Available</b></div>
}
        </>
    )
}