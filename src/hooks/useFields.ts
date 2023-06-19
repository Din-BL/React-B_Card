import { ChangeEvent, FormEvent, useState } from "react";

export default function useFields<Fields>(initalValue: Fields) {

    const [fields, setFields] = useState(initalValue)

    const handleField = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFields((currentValue) => {
            return { ...currentValue, [name]: value }
        })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(fields);
    }

    const resetFields = () => {
        setFields(initalValue)
    }

    return { fields, handleField, handleSubmit, resetFields }
}