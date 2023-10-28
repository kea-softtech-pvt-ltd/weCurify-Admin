import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import TextField from "@material-ui/core/TextField";
import { useState } from "react";
import { TimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { useRecoilState } from 'recoil';
import { SetDoctorSessionTiming } from "../../../../recoil/atom/SetDoctorSessionTiming";
import { MainButtonInput } from "../../../../mainComponent/mainButtonInput";
import { MainInput, MainInputBox } from '../../../../mainComponent/mainInput';
import { MainSelect } from '../../../../mainComponent/mainSelect';
import moment from 'moment';
import SessionApi from '../../../../services/SessionApi';
function SetTiming(props) {
    const { clinicId, day, doctorId } = props;
    const [error, setError] = useState("");
    const [coilSessionTimining, setCoilSessionTimining] = useRecoilState(SetDoctorSessionTiming)
    const [selectedSlots, setSelectedSlots] = useState([])
    const { setSessionTimeData } = SessionApi()
    const [sessionTime, setSessionTime] = useState({
        clinicId: clinicId,
        doctorId: doctorId,
        timeSlot: 20,
        fees: "",
        day: day,
        Appointment: " "
    })
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setSessionTime({ ...sessionTime, [name]: value });
    };

    const handleChange = (event, index) => {
        const { name, value } = event.target;
        setSessionTime({ ...sessionTime, [name]: value });
        let newState = [...selectedSlots]
        newState[index]["status"] = !selectedSlots[index]["status"]
        setSelectedSlots(newState);
    }
    const handleToTimeSelection = (time) => {
        setSessionTime(sessionTime => {
            return {
                ...sessionTime,
                ['toTime']: time
            }
        })
        const interval = sessionTime.timeSlot;
        const fromTime = sessionTime.fromTime;
        const startTime = moment(fromTime, "HH:mm");
        const allTimes = [];
        while (startTime < time) {
            allTimes.push({ time: startTime.format("HH:mm"), status: true }); //Push times
            startTime.add(interval, 'minutes');//Add interval of selected minutes
        }
        setSelectedSlots(allTimes)
    }
    const handleFromTimeSelection = (time) => {
        setSessionTime(sessionTime => {
            return {
                ...sessionTime,
                ['fromTime']: time
            }
        })
    }


    function handleTimeClick(e) {
        e.preventDefault()
        const setTimeData = {
            clinicId: clinicId,
            doctorId: sessionTime.doctorId,
            fromTime: sessionTime.fromTime,
            toTime: sessionTime.toTime,
            timeSlot: sessionTime.timeSlot,
            showSelectedSlots: selectedSlots.filter((e) => e.status === true),
            Appointment: "InClinicAppointment",
            fees: sessionTime.fees,
            day: sessionTime.day
        }
        if (sessionTime.fromTime < sessionTime.toTime) {
            setSessionTimeData(setTimeData)
                .then(res => {
                    let setTime = {}
                    setTime[sessionTime.day] = [res.data]
                    setCoilSessionTimining({ ...coilSessionTimining, ...setTime })
                    props.onSubmit();
                });
        } else {
            setError("Please enter valid time");
        }
    }

    return (
        <div className="col-lg-12">
            <form onSubmit={handleTimeClick}>
                <h5>{day}</h5>
                <div className="row">
                    <div className="col-lg-6">
                        <label><b>Select Time Slot</b></label>
                        <MainSelect name="timeSlot" defaultValue="20 min" onChange={handleInputChange} value={sessionTime.timeSlot} >
                            <option selected="selected" value={20}> 20 min</option>
                            <option value={30}> 30 min</option>
                            <option value={15}> 15 min</option>
                        </MainSelect>
                    </div>

                    <div className="col-lg-6">
                        <label><b>Clinic Fees</b></label>
                        <MainInput type="text" name="fees" onChange={handleInputChange} value={sessionTime.fees} placeholder="Enter fees" ></MainInput>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-6">
                        <div className="form-group">
                            <div className="k-widget k-timepicker">
                                <label><b>From Time</b></label>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <TimePicker
                                        renderInput={(props) => <TextField {...props} />}
                                        value={sessionTime.fromTime}
                                        name="fromTime"
                                        ampm={false}
                                        minutesStep={5}
                                        onChange={handleFromTimeSelection}
                                    />
                                </MuiPickersUtilsProvider>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6">
                        <div className="form-group">
                            <label><b>To Time</b></label>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <TimePicker
                                    renderInput={(props) => <TextField {...props} />}
                                    value={sessionTime.toTime}
                                    ampm={false}
                                    name="toTime"
                                    minutesStep={5}
                                    onChange={handleToTimeSelection}
                                />
                            </MuiPickersUtilsProvider>
                            {error && (<span className="validation"> {error} </span>)}
                        </div>
                    </div>
                </div>

                {selectedSlots ?
                    <section className="borderSlots">
                        {selectedSlots.map((item, index) => (
                            <div key={index}>
                                <MainInputBox
                                    type="checkbox"
                                    onChange={(event) => handleChange(event, index)}
                                    value={item}
                                    name="selectedSlots"
                                    checked={item.status ? true : false}
                                >
                                    <label className="btn_1">
                                        {item.time}
                                    </label>
                                </MainInputBox>
                            </div>
                        ))}
                    </section>
                    : null
               }
 
                <div className="text-center p-2 add_top_30">
                    <MainButtonInput>Set</MainButtonInput>
                </div>
            </form>
        </div >
    )
}
export { SetTiming }
