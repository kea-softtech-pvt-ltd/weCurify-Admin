import React from "react";
import { Link, } from "react-router-dom";
import { doctorIdState } from "../recoil/selector/doctorIdState"
import { useRecoilValue } from "recoil";
import appLogo from '../../src/img/small_wecurify.png'
export default function Header() {
    const doctorId = useRecoilValue(doctorIdState)

    return (
        <header style={{ zIndex: '-1' }} className="header_sticky">
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
                            <img className='appLogo' src={appLogo} alt="Somevthing Went Wrong" />
                            </Link>
                        </div>
                    </div>
                    <div className="col-lg-9 col-6">
                        <nav id="menu" className="main-menu">
                            {doctorId ?
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