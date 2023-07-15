import { useState } from "react";
import { getData } from "../utils/localStorage";
import { UseLogin } from "../utils/types";

export function useLogin() {
    const [loginInfo, setLoginInfo] = useState<UseLogin>(() => {
        return { admin: getData('user', 'admin'), business: getData('user', 'business'), logged: getData('user') }
    })
    return { loginInfo, setLoginInfo }
}