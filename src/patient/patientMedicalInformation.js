import React, { useState } from 'react';
import { AddPatientMedicalInfo } from "../patient/addPatientMedicalInfo";
import { MainButtonInput } from "../mainComponent/mainButtonInput";
import { FetchPatientMedicalInfo } from "../patient/fetchPatientMedicalInfo";

function PatientMedicalInformation(props) {
    const { patientId } = props;
    const [showMedicalInfo, setShowMedicalInfo] = useState(false)

    function handleRecordAdded() {
        setShowMedicalInfo(true)
    }
    return (
        <div className=''>
            {showMedicalInfo === true ?
                <FetchPatientMedicalInfo patientId={patientId} />
                : 
                < AddPatientMedicalInfo patientId={patientId} addMedicalRecord={handleRecordAdded} />
            }

            <div className="text-right  add_top_30">
                <MainButtonInput onClick={props.Medical}>Next</MainButtonInput>
            </div>
        </div>


    )
}
export { PatientMedicalInformation }