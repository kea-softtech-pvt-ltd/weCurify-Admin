import React, { useState } from 'react'
import { MainInput } from '../../mainComponent/mainInput'
import { Button } from 'react-bootstrap'
import SubscriptionApi from '../../services/SubscriptionApi';

export default function AddFeature(props) {
    const { onClick } = props;
    const { AddFeature } = SubscriptionApi()
    const [feature, setFeature] = useState('')


    const handleChange = (e) => {
        setFeature(e.target.value)
    }

    const AddData = () => {
        const bodyData = {
            "name": feature
        }
        AddFeature(bodyData)
        onClick()
    }
    return (
        <>
            <div align='left' className="patientData"><b>Write Feature</b></div>
            <MainInput
                type="text"
                onChange={(e) => handleChange(e)}
                //   value={feature}
                // name="addFeature"
                placeholder='Feature'
            >
            </MainInput>
            <Button
                type="submit"
                onClick={AddData}
                variant="default"
                className='appColor btn_sub mr-3'>
                Add
            </Button>

        </>
    )
}