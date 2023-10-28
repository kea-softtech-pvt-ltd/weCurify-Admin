import React from 'react';
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { MainInput } from '../mainComponent/mainInput';
import { MainButtonInput } from "../mainComponent/mainButtonInput";
import { setPatientMedical } from "../recoil/atom/setPatientMedical";
import { useRecoilState } from 'recoil';
import PatientApi from '../services/PatientApi';

function AddPatientMedicalInfo(props) {
    const { patientId } = props;
    const [coilPatientMedical, setCoilPatientMedical] = useRecoilState(setPatientMedical)
    const [updateData, setUpdateData] = useState([])
    const [allergy, setAllergy] = useState([])
    const { addPatientMedical } = PatientApi()
    useEffect(() => {
        //getAllergies()
        //register("allergies", { required: true });'
        register("cmedication", { required: true });
        register("pmedication", { required: true });
        register("diseases", { required: true });
        register("injuries", { required: true });
        register("surgeries", { required: true });
    }, [])

    // const getAllergies =()=>{
    //     fetch(`${API}/getAllergies`).then(res =>{
    //         if(res){
    //             return res.json()
    //         }
    //     }).then(jsonRes => {
    //         setAllergy(jsonRes)
    //     });
    // }

    //autoselected
    const [selected, setSelected] = useState([]);
    const isAllSelected = allergy.length > 0 && selected.length == allergy.length;

    const handleOnChange = e => {
        const { name, value } = e.target;
        if (value[value.length - 1] === "all") {
            value = (selected.length === allergy.length ? [] : allergy);
        }
        setSelected(value);
        setUpdateData({ ...updateData, [name]: value });
    }

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
                        {errors.allergies && <span className="validation">Please enter your current allergies</span>}
                    </MainInput>
                    <div align='left' className="patientData"><b>Current Medications</b></div>
                    <MainInput
                        type="text"
                        name="allergies"
                        onChange={handleInputChange}
                        value={updateData.cmedication}
                        placeholder="Current Medications">
                        {errors.cmedication && <span className="validation">Please enter your current medication</span>}
                    </MainInput>

                    <div align='left' className="patientData"><b>Past Medications</b></div>
                    <MainInput
                        type="text"
                        name="pmedication"
                        onChange={handleInputChange}
                        value={updateData.pmedication}
                        placeholder="Past Medications">
                        {errors.pmedication && <span className="validation">Please enter your post medication</span>}
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
                        {errors.diseases && <span className="validation">Please enter your diseases</span>}
                    </MainInput>
                    <div align='left' className="patientData"><b>Injuries</b></div>
                    <MainInput
                        type="text"
                        name="injuries"
                        onChange={handleInputChange}
                        value={updateData.injuries}
                        placeholder="Injuries">
                        {errors.injuries && <span className="validation">Please enter your injuries</span>}
                    </MainInput>

                    <div align='left' className="patientData"><b>Surgeries</b></div>
                    <MainInput
                        type="text"
                        name="surgeries"
                        onChange={handleInputChange}
                        value={updateData.surgeries}
                        placeholder="surgeries">
                        {errors.surgeries && <span className="validation">Please enter your surgeries</span>}
                    </MainInput>
                </div>
            </div>
            <div className="text-center add_top_30">
                <MainButtonInput>Save</MainButtonInput>
            </div>
        </form>
    )
}
export { AddPatientMedicalInfo }