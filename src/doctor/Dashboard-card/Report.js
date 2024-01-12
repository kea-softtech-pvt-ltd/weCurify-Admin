import React from 'react';
import { useEffect, useState } from "react";
import { setHelperData } from "../../recoil/atom/setHelperData";
import { useRecoilState } from "recoil";
import AppointmentApi from '../../services/AppointmentApi';

export default function Report(props) {
    const { doctorId } = props
    const [patientList, setPatientList] = useState([]);
    const { getPatientListDetails } = AppointmentApi();
    const [patientData, setPatientData] = useState([]);
    const [total, setTotal] = useState([]);

    useEffect(() => {
        getPatientDetails();
    }, [])

     function getPatientDetails() {
        getPatientListDetails({ doctorId })
            .then((result) => {
                console.log('========',result)
                const data = result.filter((patient) => {
                    if (patient.status === "Completed") {
                        return patient;
                    }
                })
                setPatientList(data)
                const res = result.filter(function (item, index) {
                    return index === result.findIndex((obj) => {
                        if (item.patientId === obj.patientId)
                            return item
                    })
                })
                setPatientData(res)
                const item = result.filter((res) => {
                    if (res.payment === "done")
                        return res
                })
                const total = item.reduce((initialValue, curValue) => {
                    return initialValue + parseInt(curValue.total)
                }, 0)
                setTotal(total)
            })

    }

    return (
        <>
            <div className="">
                <div className='row'>
                    <div className="col-md-4 ">
                        <div className="cardDiv">
                            <span className='cardSpan '>
                                <span className='report m-3'>Total Appoinment - </span>
                                <span className='report m-3'>{patientList.length}</span>
                            </span>
                        </div>
                    </div>
                    <div className="col-md-4 ">
                        <div className="cardDiv">
                            <span className='cardSpan '>
                                <span className='report m-3'>Total Patients - </span>
                                <span className='report m-3'>{patientData.length}</span>
                            </span>
                        </div>
                    </div>
                    <div className="col-md-4 ">
                        <div className="cardDiv">
                            <span className='cardSpan '>
                                <span className='report m-3'>Total Amount - </span>
                                <span className='report m-3'>{total}</span>
                            </span>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}