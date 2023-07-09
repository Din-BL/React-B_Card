import { NavLink, useNavigate, useParams } from "react-router-dom";
import { Box, Typography, TextField, Container, Grid, Checkbox, FormControlLabel } from "@mui/material";
import Form from "../components/Form";
import { CardFields } from "../utils/fields";
import { cardSchema } from "../utils/schema";
import { editCard } from "../utils/services";
import { toast } from "react-toastify";
import React, { useContext } from "react";
import { DataContext } from "../context/Cards";
import { getData } from "../utils/localStorage";
import { LoginInfoContext } from "../context/LoginInfo";
import { logout } from "../utils/helpers";

function Edit() {
    const { editData } = useContext(DataContext)
    const navigate = useNavigate()
    const { setLoginInfo } = React.useContext(LoginInfoContext)

    const handleEdit = (id: string, data: any) => {
        editCard(id, data)
            .then((info) => {
                editData(id, info.data)
                navigate(`/my cards/${getData('user', '_id')}`)
                toast.success('Business updated')
            })
            .catch(e => {
                const errMsg = e.response.data
                toast.error(errMsg)
                errMsg.includes('expired') && logout(navigate, setLoginInfo)
            })
    }

    return <Form
        FormTitle='Edit Card'
        FormFields={CardFields}
        FormSchema={cardSchema}
        handleEdit={handleEdit}>
    </Form>
}

export default Edit;