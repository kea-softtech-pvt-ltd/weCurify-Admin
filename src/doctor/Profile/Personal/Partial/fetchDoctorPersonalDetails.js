import { useState, useEffect } from "react";
import Experience from "../../Partial/totalExperience";
import AuthApi from "../../../../services/AuthApi";

function FetchDoctorPersonalDetails(props) {
    const { doctorId } = props;
    const { getDrInfo } = AuthApi()
    const [ fetchPersonalData, setFetchPersonalData] = useState([])

    useEffect(() => {
        getDoctorPersonalDetails();
    }, [props])

    const getDoctorPersonalDetails = () => {
        getDrInfo({ doctorId })
            .then((result) => {
                setFetchPersonalData(result.result[0]);
            })
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
            </div>
        </div>
    )
}
export { FetchDoctorPersonalDetails }