import { Switch, Route } from "react-router-dom";
import Home from "./common/Home";
import LoginDoctor from "./doctor/Profile/LoginDoctor";
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
import MedicineList from "./doctor/Dashboard-card/MedicineList";
function MainContainer() {
  return (
    <Switch>

      <Route path="/home">
        <Home />
      </Route>
      <Route path="/demo">
        <SearchLocationInput />
      </Route>
      <Route path="/doctorlist">
        <DoctorList />
      </Route>

      <Route path="/doctorbookingwithpatientlogin/:doctorId">
        <DoctorBookingWithPatientLogin />
      </Route>
      <Route path="/patientprofile/:patientId">
        < PatientProfile />
      </Route>

      <Route path="/doctorprofile/:doctorId">
        <DoctorProfile />
      </Route>
      <Route exact path="/">
        <LoginDoctor />
      </Route>
      <Route path="/editdoctorprofile/:doctorId">
        <EditDoctorProfile />
      </Route>
      <Route exact path="/patientappointment/:doctorId">
        <PatientAppointment />
      </Route>
      <Route path="/consultation/:reportId">
        <PatientMedicalReport />
      </Route>
      <Route path="/patient-history/:reportId">
        <ViewMedicalReport />
      </Route>
      <Route path="/subscription">
        <Subscription />
      </Route>
      {/* <Route path="/Patientsclinichistory/:doctorId">
        < PatientsClinicHistory />
      </Route> */}
      <Route path="/createpatientprofile/:patientId">
        < CreatePatientProfile />
      </Route>
      <Route path="/getloginpatientprofile/:patientId">
        < GetLoginPatientProfile />
      </Route>
      <Route path="/user">
        < User />
      </Route>
      <Route path="/logout">
        < Logout />
      </Route>
      <Route path="/helper/:doctorId">
        <Helper />
      </Route>
      <Route path="/edithelper/:helperId">
        <EditHelper />
      </Route>
      <Route path="/loginhelper">
        <LoginHelper />
      </Route>
      <Route path="/subscriptioncard/:doctorId">
        <SubscriptionCard />
      </Route>
      <Route path="/doctorlist">
        <DoctorList />
      </Route>
      <Route path="/allpatient">
        <AllPatients />
      </Route>
      <Route path="/appointmentbookingsection/:doctorId">
        <AppointmentBookingSection />
      </Route>
      <Route path="/patientprofile/:patientId">
        <PatientProfile />
      </Route>
      <Route path="/loginpatient/:doctorId">
        <LoginPatient />
      </Route>
      <Route path="/getloginpatientprofile/:patientId">
        < GetLoginPatientProfile />
      </Route>
      <Route path="/createpatientprofile/:patientId">
        < CreatePatientProfile />
      </Route>
      <Route path="/patienthistory/:patientId">
        < PatientHistory />
      </Route>
      <Route path="/addnewdoctor">
        <AddNewDoctor />
      </Route>
      <Route path="/bookingconfirmation/:patientAppointmentId">
        <SlotConfirmation />
      </Route>
      <Route path="/subscriptionnewdr/:doctorId">
        <SubscriptionNewDr />
      </Route>
      {/* <Route path="/medicinelist/:doctorId">
        <MedicineList />
      </Route> */}
    </Switch>
  )
}
export default MainContainer;