import axios from 'axios';
import { API } from '../config';

export default function AuthApi() {
    const addDoctorInformation = async ({ doctorId }) => {
        try {
            const result = await axios.get(`${API}/fetchData/${doctorId}`);
            return result.data;
        }
        catch (err) {
            return err
        }
    }

    const submitDoctorInformation = async ({ doctorId, bodyData }) => {
        try {
            const result = await axios.post(`${API}/insertPersonalInfo/${doctorId}`, bodyData)
            return result.data
        }
        catch (err) {
            return err
        }
    }

    const getDrInfo = async ({ doctorId }) => {
        try {
            const result = await axios.get(`${API}/doctor/${doctorId}`);
            console.log('=result==',result)
            return result.data;
        }
        catch (err) {
            return err
        }
    }

    const loginAdmin = async (bodyData) => {
        try {
            const result = await axios.post(`${API}/login`, bodyData)
            return result.data
        }
        catch (err) {
            return err
        }
    }
    const getdoctors = async (currentPage, pageSize) => {
        try {
            const result = await axios.post(`${API}/search?page=${currentPage}&pageSize=${pageSize}`)
            return result.data
        }
        catch (err) {
            return err
        }

    }
    //for dr login
    const login = async ({ mobile }) => {
        const result = await axios.post(`${API}/loginotp`, { mobile })
        return result;
    };

    const loginOtp = async ({ getOTP, _id }) => {
        const result = await axios.post(`${API}/otp`, { getOTP, _id });
        return result;
    };

    return {
        addDoctorInformation,
        submitDoctorInformation,
        getDrInfo,
        loginAdmin,
        getdoctors,
        login,
        loginOtp,
    }
}