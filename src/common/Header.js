import React, { useEffect } from "react";
import { Link, } from "react-router-dom";
import { doctorIdState } from "../recoil/selector/doctorIdState"
import { setHelperData } from "../recoil/atom/setHelperData";
import { setDoctorId } from "../recoil/atom/setDoctorId";
import { useRecoilValue, useRecoilState } from "recoil";
import appLogo from '../../src/img/small_wecurify.png'
import { setloggedIn } from "../recoil/atom/setloggedIn";
// import { BroadcastChannel } from "broadcast-channel";
// import { EventListener } from "event-listener";

export default function Header() {
    // const doctorId = useRecoilValue(doctorIdState)
    const [doctorId, setDoctor] = useRecoilState(setDoctorId);
    const [helpersData, setHelpersData] = useRecoilState(setHelperData)
    const [loggedIn, setLoggedIn] = useRecoilState(setloggedIn);


    const handleLogout = () => {
        // Perform logout actions here
        // logoutChannel.postMessage("Logout");
        //   logoutEventListener.trigger("logout");

    };

    return (
        <header style={{ zIndex: '2' }} className="header_sticky">
            <Link to="#menu" className="btn_mobile">
                <div className="hamburger hamburger--spin" id="hamburger">
                    <div className="hamburger-box">
                        <div className="hamburger-inner"></div>
                    </div>
                </div>
            </Link>
            <div className="container">
                <div className="row">
                    <div className="col-lg-3 col-6">
                        <div id="logo_home" align='left'>
                            <Link to={`/doctorList`}>
                                <img className='appLogo' src={appLogo} alt="Something Went Wrong" />
                            </Link>
                        </div>
                    </div>
                    <div className="col-lg-9 col-6">
                        <nav id="menu" className="main-menu">
                            {loggedIn ?
                                <li className="fontSize"><Link to="/logout" ><b>Logout </b></Link></li>
                                :
                                <li className="fontSize"><Link to="/"><b>Login </b></Link></li>
                            }
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    )
}