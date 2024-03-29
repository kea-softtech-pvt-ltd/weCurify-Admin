import React, { useEffect } from "react";
import { Wrapper } from "../../mainComponent/Wrapper";
import { MainNav } from "../../mainComponent/mainNav";
import UserLinks from "./partial/uselinks";
import { useState } from "react";
import PatientApi from "../../services/PatientApi";
import ReactPaginate from "react-paginate";
import { Group } from "@material-ui/icons";
import { Link, Outlet, useNavigate } from "react-router-dom";

export default function AllPatients() {
    const [patientData, setPatientData] = useState([])
    const [filterData, setFilterData] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0);
    const { getAllPatient } = PatientApi()
    const navigate = useNavigate();

    useEffect(() => {
        getPatientList(currentPage)
    }, [currentPage])

    const pageSize = 6;
    const getPatientList = () => {
        getAllPatient(currentPage, pageSize)
            .then((res) => {
                setFilterData(res.patientList)
                setPatientData(res.patientList)
                setTotalPages(res.totalPages)
            })
    }

    const searchPatient = (value) => {
        const res = filterData.filter(name => name.name.toLowerCase().includes(value.toLowerCase()))
        setPatientData(res)
    }

    const handleShowProfile = (details, e) => {
        e.preventDefault();
        navigate(`patientinfo/${details}`)
    }

    const handlePageClick = (data) => {
        setCurrentPage(data.selected + 1);
    }

    return (
        <Wrapper>
            <MainNav>
                <ul className="clearfix">
                    <div className="row">
                        <li className='float-none margin-top' style={{ fontSize: 'inherit' }}>Patient-List</li>
                        <div id="custom-search-input">
                            <input type="text" onChange={(e) => searchPatient(e.target.value)} className="search-query" placeholder="Search Patient By Name" />
                            <input type="submit" className="btn_search" value="Search" />
                        </div>
                    </div>
                </ul>
            </MainNav>
            <div className='row'>
                <UserLinks />
                <div className="common_box">
                    <div className='row'>
                        {patientData.map((details, i) => {
                            return (
                                <>
                                    <div key={i} className="col-md-4 " >
                                        <div className="cardDiv">
                                            <span className='cardSpan '>
                                                <i className='icon-user color patientListIcon' />
                                                <span className='patientName'>{details.name}</span>
                                            </span>
                                            <span className='cardSpan'>
                                                <i className='icon-mobile-1 color patientListIcon' />
                                                <span className='patinetInfo'>{details.mobile}</span>
                                            </span>
                                            <span className='cardSpan '>
                                                <i className='icon-email color patientListIcon' />
                                                <span className='patinetInfo'>{details.email}</span>
                                            </span>

                                            <div className='cardSpan appointmentBtn'>
                                                <Link to='#' onClick={(e) => handleShowProfile(details._id, e)}>
                                                    <button className="btn appColor helperBtn ">View Profile</button>
                                                </Link>
                                                <Link to={`patientappointment/${details._id}`} >
                                                    <button className='btn appColor helperBtn'>Appointment Details</button>
                                                </Link>
                                                {details['dependent'].length > 0 ?
                                                    <Link
                                                        to={`dependentdata/${details._id}`}>
                                                        <Group style={{ fontSize: 40 }} />
                                                    </Link>
                                                    : null}
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )
                        })}
                    </div>
                    {patientData.length > 0 ?
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
                        : <div className="clinicHistory" ><b>Data is Not Available</b></div>}
                </div >
            </div>
            <Outlet/>
        </Wrapper>
    )

}