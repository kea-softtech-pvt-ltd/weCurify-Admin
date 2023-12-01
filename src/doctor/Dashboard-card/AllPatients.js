import React, { useEffect } from "react";
import { Wrapper } from "../../mainComponent/Wrapper";
import { MainNav } from "../../mainComponent/mainNav";
import UserLinks from "./partial/uselinks";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useState } from "react";
import PatientApi from "../../services/PatientApi";
export default function AllPatients() {
    const [patientData, setPatientData] = useState([])
    const { getAllPatient } = PatientApi()
    const history = useHistory()

    //For Pagination
    const [activePageNo, setActivePageNo] = useState(1)
    const recordsPerPage = 6;
    const lastIndex = activePageNo * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = patientData.slice(firstIndex, lastIndex)
    const nPage = Math.ceil(patientData.length / recordsPerPage)
    const number = [...Array(nPage + 1).keys()].slice(1)


    useEffect(() => {
        getPatientList()
    }, [])

    //For Pagination
    function prePage() {
        if (activePageNo !== 1) {
            setActivePageNo(activePageNo - 1)
        }
    }
    function changeCPage(id) {
        setActivePageNo(id)
    }
    function nextPage() {
        if (activePageNo !== nPage) {
            setActivePageNo(activePageNo + 1)

        }
    }
    const getPatientList = () => {
        getAllPatient()
            .then((res) => {
                setPatientData(res)
            })
    }
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
                <UserLinks/>
                <div className="common_box">
                    <div className='row'>
                        {records.map((details, i) => {
                            return (
                                <>
                                    <div className="col-md-4 ">
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
                    {records.length > 0 ?
                        <nav aria-label="" className="add_top_20">
                            <ul className="pagination pagination-sm">
                                <li className="page-item">
                                    <Link className="page-link"
                                        to="#" onClick={prePage}>
                                        Previous
                                    </Link>
                                </li>
                                {
                                    number.map((n, i) => {
                                        return (
                                            <li className={`page-item ${activePageNo === n ? 'active' : ""}`} key={i}>
                                                <Link className="page-link"
                                                    to="#" onClick={() => changeCPage(n)}>
                                                    {n}</Link>
                                            </li>
                                        )
                                    })
                                }
                                <li className="page-item">
                                    <Link className="page-link"
                                        to="#" onClick={nextPage}>
                                        Next
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                        : <div className="clinicHistory" ><b>Loading...</b></div>}

                </div >
            </div>
        </Wrapper>
    )

}