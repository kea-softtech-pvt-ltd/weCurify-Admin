import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import React from 'react';
import avatarImage from '../../../img/profile.png'
import { MainButtonInput } from "../../../mainComponent/mainButtonInput";
import { MainInput } from '../../../mainComponent/mainInput';
import { PlacesAutocompleteInput } from "../Clinic/Partial/placesAutocomplete"
import { MainRadioGroup } from "../../../mainComponent/mainRadioGroup";
import AuthApi from "../../../services/AuthApi";
import uuid from "uuid";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import Toaster from "../../Toaster";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

function DoctorPersonalInformation(props) {
    const { data, doctorId } = props;
    const [updateData, setUpdateData] = useState([]);
    const [radioData, setRadioData] = useState('');
    console.log('=====radioData', radioData)
    const {
        addDoctorInformation,
        submitDoctorInformation
    } = AuthApi();

    function handleChangeAddress(address) {
        setUpdateData(prevInput => {
            return {
                ...prevInput,
                ['address']: address
            }
        })
        setValue("address", address)
    }

    //for all input onchange method
    const handleInputChange = event => {
        const { name, value } = event.target;
        setUpdateData({ ...updateData, [name]: value });
        setValue(name, value)
    };

    const handleInputRadio = (e) => {
        setRadioData(e.target.value)
    }
    useEffect(() => {
        register("name", { required: true });
        register("gender", { required: true });
        register("personalEmail", { required: true });
        register("address", { required: true });
        addDrInfo()
    }, [])

    const addDrInfo = () => {
        addDoctorInformation({ doctorId })
            .then(jsonRes => {
                console.log('=jsonRes', jsonRes)
                setUpdateData(jsonRes)
            });

    }
    async function uploadImageAsync(uri) {
        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                resolve(xhr.response);
            };
            xhr.onerror = function (e) {
                console.log(e);
                reject(new TypeError("Network request failed"));
            };
            xhr.responseType = "blob";
            xhr.open("GET", uri, true);
            xhr.send(null);
        });
        const fileRef = ref(getStorage(), uuid.v4());
        const result = await uploadBytes(fileRef, blob);
        return await getDownloadURL(fileRef);
    }
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const onSubmit = async (data) => {
        const resultUrl = await uploadImageAsync(updateData.photo)
        const bodyData = {
            photo: resultUrl,
            name: updateData.name,
            gender: radioData,
            personalEmail: updateData.personalEmail,
            address: updateData.address,
            isSubscribed: true
        }
        console.log('===bodyData', bodyData)
        submitDoctorInformation({ doctorId, bodyData })
            .then(() => {
            })
        toast.success("Saved Successfully!")

    }

    return (
        <form encType='multipart/form-data' onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
                <div className="col-md-6 ">
                    <div className="row mb-10">
                        <div className="col-md-5">
                            <div className="doctorphoto">
                                {updateData.photo ?
                                    <img
                                        src={updateData.photo}
                                        className="doctorphotoStyle"
                                        alt="doctorPhoto"
                                    />
                                    : <img
                                        src={avatarImage}
                                        alt="doctorPhoto"
                                        className="doctorphotoStyle"
                                    />
                                }
                            </div>
                        </div>
                        <div className="col-md-7">
                            <div className="text-left">
                                <label><b>Doctor photo</b></label>
                                <MainInput
                                    type="file"
                                    accept=".png, .jpg, .jpeg"
                                    onChange={(e) => {
                                        console.log(e)
                                        setUpdateData({ ...updateData, ['photo']: URL.createObjectURL(e.target.files[0]) })
                                    }}
                                    name="photo">
                                </MainInput>
                            </div>
                        </div>
                    </div>
                    <div className="text-left">
                        <label><b>Gender *</b></label>
                    </div>
                    <div className="col-6 radioButton">
                        <input
                            className="radio_button"
                            type="radio"
                            value="female"
                            name="gender"
                            onChange={handleInputRadio}
                            // checked={radioData === 'female'}
                        />
                        <span>Female</span>
                        <input
                            className="radio_button"
                            type="radio"
                            value="male"
                            name="gender"
                            checked={radioData === 'male'}
                            onChange={handleInputRadio}
                        />
                        <span>Male</span>
                        <input
                            className="radio_button"
                            type="radio"
                            value='other'
                            name="gender"
                            checked={radioData === 'other'}
                            onChange={handleInputRadio}
                        />
                        <span>Other</span>
                        {/* {errors.gender !== "" ? errors.gender && <span className="validation">Please Select your gender</span> : null} */}
                    </div>
                </div>
                <div className="col-md-5">
                    <div className="text-left">
                        <label><b>Full Name *</b></label>
                    </div>
                    <MainInput
                        name="name"
                        value={updateData.name}
                        onChange={handleInputChange}
                        placeholder="Name">
                        {/* { errors.name && <span className="validation">User Name is Required</span> } */}
                    </MainInput>
                    <div className="text-left">
                        <label><b>Personal EmailId *</b></label>
                    </div>
                    <MainInput
                        type="email"
                        value={updateData.personalEmail}
                        name="personalEmail"
                        onChange={handleInputChange}
                        placeholder="Personal EmailId">
                        {/* { errors.personalEmail && <span className="validation"> Email is Required</span> } */}
                    </MainInput>
                    <div align='left'>
                        <PlacesAutocompleteInput
                            name='address'
                            value={updateData.address}
                            onChange={handleChangeAddress}>
                            <label ><b>City & Area *</b></label>
                        </PlacesAutocompleteInput>
                    </div>
                    {/* { errors.address && <span className="validation">Location is Required</span>} */}
                </div>
            </div>
            <div className="row float-right">
                <div className="text-left m-2 add_top_30">
                    <MainButtonInput onClick={onSubmit}> Save</MainButtonInput>
                </div>
                <div className="text-left m-2 add_top_30">
                    <MainButtonInput onClick={data}>Next</MainButtonInput>
                </div>
                <Toaster />
            </div>
        </form>
    )
}
export { DoctorPersonalInformation }