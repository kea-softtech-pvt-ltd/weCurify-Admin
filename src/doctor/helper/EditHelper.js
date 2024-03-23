import React, { useState, useEffect } from 'react';
import { MainInput } from '../../mainComponent/mainInput';
import { MainButtonInput } from '../../mainComponent/mainButtonInput';
import { MainNav } from '../../mainComponent/mainNav';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Wrapper } from '../../mainComponent/Wrapper';
import UserLinks from '../Dashboard-card/partial/uselinks';
import HelperApi from '../../services/HelperApi';
export default function EditHelper() {
    const { getAccessModule, fetchHelperData, updateHelperData } = HelperApi();
    const [accessModule, setAccessModule] = useState([]);
    const [selectedModule, setSelectedModule] = useState([]);
    const [checked, setChecked] = useState([]);
    const { helperId } = useParams();
    const [getHelperData, setGetHelperData] = useState([]);
    const [doctorId, setDoctorId] = useState('')
    const navigate = useNavigate()
    const handleChange = (e) => {
        const { name, value } = e.target;
        setGetHelperData({ ...getHelperData, [name]: value });
    }

    useEffect(() => {
        getAccess();
        fetchHelper();
    }, [])

    const fetchHelper = () => {
        fetchHelperData(helperId)
            .then((res) => {
                setDoctorId(res[0].doctorId)
                setGetHelperData(res[0])
                setSelectedModule(res[0].access_module)
            })
    }
    const getAccess = () => {
        getAccessModule()
            .then((res) => {
                setAccessModule(res)
            })
    };

    const changeSelectedModule = (index) => {
        let newState = [...checked]
        newState[index] = !checked[index]
        setChecked(newState)
        let module = []
        module = [...selectedModule];
        let value = newState[index];
        if (value) {
            module.push({
                moduleId: accessModule[index]._id,
                moduleName: accessModule[index].module_name
            })
        } else {
            let m = module.filter((item, i) => {
                return (item.moduleId !== accessModule[index]._id)
            })
            module = m
        }
        setSelectedModule(module)
    }

    function checkIfModuleisSelected(id, data) {
        return data.filter(item => (item.moduleId === id))
    }

    const saveData = async (e) => {
        e.preventDefault();
        const bodyData = {
            "doctorId": getHelperData.doctorId,
            "username": getHelperData.username,
            "password": getHelperData.password,
            "email": getHelperData.email,
            "mobile": getHelperData.mobile,
            "access_module": selectedModule,
        }
        updateHelperData(helperId, bodyData)
            .then((res) => {
                navigate(`/helper/${getHelperData.doctorId}`)
            })
    }
    return (
        <Wrapper>
            <MainNav>
                <ul className="clearfix">
                    <li>
                        <Link to={`/helper/${getHelperData.doctorId}`}>
                            <i className="arrow_back backArrow" title="back button"></i>
                        </Link>
                    </li>
                    <li className='float-none' style={{ fontSize: 'inherit' }} >Edit Assistant</li>
                </ul>
            </MainNav>
            <div className="row ">
                <UserLinks doctorId={doctorId} />
                <div className="common_box">
                    <div className='whiteBox'>
                        <div className="row p-4">
                            <div className="col-lg-5 AddHelper">
                                <label className='helperLabel float-left'><b>User Name</b></label>
                                <MainInput
                                    type="text"
                                    name="username"
                                    value={getHelperData.username}
                                    onChange={handleChange}
                                    placeholder="Enter Your Name">
                                </MainInput>
                                <div>
                                    <label className='helperLabel float-left'><b>Password</b></label>
                                </div>
                                <div>
                                    <MainInput
                                        type="password"
                                        name="password"
                                        value={getHelperData.password}
                                        onChange={handleChange}
                                        placeholder="Password">
                                    </MainInput>
                                </div>
                                <div>
                                    <label className='helperLabel float-left'><b>Email</b></label>
                                </div>
                                <MainInput
                                    type="email"
                                    name="email"
                                    value={getHelperData.email}
                                    onChange={handleChange}
                                    placeholder="Email">
                                </MainInput>
                                <div>
                                    <label className='helperLabel float-left'><b>Mobile Number</b></label>
                                </div>
                                <MainInput
                                    type="mobile"
                                    name="mobile"
                                    value={getHelperData.mobile}
                                    onChange={handleChange}
                                    maxLength={10}
                                    pattern="[+-]?\d+(?:[.,]\d+)?"
                                    placeholder="Phone Number (+XX)">
                                </MainInput>
                            </div>
                            <div className="col-lg-5">
                                <span><b>Select Access</b></span>
                                <div className='helperDiv'>
                                    {accessModule.map((item, index) => {
                                        return (
                                            <div key={index} className='row'>
                                                <input
                                                    type="checkbox"
                                                    checked={checkIfModuleisSelected(item._id, selectedModule).length > 0}
                                                    onChange={() => changeSelectedModule(index)}
                                                    className="mx-3 helperCheckbox"
                                                    value={item}
                                                />
                                                <label className='helperspan'>{item.module_name}</label>
                                            </div>
                                        )
                                    })
                                    }

                                </div>
                            </div>
                        </div>
                        <div className="text-center add_top_30 pb-2">
                            <MainButtonInput onClick={saveData}>Save</MainButtonInput>
                        </div>
                    </div>
                </div>
            </div>
        </Wrapper >

    )
}