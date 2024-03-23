import {  useNavigate, useParams } from "react-router-dom";
import { MainNav } from '../mainComponent/mainNav';
import { MainCards } from '../mainComponent/mainCards';
import UserLinks from "../doctor/Dashboard-card/partial/uselinks";
import { setHelperData } from "../recoil/atom/setHelperData";
import { setDoctorId } from "../recoil/atom/setDoctorId";
import { useRecoilState } from "recoil";
import { Wrapper } from "../mainComponent/Wrapper";

export default function PatientDashboard() {
    const [helpersData, setHelpersData] = useRecoilState(setHelperData)
    const [doctorId, setDoctorsId] = useRecoilState(setDoctorId)
    const { patientId } = useParams()
    let navigate = useNavigate();
    
    function handleClick() {
        navigate(`/appointment/${patientId}`);
    }

    function onClick() {
        navigate(`patientinfo/${patientId}`);
    }

    function onPaymentClick() {
        navigate(`/doctorbooking/${patientId}`);
    }

    function onProfileClick() {
        navigate(`patientinfo/${patientId}`);
    }

    return (
        <Wrapper>
            <MainNav>Dashboard</MainNav>
            <div className="row">
                <UserLinks
                    doctorId={doctorId}
                    helperId={helpersData._id}
                    accessModule={helpersData.access_module}
                />
                <div className="white-box">
                    <div className="row">
                        <div className="col-lg-4 ">
                            <MainCards
                                Typography="Appointment History"
                                Typography1="adjective"
                                Typography2="well meaning and kindly."
                                onClick={handleClick}> Appointment
                            </MainCards>
                        </div>

                        <div className="col-lg-4">
                            <MainCards
                                Typography="Payment"
                                Typography1="adjective"
                                Typography2="well meaning and kindly."
                                onClick={onPaymentClick}> Payment
                            </MainCards>
                        </div>

                        <div className="col-lg-4 ">
                            <MainCards
                                Typography="Profile"
                                Typography1="adjective"
                                Typography2="well meaning and kindly."
                                onClick={onProfileClick}> Patient Profile
                            </MainCards>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-4 ">
                            <MainCards
                                Typography="Queue"
                                Typography1="patient Information"
                                Typography2="well meaning and kindly."
                                onClick={onClick}> Patient Info
                            </MainCards>
                        </div>
                    </div>
                </div>
            </div>
        </Wrapper>
    )
}