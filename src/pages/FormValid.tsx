import { Box, Typography, TextField, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";

const schema = Joi.object({
    firstName: Joi.string().required(),
    age: Joi.number().positive().integer().required(),
}).required();

export default function FormValid() {
    const { register, handleSubmit, formState: { errors }, } = useForm({ resolver: joiResolver(schema), });

    const onSubmit = (data: any) => console.log(data);

    return (
        <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
            }}
        >
            <TextField
                {...register("firstName")}
                label="First Name"
                error={!!errors.firstName}
                helperText={errors.firstName?.message as string}
            />
            <TextField
                {...register("age")}
                label="Age"
                type="number"
                error={!!errors.age}
                helperText={errors.age?.message as string}
            />
            <Button type="submit" variant="contained">
                Submit
            </Button>
        </Box>
    );
}
