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
// import { Plugins } from '@capacitor/core';

// const { EmailComposer } = Plugins;


const App: React.FC = () => {

  // const sendNow =async ()=>{
  //   const email = {
  //     to: 'aksr2003@gmail.com',
  //     cc: 'aksr2003@gmail.com',
  //     subject: 'My Subject',
  //     body: 'Email body content',
  //     isHtml: false,
  //     // attachments: ['file://path/to/attachment.pdf'], // Replace with your attachment file path
  //   };
  //   try {
  //     const result = await EmailComposer.open({ ...email });
  //     console.log('Email sent', result);
  //   } catch (error) {
  //     console.error('Error sending email', error);
  //   }

  // }
  useEffect(() => {

    // sendNow()
    
    return () => {
      
    }
  }, [])

  
  let history = useHistory()
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path = "/login" component={LoginJ}/>
          <Route exact path = "/Home" component={Home}/>
          <Route exact path = "/signup" component={SignUp}/>
          <Route exact path = "/" component={Tutj}/>

        </IonRouterOutlet>

      </IonReactRouter>

    </IonApp>
    // <Home/>
  )
};

export default App;
