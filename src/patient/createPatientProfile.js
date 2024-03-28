import { Link, useParams, useNavigate } from "react-router-dom";
import { PatientRegistrationForm } from "../patient/patientRegistrationForm";
import { Wrapper } from "../mainComponent/Wrapper";
import { MainNav } from "../mainComponent/mainNav";
import UserLinks from "../doctor/Dashboard-card/partial/uselinks";
import { useRecoilState } from "recoil";
import { setDoctorId } from "../recoil/atom/setDoctorId";
import AuthApi from "../services/AuthApi";
import { useEffect, useState } from "react";

export default function CreatePatientProfile() {
    const navigate = useNavigate()
    const { patientId } = useParams()
    const { getDrInfo } = AuthApi()
    const [doctorName, setDoctorsName] = useState([])
    const [doctorId, setDoctorsId] = useRecoilState(setDoctorId)

    useEffect(() => {
        doctorInfo()
    }, [])

    function handalChange() {
        navigate(`/doctors/patient/${doctorId}/patientprofile/${patientId}`)
    }
    const doctorInfo = () => {
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
                        <Link to={`/doctors`}>
                            <i className="arrow_back backArrow" title="back button"></i>
                        </Link>
                    </li>
                    <li className='float-none' style={{ fontSize: 'inherit' }}>Walkin Patient</li>
                    <li style={{ fontSize: 'inherit' }} className="appColor" align='right'>Dr. {doctorName}</li>

                </ul>
            </MainNav>
            <div className='row'>
                <UserLinks />
                <div className="container margin_60">
                    <div className="patientFetch">
                        <div className="Form-data">
                            <div className="box_general_3">
                                <PatientRegistrationForm patientId={patientId} handalChange={handalChange} />
                            </div>
                        </div>
                        {/* <DoctorBookingConfirmation doctorId={doctorId} /> */}
                    </div>
                </div>
            </div>
        </Wrapper>
    )
}