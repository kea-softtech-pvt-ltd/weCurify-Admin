import { slots } from "../common/constant";
import { Link } from "react-router-dom";
import { FaRupeeSign } from "react-icons/fa";
import { setNewPatientId } from "../recoil/atom/setNewPatientId";
import { useRecoilState } from "recoil";
import PatientApi from "../services/PatientApi";
import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
const ShowInClinicAppointSlots = (props) => {
    const { sessionSlot, selectedDate, session, slotDate } = props;
    const [patientId, setPatientsId] = useRecoilState(setNewPatientId)
    const [bookingSlots, setBookingSlots] = useState([]);
    const [showDelete, setShowDelete] = useState(false);
    const [bookSlot, setbookSlot] = useState([]);
    const [data, setData] = useState([])
    const { paymentInfo, getbookedSlots } = PatientApi();
    const history = useHistory()
    useEffect(() => {
        availableSlots()
    }, [])
    const handleDeleteShow = (item) => {
        setShowDelete(true)
        setbookSlot(item)
    }
    const handleDeleteClose = () => {
        setShowDelete(false)
        history.push(`/allpatient`)
    }

    const handleSelectedSlot = (item) => {
        const startDate = (selectedDate + " " + item.time)
        const transactionData = {
            "DoctorId": session.doctorId,
            "ClinicId": session.clinicId,
            "slotId": item._id,
            "patientId": patientId,
            // "order_id": payCheck.orderId,
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
                handleDeleteClose()
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
                                {bookingSlots.some(func =>
                                    func.slotId === item._id && func.status !== "Cancelled")
                                    ?
                                    <div>
                                        <div
                                            onClick={() => handleDeleteShow(item)}
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
                                            onClick={() => handleDeleteShow(item)}
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
                <Modal show={showDelete} onHide={handleDeleteClose}>
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
                        <Button variant="default" style={{ border: '1px solid #1a3c8b' }} onClick={handleDeleteClose}>
                            No
                        </Button>

                    </Modal.Footer>
                </Modal>
            </div>

        </>
    )
}
export { ShowInClinicAppointSlots }