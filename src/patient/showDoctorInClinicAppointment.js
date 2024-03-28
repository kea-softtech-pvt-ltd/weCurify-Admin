import React, { useState, useEffect } from "react";
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";
import Carousel from "react-bootstrap/Carousel";
import { Link } from "react-router-dom";
import { ShowInClinicAppointSlots } from "./showavailableslots";
import moment from "moment";

function ShowDoctorInClinicAppointment(props) {
    const { setSessions, doctorId } = props;
    const [showSlot, setShowSlot] = useState([]);
    const [dayMonth, setDayMonth] = useState([]);
    const [error, setError] = useState([]);
    const [session, setSession] = useState([])
    const [date, setDate] = useState([])
    const [selectedDate, setSelectedDate] = useState([])
    const startDate = new Date();


    useEffect(() => {
        showDateMonth();
        getNextSevenDays(startDate, 7);
    }, [])

    const handleChange = (item) => {
        const session = setSessions.filter((slotsData) => {
            if ((item.day) === (slotsData.day)) {
                return slotsData.showSelectedSlots
            }
        })

        if (session.length > 0) {
            const currentTime = moment(new Date()).format("YYYY-MM-DD HH:MM")
            const fullDate = moment(item.fullDate).format("YYYY-MM-DD")
            const time = moment(session[0].toTime).format("HH:MM")
            const slotTime = fullDate.concat(' ', time)
            if (slotTime < currentTime) {
                setShowSlot('')
            }
            else {
                setShowSlot(session[0].showSelectedSlots)
            }
            setSession(session[0])
            setDate(item.dateMonth)
            setSelectedDate(item.fullDate)
        } else {
            setError("slots are not available")
        }
    };


    const showDateMonth = (days) => {
        var d = new Date();
        var month = new Array();
        month[0] = "Jan";
        month[1] = "Feb";
        month[2] = "Mar";
        month[3] = "Apr";
        month[4] = "May";
        month[5] = "Jun";
        month[6] = "Jul";
        month[7] = "Aug";
        month[8] = "Sept";
        month[9] = "Oct";
        month[10] = "Nov";
        month[11] = "Dec";
        return month[days]
    }

    const getStringDay = (dayId) => {
        let days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"]
        return days[dayId]
    }

    const getNextSevenDays = (startDate, daysToAdd) => {
        const aryDates = [];
        for (var i = 0; i <= daysToAdd; i++) {
            var currentDate = new Date();
            let appochDate = currentDate.setDate(startDate.getDate() + i);
            aryDates.push({
                "dateMonth":getStringDay(currentDate.getDay()) + " " + currentDate.getDate() + " " + showDateMonth(currentDate.getMonth()),
                "fullDate": new Date(appochDate).toISOString().split('T')[0],
                "day": getStringDay(currentDate.getDay())
            });
        }
        setDayMonth(aryDates)
    }

    return (
        <div>
            {setSessions ? (
                <div className="row  padding_2">
                    <div className=" col-sm-4 white-box" style={{ borderRight: '1px solid #e1e8ed', paddingTop: '5px' }}>
                        <Carousel
                            interval={null}
                            controls={true}
                            nextIcon={<div className="AiArrowIcon"><AiOutlineArrowRight /></div>}
                            prevIcon={<div className="AiArrowIcon"><AiOutlineArrowLeft /></div>}>
                            {dayMonth.map((item, index) => (
                                <Carousel.Item key={index}>
                                    <div style={{ height: 100, background: "white", color: "black" }}>
                                        <Carousel.Caption>
                                            <Link
                                                to="#"
                                                onClick={() => handleChange(item)}>
                                                <div>
                                                    <b>{item.dateMonth}</b>
                                                </div>
                                                Show Available Slots
                                            </Link>
                                        </Carousel.Caption>
                                    </div>
                                </Carousel.Item>
                            ))}
                        </Carousel>
                    </div>
                    <div className="col-sm-8 white-box">
                        {showSlot.length > 0 ?
                            <ShowInClinicAppointSlots
                                doctorId={doctorId}
                                sessionSlot={showSlot}
                                session={session}
                                slotDate={date}
                                selectedDate={selectedDate}
                            />
                            :
                            <div style={{ color: "black", marginTop: '10px' }}>
                                <b>Slots Not Available</b>
                            </div>}
                    </div>
                </div>
            ) : null}
        </div>
    )
}
export { ShowDoctorInClinicAppointment }