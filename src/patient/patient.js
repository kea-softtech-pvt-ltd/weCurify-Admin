import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MainNav } from '../mainComponent/mainNav';
import { Icon } from '@material-ui/core';
import { Wrapper } from '../mainComponent/Wrapper';
import UserLinks from '../doctor/Dashboard-card/partial/uselinks';
import { setHelperData } from '../recoil/atom/setHelperData';
import { useRecoilState } from "recoil";
import PatientList from '../doctor/Dashboard-card/PatientList';
import { PatientLoginForm } from './patientLoginForm';
import AppointmentApi from '../services/AppointmentApi';
export default function Patient() {
    const [patientList, setPatientList] = useState(null);
    const [active, setActive] = useState(false)
    const [helpersData, setHelpersData] = useRecoilState(setHelperData)
    const { getPatientListDetails } = AppointmentApi()
    const { doctorId } = useParams();

    useEffect(() => {
        getPatientDetails()
    }, [])
    function getPatientDetails() {
        getPatientListDetails({ doctorId })
            .then((result) => {
                patientData(result)
            })
    }
    const patientData = (list, e) => {
        const data = list.filter((patient) => {
            if (patient.status === "Ongoing") {
                return patient;
            }
        })
        setPatientList(data)
    }

    return (
        <Wrapper>
            <MainNav>
                <ul className="clearfix">
                    <li>
                        <Link to={`/dashboard/${doctorId}`}>
                            <i className="arrow_back backArrow" title="back button"></i>
                        </Link>
                    </li>
                    <h2 className='float-none' style={{ fontSize: 'inherit' }} >Appoinment</h2>
                    <li>
                        <Link onClick={() => setActive(!active)} >
                            <Icon className="addiconbutton " style={{ fontSize: 50 }}>add</Icon>
                        </Link>
                    </li>
                </ul>
            </MainNav>
            <div className="row ">
                <UserLinks
                    doctorId={doctorId}
                    helperId={helpersData._id}
                    accessModule={helpersData.access_module}
                />
                <div className="common_box">
                    {patientList ?
                        <>
                            {!active && patientList.length > 0 ?
                                <PatientList doctorId={doctorId} />
                                :
                                <PatientLoginForm doctorId={doctorId} />
                            }
                        </>
                        : null}
                </div>

            </div>
        </Wrapper>
    )
} 