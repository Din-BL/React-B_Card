import { useEffect, useState } from "react";
import { getData } from "../utils/localStorage";
import { UserStorage } from "../utils/types";

export interface Login {
    admin: boolean | null;
    business: boolean | null;
    logged: UserStorage | null
}

export function useLogin() {
    const [loginInfo, setLoginInfo] = useState<Login>(() => {
        return { admin: getData('user', 'admin'), business: getData('user', 'business'), logged: getData('user') }
    })
    return { loginInfo, setLoginInfo }
}