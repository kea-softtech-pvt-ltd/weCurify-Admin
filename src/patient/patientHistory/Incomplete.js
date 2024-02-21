import { useEffect, useState } from "react";
import AccessTimeRoundedIcon from '@material-ui/icons/AccessTimeRounded';
import moment from "moment";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import PatientApi from "../../services/PatientApi";
import GetDoctorData from "./getDoctorData";
import ReactPaginate from "react-paginate";

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