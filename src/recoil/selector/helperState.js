import { selector } from "recoil";
import { setHelperData } from "../atom/setHelperData";

export const helperData = selector({
    key: "helperData",
    get: ({ get }) => {
        const helperD = get(setHelperData)
        return helperD
    },
})