import { Navigate } from "react-router-dom";
import { userId } from "../utils/helpers";

function Redirect() {
    return <Navigate to={`/home${userId()}`} replace={true} />
}

export default Redirect;