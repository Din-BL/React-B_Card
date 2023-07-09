import { createContext } from "react";
import { Login, useLogin } from "../hooks/useLogin";


export interface LoginContextType {
    loginInfo: Login
    setLoginInfo: React.Dispatch<React.SetStateAction<Login>>
}

export const LoginInfoContext = createContext<LoginContextType>(null!);

function LoginInfo(props: React.PropsWithChildren<{}>) {
    const { loginInfo, setLoginInfo } = useLogin()
    return (
        <LoginInfoContext.Provider value={{ loginInfo, setLoginInfo }}>
            {props.children}
        </LoginInfoContext.Provider>
    );
}

export default LoginInfo;
