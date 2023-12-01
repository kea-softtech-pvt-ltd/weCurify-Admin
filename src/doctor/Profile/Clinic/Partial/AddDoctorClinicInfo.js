import { AddClinic } from "./addclinic";
import { SetSession } from "../Session/setSession";
import AccessTimeRoundedIcon from '@material-ui/icons/AccessTimeRounded';
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { MainButtonInput } from "../../../../mainComponent/mainButtonInput";
import ClinicApi from "../../../../services/ClinicApi";

function AddDoctorClinicInfo(props) {
    const { doctorId } = props
    const [showSession, setShowSession] = useState(false);
    const [activeModal, setActiveModal] = useState()
    const [clinicList, setClinicList] = useState(null);
    // const [doctorId, setDoctorsId] = useRecoilState(setDoctorId)
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
        <>
            <div className="">
                <div className="modalbtn">
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Add Clinic</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <AddClinic doctorId={doctorId} onSubmit={onClinicFormSubmit} />
                        </Modal.Body>
                    </Modal>
                </div>
                {clinicList ?
                    <>
                        {clinicList.map((item, index) => (
                            <div className="" key={item._id}>
                                <div className='adminClinic row'>
                                    <figure className="col-md-1">
                                        <img
                                            className='clinicLogo'
                                            src={item.clinicLogo}
                                            alt="Clinic Logo"
                                        />
                                    </figure>
                                    <div className="col-md-3">
                                        <div className='fontS'><b>{item.clinicName}</b></div>
                                        <div className="icon-location fontSize color">
                                            {item.address}
                                        </div>
                                    </div>
                                      <div className="form-group col-md-1">
                                    <Link
                                        to="#"
                                        onClick={(e) => sessionShow(e, index)}
                                        className="patientlistlink">
                                        {<AccessTimeRoundedIcon
                                            style={{ fontSize: 30 }} />}
                                    </Link>
                                </div>
                                </div>
                             
                                <Modal show={activeModal === index} onHide={sessionClose}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Set Session</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <SetSession
                                            doctorId={doctorId}
                                            clinicId={item._id}
                                            onSubmit={onSessionFormSubmit}
                                        />
                                    </Modal.Body>
                                </Modal>
                            </div>
                        ))}
                    </> : null}
                <div className="" align='right'>
                    <MainButtonInput onClick={handleShow}>ADD CLINIC</MainButtonInput>
                </div>
            </div>
        </>
    )
}
export { AddDoctorClinicInfo }