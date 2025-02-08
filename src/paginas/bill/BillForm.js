import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import BillApi from "../../api/BillApi";
import { FormControl } from '@mui/base/FormControl';
import { Container } from "@mui/material";

function PetForm({ id }) {

    const [nome, setNome] = useState("");
    const [dono, setDono] = useState("");
    const navigate = useNavigate();

    function setPet(pet) {
        setNome(pet.nome);
        setDono(pet.dono);
    }

    useEffect(() => {
        if (id) {
            console.log("Consultar o pet pelo id: " + id);
            const petApi = new PetApi();
            petApi.getPet(setPet, id);
        }
    }, [id]);

    function cadastrarPet(e) {
        e.preventDefault();
        var pet = { id: id, nome: nome, dono: dono };
        console.log(JSON.stringify(pet));
        console.log("cadastrarPet exec.....");

        const petApi = new PetApi();
        if (id) {
            petApi.alterarPet(pet);
        } else {
            petApi.incluirPet(pet);
        }

        navigate(`/pet/list`);
    }

    return (
        <Container>
            <FormControl defaultValue="" required>
                <Label>Name</Label>
                <StyledInput placeholder="Write your name here" />
                <HelperText />
            </FormControl>
        </Container>


    );
}

export default PetForm;