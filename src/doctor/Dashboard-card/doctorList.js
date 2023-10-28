import React, { useEffect } from "react";
import { Wrapper } from "../../mainComponent/Wrapper";
import { MainNav } from "../../mainComponent/mainNav";
import UserLinks from "./partial/uselinks";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import AuthApi from "../../services/AuthApi";
import { useState } from "react";
import moment from "moment/moment";
import { Icon } from "@mui/material";
export default function DoctorList() {
    const [doctorData, setDoctorData] = useState([])
    const [filterData, setFilterData] = useState([])
    const { getdoctors } = AuthApi()
    const history = useHistory()

    //For Pagination
    const [activePageNo, setActivePageNo] = useState(1)
    const recordsPerPage = 6;
    const lastIndex = activePageNo * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = doctorData.slice(firstIndex, lastIndex)
    const nPage = Math.ceil(doctorData.length / recordsPerPage)
    const number = [...Array(nPage + 1).keys()].slice(1)
    
    useEffect(() => {
        getDoctorList()
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
    const getDoctorList = () => {
        getdoctors()
            .then((result) => {
                setFilterData(result)
                setDoctorData(result)
            })
    }
    const searchDoctor = (value) => {
        const res = filterData.filter(name => name.name.toLowerCase().includes(value.toLowerCase()))
        setDoctorData(res)
    }
    const handleShowProfile = (details) => {
        history.push(`/doctorProfile/${details._id}`)
    }
    const handleSubscription = (details) => {
        history.push(`/subscriptioncard/${details._id}`)
    }

    return (
        <Wrapper>
            <MainNav>
                <ul className="clearfix">
                    <div className="row">
                        <li className='float-none' style={{ fontSize: 'inherit' }}>Doctor-List</li>
                        <div id="custom-search-input">
                            <input type="text" onChange={(e) => searchDoctor(e.target.value)} className=" search-query" placeholder="Search Doctor" />
                            <input type="submit" className="btn_search" value="Search" />
                        </div>
                        <div className="mx-2 mt-2">
                            <Link to={`/addnewdoctor`}>
                                <Icon className="addiconbutton " style={{ fontSize: 50 }}>add</Icon>
                            </Link>
                        </div>
                    </div>
                </ul>
            </MainNav>
            <div className='row'>
                <UserLinks />
                <div className="common_box">
                    <div className='row'>
                        {records.map((details, i) => {
                            return (
                                <>
                                    <div key={i} className="col-md-4 ">
                                        <div className="cardDiv">
                                            <span className='cardSpan row'>
                                                <i className='icon-user col-md-1 color patientListIcon' />
                                                <span align='left' className='patientName col-md-9'>Dr.{details.name}</span>
                                                <span className='col-md-1'>
                                                    <Link to="#" onClick={() => handleShowProfile(details)}>
                                                        <i className="icon-eye  eye-icon " />
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
                                            <span className='cardSpan '>
                                                <i className="pe-7s-date timeLink color patientListIcon" />
                                                <Link className='' onClick={() => handleSubscription(details)} >
                                                    <span className='pl-1 patinetInfo'>
                                                        {moment(new Date(details.subscription[0].registerDate)).format('YYYY-MM-DD')}
                                                    </span>
                                                    <span className="pl-1"> {"(" + details.subscription[0].selected_plan + ")"}</span>
                                                    <span className="greenColor "> Upgrade </span>
                                                </Link>
                                            </span>

                                            <div className='cardSpan appointmentBtn'>
                                                <Link to={`/loginpatient/${details._id}`} >
                                                    <button className='btn appColor helperBtn'>Book Appoinment</button>
                                                </Link>
                                                <Link to={`/patientappointment/${details._id}`}>
                                                    <button className='btn appColor helperBtn'>Appoinment</button>
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
                        : <div className="clinicHistory" ><b>Doctor is not Available</b></div>}
                </div >
            </div>
        </Wrapper>
    )

}