import { atom } from 'recoil';

export const setPatientMedical = atom({
    key: 'setPatientMedical', // unique ID (with respect to other atoms/selectors)
    default: [] // default value (aka initial value)
});  