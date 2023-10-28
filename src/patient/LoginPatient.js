import { PatientLoginForm } from "../patient/patientLoginForm";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { Wrapper } from "../mainComponent/Wrapper";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { MainNav } from "../mainComponent/mainNav";
import UserLinks from "../doctor/Dashboard-card/partial/uselinks";
import { setDoctorId } from "../recoil/atom/setDoctorId";

export default function LoginPatient() {
    const [DoctorId, setDoctorsId] = useRecoilState(setDoctorId)
    const { doctorId } = useParams()

    useEffect(()=>{
        setDoctorsId(doctorId)
    })

    return (
        <Wrapper>
            <MainNav>
                <ul className="clearfix">
                    <li className='float-none' style={{ fontSize: 'inherit' }}>Add-Patient</li>

                </ul>
            </MainNav>
            <div className='row'>
                <UserLinks/>
                <div className="">
                    <div className="common_box ">
                        <PatientLoginForm doctorId={doctorId} redirection="dashboard" />
                    </div>
                </div>

            </div>
        </Wrapper>
    )
}