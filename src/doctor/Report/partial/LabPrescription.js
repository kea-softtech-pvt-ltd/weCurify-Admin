import React from 'react';
import { useState, useEffect } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import GetLabPrescription from './getLabPrescription';
import ReportApi from '../../../services/ReportApi';

export default function LabPrescription(props) {
    const { onChange, reportId, appointmentId } = props
    const { getLabData, insertLabPrescriptionData } = ReportApi()
    const [labTestData, setLabTestData] = useState([]);
    //for Selected data
    const [saveLabData, setSaveLabData] = useState('')
    useEffect(() => {
        getLabTestData();
    }, [])

    const getLabTestData = () => {
        getLabData()
            .then((result) => {
                setLabTestData(result)
            })
    };
    const handleDataSave = (e, selectedData) => {
        e.preventDefault()
        setSaveLabData(selectedData)
    }
    const labDataSave = () => {
        const bodyData = {
            "reportId": reportId,
            'patientAppointmentId': appointmentId,
            "test_name": saveLabData.test_name
        }
        insertLabPrescriptionData(bodyData)
        // onChange()
    }

    return (
        <>
            <div className='d-flex' >
                <div >
                    <div className='align-left w-50'>
                        <label className='left'>Test Name</label>
                        <Autocomplete
                            style={{ width: 200 }}
                            id={labTestData._id}
                            disablePortal={true}
                            disableClearable
                            disableCloseOnSelect
                            onChange={handleDataSave}
                            getOptionLabel={(option) => `${option.test_name}`}
                            options={labTestData}
                            renderInput={(params) =>
                            (<TextField {...params}
                                label="Choose Test Name"
                            />)}
                        />
                    </div>

                </div>

                <div className='align-right w-50 labData'>
                    <GetLabPrescription reportId={reportId} />
                </div>

            </div>
            <div>
                <div className="text-right add_top_30 ">
                    <input
                        type="submit"
                        onClick={labDataSave}
                        className="btn_1 "
                        value="Add"
                    />
                    <input
                        type="submit"
                        onClick={onChange}
                        className="btn_1 medicinebtn"
                        value="Next"
                    />
                </div>
            </div>
        </>
    )
}