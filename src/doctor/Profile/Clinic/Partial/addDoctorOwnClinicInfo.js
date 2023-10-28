import { AddOwnClinic } from "./addOwnClinic";
import { API } from "../../../../config";
import { SetSession } from "../Session/setSession";
import AccessTimeRoundedIcon from '@material-ui/icons/AccessTimeRounded';
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { useRecoilState } from "recoil";
import { setDoctorOwnClinic } from "../../../../recoil/atom/setDoctorOwnClinic";
import { MainButtonInput } from "../../../../mainComponent/mainButtonInput";
import AuthApi from "../../../../services/AuthApi";
import ClinicApi from "../../../../services/ClinicApi";
function AddDoctorOwnClinicInfo() {
    const { doctorId } = useParams();

    //for open add ownclinic session modal form
    const [showOwnSession, setShowOwnSession] = useState(false);
    const [activeModal1, setActiveModal1] = useState();
    const { getAllOwnClinic } = ClinicApi();
    const ownSessionClose = () => {
        setShowOwnSession(null);
        setActiveModal1(null);
    };
    const ownSessionShow = (e, index) => {
        e.preventDefault();
        setActiveModal1(index);
    }
    const onOwnSessionFormSubmit = (e) => {
        e.preventDefault();
        ownSessionClose();
    };

    //for add own clinic info
    const [ownClinic, setOwnClinic] = useState(false);
    const ownClinicClose = () => setOwnClinic(false);
    const ownClinicShow = () => setOwnClinic(true);
    const ownClinicFormSubmit = (e) => {
        ownClinicClose();
    };

    //fetch ownclinic list
    const [ownclinicList, setOwnClinicList] = useRecoilState(setDoctorOwnClinic)

    useEffect(() => {
        getaAllOwnClinics()
    }, [])

    const getaAllOwnClinics = () => {
        getAllOwnClinic({ doctorId })
            .then(jsonRes => {
                setOwnClinicList(jsonRes)
            });
    }
    return (
        <div className="col-md-6 ">
            <div className="box_form">
                <div className="modalbtn">
                    <div className="d-flex align-items-top justify-content-center">
                        <MainButtonInput onClick={ownClinicShow}>ADD AS OWNED CLINIC</MainButtonInput>
                    </div>
                    <Modal show={ownClinic} onHide={ownClinicClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Add Own Clinic</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <AddOwnClinic onSubmit={ownClinicFormSubmit} />
                        </Modal.Body>
                    </Modal>
                </div>
                {ownclinicList.map((uniq, index) => (
                    <div className="row" id={`ownclinic-uniq-${uniq._id}`} key={uniq._id}>
                        <div className="col-md-6 ">
                            <ul className="orderlist">
                                <li>{uniq.clinicName}</li>
                            </ul>
                        </div>
                        <div className="col-md-6 ">
                            <div className="form-group">
                                <Link to="#" onClick={e => ownSessionShow(e, index)} className="patientlistlink">{<AccessTimeRoundedIcon style={{ fontSize: 25 }} />}</Link>
                            </div>
                            <Modal id={`modal-${uniq._id}`} show={activeModal1 === index} onHide={ownSessionClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Set Session</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <SetSession clinicId={uniq._id} onSubmit={onOwnSessionFormSubmit} />
                                </Modal.Body>
                            </Modal>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
export { AddDoctorOwnClinicInfo }