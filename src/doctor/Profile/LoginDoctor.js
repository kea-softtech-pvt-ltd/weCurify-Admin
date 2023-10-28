import { useHistory } from "react-router-dom";
import { useState } from "react";
import { MainButtonInput } from "../../mainComponent/mainButtonInput";
import { MainInput } from "../../mainComponent/mainInput";
import AuthApi from "../../services/AuthApi";

export default function LoginDoctor() {
    //for show otp input
    const [loginData, setLoginData] = useState("");
    // const [password, setPassword] = useState("");
    const history = useHistory()
    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value });
    }
    // const [loginData, setLoginData] = useState([]);
    const [isError, setIsError] = useState(false);
    // const [showOTP, setShowOTP] = useState(false);
    const { loginAdmin } = AuthApi();

    // const getOTPSection = (e) => {
    //     e.preventDefault()
    //     if (mobile.length < 10) {
    //         setIsError('Please Enter valid password .')
    //     }
    //     else {
    //         login({ mobile: mobile })
    //             .then(response => {
    //                 alert(response.data.otp)
    //                 let item = response.data
    //                 setLoginData(item)
    //                 setShowOTP(true)
    //             })

    //     }
    // };


    const loginAdminData = (e) => {
        e.preventDefault();
        const bodyData = {
            "username": loginData.username,
            "password": loginData.password
        }
        loginAdmin(bodyData)
            .then((res) => {
                if (res === null) {
                    setIsError("Please Enter Valid Username And Password")
                }
                else {
                    history.push(`/doctorlist`)
                }
            })
    }

    return (
        <div>
            <main>
                <div className="bg_color_2">
                    <div className="container margin_60_35">
                        <div id="login-2">
                            <h1> Login To KeaCure Admin</h1>
                            <form >
                                <div className="box_form clearfix">
                                    <div className="box_login last">
                                        <div className="row">
                                            <div className=" col-md-12 ">
                                                <MainInput
                                                    className=" form-control"
                                                    type="text"
                                                    name="username"
                                                    onChange={handleChange}
                                                    placeholder="Enter your name" >
                                                </MainInput>
                                            </div>
                                            <div className=" col-md-12 ">
                                                <MainInput
                                                    className="  form-control"
                                                    type="password"
                                                    name="password"
                                                    onChange={handleChange}
                                                    placeholder="Password" >
                                                </MainInput>
                                                <span className="validation mb-2 ">{isError}</span>
                                            </div>
                                        </div>

                                        <div className="" align='center'>
                                            <MainButtonInput onClick={(e) => loginAdminData(e)}>Login</MainButtonInput>
                                        </div>
                                    </div>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}