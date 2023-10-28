import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete/Autocomplete';
import React, { useEffect, useState } from 'react';
import AuthApi from '../../../services/AuthApi';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import AppointmentApi from '../../../services/AppointmentApi';
import ReportApi from '../../../services/ReportApi';
export default function Payment(props) {
    const { reportId, appointmentId, fees, doctorId } = props;
    const history = useHistory()
    const [saveMode, setSaveMode] = useState([]);
    const [patientFees, setPatientFees] = useState(fees);

    const [otherFees, setOtherFees] = useState();
    const { UpdateStatusBookingdata, } = ReportApi();
    const { createPDF } = AppointmentApi()
    const mode = [
        {
            "_id": 0,
            "name": "Cash"
        },
        {
            "_id": 1,
            "name": "Credit Card"
        },
        {
            "_id": 2,
            "name": "Debit Card"
        }, {
            "_id": 3,
            "name": "UPI"
        },
    ]
    // useEffect(()=>{
    //     totalFees()
    // },[])
    const handleMode = (e, selectedMode) => {
        setSaveMode(selectedMode.name)
    }

    const handleOtherFeesValue = (e) => {
        e.preventDefault();
        setOtherFees(e.target.value)
        if (e.target.value) {
            const totalAmount = parseInt(e.target.value) + parseInt(fees)
            setPatientFees(totalAmount)
        } else {
            const totalAmount = fees
            setPatientFees(totalAmount)
        }
    }


    const getPrescriptionData = () => {
        const bodyData = {
            "status": "Completed",
            "payment": "Done",
            "medicalReportId": reportId,
            "paymentMethod": mode,
            "total": patientFees
        }
        UpdateStatusBookingdata({ appointmentId }, bodyData)
            .then((res) => {
                // setPatientFees(res.fees)
                history.push(`/doctorList`)
            })
        createPDF({ reportId })
    };
    return (
        <>

            <div className='row'>
                <div className='col-lg-6'>
                    <div className='paymentInput'>
                        <label className='consultationFees'>
                            <b>Consultation Fees</b>
                        </label>
                        <input
                            type="text"
                            value={fees}
                            // onChange={handleDurationValue}
                            className="payment"
                            name="consultationFees"
                        />
                    </div>

                    <div className=' paymentInput'>
                        <label className='otherFees'><b>Other Fees</b></label>
                        <input
                            type="text"
                            value={otherFees}
                            onChange={handleOtherFeesValue}
                            className="payment otherInput"
                            name="OtherFees"
                        />
                    </div>

                </div>
                <div className='col-lg-6 paymentAutocomplete' >
                    <span className='paymentSpan'><b>Mode of Payment</b></span>
                    <Autocomplete
                        disablePortal={true}
                        disableClearable
                        disableCloseOnSelect
                        selectOnFocus
                        style={{ width: 150 }}
                        id={saveMode._id}
                        value={saveMode.name}
                        onChange={handleMode}
                        getOptionLabel={(mode) => `${mode.name}`}
                        options={mode}
                        renderInput={(params) => <TextField {...params} label="Select" />}
                    />
                </div>

            </div>
            <div className=' border-payment' />
            <div className='paymentInput'>
                <label className='totalFees'><b>Total</b></label>
                <span className=" totalInput dashboard">{patientFees}</span>
                {/* <input
                        type="text"
                        value={patientFees}
                        // onChange={handleDurationValue}
                        className="payment totalInput"
                        name="total"
                    /> */}
            </div>
            <div className="text-center">
                <input
                    onClick={getPrescriptionData}
                    type="submit"
                    className="btn_1 paymentbtn "
                    value="Pay"
                />
            </div>
        </>
    )
}