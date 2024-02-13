import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import PatientApi from '../services/PatientApi';
import { useRecoilState } from 'recoil';
import { setDependentId } from '../recoil/atom/setDependentId';
export default function GetDependent(props) {
    const { patientId } = props;
    const [fetchPatientData, setFetchPatientData] = useState([])
    const [dependentId, setDependentsId] = useRecoilState(setDependentId)
    const { patientDetailsData } = PatientApi()
    const history = useHistory()
    useEffect(() => {
        getAllPatientData()
    }, [])

    function getAllPatientData() {
        patientDetailsData({ patientId })
            .then((response) => {
                setFetchPatientData(response[0].dependent)
            })
    }
    const handleClick = (item) => {
        history.push(`/appointmentbookingsection/${item._id}`)
        setDependentsId(item._id)
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
                                                    {item.name}
                                                </div>
                                                <div className='col-md-5' align='right'>
                                                    <Link onClick={() => handleClick(item)} className="btn">
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