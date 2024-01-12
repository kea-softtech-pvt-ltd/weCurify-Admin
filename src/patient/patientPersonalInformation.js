import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { MainRadioGroup } from "../mainComponent/mainRadioGroup";
import { MainInput } from '../mainComponent/mainInput';
import avatarImage from "../img/profile.png";
import { MainButtonInput } from '../mainComponent/mainButtonInput';
import PatientApi from "../services/PatientApi";

function PatientPersonalInformation(props) {
    const { patientId, onChange } = props;
    const [updateData, setUpdateData] = useState([])
    const { insertPatientData, fetchPatient } = PatientApi()
    useEffect(() => {
        getPatientPersonalInfo();
        register("name", { required: true });
        register("gender", { required: true });
        register("email", { required: true });
        register("age", { required: true });
        register("address", { required: true });
        register("bloodgroup", { required: true });
        register("maritalstatus", { required: true });
        register("height", { required: true });
        register("weight", { required: true });
        register("birthdate", { required: true });
        register("emcontact", { required: true });
        register("address", { required: true });
    }, [])

    function getPatientPersonalInfo() {
        fetchPatient({ patientId })
            .then((jsonRes) => {
                setUpdateData(jsonRes[0])
            });
    }


    const handleInputChange = event => {
        const { name, value } = event.target;
        setUpdateData({ ...updateData, [name]: value });
        setValue(name, value)
    };

    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const onSubmit = data => {
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('email', data.email);
        formData.append('mobile', updateData.mobile);
        formData.append('bloodgroup', data.bloodgroup);
        formData.append('maritalstatus', data.maritalstatus);
        formData.append('height', data.height);
        formData.append('weight', data.weight);
        formData.append('gender', data.gender);
        formData.append('age', data.age);
        formData.append('birthdate', data.birthdate);
        formData.append('emcontact', data.emcontact);
        formData.append('address', data.address);
        insertPatientData(patientId, formData)
            .then((response) => {
                props.personal();
            })
    }

    return (
        <form encType='multipart/form-data' onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
                <div className="col-md-6 ">
                    <div align='left' className="patientData"><b >Full Name</b></div>
                    <MainInput
                        type="text"
                        value={updateData.name}
                        onChange={handleInputChange}
                        placeholder="Name" name="name" >
                        {errors.name && <span className="validation">User Name is Required</span>}
                    </MainInput>
                    <div align='left' className="patientData"><b>Email</b></div>
                    <MainInput
                        type="text"
                        value={updateData.email}
                        onChange={handleInputChange}
                        placeholder="EmailId"
                        name="email" >
                        {errors.email && <span className="validation">Please enter your Email</span>}
                    </MainInput>
                    <div className="row">
                        <div className="col-6">
                            <div align='left' className="patientData"><b>Height</b></div>
                            <MainInput
                                type="text"
                                name="height"
                                onChange={handleInputChange}
                                value={updateData.height}
                                placeholder="cm">
                                {errors.height && <span className="validation">Please enter your height</span>}
                            </MainInput>
                        </div>

                        <div className="col-6">
                            <div align='left' className="patientData"><b>Weight</b></div>
                            <MainInput
                                type="text"
                                name="weight"
                                onChange={handleInputChange}
                                value={updateData.weight}
                                placeholder="kg">
                                {errors.weight && <span className="validation">Please enter your Weight</span>}
                            </MainInput>
                        </div>
                    </div>
                    <div className="col-6">
                        <div align='left' className="patientData"><b>Gender</b></div>
                        <input
                            className="radio_button"
                            type="radio"
                            value={updateData.gender}
                            name="gender"
                            onChange={handleInputChange}
                            checked={updateData.gender === 'female'}
                        />
                        <span>Female</span>
                        <input
                            className="radio_button"
                            type="radio"
                            value={updateData.gender}
                            name="gender"
                            checked={updateData.gender === 'male'}
                            onChange={handleInputChange}
                        />
                        <span>Male</span>
                        <input
                            className="radio_button"
                            type="radio"
                            value={updateData.gender}
                            name="gender"
                            checked={updateData.gender === 'other'}
                            onChange={handleInputChange}
                        />
                        <span>Other</span>
                        {errors.gender && <span className="validation">Please Select your gender</span>}
                    </div>
                </div>

                <div className="col-md-6 ">
                    <div className="row">
                        <div className="col-6">
                            <div className="patientData" align='left'><b>Age</b></div>
                            <MainInput
                                type="text"
                                value={updateData.age}
                                onChange={handleInputChange}
                                placeholder="Age"
                                name="age" >
                                {errors.age && <span className="validation">Please enter your Age</span>}
                            </MainInput>
                        </div>
                        <div className="col-6">
                            <div className="patientData" align='left'><b>Date Of Birth</b></div>
                            <MainInput
                                type="date"
                                name="birthdate"
                                onChange={handleInputChange}
                                value={updateData.birthdate}>
                                {errors.birthdate && <span className="validation">Please enter your BirthDate</span>}
                            </MainInput>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-6">
                            <div className="patientData">
                                <div align='left'><b>Blood Group</b></div>
                            </div>
                            <MainInput
                                type="text"
                                onChange={handleInputChange}
                                name="bloodgroup"
                                value={updateData.bloodgroup}
                                placeholder="Ex. O+ A B...">
                                {errors.bloodgroup && <span className="validation">Please enter your blood group</span>}
                            </MainInput>
                        </div>
                        <div className="col-6">
                            <div align='left' className="patientData"><b>Emergency Contact</b></div>
                            <MainInput
                                type="text"
                                name="emcontact"
                                onChange={handleInputChange}
                                value={updateData.emcontact}
                                maxLength={10}
                                className="form-control"
                                placeholder="Emergency Contact">
                                {errors.emcontact && <span className="validation">Please enter your contact</span>}
                            </MainInput>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12">
                            <div align='left' className="patientData">
                                <b>Address</b>
                            </div>
                            <MainInput
                                value={updateData.address}
                                name="address"
                                onChange={handleInputChange}
                                placeholder="Address">
                            </MainInput>
                        </div>
                    </div>
                </div>
            </div>
            <div align='right' className="text-right add_top_30" >
                <MainButtonInput>Verify & Save</MainButtonInput>
            </div>
        </form>
    )
}
export { PatientPersonalInformation }