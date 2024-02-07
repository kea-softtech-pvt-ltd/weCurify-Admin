import React, { useEffect, useState } from "react";
import moment from "moment/moment";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import SubscriptionApi from "../../../services/SubscriptionApi";

export default function UpgradeSubscription(props) {
    const { doctorId } = props
    const { getSubscriptionData } = SubscriptionApi()
    const [subscription, setsubscription] = useState([])
    const history = useHistory()

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

    const handleSubscription = (details) => {
        history.push(`/subscriptioncard/${doctorId}`)
    }

    return (
        <span className='row' >
            <span className=' '>
                <i className="pe-7s-date col-md-1 color patientListIcon" />
                <Link className='' onClick={() => handleSubscription(subscription)} >
                    {subscription.Status === "Running" ?
                        <>
                            <span className="col-md-2"> {"(" + subscription.selected_plan + ")"}</span>
                            {moment(new Date(subscription.expiryDate)).format('YYYY-MM-DD')}
                        </>
                        :
                        <span className="col-md-2">Pleas Upgrade subscription</span>
                    }
                    <span className="greenColor col-md-2" > Upgrade </span>
                </Link>
            </span>
        </span>
    )

}