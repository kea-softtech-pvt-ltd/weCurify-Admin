import { atom } from 'recoil';

export const setDoctorOwnClinic = atom({
    key: 'setDoctorOwnClinic', // unique ID (with respect to other atoms/selectors)
    default: [] // default value (aka initial value)
});  