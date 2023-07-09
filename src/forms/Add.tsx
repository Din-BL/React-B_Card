import { toast } from "react-toastify";
import Form from "../components/Form";
import { CardFields } from "../utils/fields";
import { cardSchema } from "../utils/schema";
import { addCard } from "../utils/services";
import { useNavigate, useParams } from "react-router-dom";
import { DataContext } from "../context/Cards";
import { useContext } from "react";

function Add() {
    const { id } = useParams();
    const navigate = useNavigate()
    const { addData } = useContext(DataContext)


    const handleAdd = (data: any) => {
        addCard(data)
            .then((info) => {
                addData(info.data)
                navigate(`/my cards/${id}`)
                toast.success('Business added')
            })
            .catch(e => {
                toast.warning(e.response.data)
                // logout(navigate, business, setBusiness, setLogged)
            })
    }

    return <Form
        FormTitle='Create Card'
        FormFields={CardFields}
        FormSchema={cardSchema}
        handleAdd={handleAdd}
    ></Form>
}

export default Add;