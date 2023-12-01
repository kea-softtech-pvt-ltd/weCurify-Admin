import React, { useState } from 'react'
import { MainInput} from '../../mainComponent/mainInput'
import { Autocomplete } from '@material-ui/lab'
import { TextField } from '@mui/material'
import SubscriptionApi from '../../services/SubscriptionApi'
import { useEffect } from 'react'
import ReactSwitch from 'react-switch';
import { MainButtonInput } from '../../mainComponent/mainButtonInput'

export default function EditSubscriptionModal(props) {
    const { onClick, planId } = props;
    const [ planData, setPlanData] = useState([])
    const [ feature, setFeature] = useState([])
    const [ saveFeatureData, setSaveFeatureData] = useState([])
    const [ subscriptionData, allSubscriptionData] = useState([])
    const [ checked, setChecked] = useState();

    const {
        getSubscriptionFeature,
        updateSubscriptionPlan,
        getSubscriptionPlanById
    } = SubscriptionApi()

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
        getData()
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

    const getData = () => {
        getSubscriptionPlanById(planId)
            .then((res) => {
                setChecked(res[0].status)
                allSubscriptionData(res[0])
                // setPlanData(res[0].frequency)
                //setFeature(res[0].features)
            })
        getSubscriptionFeature()
            .then((res) => {
                setFeature(res)
            })
    }
    const EditData = (e) => {
        e.preventDefault();
        const bodyData = {
            'name': subscriptionData.name,
            'amount': subscriptionData.amount,
            'frequency': planData.days,
            'features': saveFeatureData,
            'status': checked
        }
        updateSubscriptionPlan(planId, bodyData)
        onClick()
    }
    return (
        <form onSubmit={EditData} id={"EditData"} encType='multipart/form-data'>
            <div>
                <div align='left' className="patientData"><b > Plan Name</b></div>
                <MainInput
                    type="text"
                    onChange={(event) => handleChange(event)}
                    value={subscriptionData.name}
                    name="name"
                    placeholder='plan Name'
                >
                </MainInput>
                <div align='left' className="patientData"><b >Amount</b></div>
                <MainInput
                    type="text"
                    onChange={(event) => handleChange(event)}
                    value={subscriptionData.amount}
                    name="amount"
                    placeholder='Amount'
                >
                </MainInput>
                <div>
                    <div align='left' className="patientData"><b>Billing Frequency</b></div>
                    <Autocomplete
                        disablePortal={true}
                        disableClearable
                        disableCloseOnSelect
                        id={Plan._id}
                        value={Plan.days}
                        onChange={handlePlan}
                        getOptionLabel={(Plan) => `${Plan.days}`}
                        options={Plan}
                        renderInput={(params) => <TextField {...params} label="Choose one" />}
                    />
                </div>
                <div>
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
                    <div className="text-center add_top_30">
                        <MainButtonInput>Save</MainButtonInput>
                    </div>
                </div>
            </div>
        </form>
    )
}