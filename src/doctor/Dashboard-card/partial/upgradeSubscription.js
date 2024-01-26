import React, { useEffect } from "react";
import { useState } from "react";
import moment from "moment/moment";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function UpgradeSubscription(props) {
    const sub = props.subscription["subscription"]
    const [subscription, setsubscription] = useState([])
    console.log("subscription---------", subscription)
    const history = useHistory()

    useEffect(() => {
        getDoctorList()
    }, [])
    const getDoctorList = () => {
        const returndata = sub.filter((item,i) => {
            if (item.Status === "Running") {
                return sub
            }else{
                return null
            }
        })
        console.log('====', returndata)

        setsubscription(returndata[0])
    }

   

    const handleSubscription = (details) => {
        console.log("details==========", details)
        history.push(`/subscriptioncard/${details._id}`)
    }

    return (
        <span className='row' >
            <span className=' '>
                <i className="pe-7s-date col-md-1 color patientListIcon" />
                <Link className='' onClick={() => handleSubscription(subscription)} >
                    <span className="col-md-2"> {"(" + subscription.selected_plan + ")"}</span>
                    {moment(new Date(subscription.expiryDate)).format('YYYY-MM-DD')}
                    <span className="greenColor col-md-2" > Upgrade </span>
                </Link>
            </span>
        </span>
    )

}