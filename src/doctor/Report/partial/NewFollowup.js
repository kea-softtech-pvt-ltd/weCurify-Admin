import React, { useEffect } from 'react';
import DatePicker from 'react-date-picker';
import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import Payment from './Payment';
import ReportApi from '../../../services/ReportApi';
import "react-toastify/dist/ReactToastify.css"
import { toast } from 'react-toastify';
import Toaster from '../../Toaster';
export default function NewFollowup(props) {
    const { insertNewFollowUpDate, getMedicineReport } = ReportApi()
    const { onChange, reportId, fees } = props
    const [date, setDate] = useState();
    const [appointmentId, setAppointmentId] = useState()
    const [doctorId, setDoctorId] = useState()
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const onSubmit = () => {
        handleClose();
    };
   
    const addDatePicker = (date) => {
        setDate(date)
    }
    const addNode = () => {
        const bodyData = {
            "new_follow_up": date,
        }
        insertNewFollowUpDate({ reportId }, bodyData)
        toast.success("Saved Successfully!")
    }
    useEffect(() => {
        medicalReportData()
    }, [])

    const medicalReportData = () => {
        getMedicineReport({ reportId })
            .then((res) => {
                setDoctorId(res[0].doctorId)
                setAppointmentId(res[0].patientAppointmentId)
            })
    }
    // const getPrescriptionData = async () => {
    //     const bodyData = {
    //         "status": "Completed",
    //         //"payment": "Done",
    //         "medicalReportId": reportId
    //     }
    //     await UpdateStatusBookingdata({ appointmentId }, bodyData)
    //         .then((res) => {
    //             history.push(`/dashboard/${res.doctorId}`)
    //         })
    //     await createPDF({ reportId })
    // };
    return (
        <div >
            <div className="row">
                <div className="col-lg-2">
                    <div className="form-group">
                        <b>Follow-Up:</b>
                    </div>
                </div>
                <div className="col-lg-2">
                    <div className="form-group">
                        <DatePicker
                            className="datepicker"
                            onChange={addDatePicker}
                            value={date}
                            clearIcon={null}
                        />
                    </div>
                </div>
            </div>
            <div className="text-right add_top_30">
                <input
                    type="submit"
                    onClick={addNode}
                    className="btn_1 medicinebtn"
                    value="Add"
                />

                <input
                    type="submit"
                    className="btn_1 medicinebtn"
                    value="Make Payment"
                    onClick={handleShow}
                />
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Payment</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Payment fees={fees} doctorId={doctorId} appointmentId={appointmentId} reportId={reportId} onSubmit={onSubmit} />
                    </Modal.Body>
                </Modal>
            </div>
            <div className="row float-right">
                <Toaster />
            </div>
        </div>

    )
}