import React from 'react';
import { TabPanel } from "../../common/tabpanel";
import { DoctorClinic } from "./Clinic/doctorClinic"
import { useState } from "react";
import { DoctorProfessionalExperience } from "./Experience/doctorProfessionalExperience"
import { DoctorEducation } from "./Education/doctorEducation";
import { DoctorPersonalInformation } from "./Personal/DoctorPersonalInformation";
import { MainNav } from '../../mainComponent/mainNav';
import { MainTabs } from '../../mainComponent/mainTabs';
import { Link, useParams } from 'react-router-dom';
import { Wrapper } from '../../mainComponent/Wrapper';
import UserLinks from '../Dashboard-card/partial/uselinks';
import { setHelperData } from "../../recoil/atom/setHelperData";
import { useRecoilState } from "recoil";
export default function EditDoctorProfile() {
    const { doctorId } = useParams();
    const [helpersData, setHelpersData] = useRecoilState(setHelperData)
    //for using tab
    const [tabValue, setTabValue] = useState(0);
    const handleChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const goToEducation = () => {
        setTabValue(1)
    }
    const goToExperience = () => {
        setTabValue(2)
    }
    const goToClinic = () => {
        setTabValue(3)
    }


    return (
        <Wrapper>
            <MainNav>
                <ul className="clearfix">
                    <li>
                        <Link to={`/doctorprofile/${doctorId}`}>
                            <i className="arrow_back backArrow" title="back button"></i>
                        </Link>
                    </li>
                    <li>
                        <Link to="#section_1" className="active">
                            Doctor Information
                        </Link>
                    </li>
                    <li>
                        <Link to={`/doctorlist`}>
                            Done
                        </Link>
                    </li>
                </ul>
            </MainNav>
            <div className='row'>
                <UserLinks
                    doctorId={doctorId}
                    helperId={helpersData._id}
                    accessModule={helpersData.access_module}
                />
                <div className="white-box">
                    <MainTabs
                        value={tabValue}
                        onChange={handleChange}
                        label="Personal Information"
                        label1="Educational Details"
                        label2="Professional Experience"
                        label3="Clinic"
                    >
                    </MainTabs>

                    <TabPanel value={tabValue} index={0}>
                        <DoctorPersonalInformation
                            data={goToEducation}
                            doctorId={doctorId}
                        />
                    </TabPanel>

                    <TabPanel value={tabValue} index={1}>
                        <DoctorEducation
                            data={goToExperience}
                            doctorId={doctorId}
                        />
                    </TabPanel>

                    <TabPanel value={tabValue} index={2}>
                        <DoctorProfessionalExperience
                            data={goToClinic}
                            doctorId={doctorId}
                        />
                    </TabPanel>

                    <TabPanel value={tabValue} index={3}>
                        <DoctorClinic
                            doctorId={doctorId} />
                    </TabPanel>
                </div>
            </div>
        </Wrapper>
    )
}