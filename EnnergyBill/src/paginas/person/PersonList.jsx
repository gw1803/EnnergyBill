
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import PersonApi from "../../api/PersonApi";

import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Icon from '@mui/material/Icon';

import { Button, Box, Modal, Typography } from "@mui/material";


function PersonList() {


    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: 'rgba(25,118,210,255)',
            color: theme.palette.common.white,
        },
    }));

    const [show, setShow] = useState(false);
    const [idDelete, setIdDelete] = useState(false);
    const [personList, setPersonList] = useState([]);
    const location = useLocation();
    const personApi = new PersonApi();



    function handleShow(id) {
        setIdDelete(id);
        setShow(true);
    }

    function handleClose() {
        setShow(false);
    }

    function handleExcluir() {
        setShow(false);
        personApi.excluir(idDelete);
        console.log(`Excluido o person id: ${idDelete}`);
        consultarEPrecherTable();
    }

    function submitSearchPerson(e) {
        e.preventDefault();
        consultarEPrecherTable();
    }

    useEffect(() => {
        consultarEPrecherTable();
    }, [location.pathname]);

    function consultarEPrecherTable() {
        personApi.getPersons(setPersonList);
        console.log("estou aqui amigo")
    }

    return (
        <>
            <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/icon?family=Material+Icons"
            />

            <Box display="flex" alignItems="center" justifyContent="center" gap={2}>
                <h1>Lista de pessoas</h1>
                <Link to="/person/incluir">
                    <Button variant="contained">
                        <Icon>add_circle</Icon>
                    </Button>
                </Link>
            </Box>


            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>ID </StyledTableCell>
                            <StyledTableCell align="center">Nome</StyledTableCell>
                            <StyledTableCell align="right"></StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {personList.map((item) => (
                            <TableRow
                                key={item.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="item">
                                    {item.id}
                                </TableCell>
                                <TableCell align="center">{item.nome}
                                </TableCell>
                                <TableCell align="center">
                                    <button type="button" onClick={(e) => handleShow(item.id)} >
                                        <Icon>person_remove</Icon>
                                    </button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Modal
                open={show}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={(theme) => ({
                    position: 'absolute',
                    display: 'grid',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    bgcolor: 'rgba(36,36,36,255)',
                    borderRadius: 5,
                    height: '200px',
                    alignItems: 'center',
                    color: 'white',
                    p: 4,
                })}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Confirmação
                    </Typography>
                    <Typography id="modal-modal-description" >
                        Confirma a exclusao do Pet {idDelete}?
                    </Typography>
                    <Button variant="contained" onClick={handleClose}>
                        Fechar
                    </Button>
                    <Button variant="contained" color="error" onClick={handleExcluir} >
                        Excluir
                    </Button>
                </Box>
            </Modal>
        </>
    );
}

export default PersonList;
