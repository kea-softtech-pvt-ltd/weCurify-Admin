import { useParams,Link } from "react-router-dom";
import { FetchPatientInfo } from "./fetchPatientInfo";
import { Wrapper } from "../mainComponent/Wrapper";
import UserLinks from "../doctor/Dashboard-card/partial/uselinks";
import { useRecoilState } from "recoil";
import { MainNav } from "../mainComponent/mainNav";
import { setDoctorId } from "../recoil/atom/setDoctorId";
import { useEffect, useState } from "react";
import AuthApi from "../services/AuthApi";
import GetDependent from "./getDependent";
export default function GetLoginPatientProfile() {
    const { patientId } = useParams()
    const { getDrInfo } = AuthApi()
    const [DoctorName, setDoctorsName] = useState([])
    const [DoctorId, setDoctorsId] = useRecoilState(setDoctorId)
    const doctorId = DoctorId

    useEffect(() => {
        doctorInfo()
    }, [])
    
    const doctorInfo = () => {
        getDrInfo({ doctorId })
            .then((res) => {
                setDoctorsName(res.result[0].name)
            })
    }
    return (
        <>
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
                    <UserLinks/>
                    <div className="container common_box margin_60">
                        <div className="row">
                            <div className="col-sm-6">
                                <div className="box_general_4 cart patientDetails">
                                    <FetchPatientInfo  doctorId={doctorId}  patientId={patientId} />
                                </div>
                            </div>
                            <GetDependent doctorId={doctorId} patientId={patientId} />
                        </div>
                    </div>
                </div>
        </Wrapper >
        </>
    )
}