import axios from "axios"
import { API } from "../config"

export default function HelperApi() {
    const createHelper = async (bodyData) => {
        try {
            const result = await axios.post(`${API}/addhelper`, bodyData)
            return result.data
        }
        catch (err) {
            return err    
        }
    }

    const getAccessModule = async () => {
        try {
            const result = await axios.get(`${API}/accessmodule`)
            return result.data
        }
        catch (err) {
            return err
        }
    }

    const loginHelperData = async (bodyData) => {
        try {
            const result = await axios.post(`${API}/helperlogin`, bodyData)
            return result.data
        }
        catch (err) {
            return err
        }
    }
    
    const getHelper = async (doctorId) => {
        try {
            const result = await axios.get(`${API}/gethelpers/${doctorId}`)
            return result.data
        }
        catch (err) {
            return err
        }
    }
    const removeHelper = async (id) => {
        try {
            const result = await axios.delete(`${API}/deletehelper/${id}`)
            return result.data
        }
        catch (err) {
            return err
        }
    }
    const fetchHelperData = async (helperId) => {
        try {
            const result = await axios.get(`${API}/fetchhelper/${helperId}`)
            return result.data
        }
        catch (err) {
            return err
        }
    }
    const updateHelperData = async (helperId, bodyData) => {
        try {
            const result = await axios.post(`${API}/edithelper/${helperId}`, bodyData)
            return result.data
        }
        catch (err) {
            return err
        }
    }
    return {
        getAccessModule,
        createHelper,
        loginHelperData,
        getHelper,
        removeHelper,
        fetchHelperData,
        updateHelperData,
    }
}