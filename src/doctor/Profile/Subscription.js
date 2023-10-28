import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import SubscriptionApi from '../../../src/services/SubscriptionApi'
import { Button, Modal } from "react-bootstrap";
export default function Subscription() {
    const { subscription } = SubscriptionApi()
    const [show, setShow] = useState(false);
    const [getSubData, setGetSubData] = useState([])
    const { doctorId } = useParams();
    const history = useHistory()

    const handleShow = (item) => {
        setShow(true)
        setGetSubData(item)
    }
    const handleClose = () => setShow(false)

    const confirmInputHandler = (plan) => {
        const bodyData = {
            "doctorId": doctorId,
            "date": new Date(),
            "plan": plan
        }
        subscription(bodyData)
            .then(() => {
                history.push(`/editdoctorprofile/${doctorId}`)
            })

    }

    return (
        <div>
            <main>
                <div className="bg_color_2">
                    <div className="container ">
                        <div className="subscription ">
                            <h2>Ready to get Started?</h2>
                        </div>
                        <div className="row">
                            <div className="card">
                                <span>
                                    <h4 className=" card-title float-left">Free-Trial</h4>
                                </span>
                                <ul className="card-text" >
                                    <li className="card-list">
                                        <i className="icon-right-circled" title="right-tick"></i>
                                        Access All patients for FREE!
                                    </li>
                                    <li className="card-list">
                                        <i className="icon-right-circled" title="right-tick"></i>
                                        Create Profile
                                    </li>
                                    <li className="card-list">
                                        <i className="icon-right-circled" title="right-tick"></i>
                                        Add Multiple Clinic for FREE!
                                    </li>
                                    <li className="card-list">
                                        <i className="icon-right-circled" title="right-tick"></i>
                                        Try Many Features for FREE!
                                    </li>
                                </ul>

                                <button
                                    onClick={() => handleShow('free-trial')}
                                    className="sub-card-btn shadow-none btn btn-primary">
                                    Get Started
                                </button>

                            </div>
                            <div className="card">
                                <span>
                                    <h4 className=" card-title float-left">6-Month</h4>
                                </span>
                                <ul className="card-text" >
                                    <li className="card-list">
                                        <i className="icon-right-circled" title="right-tick"></i>
                                        Access All patients for FREE!
                                    </li>
                                    <li className="card-list">
                                        <i className="icon-right-circled" title="right-tick"></i>
                                        Create Profile
                                    </li>
                                    <li className="card-list">
                                        <i className="icon-right-circled" title="right-tick"></i>
                                        Add Multiple Clinic for FREE!
                                    </li>
                                    <li className="card-list">
                                        <i className="icon-right-circled" title="right-tick"></i>
                                        Try Many Features for FREE!
                                    </li>
                                </ul>

                                <button
                                    onClick={() => handleShow('6-month')}
                                    className="sub-card-btn shadow-none btn btn-primary">
                                    Get Started
                                </button>

                            </div>
                            <div className="card">
                                <span>
                                    <h4 className=" card-title float-left">Yearly</h4>
                                </span>
                                <ul className="card-text" >
                                    <li className="card-list">
                                        <i className="icon-right-circled" title="right-tick"></i>
                                        Access All patients for FREE!
                                    </li>
                                    <li className="card-list">
                                        <i className="icon-right-circled" title="right-tick"></i>
                                        Create Profile
                                    </li>
                                    <li className="card-list">
                                        <i className="icon-right-circled" title="right-tick"></i>
                                        Add Multiple Clinic for FREE!
                                    </li>
                                    <li className="card-list">
                                        <i className="icon-right-circled" title="right-tick"></i>
                                        Try Many Features for FREE!
                                    </li>
                                </ul>
                                <button
                                    onClick={() => handleShow('yearly')}
                                    className="sub-card-btn shadow-none  btn btn-primary">
                                    Get Started
                                </button>

                            </div>
                        </div>

                    </div>
                </div>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Are You Sure?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="alert alert-danger">You Want To Get This Subscription. </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="default" className='appColor' onClick={() => confirmInputHandler(getSubData)}>
                            Yes
                        </Button>
                        <Button variant="default" style={{ border: '1px solid #1a3c8b' }} onClick={handleClose}>
                            No
                        </Button>
                    </Modal.Footer>
                </Modal>
            </main>
        </div>
    )
}