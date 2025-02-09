import { useState } from 'react';
import './App.css';
import ResponsiveAppBar from './components/navbar/navbar';

import BillList from './paginas/bill/BillList.jsx';
import BillIncluir from './paginas/bill/BillIncluir.jsx';
import BillAlterar from './paginas/bill/BillAlterar.jsx';
import PersonIncluir from './paginas/person/PersonIncluir.jsx';
import PersonList from './paginas/person/PersonList.jsx'
import PersonAlterar from './paginas/person/PersonAlterar.jsx';
import Home from './paginas/Home.jsx'

import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Container } from '@mui/material';

function App() {

  return (
    <div className="App">

      <BrowserRouter>
        <Container>
          <ResponsiveAppBar />

          <Routes>
            <Route exact path="" element={<Home />} />
            <Route path="/bill" >
              <Route exact path="" element={<BillList />} />
              <Route exact path="list" element={<BillList />} />
              <Route exact path="incluir" element={<BillIncluir />} />
              <Route exact path="alterar/:id" element={<BillAlterar />} />
            </Route>

            <Route path="/person" >
              <Route exact path="incluir" element={<PersonIncluir />} />
              <Route exact path="list" element={<PersonList />} />
              <Route exact path="" element={<PersonList />} />
              <Route exact path="alterar/:id" element={<PersonAlterar />} />
            </Route>
          </Routes>

        </Container>
      </BrowserRouter>
    </div>
  )
}

export default App
