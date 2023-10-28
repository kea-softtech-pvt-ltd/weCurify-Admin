import { AddClinic } from "./addclinic";
import { SetSession } from "../Session/setSession";
import AccessTimeRoundedIcon from '@material-ui/icons/AccessTimeRounded';
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { setDoctorClinic } from "../../../../recoil/atom/setDoctorClinic";
import { useRecoilState } from "recoil";
import { MainButtonInput } from "../../../../mainComponent/mainButtonInput";
import ClinicApi from "../../../../services/ClinicApi";
import { setDoctorId } from "../../../../recoil/atom/setDoctorId";

function AddDoctorClinicInfo() {
    const [showSession, setShowSession] = useState(false);
    const [activeModal, setActiveModal] = useState()
    const [clinicList, setClinicList] = useRecoilState(setDoctorClinic);
    const [doctorId, setDoctorsId] = useRecoilState(setDoctorId)
    const { getAllClinicsData } = ClinicApi()
    useEffect(() => {
        getAllClinics();
    }, [])

    const getAllClinics = () => {
        getAllClinicsData({ doctorId })
            .then(jsonRes => {
                setClinicList(jsonRes)
            });
    }
    const sessionClose = () => {
        setShowSession(null)
        setActiveModal(null);
    };
    const sessionShow = (e, index) => {
        e.preventDefault();
        setActiveModal(index);
    }
    const onSessionFormSubmit = (e) => {
        e.preventDefault();
        sessionClose();
    };
    //for add clinic info
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const onClinicFormSubmit = () => {
        handleClose();
    };

    return (
        <div className="col-md-6 ">
            <div className="box_form">
                <div className="modalbtn">
                    <div className="d-flex align-items-top justify-content-center">
                        <MainButtonInput onClick={handleShow}>ADD CLINIC</MainButtonInput>
                    </div>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Add Clinic</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <AddClinic onSubmit={onClinicFormSubmit} />
                        </Modal.Body>
                    </Modal>
                </div>
                {clinicList.map((item, index) => (
                    <div className="row" id={`clinic-item-${item._id}`} key={item._id}>
                        <div className="col-md-6 ">
                            <ul className="orderlist">
                                <li>{item.clinicName}</li>
                            </ul>
                        </div>
                        <div className="col-md-6 ">
                            <div className="form-group">
                                <Link to="#" onClick={(e) => sessionShow(e, index)} className="patientlistlink">{<AccessTimeRoundedIcon style={{ fontSize: 25 }} />}</Link>
                            </div>
                            <Modal id={`modal-${item._id}`} show={activeModal === index} onHide={sessionClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Set Session</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <SetSession doctorId={doctorId} clinicId={item._id} onSubmit={onSessionFormSubmit} />
                                </Modal.Body>
                            </Modal>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
export { AddDoctorClinicInfo }