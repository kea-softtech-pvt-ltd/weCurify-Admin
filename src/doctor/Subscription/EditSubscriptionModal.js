import React, { useState } from 'react'
import { MainInput, MainInputBox } from '../../mainComponent/mainInput'
import { Autocomplete } from '@material-ui/lab'
import { TextField } from '@mui/material'
import SubscriptionApi from '../../services/SubscriptionApi'
import { useEffect } from 'react'
import { Button } from 'react-bootstrap'


export default function EditSubscriptionModal(props) {
    const { onClick,planId, plan } = props;
    const [planData, setPlanData] = useState([])
    const [feature, setFeature] = useState([])
    const [saveFeatureData, setSaveFeatureData] = useState([])
    const [subscriptionData, allSubscriptionData] = useState(plan)
    const { getSubscriptionFeature, updateSubscriptionPlan } = SubscriptionApi()
    const Plan = [
        {
            "_id": 0,
            "name": "Week"
        },
        {
            "_id": 1,
            "name": "Months"
        },

        {
            "_id": 3,
            "name": "Year"
        }
    ]
    useEffect(() => {
        getFeatureData()
    }, [])
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
            'name': planData.name,
            'frequency': subscriptionData.planName,
            'amount': subscriptionData.Amount,
            'features': saveFeatureData.name,
            'status': subscriptionData.Status
        }
        console.log("=====body",bodyData)
        updateSubscriptionPlan(planId,bodyData)
        onClick()
    }
    return (
        <div>
            <div align='left' className="patientData"><b > Plan Name</b></div>
            <MainInput
                type="text"
                onChange={(event) => handleChange(event)}
                value={subscriptionData.name}
                name="planName">
            </MainInput>
            <div align='left' className="patientData"><b >Amount</b></div>
            <MainInput
                type="text"
                onChange={(event) => handleChange(event)}
                value={subscriptionData.amount}
                name="Amount">
            </MainInput>
            <div align='left' className="patientData"><b >Status</b></div>
            <MainInput
                type="text"
                onChange={(event) => handleChange(event)}
                value={subscriptionData.status}
                name="Status">
            </MainInput>
            <div className='align-left '>
                <div align='left' className="patientData"><b>Billing Frequency</b></div>
                <Autocomplete
                    disablePortal={true}
                    disableClearable
                    disableCloseOnSelect
                    className='autocompleteWidth'
                    id={Plan._id}
                    value={Plan.name}
                    onChange={handlePlan}
                    getOptionLabel={(Plan) => `${Plan.name}`}
                    options={Plan}
                    renderInput={(params) => <TextField {...params} label="" />}
                />
            </div>
            <div className='align-left '>
                <div align='left' className="patientData"><b>Features Name</b></div>
                <Autocomplete
                    // style={{ width: 100 }}
                    className='autocompleteWidth'
                    id={feature._id}
                    disablePortal={true}
                    disableClearable
                    disableCloseOnSelect
                    onChange={handleFeatureSave}
                    getOptionLabel={(option) => `${option.name}`}
                    options={feature}
                    renderInput={(params) =>
                    (<TextField {...params}
                        label=""
                    />)}
                />
                <Button variant="primary" style={{ border: '1px solid #1a3c8b',float:'right'}} className="appColor modalbtn" onClick={addSubscription}>
                    Add
                </Button>
            </div>

        </div >
    )
}