import {Link, useParams} from "react-router-dom";
import PetForm from "./PetForm";

function PetAlterar(){
    const {id} = useParams(); //Utilizado a partir da versao 6 do react-router.

    return(
        <>
            <Link to={"/"}>Home</Link> / <Link to={"/pet/list"}>Pet Lista</Link> / Pet Alterar

            <h1>Pet Alterar:</h1>
            <br/>
            <PetForm id={id}/>
        </>

    );
}

export default PetAlterar;