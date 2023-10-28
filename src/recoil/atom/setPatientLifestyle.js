import { atom } from 'recoil';

export const setPatientLifestyle = atom({
    key: 'setPatientLifestyle', // unique ID (with respect to other atoms/selectors)
    default: [] // default value (aka initial value)
});  