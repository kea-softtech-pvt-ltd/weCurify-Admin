import { useHistory, useParams } from "react-router-dom";
import { MainNav } from '../mainComponent/mainNav';
import { MainCards } from '../mainComponent/mainCards';
import { MainWrapper } from '../mainComponent/mainWrapper';
import UserLinks from "../doctor/Dashboard-card/partial/uselinks";
import { setHelperData } from "../recoil/atom/setHelperData";
import { setDoctorId } from "../recoil/atom/setDoctorId";
import { useRecoilState } from "recoil";
import { Wrapper } from "../mainComponent/Wrapper";
export default function PatientDashboard() {
    const [helpersData, setHelpersData] = useRecoilState(setHelperData)
    const [doctorId, setDoctorsId] = useRecoilState(setDoctorId)
    console.log("=/////",doctorId)
    const { patientId } = useParams()
    // console.log('===....', patientId)
    let history = useHistory();
    // const doctorId = getDoctorId;
    function handleClick() {
        history.push(`/appointment/${patientId}`);
    }

    function onClick() {
        history.push(`/patientinfo/${patientId}`);
    }

    function onPaymentClick() {
        history.push(`/doctorbooking/${patientId}`);
    }

    function onProfileClick() {
        history.push(`/patientprofile/${patientId}`);
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