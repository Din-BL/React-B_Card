import { useEffect, useState } from "react";
import { getData } from "../utils/localStorage";
import { UserStorage } from "../utils/types";

export interface Login {
    business: boolean | null;
    logged: UserStorage | null
}

export function useLogin() {
    const [loginInfo, setLoginInfo] = useState<Login>(() => {
        return { business: getData('user', 'business'), logged: getData('user') }
    })
    return { loginInfo, setLoginInfo }
}