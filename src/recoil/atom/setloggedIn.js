import { atom } from 'recoil';
import { recoilPersist } from "recoil-persist"
const { persistAtom } = recoilPersist();

export const setloggedIn = atom({
    key: 'setloggedIn', // unique ID (with respect to other atoms/selectors)
    default: [] ,// default value (aka initial value)
    effects_UNSTABLE: [persistAtom]

});  

 