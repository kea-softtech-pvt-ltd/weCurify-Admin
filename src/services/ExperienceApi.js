import axios from "axios";
import { API } from "../config";

export default function ExperienceApi() {
    const insertDrExperience = async (newDoctorData) => {
        try {
            const result = await axios.post(`${API}/insertExperience`, newDoctorData)
            return result.data
        }
        catch (err) {
            return err
        }
    }
    const editExperienceData = async ({ ExId }, updateExperienceData) => {
        try {
            const result = await axios.post(`${API}/updateExperience/${ExId}`, updateExperienceData)
            return result.data
        }
        catch (err) {
            return err
        }

    }
    const fetchExperienceData = async ({ doctorId }) => {
        try {
            const result = await axios.get(`${API}/fetchExData/${doctorId}`)
            return result.data
        }
        catch (err) {
            return err
        }
    }
    const getAllExperienceData = async ({ ExId }) => {
        try {
            const result = await axios.get(`${API}/fetchUpdateExperience/${ExId}`)
            return result.data
        }
        catch (err) {
            return err
        }
    }
    const removeExperience = async (id) => {
        try {
            const result = await axios.delete(`${API}/deleteexperience/${id}`)
            return result
        }
        catch (err) {
            return err
        }
    }
    return {
        insertDrExperience,
        editExperienceData,
        fetchExperienceData,
        getAllExperienceData,
        removeExperience
    }
}