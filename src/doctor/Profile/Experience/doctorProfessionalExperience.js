import React from 'react';
import { useState } from "react";
import { FetchExperience } from "./Partial/fetchExperience";
import { AddDoctorProfessionalExperience } from "./Partial/addDoctorProfessionalExperience";
import { Link } from '@material-ui/core';
import { MainButtonInput } from "../../../mainComponent/mainButtonInput";

function DoctorProfessionalExperience(props) {
    const { doctorId } = props
    const [showExperience, setShowExperience] = useState(true);
    function handleAdd() {
        setShowExperience(!showExperience)
    }

    function handleRecordAdded() {
        setShowExperience(true)
    }

    return (
        <>
            <FetchExperience doctorId={doctorId} />
            <div className="row float-right">
                <div className="my-2 ">
                    <Link to="#" onClick={() => handleAdd()}>
                        <MainButtonInput>Add</MainButtonInput>
                    </Link>
                </div>
                <div className="m-2">
                    <MainButtonInput onClick={props.data}>Next</MainButtonInput>
                </div>
            </div>
            <div className='my-5'>
                {showExperience === false ? (
                    <div>
                        <AddDoctorProfessionalExperience doctorId={doctorId} addRecords={handleRecordAdded} />
                    </div>
                ) : null
                }
            </div>
        </>
    )
}
export { DoctorProfessionalExperience }