import { useHistory } from "react-router-dom";
import AccessTimeRoundedIcon from '@material-ui/icons/AccessTimeRounded';
import PersonIcon from '@material-ui/icons/Person';
import AttachMoneyRoundedIcon from '@material-ui/icons/AttachMoneyRounded';
import { Link, useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect } from "react";

export default function UserLinks() {
    let history = useHistory();

    let location = useLocation();

    useEffect(() => {
        
    }, [location])

    function handleClick(e) {
        e.preventDefault()
        history.push(`/allpatient`);

    }

    function handleOnProfileClick(e) {
        e.preventDefault()
        history.push(`/doctorList`);
        // setActiveMenu('flash')
    }

    function handleSubscriptionClick(e) {
        e.preventDefault()
        history.push(`/subscription`)
        // setActiveMenu('new')
    }
    // function medicineList(e) {
    //     e.preventDefault()
    //     history.push(`/medicinelist`)
    // }
    return (

        <div className="col-sm-2 " align='left'>
            <div className={location.pathname === `/doctorList` ? "Nav-active" : null}>
                <div className="dashboard"  >
                    <Link
                        onClick={handleOnProfileClick}>
                        <PersonIcon style={{ fontSize: 20 }} />
                        <b className="fontSize">  Doctor Management</b>
                    </Link>
                </div>
            </div>
            <div className={location.pathname === `/allpatient` ? "Nav-active" : null}>
                <div className="dashboard ">
                    <Link
                        onClick={handleClick}>
                        <AccessTimeRoundedIcon style={{ fontSize: 20 }} />
                        <b className="fontSize">  Patient Management</b>
                    </Link>
                </div>
            </div>
            <div className={location.pathname === `/subscription` ? "Nav-active" : null}>
                <div className="dashboard">
                    <Link
                        onClick={handleSubscriptionClick}>
                        <AttachMoneyRoundedIcon style={{ fontSize: 20 }} />
                        <b className="fontSize"> Subscription</b>
                    </Link>
                </div>
            </div>
            {/* <div className="dashboard">
                <Link
                    onClick={medicineList}>
                    <i className="icon_datareport" style={{ fontSize: 20 }} />
                    <b className="fontSize"> Report</b>
                </Link>
            </div> */}
        </div>

    )
}  
