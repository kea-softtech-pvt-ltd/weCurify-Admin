import { useState } from "react";
import { useHistory } from "react-router-dom";
import { MainButtonInput } from "../mainComponent/mainButtonInput";
import { MainInput } from "../mainComponent/mainInput";
import { setNewPatientId } from "../recoil/atom/setNewPatientId";
import { useRecoilState } from "recoil";
import PatientApi from "../services/PatientApi";

function LoginPatientOtp(props) {
    const history = useHistory()
    const { patientId, loginData } = props;
    const [patientData, setPatientData] = useRecoilState(setNewPatientId);
    const [loginotp, setLoginOtp] = useState('');
    const getOTP = loginData.otp
    const [errormessage, setErrormessage] = useState(false);
    const { patientLoginOtp } = PatientApi()
    const handleSubmit = (e) => {
        e.preventDefault();
        const loginOtp = loginotp
        patientLoginOtp({ getOTP: loginOtp, _id: patientId })
            .then((response) => {
                setPatientData(patientId)
                const isLoggedIn = loginData.isLoggedIn
                if (getOTP !== loginOtp) {
                    setErrormessage("Please Enter Valid OTP");
                } else {
                    if (isLoggedIn === true) {
                        history.push(`/getLoginPatientProfile/${patientId}`);
                    } else {
                        history.push(`/createpatientprofile/${patientId}`);
                    }
                }
            })
    }
    return (
        <div className="row">
            <div className="col-md-6">
                <MainInput
                    type="text"
                    name="otp"
                    maxLength={6}
                    onChange={(e) => setLoginOtp(e.target.value)}
                    placeholder="6 digit OTP" >
                </MainInput>
                {errormessage && (<span className="validation">{errormessage}</span>)}
            </div>

            <div className="col-md-2">
                <MainButtonInput onClick={handleSubmit}>Login</MainButtonInput>
            </div>
        </div>
    )

}
export { LoginPatientOtp }