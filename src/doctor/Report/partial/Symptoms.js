import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { useState, useEffect } from 'react';
import GetSymptomsData from './GetSymptomsData'
import ReportApi from '../../../services/ReportApi';
import Toaster from '../../Toaster';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
export default function Symptoms(props) {
    const { onChange, reportId } = props
    const [symptoms, setSymptoms] = useState([])
    const [saveSymptoms, setSaveSymptoms] = useState([])
    const [inputSymptom, setInputSymptoms] = useState([])
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

    const addInputBox = () => {
        const value = [...inputSymptom, []]
        setInputSymptoms(value)
    }

    const handleInputChange = (onChangeValue, i) => {
        const inputData = [...inputSymptom]
        inputData[i] = onChangeValue.target.value;
        setInputSymptoms(inputData)
    }
    const handleDelete = (i) => {
        const deleteVal = [...inputSymptom]
        deleteVal.splice(i)
        setInputSymptoms(deleteVal)
    }
    const addSymptoms = () => {
        saveSymptoms.push(...inputSymptom)
        const bodyData = {
            "symptoms": saveSymptoms,
        }
        insertSymptoms({ reportId }, bodyData)
            .then(() => {
                inputSymptom.map((data, i) => {
                    const other = {
                        "symptoms": data,
                    }
                    insertSymptom_masterTable(other)
                })
            })
        toast.success("Saved Successfully!")
    }


    return (
        <div>
            <div className='symptomsData row'>
                <div className='col-md-3'>
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
                <div className="symptomsInput col-sm-4">
                    <span className="vital-signInput ">

                        {
                            inputSymptom.map((data, i) => {
                                return (
                                    <div className=' d-flex'>
                                        <input
                                            type="text"
                                            className="form-control mb-2"
                                            onChange={(e) => handleInputChange(e, i)}
                                            placeholder="Enter your symptoms"
                                        />
                                        <input
                                            type="submit"
                                            onClick={() => handleDelete(i)}
                                            className="btn_1 patientinfo ml-2"
                                            value="Delete"
                                        />
                                    </div>
                                )
                            })
                        }
                        <div>
                            <input
                                type="submit"
                                onClick={() => addInputBox()}
                                className="btn_1 addSymptomBtn "
                                value="Add Symptoms"
                            />
                        </div>
                    </span>
                </div>
                <div className='getSymptoms col-md-3'>
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
            <div className="row float-right toaster">
                <Toaster />
            </div>
        </div>
    )
}