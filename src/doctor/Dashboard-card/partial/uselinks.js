import { useHistory } from "react-router-dom";
import AccessTimeRoundedIcon from '@material-ui/icons/AccessTimeRounded';
import PersonIcon from '@material-ui/icons/Person';
import AttachMoneyRoundedIcon from '@material-ui/icons/AttachMoneyRounded';
import { Link } from "react-router-dom/cjs/react-router-dom.min";

export default function UserLinks(props) {
    const { doctorId } = props
    let history = useHistory();
    function handleClick(e) {
        e.preventDefault()
        history.push(`/allpatient`);
       // history.push(`/patient/${doctorId}`);
    }

    function handleOnProfileClick(e) {
        e.preventDefault()
        history.push(`/doctorList`);
    }

    function handleSubscriptionClick(e) {
        e.preventDefault()
        history.push(`/subscription/${doctorId}`)
    }
    function handleReport(e) {
        e.preventDefault()
        history.push(`/report/${doctorId}`)
    }
    return (

        <div className="col-sm-2 dashSpace" align='left'>
                <div className="dashboard">
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
                {/* <div className="dashboard">
                    <Link
                        onClick={handleReport}>
                        <i className="icon_datareport" style={{ fontSize: 20 }} />
                        <b className="fontSize"> Report</b>
                    </Link>
                </div> */}
        </div>

    )
}  
