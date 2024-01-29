import { AddClinic } from "./addclinic";
import { SetSession } from "../Session/setSession";
import AccessTimeRoundedIcon from '@material-ui/icons/AccessTimeRounded';
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { MainButtonInput } from "../../../../mainComponent/mainButtonInput";
import ClinicApi from "../../../../services/ClinicApi";
import { Icon } from "@material-ui/core";
import AuthApi from "../../../../services/AuthApi";
import { SearchClinic } from "./searchClinic";

function AddDoctorClinicInfo(props) {
    const { doctorId } = props
    const [showSession, setShowSession] = useState(false);
    const [activeModal, setActiveModal] = useState()
    const [clinicList, setClinicList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState();
    const [showDelete, setShowDelete] = useState(false);
    const [Item, setItem] = useState([]);
    const [show, setShow] = useState(false);
    const [showSearch, setShowSearch] = useState(false);

    const { clinicDelete } = ClinicApi()
    const { getDrInfo } = AuthApi()

    useEffect(() => {
        getAllClinics(currentPage);
    }, [currentPage])

    const getAllClinics = (currentPage) => {
        const pageSize = 5;
        getDrInfo({ doctorId }, currentPage, pageSize)
            .then((jsonRes) => {
                console.log('=====jsonRes', jsonRes)
                const clinicData =  jsonRes[0]['clinicList']
                setClinicList(clinicData)
                // const data = clinicData.filter((clinic) => {
                //     if (clinic.isDeleted === false) {
                //         return clinic
                //     }
                // })
                // setTotalPages(jsonRes.totalPages)
            });
    }
    const handleDeleteShow = (item) => {
        setItem(item)
        setShowDelete(true)
    }
    const handleDeleteClose = () => setShowDelete(false);

    function deleteClinicData(Item) {
        const clinicId = Item._id;
        clinicDelete(clinicId)
            .then(() => {
                getAllClinics(currentPage)
                handleDeleteClose()
            })

    }

    const handleSearchClose = () => setShowSearch(false)
    const handleSearchShow = () => setShowSearch(true)

    const handlePrevPage = () => {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1);
        }
    };
    function changeCPage() {
        setCurrentPage(currentPage * totalPages)
    }
    const handleNextPage = () => {
        if (currentPage !== totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const sessionClose = () => {
        setShowSession(null)
        setActiveModal(null);
    };
    const sessionShow = (e, index) => {
        e.preventDefault();
        setActiveModal(index);
    }
    const onSessionFormSubmit = (e) => {
        e.preventDefault();
        sessionClose();
    };
    //for add clinic info
    const handleClose = () => setShow(false);

    const onClinicFormSubmit = () => {
        handleClose();
          handleSearchClose()
    };

    return (
        <>
            <div className="">
            <div className="modalbtn">
                <Modal show={showSearch} onHide={handleSearchClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Search Clinic</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <SearchClinic doctorId={doctorId} onSubmit={onClinicFormSubmit} />
                    </Modal.Body>
                </Modal>
            </div>
                
                {clinicList ?
                    <>
                        {clinicList.map((item, index) => (
                            <div className="" key={item._id}>
                                <div className=' row'>
                                    <figure className="col-md-1">
                                        <img
                                            className='clinicLogo borderRadius'
                                            src={item.clinicLogo}
                                            alt="Clinic Logo"
                                        />
                                    </figure>
                                    <div className="col-md-3 adminClinic" align='left'>
                                        <div className='fontS'><b>{item.clinicName}</b></div>
                                        <div className="icon-location fontSize color">
                                            {item.address}
                                        </div>
                                    </div>
                                    <div className="col-md-1">
                                        <Link
                                            to="#"
                                            onClick={(e) => sessionShow(e, index)}
                                            className="patientlistlink">
                                            {<AccessTimeRoundedIcon
                                                style={{ fontSize: 30 }} />}
                                        </Link>
                                        <div className="col-md-1" >
                                            <Link className="patientlistlink" to="#" onClick={() => handleDeleteShow(item)}>
                                                <Icon className="icon-trash-2" style={{ fontSize: 25 }} ></Icon>
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                                <Modal show={activeModal === index} onHide={sessionClose}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Set Session</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <SetSession
                                            doctorId={doctorId}
                                            clinicId={item._id}
                                            onSubmit={onSessionFormSubmit}
                                        />
                                    </Modal.Body>
                                </Modal>
                            </div>
                        ))}
                    </> : null}
                <div cllassName="" align='right'>
                    <MainButtonInput onClick={handleSearchShow}>ADD CLINIC</MainButtonInput>
                </div>
                <ul className="pagination pagination-sm">
                    <li className="page-item">
                        <Link className="page-link"
                            to="#" onClick={handlePrevPage}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </Link>
                    </li>

                    <li className='page-item '>
                        <Link className="page-link"
                            to="#" onClick={() => changeCPage()}>
                            {currentPage}
                        </Link>
                    </li>

                    <li className="page-item">
                        <Link className="page-link"
                            to="#" onClick={handleNextPage}
                            disabled={currentPage === totalPages}>
                            Next
                        </Link>
                    </li>

                </ul>
                {/* <Modal show={showDelete} onHide={handleDeleteClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Are You Sure?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="alert alert-danger">You Want To Delete This Session</div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="default" className='appColor' onClick={() => deleteClinicData(Item)}>
                            Yes
                        </Button>
                        <Button variant="default" style={{ border: '1px solid #1a3c8b' }} onClick={handleDeleteClose}>
                            No
                        </Button>
                    </Modal.Footer>
                </Modal> */}
            </div>
        </>
    )
}
export { AddDoctorClinicInfo }