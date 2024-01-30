import React, { useEffect } from "react";
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { TabPanel } from "../common/tabpanel";
import { PatientPersonalInformation } from "../patient/patientPersonalInformation";
import { MainNav } from "../mainComponent/mainNav";
import { MainTabs } from "../mainComponent/mainTabs";
import { Wrapper } from "../mainComponent/Wrapper";
import UserLinks from "../doctor/Dashboard-card/partial/uselinks";
import { setHelperData } from "../recoil/atom/setHelperData";
import { setDoctorId } from "../recoil/atom/setDoctorId";
import { useRecoilState } from "recoil";
import { FetchPatientLifestyleData } from "./fetchPatientLifestyleData";
import { FetchPatientMedicalInfo } from "./fetchPatientMedicalInfo";
import PatientApi from "../services/PatientApi";
export default function PatientProfile() {
  const { patientId } = useParams();
  const [helpersData, setHelpersData] = useRecoilState(setHelperData)
  const [getDoctorId, setGetDoctorId] = useRecoilState(setDoctorId)
  const [value, setValue] = useState(0);
  const [patientName, setPatientName] = useState([])
  const { fetchPatient } = PatientApi()

  useEffect(() => {
    patientData()
  }, [])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const doctorId = getDoctorId;

  const goToMedical = () => {
    setValue(1)
  }
  const goToLifestyle = () => {
    setValue(2)
  }

  const patientData = () => {
    fetchPatient({ patientId })
      .then((res) => {
        setPatientName(res[0].name)
      })
  }
  return (
    <>
      <Wrapper>
        <MainNav>
          <ul className="">
            <li>
              <Link to={`/allpatient`}>
                <i className="arrow_back backArrow" title="back button"></i>
              </Link>
            </li>
            <li className='float-none' style={{ fontSize: 'inherit' }}>Patient Information</li>
            <li style={{ fontSize: 'inherit' }} className="appColor" align='right'>Patient - {patientName}</li>
          </ul>
        </MainNav>

        <div className="row">
          <UserLinks
            doctorId={doctorId}
            helperId={helpersData._id}
            accessModule={helpersData.access_module}
          />
          <div className="col-lg-10">
            <div className="white-box">
              <MainTabs
                value={value}
                onChange={handleChange}
                label="Personal"
                label1="Medical "
                label2="Lifestyle">
              </MainTabs>

              <TabPanel value={value} index={0}>
                <PatientPersonalInformation personal={goToMedical} patientId={patientId} />
              </TabPanel>

              <TabPanel value={value} index={1}>
                <FetchPatientMedicalInfo Medical={goToLifestyle} patientId={patientId} />
              </TabPanel>

              <TabPanel value={value} index={2}>
                <FetchPatientLifestyleData patientId={patientId} />
              </TabPanel>
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  )
}
