import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Wrapper } from "../../mainComponent/Wrapper";
import { MainNav } from "../../mainComponent/mainNav";
import UserLinks from "../Dashboard-card/partial/uselinks";
import { Button, Modal } from "react-bootstrap";
import { FaRupeeSign } from "react-icons/fa";
import SubscriptionApi from "../../services/SubscriptionApi";
export default function SubscriptionCard() {
    const { updateSubscriptionData, getSubscriptionData, getSubscriptionPlans } = SubscriptionApi()
    const [getSubData, setGetSubData] = useState([])
    const [subscriptionId, setSubscriptionId] = useState([])
    const { doctorId } = useParams();
    const history = useHistory()
    const [show, setShow] = useState(false);
    const [getPlan, setGetPlan] = useState(null);
    const [getSubscription, setGetSubscription] = useState([])

    useEffect(() => {
        getSubscriptionPlan()
        fetchSubscription()
    }, [])

    const fetchSubscription = () => {
        getSubscriptionData({ doctorId })
            .then((result) => {
                setGetSubData(result[0].selected_plan)
                setSubscriptionId(result[0]._id)
            })

    }
    const handleShow = (item) => {
        setGetPlan(item)
        setShow(true)

    }
    const handleClose = () => setShow(false)

    const confirmInputHandler = (plan) => {
        const _id = subscriptionId;
        const bodyData = {
            "doctorId": doctorId,
            "date": new Date(),
            "expiryDate": new Date(),
            "plan": plan.name,
            "duration": plan.frequency
        }
        updateSubscriptionData({ _id }, bodyData)
            .then(() => {
                history.push(`/doctorprofile/${doctorId}`)
                setGetSubData(plan)
            })
        handleClose()

    }
    const getSubscriptionPlan = () => {
        getSubscriptionPlans()
            .then((res) => {
                subscriptionPlan(res)
            })
    }
    const subscriptionPlan = (res) => {
        const data = res.filter((sub) => {
            if (sub.status === true) {
                return (sub)
            }
        })
        setGetSubscription(data)
    }

    return (
        <div>
            <Wrapper>
                <MainNav>
                    <ul className="clearfix">
                        <div className="row">
                            <li>
                                <Link to={`/doctorlist`}>
                                    <i className="arrow_back backArrow" title="back button"></i>
                                </Link>
                            </li>
                            <li className='float-none' style={{ fontSize: 'inherit' }}>Subscription</li>
                        </div>
                    </ul>
                </MainNav>
                <div className='row'>
                    <UserLinks
                        doctorId={doctorId}
                    />
                    <div className="col-sm-10">
                        <div className='row'>
                            {getSubscription.map((item, i) => {
                                return (
                                    <div className="whiteCard  col-3" key={i}>
                                        <span>
                                            <h4 className="add_top_20 ">{item.name}</h4>
                                        </span>
                                        <h5> <FaRupeeSign />-{item.amount}</h5>
                                        <ul className="card-text cardListScroll underline" >
                                            {item.features.map((data, i) => {
                                                return (
                                                    <li key={i} className="card-list">
                                                        <i className="icon-right-circled" title="right-tick"></i>
                                                        {data}
                                                    </li>
                                                )
                                            })}

                                        </ul>
                                        {getSubData === item.name ?
                                            <button
                                                onClick={handleClose}
                                                className="btn disabled-card add_bottom_15 shadow-none disabled"
                                            >Subscribed
                                            </button>
                                            : <button
                                                onClick={() => handleShow(item)}
                                                className="sub-card-btn add_bottom_15 shadow-none btn btn-primary">
                                                Get Started
                                            </button>
                                        }

                                    </div>
                                )
                            })}
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
                            <Button variant="default" className='appColor' onClick={() => confirmInputHandler(getPlan)}>
                                Yes
                            </Button>
                            <Button variant="default" style={{ border: '1px solid #1a3c8b' }} onClick={handleClose}>
                                No
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </Wrapper>
        </div>
    )
}