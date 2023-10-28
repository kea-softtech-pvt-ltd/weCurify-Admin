import { atom } from 'recoil'
// import { recoilPersist } from "recoil-persist"
// const { persistAtom  } = recoilPersist();
export const updateSession = atom({
    key: 'updateSession',
    default: [],
    // effects_UNSTABLE: [persistAtom ]
})