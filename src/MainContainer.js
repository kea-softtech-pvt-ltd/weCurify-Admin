import { Route, Routes, redirect } from "react-router-dom";
import LoginAdmin from "./doctor/Profile/LoginAdmin";
import DoctorProfile from "./doctor/Profile/DoctorProfile";
import EditDoctorProfile from "./doctor/Profile/EditDoctorProfile";
import PatientMedicalReport from "./doctor/Report/PatientMedicalReport";
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
import Dependent from "./doctor/Dashboard-card/Dependent";

function MainContainer() {
  const [loggedIn, setLoggedIn] = useRecoilState(setloggedIn);

  return (
    <Routes>
      <Route exact path="/" element={<LoginAdmin />} />
      <Route path="/doctors" >
        <Route index element={loggedIn ? <DoctorList /> : redirect('/')} />
        <Route path="profile/:doctorId">
          <Route index element={loggedIn ? <DoctorProfile /> : redirect('/')} />
          <Route path="edit" element={loggedIn ? <EditDoctorProfile /> : redirect('/')} />
        </Route>
        <Route path="subscription/:doctorId" >
          <Route index element={loggedIn ? <SubscriptionCard /> : redirect('/')} />
          <Route path="confirmation" element={loggedIn ? <SubscriptionConfirmation /> : redirect('/')} />
        </Route >
        <Route path="appointment/:doctorId" >
          <Route index element={loggedIn ? <PatientAppointment /> : redirect('/')} />
          <Route path="consultation/:reportId" element={loggedIn ? <PatientMedicalReport /> : redirect('/')} />
          <Route path="report/:reportId" element={loggedIn ? <ViewMedicalReport /> : redirect('/')} />
        </Route>
        <Route path="patient/:doctorId" >
          <Route index element={loggedIn ? <LoginPatient /> : redirect('/')} />
          <Route path="patientprofile/:patientId" >
            <Route index element={loggedIn ? <GetLoginPatientProfile /> : redirect('/')} />
            <Route path="booking" >
              <Route index element={loggedIn ? <AppointmentBookingSection /> : redirect('/')} />
              <Route path="confirm/:patientAppointmentId" element={loggedIn ? <SlotConfirmation /> : redirect('/')} />
            </Route>
          </Route>
          <Route path="createprofile/:patientId" element={loggedIn ? <CreatePatientProfile /> : redirect('/')} />
        </Route>
        <Route path="addnewdoctor" element={loggedIn ? <AddNewDoctor /> : redirect('/')}/>
      </Route>

      <Route path="/allpatient" >
        <Route index element={loggedIn ? <AllPatients /> : redirect('/')} />
        <Route path="patientinfo/:patientId" element={loggedIn ? <PatientProfile /> : redirect('/')} />
        <Route path="patientappointment/:patientId" element={loggedIn ? <PatientHistory /> : redirect('/')} />
        <Route path="dependentdata/:patientId" element={loggedIn ? <Dependent /> : redirect('/')} />
      </Route>

      <Route path="/doctorbookingwithpatientlogin/:doctorId"
        element={loggedIn ? <DoctorBookingWithPatientLogin /> : redirect('/')} />

      <Route path="/subscription"
        element={loggedIn ? <Subscription /> : redirect('/')} />
        
      <Route path="/user"
        element={loggedIn ? <User /> : redirect('/')} />

      <Route path="/logout" element={< Logout />} />

      <Route path="/helper/:doctorId"
        element={loggedIn ? <Helper /> : redirect('/')} />

      <Route path="/edithelper/:helperId"
        element={loggedIn ? <EditHelper /> : redirect('/')} />

      <Route path="/loginhelper"
        element={loggedIn ? <LoginHelper /> : redirect('/')} />

      {/* 
      <Route path="/bookingconfirmation/:patientAppointmentId"
        element={loggedIn ? <SlotConfirmation /> : redirect('/')}>
      </Route> */}

      <Route path="/subscriptions/:doctorId"
        element={loggedIn ? <SubscriptionNewDr /> : redirect('/')} />


      {/* <Route path="/subscriptionconfirmation/:doctorId"
        element={loggedIn ? <SubscriptionConfirmation /> : redirect('/')}>
      </Route> */}
      {/* 
        <Route path="/dependentdata/:patientId"
          element={loggedIn ? <Dependent /> : redirect('/')}>
        </Route> */}
    </Routes>
  )
}
export default MainContainer;