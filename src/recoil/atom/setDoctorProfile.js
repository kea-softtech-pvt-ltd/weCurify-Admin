import { atom } from 'recoil';

export const setDoctorProfile = atom({
    key: 'setDoctorProfile', // unique ID (with respect to other atoms/selectors)
    default: [] // default value (aka initial value)
});