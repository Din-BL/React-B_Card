import { useState } from "react";
import { getData } from "../utils/localStorage";
import { UseLogin } from "../utils/types";

export function useLogin() {
    const [loginInfo, setLoginInfo] = useState<UseLogin>(() => {
        return { admin: getData('userInfo', 'admin'), business: getData('userInfo', 'business'), logged: getData('userInfo') }
    })
    return { loginInfo, setLoginInfo }
}