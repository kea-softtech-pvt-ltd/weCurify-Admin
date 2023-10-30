import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import SubscriptionApi from '../../services/SubscriptionApi'
import { Button, Modal } from "react-bootstrap";
import UserLinks from "../Dashboard-card/partial/uselinks";
import { MainNav } from "../../mainComponent/mainNav";
import { Wrapper } from "../../mainComponent/Wrapper";
import SubscriptionModal from "./SubscriptionModal";
export default function Subscription() {
    const { subscription } = SubscriptionApi()
    const [show, setShow] = useState(false);
    const [getSubData, setGetSubData] = useState([])
    const [subModal, setSubModal] = useState(false)
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
    const handleSubClose = () => {
        setSubModal(false)
    }
    const handleSubShow = () => {
        setSubModal(true)
    }
    return (
        <Wrapper>
            <MainNav>
                <ul className="clearfix">
                    <li className='float-none' style={{ fontSize: 'inherit' }}>Subscription</li>
                    <Button type="submit" onClick={handleSubShow} variant="default" className='appColor btn_sub'>Add Subscription</Button>
                </ul>
            </MainNav>
            <div className='row'>
                <UserLinks />
                <div className='white-box'>
                   
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

            <Modal show={subModal} onHide={handleSubClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Subscription</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <SubscriptionModal onClick={handleSubClose}/>
                </Modal.Body>
           
            </Modal>
        </Wrapper>
    )
}