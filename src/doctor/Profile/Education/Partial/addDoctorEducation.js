import React from 'react';
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { MainButtonInput } from "../../../../mainComponent/mainButtonInput";
import { MainInput } from '../../../../mainComponent/mainInput';
import { MainSelect } from '../../../../mainComponent/mainSelect';
import EducationApi from '../../../../services/EducationApi';
import { setDoctorEducation } from '../../../../recoil/atom/setDoctorEducation';
import Toaster from '../../../Toaster';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function AddDoctorEducation(props) {
    const { doctorId } = props;
    const [updateEduData, setUpdateEduData] = useState([])
    const [coilDoctorEducationData, setCoilDoctorEducationData] = useRecoilState(setDoctorEducation)
    const [drspecialization, setDrSpecialization] = useState([])
    const [drdegrees, setDrdegrees] = useState([])
    const { addEducation, fetchDrSpecialization, fetchDrDegree } = EducationApi()

    useEffect(() => {
        fetchSpecializations()
        fetchDegrees()
        register("degree", { required: true });
        register("collage", { required: true });
        register("comYear", { required: true });
        register("specialization", { required: true });
    }, [])

    const fetchSpecializations = () => {
        fetchDrSpecialization()
            .then((res) => {
                setDrSpecialization(res);
            })
    }

    const fetchDegrees = () => {
        fetchDrDegree()
            .then((res) => {
                setDrdegrees(res);
            })
    }

    //for Year dropdownlist
    const currentYear = new Date().getFullYear();
    const options = [];
    const prevYear = currentYear - 50;
    let x = prevYear;
    while (x <= currentYear) {
        options.push(x);
        x++;
    }
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const onSubmit = () => {
        const bodyData = {
            doctorId: doctorId,
            degree: updateEduData.degree,
            collage: updateEduData.collage,
            comYear: updateEduData.comYear,
            specialization: updateEduData.specialization,
        }
        addEducation(bodyData)
            .then((res) => {
                setCoilDoctorEducationData(coilDoctorEducationData.concat(res))
            });
            toast.success("Saved Successfully!")
            props.recordAdded()
    }

    //for all input onchange method
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUpdateEduData({ ...updateEduData, [name]: value });
        setValue(name, value)
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
                <div className="col-md-6">
                    <div className=" text-left">
                        <label><b>Doctor Degree</b></label>
                    </div>
                    <MainSelect
                        name="degree"
                        onChange={handleInputChange}
                        value={updateEduData.degree}>
                        <option>Select Degree</option>
                        {drdegrees.map((item, index) => (
                            <option className="form-control" key={index}>{item.degree}</option>
                        ))}
                    </MainSelect>
                    {errors.degree && <span className="validation">Please Select your degree</span>}
                    <div className='margin_top_30'>
                        <div className=" text-left">
                            <label><b>Doctor Collage/University</b></label>
                        </div>
                        <MainInput
                            type="text"
                            value={updateEduData.collage}
                            name="collage" onChange={handleInputChange}
                            placeholder="Doctor Collage/University">
                        </MainInput>
                            {errors.collage && <span className="validation">Please enter your collage</span>}
                    </div>
                </div>

                <div className="col-md-6 ">
                    <div className=" text-left">
                        <label><b>Specialization</b></label>
                    </div>
                    <MainSelect
                        name="specialization"
                        className="form-control"
                        value={updateEduData.specialization}
                        onChange={handleInputChange}>
                        <option>Select specialization</option>
                        {drspecialization.map((spe, index) => (
                            <option className="form-control" key={index}>{spe.specialization}</option>
                        ))}
                    </MainSelect>
                    {errors.specialization && <span className="validation">Please select your specialization</span>}
                    <div className='margin_top_30'>
                    <div className=" text-left">
                        <label><b>Complition Year</b></label>
                    </div>
                    <MainSelect
                        name="comYear"
                        value={updateEduData.comYear}
                        onChange={handleInputChange}>
                        <option >Select Year</option>
                        {options.map((option, index) => (
                            <option key={index}>{option}</option>
                        ))}
                    </MainSelect>
                    {errors.comYear && <span className="validation">Please select your complition Year</span>}
                    </div>
                    {/* <div className=" text-left">
                        <label><b>Qualification Document Photo</b></label>
                    </div>
                    <MainInput
                        type="file"
                        name="document"
                        onChange={onFileChange}
                        placeholder="Document"
                        multiple={true}>
                        {errors.document && <span className="validation">Please upload your document</span>}
                    </MainInput> */}
                </div>
            </div>
            <div className="text-center add_top_30">
                <MainButtonInput >Save</MainButtonInput>
            </div>
            <div className="row float-right toaster">
                <Toaster />
            </div>
        </form>
    )
}
export { AddDoctorEducation }