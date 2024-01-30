import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { MainInput } from '../mainComponent/mainInput';
import { MainButtonInput } from '../mainComponent/mainButtonInput';
import PatientApi from "../services/PatientApi";

function PatientPersonalInformation(props) {
    const { patientId } = props;
    const [updateData, setUpdateData] = useState([])
    const { insertPatientData, fetchPatient } = PatientApi()

    useEffect(() => {
        getPatientPersonalInfo();
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
        const patientData = {
            name: updateData.name,
            email: updateData.email,
            mobile: updateData.mobile,
            bloodgroup: updateData.bloodgroup,
            maritalstatus: updateData.maritalstatus,
            height: updateData.height,
            weight: updateData.weight,
            gender: updateData.gender,
            age: updateData.age,
            birthdate: updateData.birthdate,
            emcontact: updateData.emcontact,
            address: updateData.address
        }
        insertPatientData(patientId, patientData)
            .then((response) => {
                props.personal();
            })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
                <div className="col-md-6 ">
                    <div className="row">
                        <div className="col-8">
                            <div align='left' className="patientData"><b >Full Name</b></div>
                            <MainInput
                                type="text"
                                value={updateData.name}
                                onChange={handleInputChange}
                                placeholder="Name"
                                name="name" >
                            </MainInput>
                        </div>
                        <div className="col-4">
                            <div className="patientData" align='left'><b>Age</b></div>
                            <MainInput
                                type="text"
                                value={updateData.age}
                                onChange={handleInputChange}
                                placeholder="Age"
                                name="age" >
                            </MainInput>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-8">
                            <div align='left' className="patientData"><b>Email</b></div>
                            <MainInput
                                type="text"
                                value={updateData.email}
                                onChange={handleInputChange}
                                placeholder="EmailId"
                                name="email" >
                            </MainInput>
                        </div>
                        <div className="col-4">
                            <div className="patientData" align='left'><b>Marital status</b></div>
                            <MainInput
                                type="text"
                                value={updateData.maritalstatus}
                                onChange={handleInputChange}
                                placeholder="Single"
                                name="maritalstatus" >
                            </MainInput>
                        </div>

                    </div>
                    <div className="row">
                        <div className="col-6">
                            <div align='left' className="patientData"><b>Gender</b></div>
                            <input
                                className="radio_button"
                                type="radio"
                                value="female"
                                name="gender"
                                onChange={handleInputChange}
                                checked={updateData.gender === 'female' ? true : false}
                            />
                            <span>Female</span>
                            <input
                                className="radio_button"
                                type="radio"
                                value='male'
                                name="gender"
                                checked={updateData.gender === 'male' ? true : false}
                                onChange={handleInputChange}
                            />
                            <span>Male</span>
                            <input
                                className="radio_button"
                                type="radio"
                                value='other'
                                name="gender"
                                checked={updateData.gender === 'other' ? true : false}
                                onChange={handleInputChange}
                            />
                            <span>Other</span>
                        </div>
                        <div className="col-6">
                            <div className="patientData" align='left'><b>Date Of Birth</b></div>
                            <MainInput
                                type="date"
                                name="birthdate"
                                onChange={handleInputChange}
                                value={updateData.birthdate}>
                            </MainInput>
                        </div>
                    </div>
                </div>

                <div className="col-md-6 ">
                    <div className="row">
                        <div className="col-6">
                            <div className="patientData">
                                <div align='left'><b>Mobile No</b></div>
                            </div>
                            <MainInput
                                type="text"
                                onChange={handleInputChange}
                                name="mobile"
                                maxLength={10}
                                value={updateData.mobile}
                                placeholder="9090909090">
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
                            </MainInput>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-4">
                            <div className="patientData">
                                <div align='left'><b>Blood Group</b></div>
                            </div>
                            <MainInput
                                type="text"
                                onChange={handleInputChange}
                                name="bloodgroup"
                                value={updateData.bloodgroup}
                                placeholder="Ex. O+ A B...">
                            </MainInput>
                        </div>
                        <div className="col-4">
                            <div align='left' className="patientData"><b>Height</b></div>
                            <MainInput
                                type="text"
                                name="height"
                                onChange={handleInputChange}
                                value={updateData.height}
                                placeholder="cm">
                            </MainInput>
                        </div>

                        <div className="col-4">
                            <div align='left' className="patientData"><b>Weight</b></div>
                            <MainInput
                                type="text"
                                name="weight"
                                onChange={handleInputChange}
                                value={updateData.weight}
                                placeholder="kg">
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