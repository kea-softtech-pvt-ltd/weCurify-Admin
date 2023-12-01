
function DoctorBookingConfirmation(props) {
    const { doctorId, patientId, time, doctorData } = props;
    

    return (
        <aside className=" " id="sidebar">
            <div className="box_general_3 booking ">
                <form>
                <div className="underline">
                <div className="form_title" align='center'>
                    <h3>Doctor Details</h3>
                </div>
            </div>
                    <div className="summary">
                        <ul>
                            <li className="PatientDataS mt-2">
                                <h5 className="float-center">Dr. {doctorData.name}</h5>
                            </li>
                            <li className="PatientDataS">
                                <b>Email : </b><strong className="float-center">{doctorData.personalEmail}</strong>
                            </li>
                            <li className="PatientDataS">
                                <b>Address : </b><strong className="float-center">{doctorData.address}</strong>
                            </li>
                        </ul>
                    </div>
                    {/* {
                        patientId ?
                            <div className="radius appColor">
                                <Link to={`/appointmentbookingsection/${patientId}`} className="btn">
                                    <span className=" appColor">Book Appointment</span>
                                </Link>
                            </div>
                            :
                            <div className="disabled-link">
                                <Link to="#" className="btn_2 full-width">Book Appointment</Link>
                            </div>
                    } */}

                </form>
            </div>
        </aside>
    )
}
export { DoctorBookingConfirmation }

