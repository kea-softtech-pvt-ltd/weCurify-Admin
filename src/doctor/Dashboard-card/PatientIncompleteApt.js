import { useEffect, useState } from "react";
import AccessTimeRounded from "@material-ui/icons/AccessTimeRounded"
import moment from "moment";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
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


    function getPatientHistory() {
        const pageSize = 6;
        getPatientListDetails({ doctorId }, currentPage, pageSize)
            .then((result) => {
                console.log('----', result)
                const totalPages = result.totalIncompletePage;
                setTotalPages(totalPages)
                setPatientHistoryData(result.incomplete)
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
                                    {/* <span className='cardSpan '>
                                        <i className='icon-hospital-1 color patientListIcon' />
                                        <span className='patinetInfo'>{details['clinicList'][0].clinicName}</span>
                                    </span> */}
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
                                    </span>

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

                    <li className="page-item">
                        <Link className="page-link"
                            to="#" onClick={handleNextPage}
                            disabled={currentPage === totalPages}>
                            Next
                        </Link>
                    </li>
                </ul>
                : <div className="clinicHistory" ><b>Data is not Available</b></div>
            }
        </>
    )
}