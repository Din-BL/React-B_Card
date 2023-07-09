import { NavLink, useNavigate, useParams } from "react-router-dom";
import { Box, Typography, TextField, Container, Grid, Checkbox, FormControlLabel } from "@mui/material";
import Form from "../components/Form";
import { CardFields } from "../utils/fields";
import { cardSchema } from "../utils/schema";
import { editCard, getCard } from "../utils/services";
import { toast } from "react-toastify";
import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../context/Cards";
import { getData } from "../utils/localStorage";
import { LoginInfoContext } from "../context/LoginInfo";
import { logout } from "../utils/helpers";
import { BusinessCard } from "../utils/types";

function Edit() {
    const { editData } = useContext(DataContext)
    const { id } = useParams();
    const navigate = useNavigate()
    const [initialValue, setInitialValue] = useState<BusinessCard>()
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

    useEffect(() => {
        const fetchData = async () => {
            if (id) {
                try {
                    const res = await getCard(id);
                    setInitialValue(res.data);
                } catch (e: any) {
                    const errMsg = e.response.data
                    toast.error(errMsg)
                    errMsg.includes('expired') && logout(navigate, setLoginInfo)
                }
            }
        };
        fetchData();
    }, []);

    return (
        <>
            {initialValue && (
                <Form
                    FormTitle='Edit Card'
                    FormFields={CardFields}
                    FormSchema={cardSchema}
                    handleEdit={handleEdit}
                    initialValue={initialValue}
                />
            )}
        </>
    );

}

export default Edit;