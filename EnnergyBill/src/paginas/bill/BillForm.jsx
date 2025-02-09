import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import BillApi from "../../api/BillApi";
import PersonApi from "../../api/PersonApi";
import { Field } from '@base-ui-components/react/field';
import { Select } from '@base-ui-components/react/select';
import { Form } from '@base-ui-components/react/form';
import styles from '../../index.module.css';
import Icon from '@mui/material/Icon';

function BillForm({ id }) {
    const [errors, setErrors] = useState({});
    const [data, setData] = useState("");
    const [valor, setValor] = useState("");
    const [person, setPerson] = useState("");
    const [personList, setPersonList] = useState([]);
    const navigate = useNavigate();
    const [placeHolder, setPlaceHolder] = useState("Escolha um responsável");



    function setBill(bill) {
        setData(bill.data);
        setValor(bill.valor);
        setPerson(bill.person);
    }

    useEffect(() => {
        if (id) {
            console.log("Consultar o bill pelo id: " + id);
            const billApi = new BillApi();
            billApi.getBill(setBill, id);
            
            setPlaceHolder(person.nome);
        }
        const personApi = new PersonApi();
        personApi.getPersons(setPersonList);
    }, [id]);

    useEffect(() => {
        if (person && person.nome) { 
            setPlaceHolder(person.nome);
        } else {
            setPlaceHolder("Escolha um responsável"); 
        }
    }, [person]);

    async function cadastrarBill(e) {
        e.preventDefault();
        var bill = { id: id, data: data, valor: valor, person: person };
        console.log(JSON.stringify(bill));
        console.log("cadastrarBill exec.....");

        const billApi = new BillApi();
        if (id) {
            const a = await fetch('http://localhost:8080/bill', {
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
            onSubmit={cadastrarBill}
        >
            <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/icon?family=Material+Icons"
            />
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

            <Select.Root key="personSelect" value={person} onValueChange={(newValue, event) => { setPerson(newValue)}}>
                <Select.Trigger className={styles.SelectInput}>
                    <Select.Value placeholder={placeHolder} />
                    <Select.Icon className={styles.SelectIcon}>
                        <Icon>menu</Icon>
                    </Select.Icon>
                </Select.Trigger>
                <Select.Portal>
                    <Select.Positioner className={styles.Positioner} sideOffset={8}>
                        <Select.Popup className={styles.Popup}>
                            <Select.Arrow>
                                <Icon>menu</Icon>
                            </Select.Arrow>
                            {personList.map((item) => (

                                <Select.Item className={styles.Item} value={item} key={item.id}>
                                    <Select.ItemIndicator className={styles.ItemIndicator}>
                                        <Icon>check</Icon>
                                    </Select.ItemIndicator>
                                    <Select.ItemText className={styles.ItemText}>
                                        {item.nome}
                                    </Select.ItemText>
                                </Select.Item>
                            ))}

                        </Select.Popup>
                    </Select.Positioner>
                </Select.Portal>
            </Select.Root>

            <button type="submit" className={styles.Button}>
                Submit
            </button>
        </Form>
    );
}

export default BillForm;