import React, { useEffect } from "react";
import { Wrapper } from "../../mainComponent/Wrapper";
import { MainNav } from "../../mainComponent/mainNav";
import UserLinks from "./partial/uselinks";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useState } from "react";
import PatientApi from "../../services/PatientApi";

export default function AllPatients() {
    const [patientData, setPatientData] = useState([])
    const [filterData, setFilterData] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0);
    const { getAllPatient } = PatientApi()
    const history = useHistory()

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

    const totalPagesCalculator = () => {
        const pages = [];
        for (let x = 1; x <= totalPages; x++) {
            pages.push(x)
        }
        return pages
    }

    const handlePrevPage = () => {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage !== totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handleShowProfile = (details) => {
        history.push(`/patientprofile/${details._id}`)
    }


    return (
        <Wrapper>
            <MainNav>
                <ul className="clearfix">
                    <div className="row">
                        <li className='float-none' style={{ fontSize: 'inherit' }}>Patient-List</li>
                        <div id="custom-search-input">
                            <input type="text" onChange={(e) => searchPatient(e.target.value)} className="search-query" placeholder="Search Doctor" />
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
                                                <Link to="#" onClick={() => handleShowProfile(details)}>
                                                    <button className="btn appColor helperBtn ">View Profile</button>
                                                </Link>
                                                <Link to={`/patienthistory/${details._id}`} >
                                                    <button className='btn appColor helperBtn'>Appoinment Details</button>
                                                </Link>

                                            </div>
                                        </div>
                                    </div>
                                </>
                            )
                        })}
                    </div>
                    {patientData.length > 0 ?
                        <ul className="pagination pagination-sm">
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
                                    disabled={patientData === null}>
                                    Next
                                </Link>
                            </li>

                        </ul>
                        :  <div className="clinicHistory" ><b>Data is Not Available</b></div>}
                </div >
            </div>
        </Wrapper>
    )

}