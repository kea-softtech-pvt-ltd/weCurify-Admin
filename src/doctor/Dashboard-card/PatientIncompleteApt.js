import { useEffect, useState } from "react";
import AccessTimeRounded from "@material-ui/icons/AccessTimeRounded"
import moment from "moment";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { FaClinicMedical } from 'react-icons/fa';
import AppointmentApi from "../../services/AppointmentApi";

export default function PatientIncompleteApt(props) {
    const { doctorId } = props
    const [patientHistoryData, setPatientHistoryData] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0);
    const { getPatientListDetails } = AppointmentApi()

    useEffect(() => {
        getPatientHistory(currentPage);
    }, [currentPage]);


    const pageSize = 6;
    function getPatientHistory(currentPage) {
        getPatientListDetails({ doctorId }, currentPage, pageSize)
            .then((result) => {
                setTotalPages(result.totalIncompletePages)
                setPatientHistoryData(result.incomplete)
            })
    }

    const handlePrevPage = () => {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1);
        }
    };
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
        <>
            <div className='row'>
                {patientHistoryData.map((details, i) => {
                    return (
                        <>
                            <div className="col-md-4 " key={i}>
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
                                        <i className=' color patientListIcon ml-1 mr-2' ><FaClinicMedical /> </i>
                                        <span className='patinetInfo '> {details['clinicList'][0].clinicName}</span>
                                    </span>
                                    <span className='cardSpan time'>
                                        <i className='pe-7s-date m-1 color patientListIcon' />
                                        <span className='slotTime'>{moment(details.selectedDate).format('YYYY-MM-DD').toString()},
                                            <span className='ml-2'>
                                                {details.slotTime}
                                            </span>
                                            <span className='timeSlot'>
                                                <AccessTimeRounded style={{ fontSize: 20, color: '#1a3c8b' }} />
                                                {details.timeSlot} Min.
                                            </span>
                                        </span>

                                </div>
                            </div>

                        </>
                    )

                })}
            </div>
                : null}
            {patientHistoryData.length > 0 ?
                < ul className="pagination pagination-sm">
                    <li className="page-item">
                        <Link className="page-link"
                            to="#" onClick={handlePrevPage}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </Link>
                    </li>

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

        </>
    )
}