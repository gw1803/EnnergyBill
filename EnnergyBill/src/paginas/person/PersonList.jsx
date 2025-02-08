
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
    }

    return (
        <>
            <h1>Lista de pessoas</h1>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>ID </StyledTableCell>
                            <StyledTableCell align="right">Nome</StyledTableCell>
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
                                <TableCell align="right">{item.nome}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default PersonList;
