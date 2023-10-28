import {  selector  } from 'recoil';
import {  setNewPatientId } from '../atom/setNewPatientId'
export const patientIdState = selector({
  key: 'patientIdState', // unique ID (with respect to other atoms/selectors)
  get: ({get}) => {
    const PatientId = get(setNewPatientId);
    return PatientId;
  },
});
