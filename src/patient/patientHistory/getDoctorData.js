import React from 'react';
import { useEffect, useState } from "react";
import AuthApi from "../../services/AuthApi";

export default function GetDoctorData(props) {
    const { doctorId } = props

    const [doctorData, setDoctorData] = useState([]);

    const { getDrInfo } = AuthApi()


    useEffect(() => {
        getDoctorDetails();
    }, [])

    function getDoctorDetails() {
        getDrInfo({ doctorId })
        .then((result) => {
            setDoctorData(result[0])
        })
    }


    return (
        <>
            <div className='row'>
                <div className='col-md-5'>
                    <img
                        src={doctorData.photo}
                        alt="doctorProfile"
                        className='doctorphotoPatient'
                    />
                </div>
                <div className='col-md-7' align='left'>
                    <span className='patientName'>
                        Dr.{doctorData.name}
                    </span>
                    {doctorData['educationList'] ?
                        <>
                            {
                                doctorData['educationList'].map((item, i) => {
                                    return (
                                        <>
                                            <div key={i} className=''>
                                                {item.specialization}
                                            </div>
                                        </>
                                    )
                                })
                            }

                        </ >
                        : null}
                </div>
            </div>
        </>
    )
}