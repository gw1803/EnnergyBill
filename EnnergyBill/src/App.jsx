import { useState } from 'react';
import './App.css';
import ResponsiveAppBar from './components/navbar/navbar';

function App() {

  return (
    <BrowserRouter>
    <Container>
      <ResponsiveAppBar/>

      <Routes>
        <Route exact path="" element={<Home/>}  />

        <Route path="/bill" >
          <Route exact path="" element={<BillList/>}  />
          <Route exact path="list" element={<BillList/>}  />
          <Route exact path="incluir" element={<BillIncluir/>}  />
          <Route exact path="alterar/:id" element={<BillAlterar/>}  />
        </Route>

        <Route path="/person" >
          <Route exact path="" element={<PersonList/>}  />
          <Route exact path="list" element={<PersonList/>}  />
          <Route exact path="incluir" element={<PersonIncluir/>}  />
          <Route exact path="alterar/:id" element={<PersonAlterar/>}  />
        </Route>

      </Routes>

    </Container>
  </BrowserRouter>
  )
}

export default App
