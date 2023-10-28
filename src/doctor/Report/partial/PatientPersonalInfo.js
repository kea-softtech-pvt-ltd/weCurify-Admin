import React, { useState, useRef } from 'react';
import AuthApi from '../../../services/AuthApi';
import ReportApi from '../../../services/ReportApi';
export default function PatientPersonalInfo(props) {
    const { reportId,onChange } = props
    const { insertPatientVitalSignsData } = ReportApi()
    const [changeData, setChangeData] = useState({
        age: "",
        weight: "",
        height: "",
        BMI: "",
        temp: "",
        bp: "",
        pulse: "",
        problem: ""
    })

    const handleChange = (event) => {
        const { name, value } = event.target;
        setChangeData({ ...changeData, [name]: value })
    }

    // const changeD = useRef('');
    // const clearData = () => {
    //     setChangeData({
    //         age: "",
    //         weight: "",
    //         height: "",
    //         BMI: "",
    //         temp: "",
    //         bp: "",
    //         pulse: "",
    //         problem: ""
    //     })

    // }
    const saveData =  (e) => {
        e.preventDefault();
        const bodyData = {
            "age": changeData.age,
            "weight": changeData.weight,
            "height": changeData.height,
            "BMI": changeData.BMI,
            "temp": changeData.temp,
            "bp": changeData.bp,
            "pulse": changeData.pulse,
            "problem": changeData.problem,
        }
         insertPatientVitalSignsData({ reportId }, bodyData)
            .then((res) => {
                //     setSavingData(res)
                //     // setPatientId(res.patientId)
            })
       // clearData()
    }


    return (
        <div>
            <div className="row">
                <div className="col-lg-5">
                    <div className="row">
                        <div className="">
                            <div align='left'>
                                <label>Message</label>
                            </div>
                            <textarea
                                type="text"
                                value={changeData.problem}
                                onChange={handleChange}
                                className="vital-signInput-txt"
                                name="problem"
                                placeholder="problem"
                            />
                        </div>
                    </div>

                </div>

                <div className="col-lg-7">
                    <div className="row">
                        <div className="vital-signInput">
                            <label className='left'>Weight (kg)</label>
                            <input
                                type="text"
                                value={changeData.weight}
                                className="form-control"
                                name="weight"
                                placeholder="weight"
                                onChange={handleChange}

                            />
                        </div>
                        <div className="vital-signInput">
                            <label className='left' >Height (feet)</label>
                            <input
                                type="text"
                                className="form-control"
                                value={changeData.height}
                                name="height"
                                placeholder="height"
                                onChange={handleChange}

                            />
                        </div>
                        <div className="vital-signInput">
                            <label className='left' >Age</label>
                            <input
                                type="text"
                                className="form-control"
                                value={changeData.age}
                                name="age"
                                placeholder="age"
                                onChange={handleChange}

                            />
                        </div>
                        <div className="vital-signInput">
                            <label className='left'>BMI</label>
                            <input
                                type="text"
                                className="form-control"
                                value={changeData.BMI}
                                name="BMI"
                                placeholder="bmi"
                                onChange={handleChange}

                            />
                        </div>
                        <div className="vital-signInput">
                            <label className='left'>BP</label>
                            <input
                                type="text"
                                className="form-control"
                                value={changeData.bp}
                                name="bp"
                                placeholder="Bp"
                                onChange={handleChange}

                            />
                        </div>
                        <div className="vital-signInput">
                            <label className='left'>Temprature</label>
                            <input
                                type="text"
                                className="form-control"
                                value={changeData.temp}
                                name="temp"
                                placeholder="Tempreture"
                                onChange={handleChange}

                            />
                        </div>
                        <div className="vital-signInput">
                            <label className='left'>Pulse</label>
                            <input
                                type="text"
                                className="form-control"
                                value={changeData.pulse}
                                name="pulse"
                                placeholder="Pulse"
                                onChange={handleChange}
                            />
                        </div>

                    </div>
                    <div className="text-right add_top_30 patientinfo">
                        <input
                            type="submit"
                            className="btn_1 patientinfo"
                            value="Save"
                            onClick={saveData}
                        />
                        <input
                            type="submit"
                            onClick={onChange}
                            className="btn_1 medicinebtn"
                            value="Next"
                        />
                    </div>
                </div>

            </div>
        </div>
    )

}
