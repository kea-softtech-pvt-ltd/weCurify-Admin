import { atom } from 'recoil';

export const setDoctorEducation = atom({
    key: 'setDoctorEducation', // unique ID (with respect to other atoms/selectors)
    default: [] // default value (aka initial value)
});  