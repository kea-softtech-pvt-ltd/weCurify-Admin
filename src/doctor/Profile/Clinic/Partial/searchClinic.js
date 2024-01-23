import React, { useEffect, useState } from "react";
import { setDoctorClinic } from "../../../../recoil/atom/setDoctorClinic";
import { useRecoilState } from "recoil";
import { MainButtonInput } from "../../../../mainComponent/mainButtonInput";
import { Modal } from "react-bootstrap";
import { AddClinic } from "./addclinic";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField } from "@material-ui/core";
import ClinicApi from "../../../../services/ClinicApi";

const SearchClinic = (props) => {
    const { doctorId } = props
    const [coilDoctorClinicData, setCoilDoctorClinicData] = useRecoilState(setDoctorClinic)
    console.log('=coilDoctorClinicData=', coilDoctorClinicData)
    const [clinicInfo, setClinicInfo] = useState([]);
    const [clinicSave, setClinicSave] = useState([])
    const [servicess, setServicess] = useState([])
    const { getClinic, getServicess, addClinic } = ClinicApi()
    const [show, setShow] = useState(false);

    useEffect(() => {
        fetchclinic()
        fetchServicess()
    }, [])

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const onClinicFormSubmit = () => {
        handleClose();
    };
    const fetchServicess = () => {
        getServicess()
            .then((res) => {
                setServicess(res)
            })
    }

    const fetchclinic = (() => {
        getClinic()
            .then((res) => {
                setClinicInfo(res)
            })
    })
    
    const handleChange = (event, selectedValue) => {
        event.preventDefault()
        setClinicSave(selectedValue)
    }

    async function sendClinicInfo(e) {
        e.preventDefault();
        const newClinicData = {
            clinicId: clinicSave._id
        }
        addClinic(newClinicData, doctorId)
            .then((res) => {
                setCoilDoctorClinicData(coilDoctorClinicData.concat(res))
                console.log('=resaddcle',res)
            });
            props.onSubmit()
    }


    return (
        <div className="col-lg-12">
            <form onSubmit={sendClinicInfo}>
                <div className="form-group">
                    <label><b>Search Clinic</b></label>
                    <div className="row">
                        <div className="col-lg-9">
                            <Autocomplete
                                style={{ width: 250 }}
                                id={clinicInfo._id}
                                disablePortal={true}
                                disableClearable
                                disableCloseOnSelect
                                // value={clinicSave}
                                onChange={handleChange}
                                getOptionLabel={(data) => `${data.clinicName + '(' + data.address + ')'}`}
                                options={clinicInfo}
                                noOptionsText={"Clinic not available please add new clinic"}
                                renderInput={(params) =>
                                    <TextField {...params}
                                        label="Enter Clinic Name"
                                    />}
                            />
                        </div>
                        <div className="col-lg-3" align='right'>
                            <MainButtonInput className='col-md-4 marginLeft ' value="Add" >
                                ADD
                            </MainButtonInput>
                        </div>
                    </div>
                </div>
            </form >
            <div className=" margin_top_30 " align='right'>
                <MainButtonInput onClick={handleShow} >ADD ANOTHER CLINIC </MainButtonInput>
            </div>
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
        </div >
    );
};
export { SearchClinic }
