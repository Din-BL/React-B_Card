import { useContext } from "react";
import { Navigate, useLocation, useParams } from "react-router-dom";
import { LoginInfoContext } from "../context/LoginInfo";
import { pathUrl, paths } from "../utils/helpers";
import { getData } from "../utils/localStorage";

function RouteGuard(props: React.PropsWithChildren<{}>) {
    const { loginInfo } = useContext(LoginInfoContext)
    const location = useLocation()
    const { id } = useParams()
    const storageId = getData('userInfo', '_id')

    function authGuard() {
        if (paths(['favorite', 'user'], location)) {
            return loginInfo.logged
        } else if (pathUrl('my-cards', location)) {
            return loginInfo.business
        } else {
            return loginInfo.admin
        }
    }

    if (location.pathname.includes('edit')) {
        const editId = location.pathname.split('/')[2];
        if (storageId === editId) return (<>{props.children}</>)
    } if (storageId !== id) {
        return <Navigate to={`/error`} />
    } else if (authGuard()) {
        return (<>{props.children}</>)
    } else {
        return (<Navigate to="/login" replace={true} />);
    }
}

export default RouteGuard;
