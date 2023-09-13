import React, { useState, useEffect } from "react";
import { Route, useHistory } from 'react-router-dom';
import "./App.css";
import Home from "../Home/Home";
// import Ind from "../Test/Ind";
import {IonApp, IonRouterOutlet } from '@ionic/react';
import {IonReactRouter} from "@ionic/react-router"

import LoginJ from "../Login/LoginJ";
import SignUp from "../SignUp/SignUp";
// import { Tut } from "../Tutorial/Tut";
import Tutj from "../Tutorial/Tutj";


const App: React.FC = () => {
  
  let history = useHistory()
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path = "/login" component={LoginJ}/>
          <Route exact path = "/" component={Home}/>
          <Route exact path = "/signup" component={SignUp}/>
          <Route exact path = "/tut" component={Tutj}/>

        </IonRouterOutlet>

      </IonReactRouter>

    </IonApp>
    // <Home/>
  )
};

export default App;
