import axios from 'axios'
import { API } from '../config'
export default function SubscriptionApi() {
    const subscription = async (bodyData) => {
        try {
            const result = await axios.post(`${API}/subscription`, bodyData)
            return result.data
        }
        catch (err) {
            return err
        }
    };
    const getSubscriptionData = async ({ doctorId }) => {
        try {
            const result = await axios.get(`${API}/getsubscription/${doctorId}`)
            return result.data
        }
        catch (err) {
            return err
        }

    }
    const updateSubscriptionData = async ({ _id }, bodyData) => {
        try {
            const result = await axios.post(`${API}/updatesubscriptiondata/${_id}`, bodyData)
            return result.data
        }
        catch (err) {
            return err
        }

    }
    const getSubscriptionFeature = async () => {
        try {
            const result = await axios.get(`${API}/getfeatures`)
            return result.data
        }
        catch (err) {
            return err
        }
    }
    const getSubscriptionPlans = async () => {
        try {
            const result = await axios.get(`${API}/getsubscriptionplans`)
            console.log("=-=-=-=======", result)
            return result.data
        }
        catch (err) {
            return err
        }
    }

    const getSubscriptionPlanById = async (id) => {
        try {
            const result = await axios.get(`${API}/getsubscriptionplanById/${id}`)
            return result.data
        }
        catch (err) {
            return err
        }
    }
    const addSubscriptionPlan = async (bodyData) => {
        try {
            const result = await axios.post(`${API}/addsubscriptionplans`, bodyData)
            return result.data
        }
        catch (err) {
            return err
        }
    }

    const deleteSubscriptionPlan = async ( id) => {
        try {
            const result = await axios.delete(`${API}/deletesubscriptionplans/${id}`)
            return result.data
        }
        catch (err) {
            return err
        }
    }

    const updateSubscriptionPlan = async ( id , bodydata) => {
        try {
            const result = await axios.post(`${API}/updatesubscriptionplans/${id}`, bodydata)
            return result.data
        }
        catch (err) {
            return err
        }
    }

    return {
        subscription,
        getSubscriptionData,
        updateSubscriptionData,
        getSubscriptionFeature,
        getSubscriptionPlans,
        getSubscriptionPlanById,
        addSubscriptionPlan,
        deleteSubscriptionPlan,
        updateSubscriptionPlan
    }
}