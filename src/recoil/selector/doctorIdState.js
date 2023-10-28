import {  selector  } from 'recoil';
import {  setDoctorId  } from '../atom/setDoctorId';

export const doctorIdState = selector({

    key: 'doctorIdState', // unique ID (with respect to other atoms/selectors)
    get: ({get}) => {
      const doctorId = get(setDoctorId);
      return doctorId;
    },

  });
