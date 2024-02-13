import { useEffect, useState } from "react";
import PatientApi from "../services/PatientApi";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function FetchPatientInfo(props) {
    const { patientId, doctorId } = props;
    const [fetchPatientData, setFetchPatientData] = useState([])
    const { fetchPatient } = PatientApi()
    useEffect(() => {
        getAllPatientData()
    }, [])

    function getAllPatientData() {
        fetchPatient({ patientId })
            .then(function (response) {
                setFetchPatientData(response[0])
            })
    }

    return (
        <>
            <div className="underline">
                <div className="form_title">
                    <h3>Patient Details</h3>
                </div>
            </div>
            <div className="patientDataStyle">
                <div className="">
                    <label className="mx-2"><b>Patient name :</b></label>
                    {fetchPatientData.name}
                </div>
                <div className="">
                    <label className="mx-2"><b>Age :</b></label>
                    {fetchPatientData.age}
                </div>
                <div className="">
                    <label className="mx-2"><b>Gender :</b></label>
                    {fetchPatientData.gender}
                </div>
                <div className="">
                    <label className="mx-2"><b>Email :</b></label>
                    {fetchPatientData.email}
                </div>
                <div align='right'>
                    <div className="radius appColor buttonPatient" align='center'>
                        <Link to={`/appointmentbookingsection/${patientId}`} className="btn">
                            <span className=" appColor">Book Appointment</span>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}
export { FetchPatientInfo }