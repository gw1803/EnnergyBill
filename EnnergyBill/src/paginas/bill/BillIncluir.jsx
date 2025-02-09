import { Link } from "react-router-dom";
import BillForm from "./BillForm";
import { Container } from "@mui/material";

function BillIncluir() {
    return (
        <Container>
            <h1>Cadastro de Conta</h1>
            <BillForm />
        </Container>


    );
}

export default BillIncluir;
