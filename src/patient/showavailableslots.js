import { slots } from "../common/constant";
import { Link } from "react-router-dom";
import { FaRupeeSign } from "react-icons/fa";
import { setNewPatientId } from "../recoil/atom/setNewPatientId";
import { useRecoilState } from "recoil";
import PatientApi from "../services/PatientApi";
import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { setDependentId } from "../recoil/atom/setDependentId";
import moment from "moment";

const ShowInClinicAppointSlots = (props) => {
    const { sessionSlot, selectedDate, session, slotDate } = props;
    const [ patientId, setPatientsId] = useRecoilState(setNewPatientId)
    const [ dependentId, setDependentsId] = useRecoilState(setDependentId)
    const [bookingSlots, setBookingSlots] = useState([]);
    const [show, setShow] = useState(false);
    const [bookSlot, setbookSlot] = useState([]);
    const { paymentInfo, getbookedSlots } = PatientApi();
    const history = useHistory();

    useEffect(() => {
        availableSlots()
    }, [props])
    
    const handleShow = (item) => {
        setShow(true)
        setbookSlot(item)
    }
    const handleClose = () => {
        setShow(false)
    }

    const checkSlotAvailability = (slot) => {
        const currentDate = moment(new Date()).format("YYYY-MM-DD HH:mm")
        const slotDateTime = moment(new Date(selectedDate)).format("YYYY-MM-DD") + " " + slot.time
        const returnData = currentDate > slotDateTime || bookingSlots.some(func => (func.slotId === slot._id && func.status !== "Cancelled")  )
        return returnData
    }

    const handleSelectedSlot = (item) => {
        const startDate = (selectedDate + " " + item.time)
        const slotId = item._id
        const transactionData = {
            "DoctorId": session.doctorId,
            "ClinicId": session.clinicId,
            "slotId": slotId,
            "patientId": patientId,
            "dependentId":dependentId !== " " ? dependentId : null,
            "transactionId": '123',
            "currency": 'INR',
            "fees": session.fees,
            "date": slotDate,
            "day": session.day,
            "slotTime": item.time,
            "daySlotId": session._id,
            "selectedDate": selectedDate,
            "timeSlot": session.timeSlot,
            "startDate": startDate,
            "status": "Ongoing",
            "payment": "hold"
        }
        paymentInfo(transactionData)
            .then((res) => {
                history.push(`/bookingconfirmation/${res._id}`)
                setDependentsId(" ")
                handleClose()
            })

    }
    const availableSlots = () => {
        getbookedSlots(session.doctorId, session.clinicId)
            .then((result) => {
                const data = result.filter((item) => {
                    if (item.date === slotDate)
                        return item
                })
                setBookingSlots(data)
            })

    }
    return (
        <>
            <div style={{ flexWrap: 'wrap' }}>
                <span style={{ color: "black" }}>
                    <b>{slotDate}  </b>
                    <b>  Fees - <FaRupeeSign /> {session.fees} /-</b></span>
                    
                    <section className=" radiobutton">
                        {sessionSlot.map((item, index) => (
                            <>
                                <div key={index}>
                                    {checkSlotAvailability(item)
                                        ?
                                        <div>
                                            <div
                                                className="disabled-div"
                                                type="radio"
                                                // aria-disabled="true"
                                                time={slots}>
                                                <label>{item.time}</label>
                                            </div>
                                        </div>
                                        :
                                        <div>
                                            <Link
                                                to='#'
                                                onClick={() => handleShow(item)}
                                                className="btn_1"
                                                type="radio"
                                                time={slots}>
                                                <label>{item.time}</label>
                                            </Link>
                                        </div>
                                    }
                                </div>

                            </>
                        ))}
                    </section>
                 
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Are You Sure?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="alert alert-danger">You Want To Book This Slot. </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="default" className='appColor' onClick={() => handleSelectedSlot(bookSlot)}>
                            Yes
                        </Button>
                        <Button variant="default" style={{ border: '1px solid #1a3c8b' }} onClick={handleClose}>
                            No
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>

        </>
    )
}
export { ShowInClinicAppointSlots }