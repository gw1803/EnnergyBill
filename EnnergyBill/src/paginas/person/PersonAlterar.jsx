import {Link, useParams} from "react-router-dom";
import ServicoForm from "./PersonForm";

function ServicoAlterar(){
    const {id} = useParams(); //Utilizado a partir da versao 6 do react-router.

    return(
        <>
            <Link to={"/"}>Home</Link> / <Link to={"/servico/list"}>Servico Lista</Link> / Servico Alterar

            <h1>Servico Alterar:</h1>
            <br/>
            <ServicoForm id={id}/>
        </>

    );
}

export default ServicoAlterar;