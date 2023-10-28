import { Link } from "react-router-dom";
import Experience from "../doctor/Profile/Partial/totalExperience";

function DoctorDetailPersonalInfo(props){
    const educationData =  props.educationData
    
    return (
        <div className="profile modal-border">
            <div className="profile">
                <div className="row">
                    <div className="col-lg-5 col-md-6">
                        <figure>
                            <img 
                                src={`../images/${educationData.photo}`} 
                                alt="profileImage" 
                                className="img-fluid"
                            />
                        </figure>
                    </div>
                    <div className="col-lg-7 col-md-4">
                        <small>Primary care - Internist</small>
                        <h1>DR.{educationData.name}</h1>
                        {educationData["experienceList"]?
                            (<Experience experienceData={educationData.experienceList}></Experience>)
                        :null}   
                        <span className="rating">
                            <i className="icon_star voted"></i>
                            <i className="icon_star voted"></i>
                            <i className="icon_star voted"></i>
                            <i className="icon_star voted"></i>
                            <i className="icon_star"></i>
                            <small>(145)</small>
                            <Link to="badges.html" data-toggle="tooltip" data-placement="top" data-original-title="Badge Level" className="badge_list_1"><img src="img/badges/badge_1.svg" width="15" height="15" alt=""/></Link>
                        </span>
                        <ul className="statistic">
                            <li>854 Views</li>
                            <li>124 Patients</li>
                        </ul>
                        <ul className="contacts">
                            <li>
                                <h6>Address</h6>{educationData.address}
                                <Link to="#" target="_blank"> <strong>View on map</strong></Link>
                            </li>
                            <li>
                                <h6>Phone</h6> <Link to="tel://000434323342">{educationData.mobile}</Link>
                            </li>
                            <li>
                                <h6>Email</h6> <Link to="tel://000434323342">{educationData.personalEmail}</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>    
    )
}
export{DoctorDetailPersonalInfo}