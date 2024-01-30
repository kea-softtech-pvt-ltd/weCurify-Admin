import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Modal } from "react-bootstrap";
import { EditMedicalData } from "../patient/editMedicalData";
import { useRecoilState } from "recoil";
import { setPatientMedical } from "../recoil/atom/setPatientMedical";
import PatientApi from "../services/PatientApi";
import { AddPatientMedicalInfo } from "./addPatientMedicalInfo";

function FetchPatientMedicalInfo(props) {
    const { patientId } = props;
    const [fetchPatientdata, setFetchPatientData] = useRecoilState(setPatientMedical)
    const [activeModal, setActiveModal] = useState()
    const [showMedicalInfo, setShowMedicalInfo] = useState(false)

    const { getPatientMedical } = PatientApi()
    const handleClose = () => {
        setActiveModal(null)
    }

    const handleShow = (e, index) => {
        e.preventDefault()
        setActiveModal(index)
    };

    const MedicalData = () => {
        handleClose(true);
    };
    useEffect(() => {
        getPatientData()
    }, [])

    function handleRecordAdded() {
        setShowMedicalInfo(false)
    }

    function getPatientData() {
        getPatientMedical(patientId)
            .then((result) => {
                setFetchPatientData(result)
            })
    }

    return (
        <>
            {
                fetchPatientdata.length > 0 ?
                    <>
                        {fetchPatientdata.map((item, index) => (
                            <div key={index} className="grayBox">
                                <Link
                                    onClick={e => handleShow(e, index)} className="editbutton">
                                    <i className="icon_pencil-edit mr-3 mt-3" title="Edit profile"></i>
                                </Link>
                                <Modal show={activeModal === index} onHide={handleClose} id={`item-${item._id}`} key={item._id}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Edit Patient Data</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <EditMedicalData patientId={patientId} medicalId={item._id} onSubmit={MedicalData} />
                                    </Modal.Body>
                                </Modal>
                                <div className="row">
                                    <div className="col-md-6 ">
                                        <div className="fetchedudata">
                                            <div><b>Current Medications</b></div>
                                            <div>{item.cmedication}</div>
                                        </div>
                                        <div className="fetchedudata">
                                            <div><b>Past Medications</b></div>
                                            <div>{item.pmedication}</div>
                                        </div>
                                        <div className="fetchedudata">
                                            <div><b>Past Allergies</b></div>
                                            <div>{item.allergies}</div>
                                        </div>
                                    </div>

                                    <div className="col-md-6 ">
                                        <div className="fetchedudata">
                                            <div><b>Chronic Diseases</b></div>
                                            <div>{item.diseases}</div>
                                        </div>
                                        <div className="fetchedudata">
                                            <div><b>Injuries</b></div>
                                            <div>{item.injuries}</div>
                                        </div>
                                        <div className="fetchedudata">
                                            <div><b>Surgeries</b></div>
                                            <div>{item.surgeries}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </>
                    :
                    <AddPatientMedicalInfo patientId={patientId} addMedicalRecord={handleRecordAdded} />
            }
        </>
    )
}
export { FetchPatientMedicalInfo }