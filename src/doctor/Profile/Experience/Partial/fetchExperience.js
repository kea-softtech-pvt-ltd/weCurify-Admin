import React from 'react';
import { EditExperience } from "./editExperience";
import { Link } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import { useState, useEffect } from "react";
import { setDoctorExperience } from "../../../../recoil/atom/setDoctorExperience";
import { useRecoilState } from 'recoil';
import ExperienceApi from '../../../../services/ExperienceApi';
function FetchExperience(props) {
    const { doctorId } = props;
    const [fetchExperience, setFetchExperience] = useRecoilState(setDoctorExperience)
    const [activeModal, setActiveModal] = useState()
    const { fetchExperienceData, removeExperience } = ExperienceApi();
    const [Item, setItem] = useState([]);
    const [showDelete, setShowDelete] = useState(false);

    useEffect(() => {
        getAllExperience()
    }, [])

    const handleDeleteShow = (item) => {
        setItem(item)
        setShowDelete(true)
    }
    const handleDeleteClose = () => setShowDelete(false)
    const handleClose = () => {
        setActiveModal(null)
    }

    const handleShow = (e, index) => {
        setActiveModal(index)
    };

    const EditData = () => {
        handleClose(true);
    };

    const getAllExperience = () => {
        fetchExperienceData({ doctorId })
            .then(jsonRes => {
                const exp = manipulateExperience(jsonRes)
                setFetchExperience(exp)
            });
    }

    function manipulateExperience(data) {
        return data.map(function (item, index) {
            const experiences = monthDiff(new Date(item.startYear), new Date(item.endYear))
            const month = experiences % 12
            let year = 0
            if (experiences > 11) {
                const exYear = experiences / 12
                year = exYear.toFixed(0)
            }
            item.totalExperience = `${year}.${month}`;
            return item;
        })
    }

    function monthDiff(start, end) {
        var months;
        months = (end.getFullYear() - start.getFullYear()) * 12;
        months -= start.getMonth();
        months += end.getMonth();
        return months <= 0 ? 0 : months;
    }
    const removeExperienceData = (experience) => {
        const id = experience._id
        removeExperience(id)
            .then(() => {
                getAllExperience()
            })
            handleDeleteClose()
    }

    return (
        <>
            <div className='row'>
                {fetchExperience.map((experience, index) => {
                    return (
                        <div className='col-sm-5 mx-3'>
                            <div className="" key={index}>
                                <Modal
                                    show={activeModal === index}
                                    onHide={handleClose}
                                    id={`experience-${experience._id}`}
                                    key={experience._id}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Edit Experience Data</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <EditExperience
                                            doctorId={doctorId}
                                            ExId={experience._id}
                                            onSubmit={EditData} />
                                    </Modal.Body>
                                </Modal>
                                <div className="row">
                                    <div className="grayBox">
                                        <div className="row">
                                            <div className='col-md-9'>
                                                <div className="" align='left'>
                                                    {/* <span className="icon-icon">
                                                        <i className="icon_calendar" title="Calender profile"></i>
                                                    </span> */}
                                                    <b>Start Year  - </b>
                                                    <span>
                                                        {new Date(experience.startYear)
                                                            .toLocaleDateString(undefined,
                                                                {
                                                                    year: 'numeric', month: '2-digit',
                                                                    timeZone: 'Asia/Kolkata'
                                                                })}
                                                    </span>
                                                </div>
                                                <div className="" align='left'>
                                                    {/* <span className="icon-icon">
                                                        <i className="icon_calendar" title="Calender profile"></i>
                                                    </span> */}
                                                    <b>End Year  - </b>
                                                    <span>
                                                        {new Date(experience.endYear)
                                                            .toLocaleDateString(undefined,
                                                                {
                                                                    year: 'numeric', month: '2-digit',
                                                                    timeZone: 'Asia/Kolkata'
                                                                })}
                                                    </span>
                                                </div>
                                                <div className="" align='left'>
                                                    {/* <span className="icon-icon">
                                                        <i className="icon_building" title="Clinic"></i>
                                                    </span> */}
                                                    <b>Clinic/Hospital Name  - </b>
                                                    <span>{experience.clinicName}</span>
                                                </div>
                                                <div className="" align='left'>
                                                    <b>Doctor Experience  - </b>
                                                    <span>{experience.totalExperience} years</span>
                                                </div>

                                                <div className="" align='left'>
                                                    <b>Description  - </b>
                                                    <span>{experience.description}</span>
                                                </div>
                                            </div>
                                            <div className='col-md-3' align='right'>
                                                <Link
                                                    to="#"
                                                    onClick={e => handleShow(e, index)}
                                                    className="editbutton">
                                                    <i className="icon_pencil-edit"
                                                        title="Edit profile">
                                                    </i>
                                                </Link>
                                                <Link
                                                    to="#"
                                                    onClick={() => handleDeleteShow(experience)}
                                                    className="editbutton">
                                                    <i className="icon-trash-2"
                                                        title="Delete profile">
                                                    </i>
                                                </Link>
                                            </div>
                                        </div>

                                    </div>

                                </div>
                            </div>
                        </div>
                    )
                })}
                <div>
                    <Modal show={showDelete} onHide={handleDeleteClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Are You Sure?</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="alert alert-danger">You Want To Delete This Experience Details</div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="default" className='appColor' onClick={()=>removeExperienceData(Item)}>
                                Yes
                            </Button>
                            <Button variant="default" style={{ border: '1px solid #1a3c8b' }} onClick={handleDeleteClose}>
                                No
                            </Button>

                        </Modal.Footer>
                    </Modal>
                </div>
            </div >
        </>
    )
}
export { FetchExperience }