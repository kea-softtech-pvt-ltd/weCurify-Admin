import React from 'react';
import { FetchEducation } from "./Partial/fetchEducation";
import { AddDoctorEducation } from "./Partial/addDoctorEducation";
import { useState } from "react";
import { Link } from '@mui/material'
import { MainButtonInput } from "../../../mainComponent/mainButtonInput";

function DoctorEducation(props) {
    const { doctorId } = props
    const [showEducation, setShowEducation] = useState(true);

    function handleAdd() {
        setShowEducation(!showEducation);
    }

    function handleRecordAdded() {
        setShowEducation(true)
    }

    return (
        <>
            <FetchEducation doctorId={doctorId} />
            <div className="row float-right">
                <div className="my-2 ">
                    <Link to="#" onClick={() => handleAdd()}>
                        <MainButtonInput>Add</MainButtonInput>
                    </Link>
                </div>
                <div className="m-2 ">
                    <MainButtonInput onClick={props.data}>Next</MainButtonInput>
                </div>
            </div>
            <div className='my-5'>
                {showEducation === false ? (
                    <div>
                        <AddDoctorEducation doctorId={doctorId} recordAdded={handleRecordAdded} />
                    </div>
                ) : null}
            </div>
        </>
    )
}
export { DoctorEducation } 