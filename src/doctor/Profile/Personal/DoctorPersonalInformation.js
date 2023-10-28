import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import React from 'react';
import avatarImage from "../../../img/profile.png";
import { MainButtonInput } from "../../../mainComponent/mainButtonInput";
import { MainInput } from '../../../mainComponent/mainInput';
import { PlacesAutocompleteInput } from "../Clinic/Partial/placesAutocomplete"
import { MainRadioGroup } from "../../../mainComponent/mainRadioGroup";
import AuthApi from "../../../services/AuthApi";
import uuid from "uuid";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";

function DoctorPersonalInformation(props) {
    const { data, doctorId } = props
    const [updateData, setUpdateData] = useState([]);
    const { addDoctorInformation, submitDoctorInformation } = AuthApi();
    function handleChangeAddress(address) {
        setUpdateData(prevInput => {
            return {
                ...prevInput,
                ['address']: address
            }
        })
    }


    //for all input onchange method
    const handleInputChange = event => {
        const { name, value } = event.target;
        setUpdateData({ ...updateData, [name]: value });
    };

    useEffect(() => {
        addDoctorInformation({ doctorId })
            .then(jsonRes => {
                setUpdateData(jsonRes)
            });
    }, [])

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

        // blob.close();
        return await getDownloadURL(fileRef);
    }

    const { formState: { errors } } = useForm();
    const onSubmit = async () => {
        const resultUrl = await uploadImageAsync(updateData.photo)
        const bodyData = {
            photo: resultUrl,
            name: updateData.name,
            gender: updateData.gender,
            personalEmail: updateData.personalEmail,
            address: updateData.address,
        }
        submitDoctorInformation({ doctorId, bodyData })
    }

    return (
        <>
            {/* <form onSubmit={handleSubmit(onSubmit)} encType='multipart/form-data'> */}
            <div className="row">
                <div className="col-md-6 ">
                    <div className="row">
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
                    <div className="marginBottom">
                        <div className="text-left">
                            <label><b>Gender</b></label>
                        </div>
                        <div className="col-6 ">
                            <MainRadioGroup
                                name="gender"
                                value="female"
                                value1="male"
                                value2="other"
                                onChange={handleInputChange}
                                label="Female"
                                label1="male"
                                label2="other">
                            </MainRadioGroup>
                            {errors.gender && <span className="validation">Please Select your gender</span>}
                        </div>
                    </div>
                </div>
                <div className="col-md-5">
                    <div className="text-left">
                        <label><b>Full Name</b></label>
                    </div>
                    <MainInput
                        name="name"
                        value={updateData.name}
                        onChange={handleInputChange}
                        placeholder="Name">
                        {errors.name && <span className="validation">Please enter your first name</span>}
                    </MainInput>
                    <div className="text-left">
                        <label><b>Personal EmailId</b></label>
                    </div>
                    <MainInput
                        type="email"
                        value={updateData.personalEmail}
                        name="personalEmail"
                        onChange={handleInputChange}
                        placeholder="Personal EmailId">
                        {errors.personalEmail && <span className="validation">Please enter your personal Email</span>}
                    </MainInput>
                    <div align='left'>
                        <PlacesAutocompleteInput
                            value={updateData.address}
                            onChange={handleChangeAddress}>
                            <label ><b>City & Area</b></label>
                        </PlacesAutocompleteInput>
                    </div>
                    {errors.address && <span className="validation">Please enter your location</span>}
                </div>
            </div>

            <div className="text-center add_top_30">
                <MainButtonInput onClick={onSubmit}> Save</MainButtonInput>
            </div>
            <div className="text-right add_top_30">
                <MainButtonInput onClick={data}>Next</MainButtonInput>
            </div>
            {/* </form> */}
        </>
    )
}
export { DoctorPersonalInformation }