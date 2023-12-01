import { Link, useParams, useHistory } from "react-router-dom";
import { PatientRegistrationForm } from "../patient/patientRegistrationForm";
import { Wrapper } from "../mainComponent/Wrapper";
import { MainNav } from "../mainComponent/mainNav";
import UserLinks from "../doctor/Dashboard-card/partial/uselinks";
import { useRecoilState } from "recoil";
import { setDoctorId } from "../recoil/atom/setDoctorId";
import AuthApi from "../services/AuthApi";
import { useEffect, useState } from "react";

export default function CreatePatientProfile() {
    const history = useHistory()
    const { patientId } = useParams()
    const { getDrInfo } = AuthApi()
    const [DoctorName, setDoctorsName] = useState([])
    const [DoctorId, setDoctorsId] = useRecoilState(setDoctorId)
    const doctorId = DoctorId

    useEffect(() => {
        doctorInfo()
    }, [])

    function handalChange() {
        history.push(`/getLoginPatientProfile/${patientId}`)
    }
    const doctorInfo = () => {
        getDrInfo({ doctorId })
            .then((res) => {
                setDoctorsName(res[0].name)
            })
    }
    return (
        <Wrapper>
            <MainNav>
                <ul className="clearfix">
                    <li>
                        <Link to={`/allpatient`}>
                            <i className="arrow_back backArrow" title="back button"></i>
                        </Link>
                    </li>
                    <li className='float-none' style={{ fontSize: 'inherit' }}>Walkin Patient</li>
                    <li style={{ fontSize: 'inherit' }} className="appColor" align='right'>Dr. {DoctorName}</li>

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