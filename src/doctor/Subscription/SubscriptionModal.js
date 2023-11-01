import React, { useState } from 'react'
import { MainInput } from '../../mainComponent/mainInput'
import { Autocomplete } from '@material-ui/lab'
import { TextField } from '@mui/material'
import { useEffect } from 'react'
import { Button } from 'react-bootstrap'
import SubscriptionApi from '../../services/SubscriptionApi'
import ReactSwitch from 'react-switch';

export default function SubscriptionModal(props) {
    const { onClick } = props;
    const [planData, setPlanData] = useState([])
    const [feature, setFeature] = useState([])
    const [saveFeatureData, setSaveFeatureData] = useState([])
    const [subscriptionData, allSubscriptionData] = useState([])
    const { getSubscriptionFeature, addSubscriptionPlan } = SubscriptionApi()
    const [checked, setChecked] = useState(true);

    const Plan = [
        {
            "_id": 0,
            "days": 30
        },
        {
            "_id": 1,
            "days": 90
        },

        {
            "_id": 3,
            "days": 180
        },
        {
            "_id": 4,
            "days": 356
        }
    ]
    useEffect(() => {
        getFeatureData()
    }, [])

    const handleSwitch = val => {
        setChecked(val)
    }
    const handleChange = (event, index) => {
        const { name, value } = event.target
        allSubscriptionData({ ...subscriptionData, [name]: value });

    }
    const handlePlan = (e, selectedData) => {
        e.preventDefault();
        setPlanData(selectedData)
    }

    const handleFeatureSave = (e, selectedData) => {
        e.preventDefault()
        setSaveFeatureData(selectedData)
    }

    const getFeatureData = () => {
        getSubscriptionFeature()
            .then((res) => {
                setFeature(res)
            })
    }
    const addSubscription = () => {
        const bodyData = {
            'name': subscriptionData.planName,
            'frequency': planData.days,
            'amount': subscriptionData.Amount,
            'features': saveFeatureData,
            'status': checked
        }
        addSubscriptionPlan(bodyData)
        onClick()
    }
    return (
        <div>
            <div align='left' className="patientData"><b > Plan Name</b></div>
            <MainInput
                type="text"
                onChange={(event) => handleChange(event)}
                value={subscriptionData.name}
                name="planName"
                placeholder='Plan Name'>
            </MainInput>
            <div align='left' className="patientData"><b >Amount</b></div>
            <MainInput
                type="text"
                onChange={(event) => handleChange(event)}
                value={subscriptionData.name}
                placeholder='Amount'
                name="Amount">
            </MainInput>

            <div className='align-left '>
                <div align='left' className="patientData"><b>Billing Frequency</b></div>
                <Autocomplete
                    disablePortal={true}
                    disableClearable
                    disableCloseOnSelect
                    className='autocompleteWidth'
                    id={Plan._id}
                    value={Plan.days}
                    onChange={handlePlan}
                    getOptionLabel={(Plan) => `${Plan.days}`}
                    options={Plan}
                    renderInput={(params) => <TextField {...params} label="choose one" />}
                />
            </div>
            <div className='align-left '>
                <div align='left' className="patientData"><b>Features Name</b></div>
                <Autocomplete
                    id={feature._id}
                    disablePortal={true}
                    disableClearable
                    multiple={true}
                    disableCloseOnSelect
                    value={saveFeatureData.name}
                    onChange={handleFeatureSave}
                    options={feature.map((option) => `${option.name}`)}
                    renderInput={(params) =>
                    (<TextField {...params}
                        label="Add Feature"
                    />)}
                />
                <div className='my-2'>
                    <div align='left' className='my-2'><b >Status</b></div>
                    <ReactSwitch
                        checked={checked}
                        onChange={handleSwitch}
                        onColor="#1a3c8b"
                    />
                </div>
                <Button variant="primary" style={{ border: '1px solid #1a3c8b', float: 'right' }} className="appColor modalbtn" onClick={addSubscription}>
                    Add
                </Button>
            </div>

        </div >
    )
}