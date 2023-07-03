import { useParams } from "react-router-dom";
import Form from "../components/Form";
import { CardFields } from "../utils/fields";
import { cardSchema } from "../utils/schema";
import { getCard } from "../utils/services";
import { ReactNode, useEffect, useState } from "react";
import { BusinessCard, BusinessCards } from "../utils/types";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";

function Edit() {
    return <Form
        FormTitle='Edit Card'
        FormFields={CardFields}
        FormSchema={cardSchema}
    >
    </Form>
}

export default Edit;