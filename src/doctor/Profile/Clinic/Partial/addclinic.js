import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { setDoctorClinic } from "../../../../recoil/atom/setDoctorClinic";
import { useRecoilState } from "recoil";
import { MainButtonInput } from "../../../../mainComponent/mainButtonInput";
import { MainInput } from "../../../../mainComponent/mainInput";
import ClinicApi from "../../../../services/ClinicApi";
import { Autocomplete, TextField } from "@mui/material";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import uuid from "uuid";
import EducationApi from "../../../../services/EducationApi";
import { useForm } from "react-hook-form";
const AddClinic = (props) => {
    const { doctorId } = useParams();
    const [coilDoctorClinicData, setCoilDoctorClinicData] = useRecoilState(setDoctorClinic)
    const [selectedService, setSelectedService] = useState([]);
    const [selectedSpecialization, setSelectedSpecialization] = useState([]);
    const [drspecialization, setDrSpecialization] = useState([])
    const [clinicInfo, setClinicInfo] = useState([]);
    console.log('clinicInfo-----', clinicInfo)
    const { fetchDrSpecialization } = EducationApi()
    const [servicess, setServicess] = useState([])
    const { insertClinicData, getServicess } = ClinicApi()

    useEffect(() => {
        fetchSpecializations()
        fetchServicess()
        register("clinicName", { required: true });
        register("address", { required: true });
    }, [])

    const fetchSpecializations = () => {
        fetchDrSpecialization()
            .then((result) => {
                setDrSpecialization(result);
            })
    }
    const fetchServicess = () => {
        getServicess()
            .then((res) => {
                setServicess(res)
            })
    }

    function handleChange(event) {
        const { name, value } = event.target;
        setClinicInfo(prevInput => {
            return {
                ...prevInput,
                [name]: value
            }
        })
        setValue(name, value )
    }
    const handleService = (e, selectedValue) => {
        e.preventDefault()
        setSelectedService(selectedValue)
    }

    const handleSpecialization = (e, selectedValue) => {
        e.preventDefault()
        setSelectedSpecialization(selectedValue)
    }

    async function uploadImageAsync(uri) {
        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                resolve(xhr.response);
            };
            xhr.onerror = function (e) {
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
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    async function sendClinicInfo() {
        const resultUrl = await uploadImageAsync(clinicInfo.clinicLogo)
        const newClinicData = {
            doctorId: doctorId,
            clinicLogo: resultUrl,
            specialization: selectedSpecialization,
            clinicName: clinicInfo.clinicName,
            address: clinicInfo.address,
            clinicNumber: clinicInfo.clinicNumber,
            services: selectedService
        }
        insertClinicData({ newClinicData })
            .then((res) => {
                setCoilDoctorClinicData(coilDoctorClinicData.concat(res.data))
                props.handleClose()
            });
    }

    return (
        <div className="col-lg-12">
            <form onSubmit={handleSubmit(sendClinicInfo)}>
                <div className="text-left">
                    <label><b>Clinic Logo</b></label>
                    <MainInput
                        type="file"
                        accept=".png, .jpg, .jpeg"
                        onChange={(e) => {
                            console.log(e)
                            setClinicInfo({ ...clinicInfo, ['clinicLogo']: URL.createObjectURL(e.target.files[0]) })
                        }}
                        name="clinicLogo">
                    </MainInput>
                </div>
                <div className="form-group">
                    <label><b>Clinic Name *</b></label>
                    <MainInput
                        type="text"
                        name="clinicName"
                        onChange={handleChange}
                        value={clinicInfo.clinicname}
                        placeholder="Enter clinic name">
                    </MainInput>
                    {/* {errors.clinicName && <span className="validation">Clinic Name is Required</span>} */}

                </div>

                <div className="form-group">
                    <label><b>Location *</b></label>
                    <MainInput
                        type="text"
                        name="address"
                        value={clinicInfo.address}
                        onChange={handleChange}
                        placeholder="Enter clinic address">
                    </MainInput>
                    {/* {errors.address && <span className="validation">Clinic Address is Required</span>} */}

                </div>
                <div className="form-group">
                    <label><b>Clinic Number </b></label>
                    <MainInput
                        type="text"
                        name="clinicNumber"
                        onChange={handleChange}
                        value={clinicInfo.clinicnumber}
                        placeholder="Enter clinic number">
                    </MainInput>
                </div>
                <div className='align-left '>
                    <div align='left' className="patientData mb-2">
                        <b>Clinic Specialization *</b>
                    </div>
                    <Autocomplete
                        disablePortal={true}
                        disableClearable
                        disableCloseOnSelect
                        multiple={true}
                        className='autocompleteWidth'
                        id={drspecialization._id}
                        value={selectedSpecialization}
                        onChange={handleSpecialization}
                        getOptionLabel={(drspecialization) => `${drspecialization.specialization}`}
                        options={drspecialization}
                        renderInput={(params) =>
                            <TextField {...params}
                                label="Specializaation" />}
                    />
                </div>
                <div className='align-left '>
                    <div align='left' className="patientData mt-2 mb-2">
                        <b>Clinic Services *</b>
                    </div>
                    <Autocomplete
                        disablePortal={true}
                        disableClearable
                        disableCloseOnSelect
                        multiple={true}
                        className='autocompleteWidth'
                        id={servicess._id}
                        value={selectedService.name}
                        onChange={handleService}
                        getOptionLabel={(servicess) => `${servicess.name}`}
                        options={servicess}
                        renderInput={(params) =>
                            <TextField {...params}
                                label="Service" />}
                    />
                </div>
                <div className="text-center m-3">
                    <MainButtonInput value="Add Clinic" />
                </div>
            </form >
        </div >
    );
};
export { AddClinic }
