import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { LoginInfoContext } from "../context/LoginInfo";
import { pathUrl, paths } from "../utils/helpers";

function RouteGuard(props: React.PropsWithChildren<{}>) {
    const { loginInfo } = useContext(LoginInfoContext)
    const location = useLocation()

    function authGuard() {
        if (pathUrl('favorite', location)) {
            return loginInfo.logged
        } else if (paths(['my cards', 'add', 'edit'], location)) {
            return loginInfo.business
        } else {
            return loginInfo.admin
        }
    }

    return authGuard() ?
        (<>{props.children}</>) :
        (<Navigate to="/login" replace={true} />);
}

export default RouteGuard;
