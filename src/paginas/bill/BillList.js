import {Button, Col, Form, Modal, Row, Stack, Table} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import {Link, useLocation} from "react-router-dom";
import {BsFillPencilFill, BsFillTrashFill} from "react-icons/bs";
import {useEffect, useState} from "react";
import PetApi from "../../api/PetApi";

function PetList(){

    const [show, setShow] = useState(false);
    const [idDelete, setIdDelete] = useState(false);
    const [petList, setPetList] = useState([]);
    const [searchText, setSearchText] = useState("");
    const location = useLocation();

    const petApi = new PetApi();

    function handleShow(id) {
        setIdDelete(id);
        setShow(true);
    }

    function handleClose() {
        setShow(false);
    }

    function handleExcluir() {
        setShow(false);
        petApi.excluir(idDelete);
        console.log(`Excluido o pet id: ${idDelete}`);
        consultarEPrecherTable();
    }

    function submitSearchPet(e) {
        e.preventDefault();
        consultarEPrecherTable();
    }

    useEffect(() => {
        consultarEPrecherTable();
    }, [location.pathname]);

    function consultarEPrecherTable(){
        if (searchText.trim().length > 0){
            petApi.getPetsByText(setPetList, searchText);
        }else{
            petApi.getPets(setPetList);
        }
    }

    return(
        <>
            <Container>
                <br/>
                <Row>
                    <Col xl={10}>
                        <Form onSubmit={submitSearchPet}>
                            <Form.Group className="mb-3" controlId="searchText">
                                <Form.Control type="text" placeholder="Nome do pet ou Dono" onChange={(e)=>setSearchText(e.target.value)}/>
                            </Form.Group>
                        </Form>
                    </Col>
                    <Col xl={2}>
                        <Link to="/pet/incluir">
                            <Button>+</Button>
                        </Link>
                    </Col>
                </Row>
                <br/>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>Id.</th>
                        <th>Nome</th>
                        <th>Dono</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        petList.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.nome}</td>
                                <td>{item.dono}</td>
                                <td>
                                    <Stack direction="horizontal" gap={3}>
                                        <div className="ms-auto">
                                            <Button variant="danger" size="sm" onClick={(e) =>handleShow(item.id)}>
                                                <BsFillTrashFill/>
                                            </Button>
                                        </div>
                                        <div className="">
                                            <Link to={`/pet/alterar/${item.id}`}>
                                                <Button size="sm"><BsFillPencilFill/></Button>
                                            </Link>
                                        </div>
                                    </Stack>
                                </td>
                            </tr>
                        ))
                    }
                    </tbody>
                </Table>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirmação</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Confirma a exclusao do Pet {idDelete}?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Fechar
                        </Button>
                        <Button variant="danger" onClick={handleExcluir}>
                            Excluir
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </>
    );
}

export default PetList;
