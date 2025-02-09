import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import BillApi from "../../api/BillApi";
import PersonApi from "../../api/PersonApi";
import { Field } from '@base-ui-components/react/field';
import { Form } from '@base-ui-components/react/form';
import styles from '../../index.module.css';


function BillForm({ id }) {
    const [errors, setErrors] = useState({});
    const [data, setData] = useState("");
    const [valor, setValor] = useState("");
    const [person, setPerson] = useState("");
    const navigate = useNavigate();



    function setBill(bill){
        setData(bill.data);
        setValor(bill.valor);
        setPerson(bill.person);
    }

    useEffect(() => {
        if (id) {
            console.log("Consultar o bill pelo id: " + id);
            const billApi = new BillApi();
            billApi.getBill(setBill, id);
        }
        const personApi = new PersonApi();
        personApi.getPerson(setPerson, 3);
    }, [id]);

    async function cadastrarBill(e) {
        e.preventDefault();
        var bill = { id: id, data: data, valor: valor, person: person};
        console.log(JSON.stringify(bill));
        console.log("cadastrarBill exec.....");

        const billApi = new BillApi();
        if (id) {
            const a = await fetch('http://localhost:8080/bill',{
                method: 'PUT',
                body: bill
            });
            console.log(a)
            billApi.alterarBill(bill);
        } else {
            billApi.incluirBill(bill);
        }

        navigate(`/bill/list`);
    }

    return (
        <Form
            className={styles.Form}
            errors={errors}
            onClearErrors={setErrors}
            onSubmit={ cadastrarBill}
        >
            <Field.Root name="data" className={styles.Field}>
                <Field.Label className={styles.Label}>Data da conta</Field.Label>
                <Field.Control
                    required
                    placeholder={'Insira uma data'}
                    className={styles.Input}
                    value={data} 
                    onChange={(e) => setData(e.target.value)}
                />
                <Field.Error className={styles.Error} />
            </Field.Root>
            <Field.Root name="valor" className={styles.Field}>
                <Field.Label className={styles.Label}>Valor da conta</Field.Label>
                <Field.Control
                    type="number"
                    required
                    placeholder={'Insira uma valor'}
                    className={styles.Input}
                    value={valor} 
                    onChange={(e) => setValor(e.target.value)}
                />
                <Field.Error className={styles.Error} />
            </Field.Root>
            
            <button type="submit" className={styles.Button}>
                Submit
            </button>
        </Form>
    );
}

export default BillForm;