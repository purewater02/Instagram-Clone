import { atom } from 'recoil';
import {LoginResponse} from "../pages/api/types/LoginResponse";

export const userState = atom<any>({
        key: "userState",
        default: null,
});

export const backendUserState = atom<LoginResponse | null>({
        key: "backendUserState",
        default: null,
});