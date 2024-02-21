import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import PatientPersonalInfo from './partial/PatientPersonalInfo';
import Investigation from './partial/Investigation'
import Premedication from './partial/Premedication'
import MedicinePrescription from './partial/MedicinePrescription';
import NewFollowup from './partial/NewFollowup';
import Symptoms from './partial/Symptoms';
import LabPrescription from './partial/LabPrescription';
import { MainNav } from '../../mainComponent/mainNav';
import AuthApi from '../../services/AuthApi';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { Wrapper } from '../../mainComponent/Wrapper';
import UserLinks from '../Dashboard-card/partial/uselinks';
import { setHelperData } from "../../recoil/atom/setHelperData";
import { useRecoilState } from "recoil";
import ReportApi from '../../services/ReportApi';
import { setDoctorId } from '../../recoil/atom/setDoctorId';

function TabPanel(props) {
    const { children, value, index } = props;
    return (
        <div>
            {value === index && (
                <Box div={5}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}


export default function PatientMedicalReport() {
    const { reportId } = useParams();
    const { getDrInfo } = AuthApi()
    const [doctorId, setDoctorsId] = useRecoilState(setDoctorId);
    const [helpersData, setHelpersData] = useRecoilState(setHelperData)
    const [DoctorName, setDoctorsName] = useState([])
    const [value, setValue] = useState(0);
    const { state } = useLocation()
    const { fees } = state.data

    useEffect(() => {
        doctorInfo()
    }, [])

    const handleChange = (e, newValue) => {
        e.preventDefault();
        setValue(newValue);
    };

    function changeTab(tabIndex) {
        setValue(tabIndex);
    }

    const doctorInfo = () => {
        getDrInfo({ doctorId })
            .then((res) => {
                setDoctorsName(res.result[0].name)
            })
    }

    return (
        <Wrapper>
            <MainNav>
                <ul className="clearfix">
                    <li>
                        <Link to={`/patientappointment/${doctorId}`}>
                            <i className="arrow_back backArrow" title="back button"></i>
                        </Link>
                    </li>
                    <li
                        className='float-none'
                        style={{ fontSize: 'inherit' }}>
                        Consultation
                    </li>
                    <li style={{ fontSize: 'inherit' }} className="appColor" align='right'>Dr. {DoctorName}</li>
                </ul>
            </MainNav>
            <div className='row'>
                <UserLinks
                    doctorId={doctorId}
                    helperId={helpersData._id}
                    accessModule={helpersData.access_module}
                />
                <div className="white-box">
                    <Paper square>
                        <Tabs value={value} onChange={handleChange}
                            indicatorColor="primary"
                            textColor="primary">
                            <Tab label="General Info" />
                            <Tab label="Symptoms" />
                            <Tab label="Investigation" />
                            <Tab label="Premedication" />
                            <Tab label="Medicine-Prescription" />
                            <Tab label="Lab-Prescription" />
                            <Tab label="New follow-up" />
                        </Tabs>
                    </Paper>
                    <div className="tablecontent">
                        <TabPanel value={value} index={0}>
                            <PatientPersonalInfo
                                reportId={reportId}
                                onChange={() => changeTab(1)}
                            />
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <Symptoms
                                reportId={reportId}
                                onChange={() => changeTab(2)}
                            />
                        </TabPanel>
                        <TabPanel value={value} index={2}>
                            <Investigation
                                reportId={reportId}
                                onChange={() => changeTab(3)}
                            />
                        </TabPanel>

                        <TabPanel value={value} index={3}>
                            <Premedication
                                reportId={reportId}
                                onChange={() => changeTab(4)}
                            />
                        </TabPanel>

                        <div className="row">
                            <TabPanel value={value} index={4}>
                                <MedicinePrescription
                                    reportId={reportId}
                                    onChange={() => changeTab(5)}
                                />
                            </TabPanel>
                        </div>

                        <div>
                            <TabPanel value={value} index={5}>
                                <LabPrescription
                                    reportId={reportId}
                                    onChange={() => changeTab(6)}
                                />
                            </TabPanel>
                        </div>
                        <TabPanel value={value} index={6}>
                            <NewFollowup
                                fees={fees}
                                reportId={reportId}
                                onChange={() => changeTab(7)}
                            />
                        </TabPanel >


                    </div>
                    {/* <div className="text-right add_top_30"><input type="submit" className="btn_1" value="save" /></div> */}
                </div>
            </div>

        </Wrapper >
    )
}