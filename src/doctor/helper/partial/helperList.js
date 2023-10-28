import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Button, Modal } from 'react-bootstrap';
import HelperApi from '../../../services/HelperApi';


export default function HelperList(props) {
    const { doctorId } = props;
    const [helperList, setHelperList] = useState([]);
    const [showDelete, setShowDelete] = useState(false);
    const [details, setDetails] = useState([])
    const { removeHelper, getHelper } = HelperApi();
    // const { state } = useLocation()
    // const { doctorId } = state.data

    useEffect(() => {
        getHelperDetails();
    }, [])
    const handleDeleteShow = (details) => {
        setDetails(details)
        setShowDelete(true)
    }
    const handleDeleteClose = () => setShowDelete(false)

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

    function deleteHelper(details) {
        const id = details._id;
        removeHelper(id)
            .then(() => {
                getHelperDetails()
                handleDeleteClose()
            })

    }

    return (
        <div>
            <div className='row'>
                {helperList.map((details, i) => {
                    return (
                        <div className="col-md-3">
                            <div className="mainCards">
                                <span className='cardSpan'>
                                    <i className='icon-user color' />
                                    <b className=' fontSize'>{details.username}</b>
                                </span>
                                <span className='cardSpan'>
                                    <i className='icon-email color' />
                                    {details.email}
                                </span>
                                <span className='cardSpan'>
                                    <i className='icon-mobile-1 color' />
                                    {details.mobile}
                                </span>
                                <span className='cardSpan'>
                                    <Link to={`/edithelper/${details._id}`} >
                                        <Button className='appColor helperBtn' >Edit</Button>
                                    </Link>
                                    <Link to="#" onClick={() => handleDeleteShow(details)}>
                                        <Button className="appColor helperBtn" >Delete</Button>
                                    </Link>
                                </span>
                            </div>
                        </div>
                    )
                })}
            </div>

            <Modal show={showDelete} onHide={handleDeleteClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Are You Sure?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="alert alert-danger">
                        You Want To Delete This Assistant
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button className='appColor' variant="default " onClick={() => deleteHelper(details)}>
                        Yes
                    </Button>
                    <Button variant="default" style={{ border: '1px solid #1a3c8b' }} onClick={handleDeleteClose}>
                        No
                    </Button>

                </Modal.Footer>
            </Modal>
        </div >

    )
}