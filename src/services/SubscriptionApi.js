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

    return {
        subscription,
        getSubscriptionData,
        updateSubscriptionData,
    }
}