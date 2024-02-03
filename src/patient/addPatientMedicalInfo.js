import React from 'react';
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { MainInput } from '../mainComponent/mainInput';
import { MainButtonInput } from "../mainComponent/mainButtonInput";
import { setPatientMedical } from "../recoil/atom/setPatientMedical";
import { useRecoilState } from 'recoil';
import PatientApi from '../services/PatientApi';
import Toaster from '../doctor/Toaster';
import "react-toastify/dist/ReactToastify.css";
import { toast } from 'react-toastify';

function AddPatientMedicalInfo(props) {
    const { patientId } = props;
    const [coilPatientMedical, setCoilPatientMedical] = useRecoilState(setPatientMedical)
    const [updateData, setUpdateData] = useState([])
    const { addPatientMedical } = PatientApi()

    const handleInputChange = event => {
        const { name, value } = event.target;
        setUpdateData({ ...updateData, [name]: value });
        setValue(name, value)
    };

    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const onSubmit = (data) => {
        const patientData = {
            patientId: patientId,
            allergies: data.allergies,
            cmedication: data.cmedication,
            pmedication: data.pmedication,
            diseases: data.diseases,
            injuries: data.injuries,
            surgeries: data.surgeries
        }
        addPatientMedical(patientData)
            .then((response) => {
                setCoilPatientMedical(coilPatientMedical.concat(response))
                props.addMedicalRecord()
            })
            toast.success("Saved Successfully!")
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
                <div className="col-md-6 ">
                    <div align='left' className="patientData"><b>Allergies</b></div>
                    <MainInput
                        type="text"
                        name="allergies"
                        onChange={handleInputChange}
                        value={updateData.allergies}
                        placeholder="Allergies">
                    </MainInput>
                    <div align='left' className="patientData"><b>Current Medications</b></div>
                    <MainInput
                        type="text"
                        name="cmedication"
                        onChange={handleInputChange}
                        value={updateData.cmedication}
                        placeholder="Current Medications">
                    </MainInput>
                    <div align='left' className="patientData"><b>Past Medications</b></div>
                    <MainInput
                        type="text"
                        name="pmedication"
                        onChange={handleInputChange}
                        value={updateData.pmedication}
                        placeholder="Past Medications">
                    </MainInput>
                </div>

                <div className="col-md-6 ">
                    <div align='left' className="patientData"><b>Chronic diseases</b></div>
                    <MainInput
                        type="text"
                        name="diseases"
                        onChange={handleInputChange}
                        value={updateData.diseases}
                        placeholder="Chronic diseases">
                    </MainInput>
                    <div align='left' className="patientData"><b>Injuries</b></div>
                    <MainInput
                        type="text"
                        name="injuries"
                        onChange={handleInputChange}
                        value={updateData.injuries}
                        placeholder="Injuries">
                    </MainInput>

                    <div align='left' className="patientData"><b>Surgeries</b></div>
                    <MainInput
                        type="text"
                        name="surgeries"
                        onChange={handleInputChange}
                        value={updateData.surgeries}
                        placeholder="surgeries">
                    </MainInput>
                </div>
            </div>
            <div className="text-center add_top_30">
                <MainButtonInput>Save</MainButtonInput>
            </div>
            <div className="row float-right toaster">
                <Toaster />
            </div>
        </form>
    )
}
export { AddPatientMedicalInfo }