import { useParams } from "react-router-dom";
import Form from "../components/Form";
import { CardFields } from "../utils/fields";
import { cardSchema } from "../utils/schema";

function Edit() {
    return <Form
        FormTitle='Edit Card'
        FormFields={CardFields}
        FormSchema={cardSchema}>
    </Form>
}

export default Edit;