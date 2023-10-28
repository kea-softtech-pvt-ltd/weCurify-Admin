import { Link ,useParams} from "react-router-dom";
import React from "react";
import { DoctorBookingConfirmation} from "../patient/doctorbookingconfirmation";
import { PatientLoginForm } from "../patient/patientLoginForm";
import { patientIdState }from "../recoil/selector/patientIdState"
import { useRecoilValue } from "recoil";
import { FetchPatientInfo } from "../patient/fetchPatientInfo";

export default function DoctorBookingWithPatientLogin(){
    const {doctorId} = useParams();
    const patientId = useRecoilValue(patientIdState)
    return(
        <div>
            <main>
                <div id="breadcrumb">
                </div>
                <div className="container margin_60">
                    <div className="row">
                        <div className="col-xl-8 col-lg-8">
                            <div className="box_general_3 cart">
                            {patientId?
                            <FetchPatientInfo patientId={patientId}/>
                            :
                            <PatientLoginForm redirection="payment" />
                            }
                            </div>
                        </div>
                        <DoctorBookingConfirmation doctorId={doctorId}/>
                    </div>
                </div>

	        </main>
	    </div>
        
    )
}