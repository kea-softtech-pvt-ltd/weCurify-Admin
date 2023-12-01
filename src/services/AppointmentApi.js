import axios from 'axios'
import { API } from '../config'
export default function AppointmentApi() {
    const cancelPatientAppointment = async (id) => {
        try {
            const result = await axios.delete(`${API}/cancelappointment/${id}`)
            return result
        }
        catch (err) {
            return err
        }
    }
    const downloadPrescription = async (id) => {
        try {
            const result = await axios.get(`${API}/download-prescription/${id}`);
            return result.data;
        }
        catch (err) {
            return err
        }
    }
    const getPatientListDetails = async ({ doctorId }) => {
        try {
            const result = await axios.get(`${API}/getBookingData/${doctorId}`);
            return result.data;
        }
        catch (err) {
            return err
        }
    }
    const createPDF = async ({ reportId }) => {
        try {
            const result = await axios.post(`${API}/createprescriptionpdf/${reportId}`)
            return result.data
        }
        catch (err) {
            return err
        }
    };

    const getappointment = async ({patientAppointmentId}) => {
        try {
            const result = await axios.get(`${API}/getappointment/${patientAppointmentId}`)
            return result.data
        }
        catch (err) {
            return err
        }
    };

    return {
        cancelPatientAppointment,
        downloadPrescription,
        getPatientListDetails,
        createPDF,
        getappointment
    }
}