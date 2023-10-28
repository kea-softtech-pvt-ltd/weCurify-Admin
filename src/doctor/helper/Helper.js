import React, { useEffect, useState } from 'react';
import AddHelper from './partial/AddHelper';
import HelperList from './partial/helperList';
import { useParams, Link } from 'react-router-dom';
import AuthApi from '../../services/AuthApi';
import { MainNav } from '../../mainComponent/mainNav';
import { Icon } from '@material-ui/core';
import { Wrapper } from '../../mainComponent/Wrapper';
import UserLinks from '../Dashboard-card/partial/uselinks';
import { setHelperData } from "../../recoil/atom/setHelperData";
import { useRecoilState } from "recoil";
import HelperApi from '../../services/HelperApi';
export default function Helper() {
    const [helperList, setHelperList] = useState([]);
    const [active, setActive] = useState(false)
    const [helpersData, setHelpersData] = useRecoilState(setHelperData)

    const { doctorId } = useParams()
    let { getHelper } = HelperApi()
    
    useEffect(() => {
        getHelperDetails();
    }, [])

    // async function getHelperDetails() {
    //     const result = await getHelper(doctorId);
    //     setHelperList(result)
    // }
    function getHelperDetails() {
        getHelper(doctorId)
            .then((result) => {
                const data = result.filter((helper) => {
                    if (helper.isDeleted === false) {
                        return helper
                    }
                })
                setHelperList(data)
            })

    }

    return (
        <Wrapper>
            <MainNav>
                <ul className="clearfix">
                    <li>
                        <Link to={`/dashboard/${doctorId}`}>
                            <i className="arrow_back backArrow" title="back button"></i>
                        </Link>
                    </li>
                    <li className='float-none' style={{ fontSize: 'inherit' }} >Assistant</li>
                    <li>
                        <Link onClick={() => setActive(true)} >
                            <Icon className="addiconbutton " style={{ fontSize: 50 }}>add</Icon>
                        </Link>
                    </li>
                </ul>
            </MainNav>
            <div className="row ">
                <UserLinks
                    doctorId={doctorId}
                    helperId={helpersData._id}
                    accessModule={helpersData.access_module}
                />
                <div className="common_box">
                    <>
                        {!active && helperList.length > 0 ?
                            <HelperList doctorId={doctorId} />
                            :
                            <AddHelper doctorId={doctorId} />
                        }
                    </>
                </div>

            </div>
        </Wrapper>
    )
} 