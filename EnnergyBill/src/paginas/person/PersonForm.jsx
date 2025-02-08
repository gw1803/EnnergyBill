import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import PersonApi from "../../api/PersonApi";
import { Field } from '@base-ui-components/react/field';
import { Form } from '@base-ui-components/react/form';
import styles from '../../index.module.css';


function PersonForm({ id }) {
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [nome, setNome] = useState("");
    const navigate = useNavigate();

    function setPerson(person) {
        setNome(person.nome);
    }

    useEffect(() => {
        if (id) {
            console.log("Consultar o person pelo id: " + id);
            const personApi = new PersonApi();
            personApi.getPerson(setPerson, id);
        }
    }, [id]);

    function cadastrarPerson(e) {
        e.preventDefault();
        var person = { id: id, nome: nome };
        console.log(JSON.stringify(person));
        console.log("cadastrarPerson exec.....");

        const personApi = new PersonApi();
        if (id) {
            personApi.alterarPerson(person);
        } else {
            personApi.incluirPerson(person);
        }

        navigate(`/person/list`);
    }

    return (
        <Form
            className={styles.Form}
            errors={errors}
            onClearErrors={setErrors}
            onSubmit={async (event) => {
                event.preventDefault();
                const formData = new FormData(event.currentTarget);
                const value = formData.get('url');

                setLoading(true);
                const response = await submitForm(value);
                const serverErrors = {
                    url: response.error,
                };

                setErrors(serverErrors);
                setLoading(false);
            }}
        >
            <Field.Root name="nome" className={styles.Field}>
                <Field.Label className={styles.Label}>Nome da pessoa</Field.Label>
                <Field.Control
                    required
                    placeholder="Insira um nome"
                    className={styles.Input}
                />
                <Field.Error className={styles.Error} />
            </Field.Root>
            <button disabled={loading} type="submit" className={styles.Button}>
                Submit
            </button>
        </Form>
    );
}

export default PersonForm;