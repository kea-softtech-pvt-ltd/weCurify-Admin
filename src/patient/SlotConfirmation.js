import { Link } from "react-router-dom/cjs/react-router-dom";
import UserLinks from "../doctor/Dashboard-card/partial/uselinks";
import { Wrapper } from "../mainComponent/Wrapper";
import { MainNav } from "../mainComponent/mainNav";
import AuthApi from "../services/AuthApi";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { setNewPatientId } from "../recoil/atom/setNewPatientId";
import PatientApi from "../services/PatientApi";
import { setDoctorId } from "../recoil/atom/setDoctorId";
import AppointmentApi from "../services/AppointmentApi";

export default function SlotConfirmation() {
    const { patientAppointmentId } = useParams()
    const { getDrInfo } = AuthApi()
    const { fetchPatient } = PatientApi()
    const [patientId, setPatientId] = useRecoilState(setNewPatientId)
    const [DoctorId, setDoctorsId] = useRecoilState(setDoctorId)
    const doctorId = DoctorId
    const [doctorData, setDoctorData] = useState([])
    const [patientData, setPatientData] = useState([])
    const [AppoinmentData, setAppointmentData] = useState([])
    const { getappointment } = AppointmentApi()
    useEffect(() => {
        doctorInfo()
        patientInfo()
        getAppointmentData()
    }, [])

    const doctorInfo = () => {
        getDrInfo({ doctorId })
            .then((res) => {
                setDoctorData(res[0])
            })
    }

    const patientInfo = () => {
        fetchPatient({ patientId })
            .then((res) => {
                setPatientData(res[0])
            })
    }
    const getAppointmentData = () => {
        getappointment({ patientAppointmentId })
            .then((res) => {
                setAppointmentData(res[0])
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
                    <li className='float-none' style={{ fontSize: 'inherit' }}>Booking Confirmation</li>
                    <li style={{ fontSize: 'inherit' }} className="appColor" align='right'>Dr. {doctorData.name}</li>

                </ul>
            </MainNav>
            <div className='row'>
                <UserLinks />
                <div className="container margin_60">
                    <div className=" patientFetch">
                        <div className="box_general_3">
                            <h1 className='color'>Thank You For Book Your Appoinment</h1>
                            <div className='fontS'>
                                {patientData.name}  Your
                                Appointment booked by
                                Dr. {doctorData.name}
                                <div> On {AppoinmentData.date} At {AppoinmentData.slotTime}</div>
                            </div>
                            <Link  to={`/doctorList`}>
                                <button align='right' className='btn appColor helperBtn'>Done</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </Wrapper>
    )
}