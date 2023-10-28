import { atom } from 'recoil';

export const setDoctorBooking = atom({
    key: 'setDoctorBooking', // unique ID (with respect to other atoms/selectors)
    default: [] // default value (aka initial value)
});  

 