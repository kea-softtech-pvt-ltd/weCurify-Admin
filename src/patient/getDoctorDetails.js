import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Experience from "../doctor/Profile/Partial/totalExperience";
import { DoctorDetailsProfessionalStatement } from "./doctorDetailsProfessionalStatement";
import { DoctorDetailsEducationalStatement } from "./doctorDetailsEducationalStatement";
import AuthApi from "../services/AuthApi";

function GetDoctorDetails(props) {
    const doctorId = props.doctorId;
    const [fetchProfileData, setFetchProfileData] = useState([]);
    const { getDrInfo } = AuthApi()
    useEffect(() => {
        getDoctorPersonalInfo();
    }, [])

    async function getDoctorPersonalInfo() {
        getDrInfo(doctorId)
            .then((result) => {
                setFetchProfileData(result.data[0]);
            })
    }

    return (
        <div className="box_general_3">
            <div className="profile modal-border">
                <div className="row">
                    <div className="col-lg-5 col-md-6">
                        <figure>
                            <img
                                src={`../images/${fetchProfileData.photo}`}
                                alt="profileImage"
                                className="img-fluid"
                            />
                        </figure>
                    </div>
                    <div className="col-lg-7 col-md-4">
                        <small>Primary care - Internist</small>
                        <h1>DR.{fetchProfileData.name}</h1>
                        {fetchProfileData["experienceList"] ?
                            (<Experience experienceData={fetchProfileData.experienceList}></Experience>)
                            : null}
                        <span className="rating">
                            <i className="icon_star voted"></i>
                            <i className="icon_star voted"></i>
                            <i className="icon_star voted"></i>
                            <i className="icon_star voted"></i>
                            <i className="icon_star"></i>
                            <small>(145)</small>
                            <Link to="badges.html" data-toggle="tooltip" data-placement="top" data-original-title="Badge Level" className="badge_list_1"><img src="img/badges/badge_1.svg" width="15" height="15" alt="" /></Link>
                        </span>
                        <ul className="statistic">
                            <li>854 Views</li>
                            <li>124 Patients</li>
                        </ul>
                        <ul className="contacts">
                            <li>
                                <h6>Address</h6>{fetchProfileData.address}
                                <Link to="#" target="_blank"> <strong>View on map</strong></Link>
                            </li>
                            <li>
                                <h6>Phone</h6> <Link to="tel://000434323342">{fetchProfileData.mobile}</Link>
                            </li>
                            <li>
                                <h6>Email</h6> <Link to="tel://000434323342">{fetchProfileData.personalEmail}</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {fetchProfileData["educationList"] ?
                (<>
                    <DoctorDetailsProfessionalStatement educationData={fetchProfileData.educationList} />

                    <DoctorDetailsEducationalStatement educationData={fetchProfileData.educationList} />
                </>)
                : null}
        </div>
    )
}
export { GetDoctorDetails }