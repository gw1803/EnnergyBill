import {Link} from "react-router-dom";
import ServicoForm from "./ServicoForm";

function ServicoIncluir(){
    return(
        <>
            <Link to={"/"}>Home</Link> / <Link to={"/servico/list"}>Servico Lista</Link> / Servico Incluir

            <h1>Servico Incluir:</h1>
            <br/>
            <ServicoForm />
        </>

    );
}

export default ServicoIncluir;
