import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MainButtonInput } from "../../../mainComponent/mainButtonInput";
import { MainInput } from "../../../mainComponent/mainInput";
import { useRecoilState } from "recoil";
import { setDoctorId } from "../../../recoil/atom/setDoctorId";
import AuthApi from "../../../services/AuthApi";

function ShowLoginOtp(props) {
    const { otp, _id, isSubscribed } = props.loginData;
    const getOTP = otp;
    const [id, setId] = useRecoilState(setDoctorId);
    const { loginOtp } = AuthApi();
    let navigate = useNavigate();
    const [loginotp, setLoginOtp] = useState('');
    const [errormessage, setErrormessage] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        loginOtp({ getOTP, _id }) //axios call
            .then(response => {
                setId(_id)
                if (getOTP !== loginotp) {
                    setErrormessage("Please enter correct OTP");
                } else {
                    if (isSubscribed === true) {
                        navigate(`/doctors/profile/${_id}`)
                    } else {
                        navigate(`/subscriptions/${_id}`);
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
export { ShowLoginOtp }