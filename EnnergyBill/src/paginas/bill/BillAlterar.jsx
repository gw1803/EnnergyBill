import { Link, useParams } from "react-router-dom";
import BillForm from "./BillForm";
import { Container } from "@mui/material";

function BillAlterar() {
    let params = useParams(); //Utilizado a partir da versao 6 do react-router.
    console.log("apkmsdoipasmd", JSON.stringify(params.id))
    return (
        <Container>
            <h1>Alterar Informações da Conta</h1>
            
            <BillForm id={params.id} />
        </Container>


    );
}

export default BillAlterar;