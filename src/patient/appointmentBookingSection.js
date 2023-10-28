import React, { useEffect, useState } from "react";
import { DoctorAppointmentType } from "../patient/doctorAppointmentType";
import { MainAccordion } from "../mainComponent/MainAccordion";
import { FaClinicMedical } from "react-icons/fa";
import AuthApi from "../services/AuthApi";
import { useRecoilState } from "recoil";
import { Link, useParams } from "react-router-dom/cjs/react-router-dom.min";
import UserLinks from "../doctor/Dashboard-card/partial/uselinks";
import { MainNav } from "../mainComponent/mainNav";
import { setHelperData } from "../recoil/atom/setHelperData";
import { Wrapper } from "../mainComponent/Wrapper";
function AppointmentBookingSection() {
    const [clinicData, setClinicData] = useState([])
    const { doctorId } = useParams();
    const [helpersData, setHelpersData] = useRecoilState(setHelperData)
    const [doctorName, setDoctorName] = useState([])
    const { getDrInfo } = AuthApi()

    useEffect(() => {
        doctorData()
    }, [])

    function doctorData() {
        getDrInfo({ doctorId })
            .then((res) => {
                setClinicData(res[0].clinicList)
                setDoctorName(res[0])
            })
    }
    return (
        <Wrapper>
            <MainNav>
                <ul className="clearfix">
                    <li>
                        <Link to={`/doctorlist`}>
                            <i className="arrow_back backArrow" title="back button"></i>
                        </Link>
                    </li>
                    <li className='float-none' style={{ fontSize: 'inherit' }}>Clinic List</li>
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
                    {clinicData.map((clinicItem, id) => (
                        <>
                            <MainAccordion key={id} icon={<FaClinicMedical />} title={clinicItem.clinicName}>
                                <DoctorAppointmentType doctorId={doctorId} clinicData={clinicItem} />
                            </MainAccordion>
                        </>
                    ))}

                    {/* {ownClinicData.map((ownClinicItem, id) => (
                            <MainAccordion key={id} title={ownClinicItem.clinicName}>
                                <DoctorAppointmentType clinicData={ownClinicItem} />
                            </MainAccordion>
                        ))} */}
                </div>

            </div>
            {/* </div> */}
            {/* <Link to={`/doctorbookingwithpatientlogin/${doctorId}`} className="btn_1 full-width">Book Appointment</Link> */}
        </Wrapper>
    )
}
export { AppointmentBookingSection }