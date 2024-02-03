import React, { useEffect } from "react";
import { Wrapper } from "../../mainComponent/Wrapper";
import { MainNav } from "../../mainComponent/mainNav";
import UserLinks from "./partial/uselinks";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import AuthApi from "../../services/AuthApi";
import { useState } from "react";
import { Icon } from "@mui/material";
import UpgradeSubscription from "./partial/upgradeSubscription";

export default function DoctorList() {
    const [doctorData, setDoctorData] = useState([])
    const [filterData, setFilterData] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0);
    const { getdoctors } = AuthApi()
    const history = useHistory()

    useEffect(() => {
        getDoctorList(currentPage)
    }, [currentPage])

    const pageSize = 6;
    const getDoctorList = () => {
        getdoctors(currentPage, pageSize)
            .then((result) => {
                setFilterData(result.doctorList)
                setDoctorData(result.doctorList)
                setTotalPages(result.doctorListPages)
            })
    }
    const searchDoctor = (value) => {
        const res = filterData.filter(name => name.name.toLowerCase().includes(value.toLowerCase()))
        setDoctorData(res)
    }
    const handleShowProfile = (details) => {
        history.push(`/doctorProfile/${details._id}`)
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
        <Wrapper>
            <MainNav>
                <ul className="clearfix">
                    <div className="row">
                        <li className='float-none' style={{ fontSize: 'inherit' }}>Doctor-List</li>
                        <div id="custom-search-input">
                            <input type="text" onChange={(e) => searchDoctor(e.target.value)} className="search-query" placeholder="Search Doctor" />
                            <input type="submit" className="btn_search" value="Search" />
                        </div>
                        <div className="mx-2 mt-2">
                            <Link to={`/addnewdoctor`}>
                                <Icon className="addiconbutton" style={{ fontSize: 50 }}>add</Icon>
                            </Link>
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
                                                <Link to="#" className='underLine' onClick={() => handleShowProfile(details)}>
                                                    Dr.{details.name}
                                                </Link>
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
                                            <Link to={`/loginpatient/${details._id}`} >
                                                <button className='btn appColor helperBtn'>Book Appoinment</button>
                                            </Link>
                                            <Link to={`/patientappointment/${details._id}`}>
                                                <button className='btn appColor helperBtn'>View Appoinments</button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    {doctorData.length > 0 ?
                        <ul className="pagination pagination-sm">
                            <li className="page-item">
                                <Link className="page-link"
                                    to="#" onClick={handlePrevPage}
                                    disabled={currentPage === 1}>
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
                        : <div className="clinicHistory" ><b>Data is Not Available</b></div>}
                </div >
            </div>
        </Wrapper >
    )

}