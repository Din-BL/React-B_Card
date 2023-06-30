import { Checkbox, FormControlLabel, Typography } from "@mui/material";
import { useState } from "react";
import { RegisterFields } from "../utils/fields";
import { registerSchema } from "../utils/schema";
import Form from "../components/Form";

function Register() {
    const [checked, setChecked] = useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
    };

    return (
        <Form FormTitle='Register' FormFields={RegisterFields} FormSchema={registerSchema} CheckField={{ checked, setChecked, handleChange }}>
            <FormControlLabel sx={{ marginLeft: 1, paddingTop: 1 }} control={
                <Checkbox
                    checked={checked}
                    onChange={handleChange}
                    inputProps={{ 'aria-label': 'controlled' }}
                />} label="Register as business" />
        </Form>
    )
}

export default Register;