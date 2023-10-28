import React, { useState } from 'react';
import { AddPatientLifestyleInfo } from "../patient/addPatientLifestyleInfo";
import { MainButtonInput } from '../mainComponent/mainButtonInput';
import { FetchPatientLifestyleData } from "../patient/fetchPatientLifestyleData";
import { useHistory } from 'react-router';

function PatientLifestyle(props) {
    const [showLifeStyleInfo, setShowLifeStyleInfo] = useState(false)
    const { patientId } = props;//destructuring  
    const history = useHistory()
    function addLifestyleRecords() {
        setShowLifeStyleInfo(true)
    }

    function GoToDashboard() {
        history.push(`/patientDashboard/${patientId}`)
    }
    return (
        <>
            {showLifeStyleInfo === true ?
                <AddPatientLifestyleInfo patientId={patientId} addRecords={addLifestyleRecords} />
                : <FetchPatientLifestyleData patientId={patientId} />
            }
            <div className="text-right add_top_30">
                <MainButtonInput onClick={GoToDashboard}>Next</MainButtonInput>
            </div>
        </>
    )
}
export { PatientLifestyle }