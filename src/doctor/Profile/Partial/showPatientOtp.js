import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MainButtonInput } from "../../../mainComponent/mainButtonInput";
import { MainInput } from "../../../mainComponent/mainInput";
import { useRecoilState } from "recoil";
import { setDoctorId } from "../../../recoil/atom/setDoctorId";
import AuthApi from "../../../services/AuthApi";

function ShowPatientOtp(props) {
    const { otp, _id, isLoggedIn } = props.loginData;
    const getOTP = otp
    const [id, setId] = useRecoilState(setDoctorId)
    const { loginOtp } = AuthApi()
    let navigate = useNavigate()
    const [loginotp, setLoginOtp] = useState('');
    const [errormessage, setErrormessage] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await loginOtp({ getOTP, _id }) 
            .then(response => {
                setId(_id)
                if (getOTP !== loginotp) {
                    setErrormessage("Please enter correct OTP");
                } else {
                    if (isLoggedIn === true) {
                       navigate(`patientinfo/${_id}`)
                     }else {
                      navigate(`/appointment/${_id}`);
                     }
                }
            })
    }

    return (
        <>
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
        </>
    )
}
export { ShowPatientOtp }