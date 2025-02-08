import { Link } from "react-router-dom";
import PersonForm from "./PersonForm";
import { Container } from "@mui/material";

function PersonIncluir() {
    return (
        <Container>
            <h1>Cadastro de Pessoa</h1>
            <PersonForm />
        </Container>


    );
}

export default PersonIncluir;
