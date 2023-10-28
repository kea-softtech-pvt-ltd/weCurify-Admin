import React, { useState, useEffect } from 'react';
import AuthApi from '../../services/AuthApi';
import { useParams } from 'react-router-dom';
import GetMedicinePriscription from './partial/GetMedicinePrescription';
import GetLabPrescription from './partial/getLabPrescription';
import GetSymptomsData from './partial/GetSymptomsData';
import PatientApi from '../../services/PatientApi';
import ReportApi from '../../services/ReportApi';

export default function ViewMedicalReport() {
    const { reportId } = useParams();
    const { getMedicineReport } = ReportApi();
    const { patientDetailsData } = PatientApi();
    const [viewData, setViewData] = useState([]);
    const [patientDetails, setPatientDetails] = useState([]);

    useEffect(() => {
        getMedicineReportData()

    }, [])

    const getMedicineReportData = () => {
        getMedicineReport({ reportId })
            .then(async (res) => {
                setViewData(res[0])
                const patientId = res[0].patientId
                patientDetailsData({ patientId })
                    .then((response) => {
                        setPatientDetails(response[0])
                    })
            })

    }

    return (
        <main>
            <div className="container margin_120_95">
                <div className="row">
                    <div className="col-lg-12 ">
                        <nav id="secondary_nav">
                            {/* <Link to={`/Patientsclinichistory/${doctorId}`}>
                                <i className="arrow_back backArrow m-3" title="back button"></i>
                            </Link> */}
                            <span><b>Prescription</b></span>
                        </nav>
                    </div>
                </div>
                <div className="box_form ">
                    <h6 align="left">
                        <b>Patient Information</b>
                    </h6>
                    <div className="whiteBox" >
                        <div className="row mx-4 viewMreport">
                            <div className="col-md-6 " align='left'>
                                <div><b className='viewMreport fontSize'>{patientDetails.name}</b></div>
                                <div><b className='viewMreport'>Email :</b>{patientDetails.email}</div>
                                <div><b className='viewMreport'>Gender :</b>{patientDetails.gender}</div>
                                <div><b className='viewMreport'>Age :</b>{patientDetails.age}</div>
                                <div><b className='viewMreport'>Mobile no :</b>{patientDetails.mobile}</div>
                            </div>
                            <div className="col-md-6">
                                <div >
                                    <h6><b>Vital Sign</b></h6>
                                </div >
                                <div className='vitalSign'>
                                    <div className='mx-1'>
                                        <div >
                                            <b>BMI :</b>
                                            {viewData.BMI ?
                                                <span>{viewData.BMI}</span>
                                                :
                                                <span>{"-"}</span>
                                            }
                                        </div>

                                        <div >
                                            <b> Bp :</b>
                                            {viewData.bp ?
                                                <span>{viewData.bp}</span>
                                                :
                                                <span>{'-'}</span>
                                            }
                                        </div>
                                        <div >
                                            <b>Height :</b>
                                            {viewData.height ?
                                                <span>{viewData.height}</span>
                                                :
                                                <span>{'-'}</span>
                                            }
                                        </div>
                                    </div>
                                    <div className='mx-1'>
                                        <div>
                                            <b>Weight :</b>
                                            {viewData.weight ?
                                                <span>{viewData.weight}</span>
                                                :
                                                <span>{'-'}</span>
                                            }
                                        </div>
                                        <div>
                                            <b>Pulse :</b>
                                            {
                                                viewData.pulse ?
                                                    <span>{viewData.pulse}</span>
                                                    :
                                                    <span>{'-'}</span>
                                            }
                                        </div>
                                        <div>
                                            <b>Temprature :</b>
                                            {
                                                viewData.temp ?
                                                    <span>{viewData.temp}</span>
                                                    :
                                                    <span>{'-'}</span>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <GetMedicinePriscription reportId={reportId} />
                    </div>

                    <div>
                        <GetLabPrescription reportId={reportId} />
                    </div>

                    <div>
                        <GetSymptomsData reportId={reportId} />
                    </div>


                    <div className="whiteBox viewMreport">
                        <div align="left">
                            <b className='viewMreport'>Investigation :</b>
                            {
                                viewData.investigation_note ?
                                    <span>{viewData.investigation_note}</span>
                                    :
                                    <span>{'-'}</span>
                            }
                        </div>

                        <div align="left">
                            <b className='viewMreport'>Premedication :</b>
                            {viewData.premedication_note ?
                                <span>{viewData.premedication_note}</span>
                                :
                                <span>{'-'}</span>
                            }
                        </div>
                    </div>
                </div>

            </div>
        </main >
    )
}