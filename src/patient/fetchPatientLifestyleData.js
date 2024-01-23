import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Modal } from "react-bootstrap";
import { EditLifeStyleData } from "../patient/editlifestyledata";
import { useRecoilState } from "recoil";
import { setPatientLifestyle } from "../recoil/atom/setPatientLifestyle";
import PatientApi from "../services/PatientApi";
import { AddPatientLifestyleInfo } from "./addPatientLifestyleInfo";

function FetchPatientLifestyleData(props) {
    const { patientId } = props;
    const [fetchPatientdata, setFetchPatientData] = useRecoilState(setPatientLifestyle)
    const [activeModal, setActiveModal] = useState()
    const { getPatientLifestyle } = PatientApi()
    const handleClose = () => {
        setActiveModal(null)
    }

    const handleShow = (e, index) => {
        e.preventDefault()
        setActiveModal(index)
    };

    const lifeStyleData = () => {
        handleClose(true);
    };
    useEffect(() => {
        getPatientData()
    }, [])

    function getPatientData() {
        getPatientLifestyle(patientId)
            .then((result) => {
                setFetchPatientData(result)
            })
    }
    return (
        <>
            {fetchPatientdata.length > 0 ?
                <>
                    {fetchPatientdata.map((item, index) => (
                        <div className="grayBox" key={index}>
                            <Link onClick={e => handleShow(e, index)} className="editbutton"><i className="icon_pencil-edit" title="Edit profile"></i></Link>
                            <Modal show={activeModal === index} onHide={handleClose} id={`item-${item._id}`} key={item._id}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Edit Patient Data</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <EditLifeStyleData patientId={patientId} lifeStyleId={item._id} onSubmit={lifeStyleData} />
                                </Modal.Body>
                            </Modal>
                            <div className="row">
                                <div className="col-md-6 ">
                                    <div className="fetchedudata">
                                        <div align='left' className="patientData"><b>Smoking Habits</b></div>
                                        <div>{item.smokingHabits}</div>
                                    </div>
                                    <div className="fetchedudata">
                                        <div align='left' className="patientData"><b>Alcohol Consumption</b></div>
                                        <div>{item.alcoholConsumption}</div>
                                    </div>
                                </div>

                                <div className="col-md-6 ">
                                    <div className="fetchedudata">
                                        <div align='left' className="patientData"><b>Food Preferences</b></div>
                                        <div>{item.foodPreferences}</div>
                                    </div>
                                    <div className="fetchedudata">
                                        <div align='left' className="patientData"><b>Occupation</b></div>
                                        <div>{item.occupation}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </>
                : <AddPatientLifestyleInfo patientId={patientId} />
            }
        </>
    )
}
export { FetchPatientLifestyleData }