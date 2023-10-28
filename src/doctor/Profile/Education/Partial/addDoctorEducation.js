import React from 'react';
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { setDoctorEducation } from "../../../../recoil/atom/setDoctorEducation";
import { MainButtonInput } from "../../../../mainComponent/mainButtonInput";
import { MainInput } from '../../../../mainComponent/mainInput';
import { MainSelect } from '../../../../mainComponent/mainSelect';
import EducationApi from '../../../../services/EducationApi';
function AddDoctorEducation(props) {
    const { doctorId } = props
    const [updateEduData, setUpdateEduData] = useState([])
    const [coilDoctorEducationData, setCoilDoctorEducationData] = useRecoilState(setDoctorEducation)
    const [drspecialization, setDrSpecialization] = useState([])
    const [drdegrees, setDrdegrees] = useState([])
    const { fetchDrSpecialization, fetchDrDegree, addEducation } = EducationApi();
    useEffect(() => {
        fetchSpecializations()
        fetchDegrees()
        register("degree", { required: true });
        register("collage", { required: true });
        register("comYear", { required: true });
        register("specialization", { required: true });
        register("document", { required: true });
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
    const { register, setValue, formState: { errors } } = useForm();
    const onSubmit =  (e) => {
        e.preventDefault();
        const bodyData = {
            doctorId: doctorId,
            degree: updateEduData.degree,
            collage: updateEduData.collage,
            comYear: updateEduData.comYear,
            specialization: updateEduData.specialization,
            // document:document
        }
        addEducation(bodyData)
            .then(res => {
                setCoilDoctorEducationData(coilDoctorEducationData.concat(res.data))
                props.recordAdded();
            });
    }

    //for all input onchange method
    const handleInputChange = event => {
        const { name, value } = event.target;
        setUpdateEduData({ ...updateEduData, [name]: value });
        setValue(name, value)
    };

    // //for document onChange methods
    // const onFileChange = (e) => {
    //     setUpdateEduData({ ...updateEduData, document: e.target.files })
    //     setValue("document", e.target.files)
    // }

    return (
        // <form onSubmit={handleSubmit(onSubmit)} className="my-4" encType='multipart/form-data'>
        <>
            <div className="row">
                <div className="col-md-6 my-2">
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
                    <div className=" text-left">
                        <label><b>Doctor Collage/University</b></label>
                    </div>
                    <MainInput
                        type="text"
                        value={updateEduData.collage}
                        name="collage" onChange={handleInputChange}
                        placeholder="Doctor Collage/University">
                        {errors.collage && <span className="validation">Please enter your collage</span>}
                    </MainInput>

                </div>

                <div className="col-md-6 my-2">
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
                            <option key={index}>{spe.specialization}</option>
                        ))}
                    </MainSelect>
                    {errors.specialization && <span className="validation">Please select your specialization</span>}
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
                <MainButtonInput onClick={onSubmit}>Save</MainButtonInput>
            </div>
            {/* </form> */}
        </>
    )
}
export { AddDoctorEducation }