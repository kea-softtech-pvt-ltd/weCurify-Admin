import { Link, useParams } from "react-router-dom";
import { FetchDoctorPersonalDetails } from "./Personal/Partial/fetchDoctorPersonalDetails";
import { MainNav } from "../../mainComponent/mainNav";
import UserLinks from "../Dashboard-card/partial/uselinks";
import { Wrapper } from "../../mainComponent/Wrapper";
import { setHelperData } from "../../recoil/atom/setHelperData";
import { useRecoilState } from "recoil";
import Report from "../Dashboard-card/Report";
export default function DoctorProfile() {
    const { doctorId } = useParams();
    const [helpersData, setHelpersData] = useRecoilState(setHelperData)

    // const handleShowAppointment = () => {
    //     history.push(`/patientlist/${doctorId}`)
    // }
    // const handleAppointmentHistory = () => {
    //     history.push(`/Patientsclinichistory/${doctorId}`)
    // }

    return (

        <Wrapper>
            <MainNav>
                <ul className="clearfix">
                    <li>
                        <Link
                            to={`/doctorlist`}>
                            <i className="arrow_back backArrow" title="back button"> </i>
                        </Link>
                    </li>
                    <li className='float-none' style={{ fontSize: 'inherit' }}>General info</li>
                    <li>
                        <Link
                            to={`/editdoctorprofile/${doctorId}`}>
                            <i className="icon_pencil-edit" title="Edit profile"></i>
                        </Link>
                    </li>
                </ul>
            </MainNav>
            <div className='row'>
                <UserLinks
                    doctorId={doctorId}
                    helperId={helpersData._id}
                    accessModule={helpersData.access_module} />
                <div className="white-box" >
                    <div id="section_1" className="col-lg-12">
                        <div >
                            <FetchDoctorPersonalDetails doctorId={doctorId} />
                        </div>
                    </div>
                    <div id="section_1" className="col-lg-12">
                        <div>
                            <Report doctorId={doctorId} />
                        </div>
                    </div>
                </div>
                </div>
        </Wrapper>
    )
}