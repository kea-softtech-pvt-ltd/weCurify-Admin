import React, { useState } from 'react';
import { AddPatientLifestyleInfo } from "../patient/addPatientLifestyleInfo";
import { FetchPatientLifestyleData } from "../patient/fetchPatientLifestyleData";

function PatientLifestyle(props) {
    const [showLifeStyleInfo, setShowLifeStyleInfo] = useState(false)
    const { patientId } = props;//destructuring  
    
    function addLifestyleRecords() {
        setShowLifeStyleInfo(true)
    }
    return (
        <>
            {showLifeStyleInfo === true ?
                <FetchPatientLifestyleData patientId={patientId} />
                :
                <AddPatientLifestyleInfo patientId={patientId} addRecords={addLifestyleRecords} />
            }
        </>
    )
}
export { PatientLifestyle }