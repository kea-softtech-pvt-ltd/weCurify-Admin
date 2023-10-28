import { atom } from 'recoil';

export const setDoctorClinic = atom({
    key: 'setDoctorClinic', // unique ID (with respect to other atoms/selectors)
    default: [] // default value (aka initial value)
});  