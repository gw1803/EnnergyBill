import { Link, useParams } from "react-router-dom";
import PersonForm from "./PersonForm";
import { Container } from "@mui/material";

function PersonAlterar() {
    let params = useParams(); //Utilizado a partir da versao 6 do react-router.
    console.log("apkmsdoipasmd", JSON.stringify(params.id))
    return (
        <Container>
            <h1>Alterar Informações de Pessoa</h1>
            
            <PersonForm id={params.id} />
        </Container>


    );
}

export default PersonAlterar;