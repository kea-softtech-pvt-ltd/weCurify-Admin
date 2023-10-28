import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { useState, useEffect } from 'react';
import AuthApi from '../../../services/AuthApi';
import GetSymptomsData from './GetSymptomsData'
import ReportApi from '../../../services/ReportApi';
export default function Symptoms(props) {
    const { onChange, reportId } = props
    const [symptoms, setSymptoms] = useState([])
    const [saveSymptoms, setSaveSymptoms] = useState([])
    const [otherSymptom, setOtherSymptoms] = useState('')
    const { symptomsData, insertSymptoms, insertSymptom_masterTable } = ReportApi();

    useEffect(() => {
        getSymptomsData();
    }, [])
    const getSymptomsData = () => {
        symptomsData()
            .then((result) => {
                setSymptoms(result)
            })
    };

    const handleChange = (e, selectedValue) => {
        e.preventDefault()
        setSaveSymptoms(selectedValue)
    }

    const handleOtherChangeValue = (e) => {
        setOtherSymptoms(e.target.value)
    }
    // const clearData = () => {
    //     setOtherSymptoms('')
    //     setSymptoms()
    // }

    const addSymptoms = () => {
        saveSymptoms.push(otherSymptom)
        const bodyData = {
            "symptoms": saveSymptoms,
        }
        insertSymptoms({ reportId }, bodyData)
            .then(() => {
                const other = {
                    "symptoms": otherSymptom,
                }
                insertSymptom_masterTable(other)
            })

        // onChange()
        // clearData()
    }


    return (
        <div>
            <div className='symptomsData w-100'>
                <div className='w-40'>
                    <label className='left'>Choose Symptoms</label>
                    <Autocomplete
                        style={{ width: 250 }}
                        id={symptoms._id}
                        disablePortal={true}
                        disableClearable
                        multiple={true}
                        disableCloseOnSelect
                        value={saveSymptoms.name}
                        onChange={handleChange}
                        options={symptoms.map((n) => `${n.name}`)}
                        noOptionsText={"Sympton not availabel please add"}
                        renderInput={(params) =>
                            <TextField {...params}
                                label="Choose a Symptoms"
                            />}
                    />
                </div>
                <div className="symptomsInput w-30">
                    <span className="vital-signInput ">
                        <label className='left' >Other</label>
                        <input
                            type="text"
                            className="form-control "
                            onChange={handleOtherChangeValue}
                            placeholder="Enter your symptoms"
                        />
                    </span>
                </div>

                <div className='getSymptoms w-30'  >
                    <GetSymptomsData reportId={reportId} />
                </div>
            </div>
            <div className="text-right add_top_30 symptomsBtn">
                <input
                    type="submit"
                    onClick={addSymptoms}
                    className="btn_1 patientinfo"
                    value="Save"
                />
                <input
                    type="submit"
                    onClick={onChange}
                    className="btn_1 medicinebtn"
                    value="Next"
                />

            </div>
        </div>
    )
}