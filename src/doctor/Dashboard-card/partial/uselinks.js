import { useHistory } from "react-router-dom";
import AccessTimeRoundedIcon from '@material-ui/icons/AccessTimeRounded';
import PersonIcon from '@material-ui/icons/Person';
import AttachMoneyRoundedIcon from '@material-ui/icons/AttachMoneyRounded';
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useState } from "react";

export default function UserLinks() {
    const [activeMenu, setActiveMenu] = useState('')
    let history = useHistory();

    let background = {};
    switch (activeMenu) {
        case 'flash':
            background = { backgroundColor: 'red' };
            break;
        case 'sets':
            background = { backgroundColor: 'blue' };
            break;
        case 'new':
            background = { backgroundColor: 'green' };
            break;
        default:
            background = {}
    }


    function handleClick(e) {
        e.preventDefault()
        history.push(`/allpatient`);

    }

    function handleOnProfileClick(e) {
        e.preventDefault()
        history.push(`/doctorList`);
        setActiveMenu('flash')
    }

    function handleSubscriptionClick(e) {
        e.preventDefault()
        history.push(`/subscription`)
        setActiveMenu('new')
    }
    function medicineList(e) {
        e.preventDefault()
        history.push(`/medicinelist`)
    }
    return (

        <div className="col-sm-2 dashSpace" align='left'>
            <div className="dashboard"  style={background}  >
                <Link
                    onClick={handleOnProfileClick}>
                    <PersonIcon style={{ fontSize: 20 }} />
                    <b className="fontSize">  Doctor Management</b>
                </Link>
            </div>
            <div className="dashboard ">
                <Link
                    onClick={handleClick}>
                    <AccessTimeRoundedIcon style={{ fontSize: 20 }} />
                    <b className="fontSize">  Patient Management</b>
                </Link>
            </div>
            <div className="dashboard">
                <Link
                    onClick={handleSubscriptionClick}>
                    <AttachMoneyRoundedIcon style={{ fontSize: 20 }} />
                    <b className="fontSize"> Subscription</b>
                </Link>
            </div>
            <div className="dashboard">
                    <Link
                        onClick={medicineList}>
                        <i className="icon_datareport" style={{ fontSize: 20 }} />
                        <b className="fontSize"> Report</b>
                    </Link>
                </div>
        </div>

    )
}  
