import { NavLink } from "react-router-dom";
import AccessTimeRoundedIcon from '@material-ui/icons/AccessTimeRounded';
import PersonIcon from '@material-ui/icons/Person';
import AttachMoneyRoundedIcon from '@material-ui/icons/AttachMoneyRounded';

export default function UserLinks() {

    return (

        <div className="col-sm-2 navBar" align='left'>
            <NavLink
                className={({ isActive }) => (isActive ? "Nav-active " : 'none')}
                to="/doctors">
                <div className="dashboard">
                    <PersonIcon style={{ fontSize: 20 }} />
                    <b className="fontSize">  Doctor Management</b>
                </div>
            </NavLink>
            <NavLink
                className={({ isActive }) => (isActive ? "Nav-active" : 'none')}
                to="/allpatient">
                <div className="dashboard ">
                    <AccessTimeRoundedIcon style={{ fontSize: 20 }} />
                    <b className="fontSize">  Patient Management</b>
                </div>
            </NavLink>
            <NavLink
                className={({ isActive }) => (isActive ? "Nav-active " : 'none')}
                to='/subscription'>
                <div className="dashboard">
                    <AttachMoneyRoundedIcon style={{ fontSize: 20 }} />
                    <b className="fontSize"> Subscription</b>
                </div>
            </NavLink>
            {/* <div className="dashboard">
                <Link
                    onClick={medicineList}>
                    <i className="icon_datareport" style={{ fontSize: 20 }} />
                    <b className="fontSize"> Report</b>
                </Link>
            </div> */}
        </div >

    )
}  
