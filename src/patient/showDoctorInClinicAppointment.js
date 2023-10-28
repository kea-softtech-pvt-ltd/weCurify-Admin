import { API } from "../config";
import React, { useState, useEffect } from "react";
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";
import Carousel from "react-bootstrap/Carousel";
import { Link, useParams } from "react-router-dom";
import { ShowInClinicAppointSlots } from "./showavailableslots";

function ShowDoctorInClinicAppointment(props) {
    const { setSessions, clinicId, doctorId } = props;
    const [showSlot, setShowSlot] = useState([]);
    const [dayMonth, setDayMonth] = useState([]);
    const [error, setError] = useState([]);
    const [session, setSession] = useState([])
    const [date, setDate] = useState([])
    const [selectedDate, setSelectedDate] = useState([])
    const handleChange = (item) => {
        const session = setSessions.filter((slotsData) => {
            if ((item.day) === (slotsData.day)) {
                return slotsData.showSelectedSlots
            }
        })
        if (session.length > 0) {
            setShowSlot(session[0].showSelectedSlots)
            setSession(session[0])
            setDate(item.day + " " + item.dayMonth)
            setSelectedDate(item.fullDate)
        } else {
            setError("slots are not available")
        }
    };

    useEffect(() => {
        showDateMonth();
        getNextSevenDays();
    }, [])

    const showDateMonth = (days) => {
        var month = new Date().getMonth();
        var m = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
        return days + ' ' + m[month]
    }

    const getStringDay = (dayId) => {
        let days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"]
        return days[dayId]
    }

    const getNextSevenDays = () => {
        let sevenDates = []
        for (let i = 0; i < 7; i++) {
            let date = new Date();
            var year = date.toLocaleString("default", { year: "numeric" });
            var mon = date.toLocaleString("default", { month: "2-digit" });
            var d = date.toLocaleString("default", { day: "2-digit" });
            var formattedDate = year + "-" + mon + "-" + d;
            let apochDate = date.setDate(date.getDate() + i)
            let apochMonth = date.setDate(date.getDate())
            let month = showDateMonth(new Date(apochMonth).getDate())
            const day = getStringDay(new Date(apochDate).getDay())
            sevenDates.push({ "date": new Date(apochDate).getDate(), "day": day, "fullDate": formattedDate, "dayMonth": month })
        }

        setDayMonth(sevenDates)
    }

    return (
        <div>
            {setSessions ? (
                <div className="row">
                        <div style={{borderRight: '1px solid #e1e8ed', paddingTop:'5px'}}>
                            <Carousel
                                interval={null}
                                controls={true}
                                nextIcon={<div className="AiArrowIcon"><AiOutlineArrowRight /></div>}
                                prevIcon={<div className="AiArrowIcon"><AiOutlineArrowLeft /></div>}>
                                {dayMonth.map((item, index) => (
                                    <Carousel.Item key={index}>
                                        <div style={{ height: 100, background: "white", color: "black" }}>
                                            <Carousel.Caption>
                                                <div><b>{item.day} {item.dayMonth}</b></div>
                                                <Link to="#" onClick={() => handleChange(item)}>Show Available Slots</Link>
                                            </Carousel.Caption>
                                        </div>
                                    </Carousel.Item>
                                ))}
                            </Carousel>
                        </div>
                    <div className="col-sm-9">
                        {showSlot.length > 0 ?
                            <ShowInClinicAppointSlots
                                sessionSlot={showSlot}
                                session={session}
                                slotDate={date}
                                selectedDate={selectedDate}
                            />
                            : <div style={{color:"black", marginTop:'10px'}}><b>Slots Not Available</b></div>}
                    </div>
                </div>
            ) : null}
        </div>
    )
}
export { ShowDoctorInClinicAppointment }