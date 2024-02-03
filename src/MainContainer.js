import { Switch, Route } from "react-router-dom";
import Home from "./common/Home";
import LoginAdmin from "./doctor/Profile/LoginAdmin";
import DoctorProfile from "./doctor/Profile/DoctorProfile";
import EditDoctorProfile from "./doctor/Profile/EditDoctorProfile";
import PatientMedicalReport from "./doctor/Report/PatientMedicalReport";
import SearchLocationInput from "./common/demo";
import User from "./user";
import ViewMedicalReport from './doctor/Report/ViewMedicalReport';
import Logout from "./doctor/Profile/LogoutForm";
import Subscription from "./doctor/Subscription/Subscription"
import LoginHelper from "./doctor/Profile/LoginHelper";
import SubscriptionCard from "./doctor/Subscription/SubscriptionCard"
import Helper from "./doctor/helper/Helper";
import EditHelper from './doctor/helper/EditHelper';
import DoctorList from "./doctor/Dashboard-card/doctorList";
import AllPatients from "./doctor/Dashboard-card/AllPatients";
import PatientProfile from "./patient/PatientProfile"
import LoginPatient from "./patient/LoginPatient";
import GetLoginPatientProfile from "./patient/getLoginPatientProfile";
import CreatePatientProfile from "./patient/createPatientProfile";
import { AppointmentBookingSection } from "./patient/appointmentBookingSection";
import PatientHistory from "./patient/patientHistory";
import DoctorBookingWithPatientLogin from "./patient/DoctorBookingWithPatientLogin";
import AddNewDoctor from "./doctor/Dashboard-card/addNewDoctor";
import PatientAppointment from "./doctor/Dashboard-card/PatientAppointment";
import SlotConfirmation from "./patient/SlotConfirmation";
import SubscriptionNewDr from "./doctor/Subscription/SubscriptionNewDr";
import SubscriptionConfirmation from "./doctor/Subscription/SubscriptionConfirmation";
import { setloggedIn } from "./recoil/atom/setloggedIn";
import { useRecoilState } from "recoil";
import { Redirect } from "react-router-dom/cjs/react-router-dom";

function MainContainer() {
  const [loggedIn, setLoggedIn] = useRecoilState(setloggedIn);

  return (
    <Switch>
      <Route exact path="/">
        <LoginAdmin />
      </Route>
      <Route path="/doctorlist">
        {loggedIn ? <DoctorList /> : <Redirect to="/" />}
      </Route>
      <Route path="/doctorbookingwithpatientlogin/:doctorId">
        {loggedIn ? <DoctorBookingWithPatientLogin /> : <Redirect to="/" />}
      </Route>
      <Route path="/patientprofile/:patientId">
        {loggedIn ? < PatientProfile /> : <Redirect to="/" />}
      </Route>
      <Route path="/doctorprofile/:doctorId">
        {loggedIn ? <DoctorProfile /> : <Redirect to="/" />}
      </Route>
      <Route path="/editdoctorprofile/:doctorId">
        {loggedIn ? <EditDoctorProfile /> : <Redirect to="/" />}
      </Route>
      <Route exact path="/patientappointment/:doctorId">
        {loggedIn ? <PatientAppointment /> : <Redirect to="/" />}
      </Route>
      <Route path="/consultation/:reportId">
        {loggedIn ? <PatientMedicalReport /> : <Redirect to="/" />}
      </Route>
      <Route path="/patient-history/:reportId">
        {loggedIn ? <ViewMedicalReport /> : <Redirect to="/" />}
      </Route>
      <Route path="/subscription">
        {loggedIn ? <Subscription /> : <Redirect to="/" />}
      </Route>
      <Route path="/createpatientprofile/:patientId">
        {loggedIn ? <CreatePatientProfile /> : <Redirect to="/" />}
      </Route>
      <Route path="/getloginpatientprofile/:patientId">
        {loggedIn ? <GetLoginPatientProfile /> : <Redirect to="/" />}
      </Route>
      <Route path="/user">
        {loggedIn ? <User /> : <Redirect to="/" />}
      </Route>
      <Route path="/logout">
        < Logout />
      </Route>
      <Route path="/helper/:doctorId">
        {loggedIn ? <Helper /> : <Redirect to="/" />}
      </Route>
      <Route path="/edithelper/:helperId">
        {loggedIn ? <EditHelper /> : <Redirect to="/" />}
      </Route>
      <Route path="/loginhelper">
        {loggedIn ? <LoginHelper /> : <Redirect to="/" />}
      </Route>
      <Route path="/subscriptioncard/:doctorId">
        {loggedIn ? <SubscriptionCard /> : <Redirect to="/" />}
      </Route>
      <Route path="/doctorlist">
        {loggedIn ? <DoctorList /> : <Redirect to="/" />}
      </Route>
      <Route path="/allpatient">
        {loggedIn ? <AllPatients /> : <Redirect to="/" />}
      </Route>
      <Route path="/appointmentbookingsection/:doctorId">
        {loggedIn ? <AppointmentBookingSection /> : <Redirect to="/" />}
      </Route>
      <Route path="/patientprofile/:patientId">
        {loggedIn ? <PatientProfile /> : <Redirect to="/" />}
      </Route>
      <Route path="/loginpatient/:doctorId">
        {loggedIn ? <LoginPatient /> : <Redirect to="/" />}
      </Route>
      <Route path="/getloginpatientprofile/:patientId">
        {loggedIn ? <GetLoginPatientProfile /> : <Redirect to="/" />}
      </Route>
      <Route path="/createpatientprofile/:patientId">
        {loggedIn ? <CreatePatientProfile /> : <Redirect to="/" />}
      </Route>
      <Route path="/patienthistory/:patientId">
        {loggedIn ? <PatientHistory /> : <Redirect to="/" />}
      </Route>
      <Route path="/addnewdoctor">
        {loggedIn ? <AddNewDoctor /> : <Redirect to="/" />}
      </Route>
      <Route path="/bookingconfirmation/:patientAppointmentId">
        {loggedIn ? <SlotConfirmation /> : <Redirect to="/" />}
      </Route>
      <Route path="/subscriptionnewdr/:doctorId">
        {loggedIn ? <SubscriptionNewDr /> : <Redirect to="/" />}
      </Route>
      <Route path="/subscriptionconfirmation/:doctorId">
        {loggedIn ? <SubscriptionConfirmation /> : <Redirect to="/" />}
      </Route>
      {/* <Route path="/medicinelist/:doctorId">
        <MedicineList />
      </Route> */}
       {/* <Route path="/home">
        <Home />
      </Route> */}
      {/* <Route path="/demo">
        <SearchLocationInput />
      </Route> */}
    </Switch>
  )
}
export default MainContainer;