import React, { useEffect, useState } from "react";
import moment from "moment/moment";
import SubscriptionApi from "../../../services/SubscriptionApi";
import { Link, useNavigate } from "react-router-dom";

export default function UpgradeSubscription(props) {
    const { doctorId } = props
    const { getSubscriptionData } = SubscriptionApi()
    const [subscription, setsubscription] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getSubscriptionList()
    }, [subscription])

    const getSubscriptionList = () => {
        getSubscriptionData({ doctorId })
            .then((sub) => {
                const returndata = sub.filter((item, i) => {
                    if (item.Status === "Running") {
                        return item
                    }
                })
                setsubscription(returndata[0])
            })
    }

    const handleSubscription = (e) => {
        e.preventDefault()
        navigate(`subscription/${doctorId}`)
    }
    const handleNewSubscription = (e) => {
        e.preventDefault();
        navigate(`/subscriptions/${doctorId}`)
    }

    return (
        <span className='row' >
            <span className=' '>
                <i className="pe-7s-date col-md-1 color patientListIcon" />
                {subscription.Status === "Running" ?
                    <Link className='' onClick={(e) => handleSubscription(e)} >
                        <>
                            <span className="col-md-2"> {"(" + subscription.selected_plan + ")"}</span>
                            {moment(new Date(subscription.expiryDate)).format('YYYY-MM-DD')}
                        </>
                        <span className="greenColor col-md-2" > Upgrade </span>
                    </Link>
                    :
                    <Link onClick={(e) => handleNewSubscription(e)}>
                        <span className="col-md-2">Upgrade Your Subscription</span>
                        <span className="greenColor col-md-2" > Upgrade </span>
                    </Link>
                }
            </span>
        </span>
    )

}