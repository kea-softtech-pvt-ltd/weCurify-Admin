import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SubscriptionApi from '../../services/SubscriptionApi'
import { Button, Modal } from "react-bootstrap";
import UserLinks from "../Dashboard-card/partial/uselinks";
import { MainNav } from "../../mainComponent/mainNav";
import { Wrapper } from "../../mainComponent/Wrapper";
import SubscriptionModal from "./SubscriptionModal";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import EditSubscriptionModal from "./EditSubscriptionModal";
import { makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
export default function Subscription() {
    const { deleteSubscriptionPlan, getSubscriptionPlan } = SubscriptionApi()
    const [getSubData, setGetSubData] = useState([])
    const [subModal, setSubModal] = useState(false)
    const [activeModal, setActiveModal] = useState();
    const { doctorId } = useParams();
    const useStyles = makeStyles((theme) => ({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120
        },
        selectEmpty: {
            marginTop: theme.spacing(2)
        },
        table: {
            minWidth: 650,
        },
    }));
    const classes = useStyles();

    useEffect(() => {
        getSubscriptionData()
    }, [])

    const getSubscriptionData = () => {
        getSubscriptionPlan()
            .then((res) => {
                setGetSubData(res);
            })
    }

    const deleteSubscription = (subscripton) => {
        const id = subscripton._id
        deleteSubscriptionPlan({ id })
            .then(() => {
                getSubscriptionData()
            })
    }
    const handleClose = () => {
        setActiveModal(null)
    }
    const handleShow = (e, index) => {
        setActiveModal(index)
    };
    const EditData = () => {
        handleClose(true);
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
                    <TableContainer component={Paper} className=''>
                        <Table className={classes.table} size="large" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left"><b>Sr.No</b></TableCell>
                                    <TableCell align="left"><b>Plan Name</b></TableCell>
                                    <TableCell align="left"><b>Billing cycle</b></TableCell>
                                    <TableCell align="left"><b>Amount</b></TableCell>
                                    <TableCell align="left"><b>Features</b></TableCell>
                                    <TableCell align="left"><b>Status</b></TableCell>
                                    <TableCell align="left"><b>Actions</b></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {getSubData.map((item, i) => {
                                    <>
                                        <Modal show={activeModal === i}
                                            onHide={handleClose}
                                            id={`education-${item._id}`}
                                            key={item._id}>
                                            <Modal.Header closeButton >
                                                <Modal.Title>Update Subscription</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <EditSubscriptionModal
                                                    doctorId={doctorId}
                                                    onClick={handleClose}
                                                    onSubmit={EditData}
                                                />
                                            </Modal.Body>
                                        </Modal>
                                        <TableRow>
                                            <TableCell align="left">

                                            </TableCell>
                                            <TableCell align="left">

                                            </TableCell>
                                            <TableCell align="left">
                                                <div className="input">
                                                    dsads
                                                </div>
                                            </TableCell>

                                            <TableCell align="left">

                                            </TableCell>
                                            <TableCell align="left">

                                            </TableCell>
                                            <TableCell align="left">
                                                <div color="green">
                                                    Active
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className='row'>
                                                    <Link
                                                        onClick={e => handleShow(e,i )}
                                                        to="#"
                                                        className="editbutton">
                                                        <i className="icon_pencil-edit"
                                                            title="Edit profile">
                                                        </i>
                                                    </Link>
                                                    <Link
                                                        onClick={e => deleteSubscription(e)}
                                                        to="#"
                                                        align='right'
                                                        className="editbutton">
                                                        <i className="icon-trash-2"
                                                            title="delete profile">
                                                        </i>
                                                    </Link>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    </>
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>

            <Modal show={subModal} onHide={handleSubClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Subscription</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <SubscriptionModal onClick={handleSubClose} />
                </Modal.Body>

            </Modal>
        </Wrapper>
    )
}