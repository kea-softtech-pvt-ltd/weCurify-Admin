import React, { useEffect, useState } from "react";
import { PatientLoginForm } from "../patient/patientLoginForm";
import { Wrapper } from "../mainComponent/Wrapper";
import { Link, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { MainNav } from "../mainComponent/mainNav";
import UserLinks from "../doctor/Dashboard-card/partial/uselinks";
import AuthApi from "../services/AuthApi";
import { useRecoilState } from "recoil";
import { setDoctorId } from "../recoil/atom/setDoctorId";

export default function LoginPatient() {
    const [DoctorName, setDoctorsName] = useState([])
    const [DoctorId, setDoctorsId] = useRecoilState(setDoctorId)
    console.log('======================',DoctorId)
    const { doctorId } = useParams()
    const { getDrInfo } = AuthApi()

    useEffect(() => {
        doctorInfo()
    }, [])
    const doctorInfo = () => {
        setDoctorsId(doctorId)
        getDrInfo({ doctorId })
            .then((res) => {
                setDoctorsName(res.result[0].name)
            })
    }
    return (
        <Wrapper>
            <MainNav>
                <ul className="clearfix">
                    <li>
                        <Link to={`/doctorList`}>
                            <i className="arrow_back backArrow" title="back button"></i>
                        </Link>
                    </li>
                    <li className='float-none' style={{ fontSize: 'inherit' }}>Add-Patient</li>
                    <li style={{ fontSize: 'inherit' }} className="appColor" align='right'>Dr. {DoctorName}</li>
                </ul>
            </MainNav>
            <div className='row'>
                <UserLinks />
                <div className="">
                    <div className="common_box ">
                        <PatientLoginForm doctorId={doctorId} redirection="dashboard" />
                    </div>
                </div>

            </div>
        </Wrapper>
    )
}