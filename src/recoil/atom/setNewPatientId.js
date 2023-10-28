import {atom} from 'recoil';
import { recoilPersist } from "recoil-persist"
const { persistAtom } = recoilPersist();
export const setNewPatientId = atom({
    key : "setNewPatientId",
    default: [], 
    effects_UNSTABLE: [persistAtom]
});