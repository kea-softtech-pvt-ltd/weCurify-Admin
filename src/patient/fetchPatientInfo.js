import { useEffect, useState } from "react";
import PatientApi from "../services/PatientApi";

function FetchPatientInfo(props) {
    const { patientId } = props;
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
            <div className="getPatientData">
                <div className="row">
                    <div className="col-md-6">
                        <div className="getPatientData">
                            <label className="mx-2"><b>Patient name :</b></label>
                            {fetchPatientData.name}
                        </div>
                        <div className="getPatientData">
                            <label className="mx-2"><b>Age :</b></label>
                            {fetchPatientData.age}
                        </div>
                        <div className="getPatientData">
                            <label className="mx-2"><b>Gender :</b></label>
                            {fetchPatientData.gender}
                        </div>
                        <div className="getPatientData">
                            <label className="mx-2"><b>Email :</b></label>
                            {fetchPatientData.email}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export { FetchPatientInfo }