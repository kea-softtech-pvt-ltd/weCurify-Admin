import React, { useEffect } from "react";
import { Wrapper } from "../../mainComponent/Wrapper";
import { MainNav } from "../../mainComponent/mainNav";
import UserLinks from "./partial/uselinks";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import PatientApi from "../../services/PatientApi";

export default function Dependent() {
    const { patientId } = useParams()
    const [dependentData, setDependentData] = useState([])
    const [mobileNo, setMobileNo] = useState([])
    const { fetchPatient } = PatientApi()

    useEffect(() => {
        getPatient()
    }, [])

    const getPatient = () => {
        fetchPatient({ patientId })
            .then((res) => {
                setMobileNo(res[0].mobile)
                setDependentData(res[0]['dependent'])
            })
    }

    return (
        <Wrapper>
            <MainNav>
                <ul className="clearfix">
                    <div className="row">
                        <li>
                            <Link to={`/allpatient`}>
                                <i className="arrow_back backArrow " title="back button"></i>
                            </Link>
                        </li>
                        <li className='float-none margin-top' style={{ fontSize: 'inherit' }}>Dependent-List</li>
                    </div>
                </ul>
            </MainNav>
            <div className='row'>
                <UserLinks />
                {dependentData ?
                    <div className="common_box">
                        <div className='row'>
                            {dependentData.map((details, i) => {
                                return (
                                    <>
                                        <div key={i} className="col-md-4 ">
                                            < div className="cardDiv" >
                                                <span className='cardSpan '>
                                                    <i className='icon-user color patientListIcon' />
                                                    <span className='patientName'>{details.name}</span>
                                                </span>
                                                <span className='cardSpan'>
                                                    <i className='icon-mobile-1 color patientListIcon' />
                                                    <span className='patinetInfo'>{mobileNo}</span>
                                                </span>
                                                <span className='cardSpan '>
                                                    <i className='icon-email color patientListIcon' />
                                                    <span className='patinetInfo'>{details.email}</span>
                                                </span>
                                            </div>
                                        </div >
                                    </>
                                )
                            })}
                        </div>
                    </div >
                    : null}
            </div >
        </Wrapper >
    )

}