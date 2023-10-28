import { atom } from 'recoil';

export const setDoctorExperience = atom({
    key: 'setDoctorExperience', // unique ID (with respect to other atoms/selectors)
    default: [] // default value (aka initial value)
});  