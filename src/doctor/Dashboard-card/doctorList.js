import React, { useEffect } from "react";
import { Wrapper } from "../../mainComponent/Wrapper";
import { MainNav } from "../../mainComponent/mainNav";
import UserLinks from "./partial/uselinks";
import AuthApi from "../../services/AuthApi";
import { useState } from "react";
import { Icon } from "@mui/material";
import UpgradeSubscription from "./partial/upgradeSubscription";
import ReactPaginate from "react-paginate";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

export default function DoctorList() {
    const [doctorData, setDoctorData] = useState([]);
    const [filterData, setFilterData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const { getdoctors } = AuthApi();
    const navigate = useNavigate();

    useEffect(() => {
        getDoctorList(currentPage)
    }, [currentPage]);

    const pageSize = 6;
    const getDoctorList = () => {
        getdoctors(currentPage, pageSize)
            .then((result) => {
                setFilterData(result.result)
                setDoctorData(result.doctorList)
                setTotalPages(result.doctorListPages)
            })
    }
    const searchDoctor = (value) => {
        const res = filterData.filter(name => name.name.toLowerCase().includes(value.toLowerCase()))
        setDoctorData(res)
    }

    const handleShowProfile = (details, e) => {
        e.preventDefault();
        navigate(`profile/${details._id}`)
    }

    const BookAppointments = (details, e) => {
        e.preventDefault();
        if (details.isSubscribed === false) {
            navigate(`/subscriptions/${details._id}`);
        } else {
            navigate(`patient/${details._id}`)
        }
    }

    const ViewAppointments = (details, e) => {
        e.preventDefault();
        navigate(`appointment/${details._id}`)
    }
    const handlePageClick = (data) => {
        setCurrentPage(data.selected + 1)
    }

    return (
        <Wrapper>
            <MainNav>
                <ul className="clearfix">
                    <div className="row">
                        <li className='float-none margin-top' style={{ fontSize: 'inherit' }}>Doctor-List</li>
                        <div id="custom-search-input">
                            <input type="text" onChange={(e) => searchDoctor(e.target.value)} className="search-query" placeholder="Search Doctor By Name" />
                            <input type="submit" className="btn_search" value="Search" />
                        </div>
                        <div className="mx-2 mt-2">
                            <NavLink to={`/doctors/addnewdoctor`} >
                                <Icon className="addiconbutton" style={{ fontSize: 50 }}>add</Icon>
                            </NavLink>
                        </div>
                    </div>
                </ul>
            </MainNav>
            <div className='row'>
                <UserLinks />
                <div className="common_box">
                    <div className='row'>
                        {doctorData.map((details, i) => {
                            return (
                                <div key={i} className="col-md-4 ">
                                    <div className="cardDiv">
                                        <span className='cardSpan row'>
                                            <i className='icon-user col-md-1 color patientListIcon' />
                                            <span align='left' className='patientName col-md-9'>
                                                <NavLink to="#" className='underLine' onClick={(e) => handleShowProfile(details, e)}>
                                                    Dr.{details.name}
                                                </NavLink>
                                            </span>
                                        </span>
                                        <span className='cardSpan'>
                                            <i className='icon-mobile-1 color patientListIcon' />
                                            <span className='patinetInfo'>{details.mobile}</span>
                                        </span>
                                        <span className='cardSpan '>
                                            <i className='icon-building color patientListIcon' />
                                            <span className='patinetInfo'>{details.address}</span>
                                        </span>
                                        <span className='cardSpan '>
                                            <i className='icon-email color patientListIcon' />
                                            <span className='patinetInfo'> {details.personalEmail}</span>
                                        </span>
                                        <UpgradeSubscription doctorId={details._id} />
                                        <div className='cardSpan appointmentBtn'>
                                            <NavLink onClick={(e) => BookAppointments(details, e)}>
                                                <button className='btn appColor helperBtn'>Book Appointment</button>
                                            </NavLink>
                                            <NavLink onClick={(e) => ViewAppointments(details, e)}>
                                                <button className='btn appColor helperBtn'>View Appointments</button>
                                            </NavLink>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    {doctorData.length > 0 ?
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
            <Outlet />
        </Wrapper >
    )

}