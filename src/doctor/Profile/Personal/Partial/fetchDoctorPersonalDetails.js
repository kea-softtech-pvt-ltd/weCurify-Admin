import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Experience from "../../Partial/totalExperience";
import AuthApi from "../../../../services/AuthApi";
import { setDoctorClinic } from "../../../../recoil/atom/setDoctorClinic";
import { useRecoilState } from "recoil";
import Image from "../../../../img/avatar2.jpg"
import ClinicApi from "../../../../services/ClinicApi";

function FetchDoctorPersonalDetails(props) {
    const { doctorId } = props;
    const [clinicList, setClinicList] = useState(null);
    const { getDrInfo } = AuthApi()
    const { getAllClinicsData } = ClinicApi()
    const [fetchPersonalData, setFetchPersonalData] = useState([])
    useEffect(() => {
        getDoctorPersonalDetails();
        getAllClinics();
    }, [props])

    const getDoctorPersonalDetails = () => {
        getDrInfo({ doctorId })
            .then((result) => {
                setFetchPersonalData(result[0]);
            })
    }
    const getAllClinics = () => {
        getAllClinicsData({ doctorId })
            .then(jsonRes => {
                setClinicList(jsonRes.clinicData)
            });
    }
    return (
        <div className="profile"  >
            <div className="row" key={fetchPersonalData.id}>
                <div className="col-lg-5 col-md-4">
                   
                        <img
                            src={fetchPersonalData.photo}
                            alt="doctorProfile"
                            className='doctorPic borderRadius'
                        />
                   
                </div>
                <div className="col-lg-7 col-md-8" align="left">
                    <h1>Dr. {fetchPersonalData.name}</h1>
                    <div className="contacts">
                        <address>
                            <div><b>Email  :</b>  {fetchPersonalData.personalEmail}</div>
                            <div> <b>Location : </b> {fetchPersonalData.address}</div>
                            <span>  <b>Phone :</b> {fetchPersonalData.mobile}</span>
                            {fetchPersonalData["experienceList"] ?
                                (
                                    <Experience experienceData={fetchPersonalData.experienceList}></Experience>
                                ) : null
                            }

                        </address>
                    </div>
                </div>
                {/* {clinicList ?
                    <div className="col-lg-3">
                        <h5 align='left'>Clinic List</h5>
                        {clinicList.map((item, i) => {
                            return (
                                <div key={i} className='adminClinic row'>
                                    <figure className="col-lg-5">
                                        <img
                                            className='doctorProfile borderRadius'
                                            src={item.clinicLogo}
                                            alt="Clinic Logo"
                                        />
                                    </figure>
                                    <div className="col-lg-7" >
                                        <div >{item.clinicName}</div>
                                        <span className="icon-location color">
                                            {item.address}
                                        </span>
                                    </div>
                                </div>
                            )
                        })
                        }
                    </div>
                    : null} */}
            </div>

        </div>
    )
}
export { FetchDoctorPersonalDetails }