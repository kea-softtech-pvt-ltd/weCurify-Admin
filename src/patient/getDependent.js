import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom/cjs/react-router-dom.min'
import PatientApi from '../services/PatientApi';
export default function GetDependent() {
    const { patientId } = useParams();
    const [ fetchPatientData, setFetchPatientData] = useState([])
    const { patientDetailsData} = PatientApi()
    useEffect(() => {
        getAllPatientData()
    }, [])

    function getAllPatientData() {
        patientDetailsData({ patientId })
            .then( (response)=> {
                setFetchPatientData(response[0].dependent)
            })
    }
    return (
        <>
            {fetchPatientData.length !== 0 ?
                <div className="col-sm-6">
                    <div className="box_general_4 cart patientDetails">
                        {fetchPatientData ?
                            <>
                                <div className="underline">
                                    <div className="form_title">
                                        <h3>dependent Details</h3>
                                    </div>
                                </div>
                                <div className="patientDataStyle">

                                    {fetchPatientData.map((item) => {
                                        return (
                                            <div className="row">
                                                <div className='col-md-7'>
                                                    {/* <label className="mx-2"><b>Name :</b></label> */}
                                                    {item.name}
                                                </div>
                                                <div className='col-md-5' align='right'>
                                                    <Link to={`/appointmentbookingsection/${patientId}`} className="btn">
                                                        <i className="arrow_carrot-right_alt" style={{ fontSize: 20 }}></i>
                                                    </Link>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </>
                            :
                            null}
                    </div>
                </div>
                : null}
        </>


    )
}