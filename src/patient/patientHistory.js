import React from "react";
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { TabPanel } from "../common/tabpanel";
import { MainNav } from "../mainComponent/mainNav";
import { MainTabs } from "../mainComponent/mainTabs";
import { Wrapper } from "../mainComponent/Wrapper";
import Ongoing from "./patientHistory/Ongoing";
import Completed from "./patientHistory/Completed";
import Cancelled from "./patientHistory/Cancelled";
import UserLinks from "../doctor/Dashboard-card/partial/uselinks";
import { useRecoilState } from "recoil";
import { setDoctorId } from "../recoil/atom/setDoctorId";

export default function PatientHistory() {
    const { patientId } = useParams();
    //for using tab
    const [value, setValue] = useState(0);
    const [DoctorId, setDoctorsId] = useRecoilState(setDoctorId)
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    return (
        <Wrapper>
            <MainNav>
                <ul className="clearfix">
                    <li>
                        <Link to={`/allpatient`}>
                            <i className="arrow_back backArrow" title="back button"></i>
                        </Link>
                    </li>
                    <li className='float-none' style={{ fontSize: 'inherit' }}>Patient Information</li>
                </ul>

            </MainNav>
            <div className="row">
                <UserLinks
                    doctorId={DoctorId}
                />
                <div className="common_box">
                    <MainTabs
                        value={value}
                        onChange={handleChange}
                        label="Ongoing Appointment"
                        label1="Completed Appointment"
                        label2="Cancelled Appointment">
                    </MainTabs>

                    <TabPanel  value={value} index={0}>
                        <Ongoing doctorId={DoctorId} patientId={patientId} />
                    </TabPanel>

                    <TabPanel value={value} index={1}>
                        <Completed doctorId={DoctorId} patientId={patientId} />
                    </TabPanel>

                    <TabPanel value={value} index={2}>
                        <Cancelled doctorId={DoctorId} patientId={patientId} />
                    </TabPanel>

                </div>

            </div>
        </Wrapper>
    );
}
