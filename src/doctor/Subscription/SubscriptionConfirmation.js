import { Link } from "react-router-dom/cjs/react-router-dom";
import UserLinks from "../Dashboard-card/partial/uselinks";
import { Wrapper } from "../../mainComponent/Wrapper";
import { MainNav } from "../../mainComponent/mainNav";
import AuthApi from "../../services/AuthApi";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect, useState } from "react";
import SubscriptionApi from "../../services/SubscriptionApi";

export default function SubscriptionConfirmation() {
    const { subscriptionId } = useParams()
    const { getDrInfo } = AuthApi()
    const [doctorData, setDoctorData] = useState([])
    const [getSubData, setGetSubData] = useState([])
    const { getSubscriptionByIdData } = SubscriptionApi()
    useEffect(() => {
        // doctorInfo()
        fetchSubscription()
    }, [])

    // const doctorInfo = () => {
    //     getDrInfo({ doctorId })
    //         .then((res) => {
    //             setDoctorData(res[0])
    //         })
    // }

    const fetchSubscription = () => {
        getSubscriptionByIdData({ subscriptionId })
            .then((res) => {
                console.log('=====res', res)
                setGetSubData(res[0].selected_plan)
            })

    }

    return (
        <Wrapper>
            <MainNav>
                <ul className="clearfix">
                    <li>
                        <Link to={`/doctorList`}>
                            <i className="arrow_back backArrow" title="back button"></i>
                        </Link>
                    </li>
                    <li className='float-none' style={{ fontSize: 'inherit' }}>Subscription Confirmation</li>
                    <li style={{ fontSize: 'inherit' }} className="appColor" align='right'>Dr. {doctorData.name}</li>

                </ul>
            </MainNav>
            <div className='row'>
                <UserLinks />
                <div className="container margin_60">
                    <div className=" patientFetch">
                        <div className="box_general_3">
                            <h1 className='color'>Thank You For Upgraded Your Subscription</h1>
                            <div className='fontS'>
                                Dr. {doctorData.name}
                                {/* <div> Your Subscription is Upgraded Successfully!</div> */}
                                <div >Now your Subscription  is ( {getSubData} )</div>
                            </div>
                            <Link to={`/doctorList`}>
                                <button align='right' className='btn appColor helperBtn'>Done</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </Wrapper>
    )
}