import React, { useEffect, useState } from "react";
import { UserCard } from "../utils/types";
import { getUser } from "../utils/services";
import { LoginInfoContext } from "../context/LoginInfo";
import { useNavigate, useParams } from "react-router-dom";
import { errorMsg } from "../utils/helpers";
import { AxiosResponse } from "axios";

export function useUser() {
    const { id } = useParams();
    const { setLoginInfo, loginInfo } = React.useContext(LoginInfoContext)
    const [initialValue, setInitialValue] = useState<UserCard>()
    const { logged } = loginInfo
    const navigate = useNavigate()
    let error = 0

    useEffect(() => {
        if (logged && id && !error) {
            error += 1
            getUser(id)
                .then((res: AxiosResponse<UserCard>) => setInitialValue(res.data))
                .catch((e) => errorMsg(e, navigate, setLoginInfo, true))
        }
    }, [logged]);

    return { initialValue }
}

