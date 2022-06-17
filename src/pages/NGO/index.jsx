import React, { useState } from 'react';
import NavBar from './NavBar';
import DashBoard from './DashBoard';
import NGOProfile from './NgoProfile';


export default function NGO() {
  const [modalShow, setModalShow] = useState(false);
  return (
    <div>
      <NavBar setModalShow={setModalShow}/>
      <NGOProfile show={modalShow} onHide={() => setModalShow(false)} />
      <DashBoard />
    </div>
  )
}
