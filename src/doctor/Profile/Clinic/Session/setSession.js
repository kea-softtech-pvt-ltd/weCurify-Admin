import { React } from 'react';
import { Link } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import { SetTiming } from "./setTiming";
import { useState, useEffect } from "react";
import { useRecoilState } from 'recoil';
import { SetDoctorSessionTiming } from "../../../../recoil/atom/SetDoctorSessionTiming";
import { updateSession } from '../../../../recoil/atom/setUpdateSession'
import SetUpdateTime from "./setUpdateTime";
import { Icon } from '@material-ui/core';
import SessionApi from '../../../../services/SessionApi';
import moment from 'moment';
function SetSession(props) {
    const { clinicId, doctorId } = props;
    const [dayName, setDayNames] = useState();
    const [showtime, setShowTime] = useState(false);
    const [updateTime, setUpdateTime] = useState(false);
    const [fetchTime, setfetchTime] = useRecoilState(SetDoctorSessionTiming);
    const [fetchUpdateTime, setfetchUpdateTime] = useRecoilState(updateSession);
    const [updateItem, setUpdateItem] = useState();
    const [deleteItem, setDeleteItem] = useState([]);
    const [Item, setItem] = useState([]);
    const [showDelete, setShowDelete] = useState(false);
    const { allSessions, deleteSlot } = SessionApi()
    const dayList = {
        "mon": "Mon",
        "tue": "Tues",
        "wed": "Wed",
        "thu": "Thu",
        "fri": "Fri",
        "sat": "Sat",
        "sun": "Sun",
    }
    const daysKeys = Object.keys(dayList)

    const handleClose = () => setShowTime(false);

    const handleShow = (e, day) => {
        e.preventDefault();
        setShowTime(true)
        setDayNames(day)
    };
    const handleDeleteShow = (item) => {
        setItem(item)
        setShowDelete(true)
    }
   
    //setTiming component
    const handleTimeClick = () => {
        handleClose();
    };

    const handleUpdateClose = () => setUpdateTime(false);
    const handleDeleteClose = () => setShowDelete(false)
    const handleUpdate = (e, item) => {
        e.preventDefault();
        setUpdateTime(true);
        setUpdateItem(item)
    }
    const handleUpdateTimeClick = () => {
        handleUpdateClose();
    }

    useEffect(() => {
        getAllSession()
    }, [])

    function getAllSession() {
        const dataId = {
            doctorId: doctorId,
            clinicId: clinicId,
            isDeleted: false
        }
        allSessions(dataId)
            .then(jsonRes => {
                setDeleteItem(jsonRes)
                let byDay = jsonRes.reduce((allDayData, singleDayData) => {
                    allDayData[singleDayData.day] = [...allDayData[singleDayData.day] || [], singleDayData];
                    return allDayData;
                }, {});
                setfetchTime(byDay)
                setfetchUpdateTime(byDay)
            });
    }

    const deleteSlotData = (Item) => {
        const deleteData = deleteItem.filter((i) => {
            if (i.day === Item) {
                return i
            }
        })
        console.log('=======id',deleteData[0]._id)
        const slotId = deleteData[0]._id
        deleteSlot(slotId)
            .then(() => {
                getAllSession()
                handleDeleteClose()
            })
    }
    return (
        <div className="container">
            <ul>
                {daysKeys.map((item, index) =>
                    <li className="" key={index}>
                        <div className="bottomborder">
                            <div className="row">
                                <div className="col-md-3 rightborder">
                                    <div className=" p-2 ">
                                        {dayList[item]}
                                    </div>
                                </div>
                                {fetchUpdateTime[item]
                                    ?
                                    <>
                                        <div className="col-md-7 p-2 " >
                                            <Link onClick={(e) => handleUpdate(e, fetchUpdateTime[item])} >
                                                <span >
                                                    {moment(new Date(fetchUpdateTime[item][0].fromTime)).format('HH:mm')}
                                                    -
                                                    {moment(new Date(fetchUpdateTime[item][0].toTime)).format('HH:mm')}
                                                    <span className='ml-3'>
                                                        {fetchUpdateTime[item][0].fees}/-
                                                    </span>
                                                </span>
                                            </Link>
                                        </div>
                                        <span className="col-md-2 ">
                                            <Link to="#" onClick={() => handleDeleteShow(item)}>
                                                <Icon className="icon-trash-2" style={{ fontSize: 17 }} ></Icon>
                                            </Link>
                                        </span>
                                    </>

                                    : (
                                        <>
                                            {fetchTime[item]
                                                ?
                                                <>
                                                    <div className="col-md-7 p-2" >
                                                        <Link onClick={(e) => handleUpdate(e, fetchTime[item])} >
                                                            <span>
                                                                {moment(new Date(fetchTime[item][0].fromTime)).format('HH:mm')}
                                                                -
                                                                {moment(new Date(fetchTime[item][0].toTime)).format('HH:mm')}
                                                                <span className='ml-3'>
                                                                    {fetchTime[item][0].fees}/-
                                                                </span>
                                                            </span>
                                                        </Link>
                                                    </div>
                                                    <span className="col-md-2 ">
                                                        <Link to="#" onClick={() => handleDeleteShow(item)}>
                                                            <Icon className="icon-trash-2" style={{ fontSize: 17 }} ></Icon>
                                                        </Link>
                                                    </span>
                                                </>
                                                :
                                                <div className="col-md-7 p-2">
                                                    <Link to="#" onClick={(e) => handleShow(e, item)} className="">
                                                        Set Session Timing
                                                    </Link>
                                                </div>
                                            }
                                        </>
                                    )
                                }

                            </div>
                        </div>
                    </li>
                )}
            </ul>

            <Modal show={showtime} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Session</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <SetTiming
                        doctorId={doctorId}
                        clinicId={clinicId}
                        day={dayName}
                        handleSubmit={handleTimeClick}
                    />
                </Modal.Body>
            </Modal>
            <Modal show={updateTime} onHide={handleUpdateClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Session</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <SetUpdateTime
                        doctorId={doctorId}
                        day={dayName}
                        update={updateItem}
                        onSubmit={handleUpdateTimeClick}
                    />
                </Modal.Body>
            </Modal>
            <div>
                <Modal show={showDelete} onHide={handleDeleteClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Are You Sure?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="alert alert-danger">You Want To Delete This Session</div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="default" className='appColor' onClick={() => deleteSlotData(Item)}>
                            Yes
                        </Button>
                        <Button variant="default" style={{ border: '1px solid #1a3c8b' }} onClick={handleDeleteClose}>
                            No
                        </Button>

                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    )
}
export { SetSession }