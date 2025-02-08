import {Button, Col, Form, Modal, Row, Stack, Table} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import {Link, useLocation} from "react-router-dom";
import {BsFillPencilFill, BsFillTrashFill} from "react-icons/bs";
import {useEffect, useState} from "react";
import ServicoApi from "../../api/ServicoApi";

function ServicoList(){

    const [show, setShow] = useState(false);
    const [idDelete, setIdDelete] = useState(false);
    const [servicoList, setServicoList] = useState([]);
    const location = useLocation();
    const [searchText, setSearchText] = useState("");

    const servicoApi = new ServicoApi();

    function handleShow(id) {
        setIdDelete(id);
        setShow(true);
    }

    function handleClose() {
        setShow(false);
    }

    function handleExcluir() {
        setShow(false);
        servicoApi.excluir(idDelete);
        console.log(`Excluido o servico id: ${idDelete}`);
        consultarEPrecherTable();
    }

    function submitSearchServico(e) {
        e.preventDefault();
        consultarEPrecherTable();
    }

    useEffect(() => {
        consultarEPrecherTable();
    }, [location.pathname]);

    function consultarEPrecherTable(){
        if (searchText.trim().length > 0){
            servicoApi.getServicosByText(setServicoList, searchText);
        }else{
            servicoApi.getServicos(setServicoList);
        }
        
    }

    return(
        <>
            <Container>
                <br/>
                <Row>
                    <Col xl={2}>
                        <Link to="/servico/incluir">
                            <Button>+</Button>
                        </Link>
                    </Col>
                </Row>
                <br/>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>Descricao</th>
                        <th>Id.</th>
                        <th>Valor</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        servicoList.map((item) => (
                            <tr key={item.id}>
                                <td>{item.descricao}</td>
                                <td>{item.id}</td>
                                <td>{item.valor}</td>
                                <td>
                                    <Stack direction="horizontal" gap={3}>
                                        <div className="ms-auto">
                                            <Button variant="danger" size="sm" onClick={(e) =>handleShow(item.id)}>
                                                <BsFillTrashFill/>
                                            </Button>
                                        </div>
                                        <div className="">
                                            <Link to={`/servico/alterar/${item.id}`}>
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
                    <Modal.Body>Confirma a exclusao do servico {idDelete}?</Modal.Body>
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

export default ServicoList;
