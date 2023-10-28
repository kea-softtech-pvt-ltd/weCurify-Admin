import { atom } from 'recoil';
import { recoilPersist } from "recoil-persist"
const { persistAtom  } = recoilPersist();
export const setHelperData = atom({
    key: "setHelperData",
    default: [],
    effects_UNSTABLE: [persistAtom ]
});