import React, { useEffect } from 'react';
import { useState } from "react";
import { setDoctorExperience } from "../../../../recoil/atom/setDoctorExperience";
import { useRecoilState } from 'recoil';
import { MainButtonInput } from '../../../../mainComponent/mainButtonInput';
import { MainInput } from '../../../../mainComponent/mainInput';
import { MainMuiPickers } from '../../../../mainComponent/MainMuiPickers';
import ExperienceApi from '../../../../services/ExperienceApi';
import moment from 'moment';
function EditExperience(props) {
    const { ExId } = props;
    const [error, setError] = useState('')
    const [startYear, setStartYear] = useState(new Date())
    const [endYear, setEndYear] = useState(new Date())
    const [coilExperienceData, setCoilExperienceData] = useRecoilState(setDoctorExperience)
    const [updateExperience, setUpdateExperience] = useState({});
    const { editExperienceData, getAllExperienceData } = ExperienceApi()
    //for all input onchange method
    const handleInputChange = event => {
        const { name, value } = event.target;
        setUpdateExperience({ ...updateExperience, [name]: value })
    };
    //for month Year Date picker
    const handleStartYearChange = (date) => {
        setStartYear(date)
    }

    const handleEndYearChange = (date) => {
        setEndYear(date)
    }

    useEffect(() => {
        getAllExperience()
    }, [])

    const getAllExperience = () => {
        getAllExperienceData({ ExId })
            .then((jsonRes) => {
                setStartYear(jsonRes.startYear)
                setEndYear(jsonRes.endYear)
                setUpdateExperience(jsonRes)
            });
    }
    function UpdateData(e) {
        e.preventDefault();
        // e.target.reset()
        const updateExperienceData = {
            doctorId: updateExperience.doctorId,
            clinicName: updateExperience.clinicName,
            startYear: startYear,
            endYear: endYear,
            description: updateExperience.description
        }
        if (new Date(endYear).getTime() < new Date(startYear).getTime()) {
            setError("end year should be greater than start year")
        }
        else {
            editExperienceData({ ExId }, updateExperienceData)
                .then((res) => {
                    const editExperience = coilExperienceData.map(function (e, index) {
                        if (ExId === e._id) {
                            return res
                        } else {
                            return e
                        }
                    })
                    const editAllExperienceData = manipulateExperience(editExperience[0]);
                    setCoilExperienceData(editAllExperienceData);
                    props.onSubmit();
                })
        }
        // setUpdateExperience({})
    }

    function manipulateExperience(data) {
        const experiences = monthDiff(new Date(data.startYear), new Date(data.endYear))
        const month = experiences % 12
        let year = 0
        if (experiences > 11) {
            const exYear = experiences / 12
            year = exYear.toFixed(0)
        }
        data.totalExperience = `${year}.${month}`;
        return [data];
    }

    function monthDiff(start, end) {
        var months;
        months = (end.getFullYear() - start.getFullYear()) * 12;
        months -= start.getMonth();
        months += end.getMonth();
        return months <= 0 ? 0 : months;
    }

    return (
        <>
        {/* <form onSubmit={UpdateData} id={"updateData"}> */}
                <div className="row">
                    <div className="col-md-6 ">
                        <i className="icon-calendar:before" title="Edit profile"></i>
                        <MainMuiPickers
                            name="startYear"
                            value={moment(new Date(startYear)).format('MM-YYYY')}
                            onChange={handleStartYearChange}>Start Year
                        </MainMuiPickers>
                    </div>
                    <div className="col-md-6 ">
                    {/* //moment(new Date(subscription.expiryDate)).format('YYYY-MM-DD') */}
                        <MainMuiPickers
                            name="startYear"
                            value={moment((endYear)).format('MM-YYYY')}
                            onChange={handleEndYearChange}>End Year
                        </MainMuiPickers>
                    </div>
                    <div className="col-md-12 ">
                        <label><b>Clinic/Hospital Name</b></label>
                        <MainInput
                            type="text"
                            name="clinicName"
                            value={updateExperience.clinicName}
                            onChange={handleInputChange}
                            placeholder="clinic name">
                        </MainInput>
                    </div>
                    <div className="col-lg-12">
                        <div className="textarea">
                            <label><b>Description</b></label>
                            <textarea
                                type="text"
                                name="description"
                                value={updateExperience.description}
                                onChange={handleInputChange}
                                className="form-control"
                                placeholder="description"
                            />
                        </div>
                    </div>
                </div>
                <div className="text-center add_top_30">
                    <MainButtonInput onClick={UpdateData}>Save</MainButtonInput>
                </div>
         {/* </form> */}
        </>
    )
}
export { EditExperience }