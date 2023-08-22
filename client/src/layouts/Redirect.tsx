import { Navigate, useParams } from "react-router-dom";
import { getData } from "../utils/localStorage";

function Redirect(props?: React.PropsWithChildren<{}>) {
    const { id } = useParams()
    const storageId = getData('userInfo', '_id')

    if (storageId) {
        return storageId === id ? (<>{props?.children}</>) : <Navigate to={`/error`} />
    } else if (props?.children) {
        return !id ? <>{props.children}</> : <Navigate to={`/error`} />
    } else {
        return <Navigate to={`/home`} />
    }
}

export default Redirect;