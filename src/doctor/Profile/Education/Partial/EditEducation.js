import React from 'react';
import { API } from "../../../../config";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import pdfImage from "../../../../img/pdfimg.png";
import { useRecoilState } from "recoil";
import { setDoctorEducation } from "../../../../recoil/atom/setDoctorEducation";
import { MainButtonInput } from "../../../../mainComponent/mainButtonInput";
import { MainInput } from '../../../../mainComponent/mainInput';
import { MainSelect } from '../../../../mainComponent/mainSelect';
import EducationApi from '../../../../services/EducationApi';
function EditEducation(props) {
    const { doctorId } = useParams();
    const { EduId } = props;
    const [drspecialization, setDrSpecialization] = useState([])
    const [drDocument, setDrDocument] = useState([]);
    const [drdegrees, setDrdegrees] = useState([])
    const [eduData, setEduData] = useRecoilState(setDoctorEducation)
    const [updateEducation, setUpdateEducation] = useState([])
    const { fetchEditEducationData, fetchDrDegree, fetchDrSpecialization } = EducationApi()
    const removeImage = (EduId, index) => {
        let tempEduImages = drDocument.filter((item, key) => {
            return key !== index
        })
        setDrDocument(tempEduImages)
        axios.post(`${API}/deleteDocument/${EduId}`, {
            document: tempEduImages
        })
            .then(res => console.log(res.data));
    }

    useEffect(() => {
        fetchSpecializations();
        fetchDegrees();
        fetchUpdateEducation();
    }, [])

    const fetchSpecializations = () => {
        fetchDrSpecialization()
            .then((result) => {
                setDrSpecialization(result);
            })
    }

    const fetchDegrees =  () => {
         fetchDrDegree()
         .then((result)=>{
             setDrdegrees(result);
         })
    }

    const fetchUpdateEducation = () => {
        fetchEditEducationData({ EduId })
            .then((result) => {
                setUpdateEducation(result)
                setDrDocument(props.imageData)
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

    //for all input onchange method
    const handleInputChange = event => {
        const { name, value } = event.target;
        setUpdateEducation({ ...updateEducation, [name]: value });
    };

    //for document onChange methods
    async function EditData(e) {
        e.preventDefault();
        const formData = new FormData(document.querySelector("#EditData"));
        formData.append('doctorId', doctorId);
        const res = await axios.post(`${API}/updateEducation/${EduId}`, formData)
            .then(res => {
                const newEduData = eduData.map(function (d, index) {
                    if (EduId === d._id) {
                        return res.data
                    } else {
                        return d
                    }
                })
                setEduData(newEduData);
                props.onSubmit()
            });
    }

    return (
        <form onSubmit={EditData} id={"EditData"} encType='multipart/form-data'>
            <div className="row">
                <div className="col-md-6 ">
                    <label><b>Doctor Degree</b></label>
                    <MainSelect
                        name="degree"
                        value={updateEducation.degree}
                        onChange={handleInputChange} >
                        <option value="" >Select Degree</option>
                        {drdegrees.map((item, index) => (
                            <option key={index} className="form-control">{item.degree}</option>
                        ))}
                    </MainSelect>

                    <label><b>Doctor Collage/University</b></label>
                    <MainInput
                        type="text"
                        value={updateEducation.collage}
                        name="collage"
                        onChange={handleInputChange}
                        placeholder="Doctor Collage/University">
                    </MainInput>

                    <label><b>Complition Year</b></label>
                    <MainSelect
                        value={updateEducation.comYear}
                        name="comYear"
                        onChange={handleInputChange}>
                        <option value="" >Select Year</option>
                        {options.map((option, index) => (
                            <option key={index}>{option}</option>
                        ))}
                    </MainSelect>
                </div>

                <div className="col-md-6">
                    <label><b>Specialization</b></label>
                    <MainSelect
                        name="specialization"
                        value={updateEducation.specialization}
                        onChange={handleInputChange}>
                        <option value="" >Select specialization</option>
                        {drspecialization.map((special, index) => (
                            <option key={index}>{special.specialization}</option>
                        ))}
                    </MainSelect>
                </div>
            </div>

            <div className="text-center add_top_30">
                <MainButtonInput>Save</MainButtonInput>
            </div>
        </form>
    )
}
export { EditEducation }