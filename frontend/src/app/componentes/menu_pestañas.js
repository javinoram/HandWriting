'use client'
import React from 'react';
import SubirDibujo from "./subir_imagen.js";
import Dibujo from './dibujo.js';

const TabComponent = () => {
  const [activeTab, setActiveTab] = React.useState(0);
  const tabComponents = [SubirDibujo, Dibujo];

  const changeTab = (index) => {
    setActiveTab(index);
  };

  return (
    <div>
      <div>
        <nav>
          HandWritting
          <button className={`${activeTab === 1 && 'active'}`} onClick={() => changeTab(0)}>Upload a image</button>
          <button className={`${activeTab === 1 && 'active'}`} onClick={() => changeTab(1)}>Draw the character</button>
        </nav>
      </div>
      <div>
        {React.createElement(tabComponents[activeTab])}
      </div>
    </div>
  );
};

export default TabComponent;
