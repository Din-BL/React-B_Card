import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";

const schema = Joi.object({
    firstName: Joi.string().required(),
    age: Joi.number().positive().integer().required(),
}).required();

export default function FormValid() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: joiResolver(schema),
    });

    const onSubmit = (data: any) => console.log(data);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register("firstName")} />
            <p>{errors.firstName?.message as string}</p>

            <input {...register("age")} />
            <p>{errors.age?.message as string}</p>

            <input type="submit" />
        </form>
    );
}
