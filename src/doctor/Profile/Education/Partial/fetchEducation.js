import React from 'react';
import { EditEducation } from "./EditEducation";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { useState, useEffect } from "react";
import { FetchImages } from "./fetchImages";
import { useRecoilState } from "recoil";
import { setDoctorEducation } from "../../../../recoil/atom/setDoctorEducation";
import EducationApi from '../../../../services/EducationApi';

function FetchEducation(props) {
    const { doctorId } = props
    const [eduData, setEduData] = useRecoilState(setDoctorEducation);
    const [activeModal, setActiveModal] = useState();
    const { fetchAllEducations, deleteEducationData } = EducationApi();
    const handleClose = () => {
        setActiveModal(null)
    }
    const handleShow = (e, index) => {
        setActiveModal(index)
    };

    const EditData = () => {
        handleClose(true);
    };

    useEffect(() => {
        getAllEducations()
    }, [])

    const getAllEducations = () => {
        fetchAllEducations({ doctorId })
            .then((res) => {
                setEduData(res.data);
            })
    }
     
    const deleteEducation = (education) => {
        const id = education._id
        deleteEducationData(id)
            .then(() => {
                getAllEducations()
            })
    }

    return (
        <>
            {eduData.length > 0 ?
                <div className='row'>
                    {eduData.map((education, index) => {
                        return (
                            <div className='col-md-5 mx-3'>
                                <div key={index}>
                                    <Modal show={activeModal === index}
                                        onHide={handleClose}
                                        id={`education-${education._id}`}
                                        key={education._id}>
                                        <Modal.Header closeButton >
                                            <Modal.Title>Edit Education Data</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <EditEducation
                                                imageData={education.document}
                                                doctorId={doctorId}
                                                EduId={education._id}
                                                onClick={handleClose}
                                                onSubmit={EditData}
                                            />
                                        </Modal.Body>
                                    </Modal>
                                    <div className='row'>
                                        <div className='eduCard'>
                                            <div className='row'>
                                                <div className='col-md-9'>
                                                    <div className="" align='left'>
                                                        {/* <span className="icon-icon">
                                                            <i className="pe-7s-medal" title="degree"></i>
                                                        </span> */}
                                                        <b>Doctor Degree</b>
                                                        <div>{education.degree}</div>
                                                    </div>
                                                    <div className="" align='left'>
                                                        {/* <span className="icon-icon">
                                                            <i className="icon_building" title="building"></i>
                                                        </span> */}
                                                        <b>Doctor Collage/University</b>
                                                        <div>{education.collage}</div>
                                                    </div>
                                                    <div className="" align='left'>
                                                        <b>Specialization</b>
                                                        <div>{education.specialization}</div>
                                                    </div>
                                                    <div className="" align='left'>
                                                        {/* <span className="icon-icon">
                                                            <i className="icon_calendar" title="calendar"></i>
                                                        </span> */}
                                                        <b>Complition Year  -</b>
                                                        <span>{education.comYear}</span>
                                                    </div>
                                                </div>

                                                <div className='col-md-3' align='right'>
                                                    <Link
                                                        onClick={e => handleShow(e, index)}
                                                        to="#"
                                                        className="editbutton">
                                                        <i className="icon_pencil-edit"
                                                            title="Edit profile">
                                                        </i>
                                                    </Link>
                                                    <Link
                                                        onClick={e => deleteEducation(education, e)}
                                                        to="#"
                                                        align='right'
                                                        className="editbutton">
                                                        <i className="icon-trash-2"
                                                            title="delete profile">
                                                        </i>
                                                    </Link>
                                                </div>
                                                {/* <FetchImages imageData={education.document} /> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        )
                    })
                    }
                </div>
                : null}
        </>
    )
}
export { FetchEducation }