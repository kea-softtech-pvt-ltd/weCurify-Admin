import { AddDoctorClinicInfo } from "./Partial/AddDoctorClinicInfo";
// import { AddDoctorOwnClinicInfo } from "./Partial/addDoctorOwnClinicInfo";

function DoctorClinic(props) {
    const {doctorId} = props
    return (
        <>
            <div className="">
                <AddDoctorClinicInfo doctorId={doctorId}/>
                {/* <AddDoctorOwnClinicInfo /> */}
            </div>


        </>
    )
}
export { DoctorClinic }