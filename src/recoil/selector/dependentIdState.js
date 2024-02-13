import {  selector  } from 'recoil';
import { setDependentId } from '../atom/setDependentId';
export const dependentIdState = selector({
  key: 'dependentIdState', // unique ID (with respect to other atoms/selectors)
  get: ({get}) => {
    const DependentId = get(setDependentId);
    return DependentId;
  },
});