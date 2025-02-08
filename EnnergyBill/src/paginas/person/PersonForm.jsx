import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import PersonApi from "../../api/PersonApi";
import { Field } from '@base-ui-components/react/field';
import { Form } from '@base-ui-components/react/form';
import styles from '../../index.module.css';


function PersonForm({ id }) {
    const [errors, setErrors] = useState({});
    const [nome, setNome] = useState("");
    const [name, setName] = useState("");
    const navigate = useNavigate();



    function setPerson(person){
        setName(person.nome);
    }

    useEffect(() => {
        if (id) {
            console.log("Consultar o person pelo id: " + id);
            const personApi = new PersonApi();
            personApi.getPerson(setPerson, id);
        }
    }, [id]);

    async function cadastrarPerson(e) {
        e.preventDefault();
        var person = { id: id, nome: nome };
        console.log(JSON.stringify(person));
        console.log("cadastrarPerson exec.....");

        const personApi = new PersonApi();
        if (id) {
            const a = await fetch('http://localhost:8080/person',{
                method: 'PUT',
                body: person
            });
            console.log(a)
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
            onSubmit={ cadastrarPerson}
        >
            <Field.Root name="nome" className={styles.Field}>
                <Field.Label className={styles.Label}>Nome da pessoa</Field.Label>
                <Field.Control
                    required
                    placeholder={`Insira um nome novo de ${name}`}
                    className={styles.Input}
                    value={nome} 
                    onChange={(e) => setNome(e.target.value)}
                />
                <Field.Error className={styles.Error} />
            </Field.Root>
            <button type="submit" className={styles.Button}>
                Submit
            </button>
        </Form>
    );
}

export default PersonForm;