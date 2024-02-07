import React, { useEffect } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import TextField from "@material-ui/core/TextField";
import { useState } from "react";
import { TimePicker, MuiPickersUtilsProvider } from '@mui/x-date-pickers';
import { useRecoilState } from 'recoil';
import { SetDoctorSessionTiming } from "../../../../recoil/atom/SetDoctorSessionTiming";
import { MainButtonInput } from "../../../../mainComponent/mainButtonInput";
import { MainInput } from '../../../../mainComponent/mainInput';
import { MainSelect } from '../../../../mainComponent/mainSelect';
import moment from 'moment';
import SessionApi from "../../../../services/SessionApi";
import { useForm } from 'react-hook-form';

function SetTiming(props) {
    const { doctorId, clinicId, day, } = props;
    const [error, setError] = useState("");
    const [feesError, setFeesError] = useState("");
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
    useEffect(() => {
        register("fees", { required: true });
        register("timeSlot", { required: true });
    }, [])
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setSessionTime({ ...sessionTime, [name]: value });
        setValue(name, value)
    };

    const handleChange = (event, index) => {
        const { name, value } = event.target;
        setSessionTime({ ...sessionTime, [name]: value });
        let newState = [...selectedSlots]
        newState[index]["status"] = !selectedSlots[index]["status"]
        setSelectedSlots(newState);
    }
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
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
        e.preventDefault();
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
                    props.handleSubmit();
                });

        } else {
            setError("Please enter valid time");
        }
        if (sessionTime.fees === '') {
            setFeesError('Enter Fees')
        }
        else {
            props.handleSubmit()
        }
    }

    return (
        <div className="col-lg-12">
            {/* <form onSubmit={handleSubmit(handleTimeClick)}> */}
            <h5>{day}</h5>
            <div className="row">
                <div className="col-lg-6">
                    <label><b>Select Time Slot</b></label>
                    <MainSelect name="timeSlot" defaultValue="15 min" onChange={handleInputChange} value={sessionTime.timeSlot} >
                        <option selected="selected" value={15}> 15 min</option>
                        <option value={20}> 20 min</option>
                        <option value={30}> 30 min</option>
                    </MainSelect>
                </div>

                <div className="col-lg-6">
                    <label><b>Clinic Fees</b></label>
                    <MainInput
                        type="text"
                        name="fees"
                        onChange={handleInputChange}
                        value={sessionTime.fees}
                        placeholder="Enter fees" >
                    </MainInput>
                    {feesError && <span className="validation">{feesError}</span>}
                </div>
            </div>

            <div className="row">
                <div className="col-lg-6">
                    <div className="form-group">
                        <div className="k-widget k-timepicker">
                            <label><b>From Time</b></label>
                            {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <TimePicker
                                    renderInput={(props) => <TextField {...props} />}
                                    value={sessionTime.fromTime}
                                    name="fromTime"
                                    ampm={false}
                                    minutesStep={5}
                                    onChange={handleFromTimeSelection}
                                />
                            </MuiPickersUtilsProvider> */}
                        </div>
                    </div>
                </div>

                <div className="col-lg-6">
                    <div className="form-group">
                        <label><b>To Time</b></label>
                        {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <TimePicker
                                renderInput={(props) => <TextField {...props} />}
                                value={sessionTime.toTime}
                                ampm={false}
                                name="toTime"
                                minutesStep={5}
                                onChange={handleToTimeSelection}
                            />
                        </MuiPickersUtilsProvider> */}
                        {error && <span className="validation">Please enter valid time</span>}
                    </div>
                </div>
            </div>

            {selectedSlots ?
                <section className="borderSlots">
                    {selectedSlots.map((item, index) => (
                        <div key={index}>
                            <div
                                id="ck-button"
                                style={item.status === false ?
                                    { backgroundColor: 'rgb(228, 217, 217)', color: 'black' }
                                    : null}
                            >
                                <label>
                                    <input
                                        onChange={(event) => handleChange(event, index)}
                                        type="checkbox"
                                        checked={item.status ? true : false}
                                        value="1"
                                        name="selectedSlots"
                                    />
                                    <span>{item.time}</span>
                                </label>
                            </div>
                        </div>
                    ))}
                </section>
                : null}

            <div className="text-center  p-2 add_top_30">
                <MainButtonInput onClick={handleTimeClick}>Set</MainButtonInput>
            </div>
            {/* </form> */}
        </div>
    )
}
export { SetTiming }
