import React, { useEffect, useState } from "react";
import { DoctorAppointmentType } from "../patient/doctorAppointmentType";
import { MainAccordion } from "../mainComponent/MainAccordion";
import { FaClinicMedical } from "react-icons/fa";
import AuthApi from "../services/AuthApi";
import { setDoctorId } from "../recoil/atom/setDoctorId";
import { useRecoilState } from "recoil";
import { Link , useParams} from "react-router-dom/cjs/react-router-dom.min";
import UserLinks from "../doctor/Dashboard-card/partial/uselinks";
import { MainNav } from "../mainComponent/mainNav";
import { setHelperData } from "../recoil/atom/setHelperData";
import { Wrapper } from "../mainComponent/Wrapper";
// import { useParams } from "react-router-dom/cjs/react-router-dom";
function AppointmentBookingSection() {
    const { patientId } = useParams()
    const [doctorId, setDoctorsId] = useRecoilState(setDoctorId)
    const [clinicData, setClinicData] = useState([])
    const [helpersData, setHelpersData] = useRecoilState(setHelperData)
    const [doctorName, setDoctorName] = useState([])
    const { getDrInfo } = AuthApi()

    useEffect(() => {
        doctorData()
    }, [])

    function doctorData() {
        getDrInfo({ doctorId })
            .then((res) => {
                setDoctorName(res.result[0])
                setClinicData(res.result[0].clinicList)
            })
    }
    return (
        <Wrapper>
            <MainNav>
                <ul className="clearfix">
                    <li>
                        <Link to={`/getLoginPatientProfile/${patientId}`}>
                            <i className="arrow_back backArrow" title="back button"></i>
                        </Link>
                    </li>
                    <li className='float-none' style={{ fontSize: 'inherit' }}>Clinic List  </li>
                    <li style={{ fontSize: 'inherit' }} className="appColor" align='right'>Dr. {doctorName.name}</li>

                </ul>
            </MainNav>
            <div className='row'>
                <UserLinks
                    doctorId={doctorId}
                    helperId={helpersData._id}
                    accessModule={helpersData.access_module}
                />
                <div className="white-box booking">
                    <div>
                        {clinicData.map((clinicItem, id) => (
                            <MainAccordion key={id} icon={<FaClinicMedical />} title={clinicItem.clinicName}>
                                <DoctorAppointmentType  clinicData={clinicItem} doctorId={doctorId} />
                            </MainAccordion>
                        ))}
                    </div>
                </div>
            </div>
        </Wrapper>
    )
}
export { AppointmentBookingSection }