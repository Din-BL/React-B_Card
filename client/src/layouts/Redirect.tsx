import { Navigate, useLocation, useParams } from "react-router-dom";
import { getData } from "../utils/localStorage";
import { userId } from "../utils/helpers";

function Redirect(props?: React.PropsWithChildren<{}>) {
    const { id } = useParams()
    const location = useLocation()
    const storageId = getData('userInfo', '_id')

    if (location.pathname === '/') {
        return <Navigate to={`/home${userId()}`} />
    } else if (storageId) {
        return storageId === id ? (<>{props?.children}</>) : <Navigate to={`/error`} />
    } else {
        return !id ? <>{props?.children}</> : <Navigate to={`/error`} />
    }
}

export default Redirect;

