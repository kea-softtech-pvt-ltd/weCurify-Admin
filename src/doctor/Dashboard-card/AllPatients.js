import React, { useEffect } from "react";
import { Wrapper } from "../../mainComponent/Wrapper";
import { MainNav } from "../../mainComponent/mainNav";
import UserLinks from "./partial/uselinks";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useState } from "react";
import PatientApi from "../../services/PatientApi";
export default function AllPatients() {
    const [patientData, setPatientData] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0);
    const { getAllPatient } = PatientApi()
    const history = useHistory()

    useEffect(() => {
        getPatientList(currentPage)
    }, [currentPage])

    const getPatientList = () => {
        const pageSize = 6;
        getAllPatient(currentPage, pageSize)
            .then((res) => {
                setPatientData(res.patientList)
                setTotalPages(totalPages)
            })
    }

    const handlePrevPage = () => {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1);
        }
    };
    function changeCPage() {
        setCurrentPage(currentPage * totalPages)
    }
    const handleNextPage = () => {
        if (currentPage !== totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };
    
    const handleShowProfile = (details) => {
        history.push(`/patientprofile/${details._id}`)
    }
    const handleSubscription = (details) => {
        history.push(`/subscriptioncard/${details._id}`)
    }

    return (
        <Wrapper>
            <MainNav>
                <ul className="clearfix">
                    <li className='float-none' style={{ fontSize: 'inherit' }}>Patient-List</li>
                    {/* <li>
                        <Link to={`/loginpatient`} >
                            <Icon className="addiconbutton" style={{ fontSize: 50 }}>add</Icon>
                        </Link>
                    </li> */}
                </ul>
            </MainNav>
            <div className='row'>
                <UserLinks />
                <div className="common_box">

                    <div className='row'>
                        {patientData.map((details, i) => {
                            return (
                                <>
                                    <div className="col-md-4 " key={i}>
                                        <div className="cardDiv">
                                            <span className='cardSpan '>
                                                <i className='icon-user color patientListIcon' />
                                                <span className='patientName'>{details.name}</span>
                                            </span>
                                            <span className='cardSpan'>
                                                <i className='icon-mobile-1 color patientListIcon' />
                                                <span className='patinetInfo'>{details.mobile}</span>
                                            </span>
                                            {/* <span className='cardSpan '>
                                                <i className='icon-hospital-1 color patientListIcon' />
                                                <span className='patinetInfo'>{details.address}</span>
                                            </span> */}
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

                    <ul className="pagination pagination-sm">
                        <li className="page-item">
                            <Link className="page-link"
                                to="#" onClick={handlePrevPage}
                                disabled={currentPage === 1}
                            >
                                Previous
                            </Link>
                        </li>

                        <li className='page-item '>
                            <Link className="page-link"
                                to="#" onClick={() => changeCPage()}>
                                {currentPage}
                            </Link>
                        </li>

                        <li className="page-item">
                            <Link className="page-link"
                                to="#" onClick={handleNextPage}
                                disabled={patientData === null}>
                                Next
                            </Link>
                        </li>

                    </ul>
                </div >
            </div>
        </Wrapper>
    )

}