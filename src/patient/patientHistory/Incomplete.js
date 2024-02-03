import { useEffect, useState } from "react";
import AccessTimeRoundedIcon from '@material-ui/icons/AccessTimeRounded';
import moment from "moment";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import PatientApi from "../../services/PatientApi";
import GetDoctorData from "./getDoctorData";

export default function Incomplete(props) {
    const { patientId } = props
    const [patientHistoryData, setPatientHistoryData] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0);
    const { getpaymentData } = PatientApi()

    useEffect(() => {
        getPatientDetails(currentPage);
    }, [currentPage]);


    const pageSize = 6;
    function getPatientDetails() {
        getpaymentData({ patientId }, currentPage, pageSize)
            .then((result) => {
                const totalPages = result.totalIncompletePages;
                setTotalPages(totalPages)
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
                        <li className={`page-item ${pageNo === currentPage ? 'active' : ''}`} >
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