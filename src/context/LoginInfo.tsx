import { createContext } from "react";
import { Login, useLogin } from "../hooks/useLogin";
import { LoginContextType } from "../utils/types";

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
