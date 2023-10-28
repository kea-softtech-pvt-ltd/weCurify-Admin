import { useState, useEffect } from "react";
import AuthApi from "../../../services/AuthApi";
import PatientProfile from "../../../img/profile.png"
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import ReportApi from "../../../services/ReportApi";
function CalendarModalBox(props) {
    const { patientId, doctorId, patientList } = props;
    const [patientDetails, setPatientDetails] = useState([]);
    const { patientDetailsData } = AuthApi()
    const { MedicineReportData } = ReportApi()
    const history = useHistory()

    useEffect(() => {
        getPatientInfoById();
    }, [])

    function saveData() {
        const bodyData = {
            "doctorId": doctorId,
            "patientId": patientId,
            'patientAppointmentId': patientList._id,
            'clinicId': patientList.clinicId,
            "fees": patientList.fees
        }
        MedicineReportData(bodyData)
            .then((res) => {
                history.push(`/consultation/${res._id}`, { data: { fees: patientList.fees } })
            })
    }


    const getPatientInfoById = async () => {
        await patientDetailsData({ patientId })
            .then(jsonRes => {
                setPatientDetails(jsonRes[0])
            })
    };

    return (
        <div>
            <div className="d-flex container " >
                <div className=" mx-4 align-items-left ">
                    <img src={PatientProfile} alt="Patient Profile" />
                </div>

                <div>
                    <div className=" patientModalName align-item-right ">
                        {patientDetails.name}
                    </div>
                    <div>
                        <b className="patientModal">Email : </b>
                        {patientDetails.email}
                    </div>
                    <div>
                        <b className="patientModal">Gender : </b>
                        {patientDetails.gender}
                    </div>
                    <div>
                        <b className="patientModal">Mobile No :  </b>
                        {patientDetails.mobile}
                    </div>
                    <div>
                        <b className="patientModal">Age :    </b>
                        {patientDetails.age}
                    </div>
                    <div>
                        <b className="patientModal">Time :    </b>
                        {patientDetails.slotTime}
                    </div>

                    <span className='' align='left'>
                        {patientList.status === "Ongoing" ?
                            <Link to="#" onClick={() => saveData()}>
                                <button className="btn appColor modalbtn ">Start Consultation</button>
                            </Link>
                            : null}
                    </span>
                </div>
            </div>
        </div>

    )
}
export default CalendarModalBox