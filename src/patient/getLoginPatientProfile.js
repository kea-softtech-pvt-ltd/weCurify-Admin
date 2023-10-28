import { useParams } from "react-router-dom";
import { FetchPatientInfo } from "./fetchPatientInfo";
import { Wrapper } from "../mainComponent/Wrapper";
import UserLinks from "../doctor/Dashboard-card/partial/uselinks";
import { useRecoilState } from "recoil";
import { setHelperData } from "../recoil/atom/setHelperData";
import { MainNav } from "../mainComponent/mainNav";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { setDoctorId } from "../recoil/atom/setDoctorId";
export default function GetLoginPatientProfile() {
    const [helpersData, setHelpersData] = useRecoilState(setHelperData)
    const { patientId } = useParams()
    const [DoctorId, setDoctorsId] = useRecoilState(setDoctorId)
    const doctorId = DoctorId
    return (
        <>
            <Wrapper>
                <MainNav>
                    <ul className="clearfix">
                        <li>
                            <Link to={`/allpatient`}>
                                <i className="arrow_back backArrow" title="back button"></i>
                            </Link>
                        </li>
                        <li className='float-none' style={{ fontSize: 'inherit' }}>Walkin Patient</li>
                    </ul>
                </MainNav>
                <div className='row'>
                    <UserLinks
                        doctorId={doctorId}
                        helperId={helpersData._id}
                        accessModule={helpersData.access_module}
                    />
                    <div className="container margin_60">
                        <div className="row patientFetch">
                            <div className=" col-md-8">
                                <div className="box_general_3 cart" >
                                    <FetchPatientInfo patientId={patientId} />
                                    <div align='right'>
                                        <div className="buttonLink appColor" align='center'>
                                            <Link to={`/appointmentbookingsection/${doctorId}`} className="btn">
                                                <span className=" appColor">Select Slot</span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <DoctorBookingConfirmation doctorId={doctorId} patientId={patientId} /> */}
                            {/* <div className="row">
                                <div className=" col-sm-6">
                                    <div className="box_general_3 cart">
                                        <FetchPatientInfo patientId={patientId} />
                                    </div>
                                </div>
                                <DoctorBookingConfirmation doctorId={doctorId} patientId={patientId} />
                            </div> */}
                        </div>
                    </div>
                </div>
            </Wrapper>
        </>
    )
}