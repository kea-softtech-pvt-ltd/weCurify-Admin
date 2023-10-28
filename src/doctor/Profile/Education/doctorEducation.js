import React from 'react';
import Icon from '@material-ui/core/Icon';
import { FetchEducation } from "./Partial/fetchEducation";
import { AddDoctorEducation } from "./Partial/addDoctorEducation";
import { useState } from "react";
import { Link } from '@material-ui/core';
import { MainButtonInput } from "../../../mainComponent/mainButtonInput";

function DoctorEducation(props) {
    const { doctorId } = props
    const [showEducation, setShowEducation] = useState(false);

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
                    <Link onClick={() => handleAdd()}>
                        <Icon className="addiconbutton " style={{fontSize:150}}>add</Icon>
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