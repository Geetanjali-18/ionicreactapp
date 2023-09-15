import React, { useState, useEffect } from "react";
import {
    IonApp,
    IonHeader,
    IonContent,
    IonToolbar,
    IonTitle,
    IonIcon,
    IonButton,
    IonFab,
    IonFabButton,
    IonPopover,
    IonPage,
    IonActionSheet,
    IonList,
    IonInput,
} from "@ionic/react";
import { settings, menu, logOut } from "ionicons/icons";
import "./Home.css"


import * as AppGeneral from "../socialcalc/AppGeneral";
import { DATA } from "../app-data.js";

import Menu from "../Menu/Menu";

// import "./App.css";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";
import Files from "../Files/Files";
import NewFile from "../NewFile/NewFile";
import { Local } from "../storage/LocalStorage";
import Login from "../Login/Login";
import { useHistory } from "react-router";

/* Theme variables */
// import "../theme/variables.css";
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
// import Sheet from "../Ssheet/Sheet";
const Home: React.FC = () => {
    
    emailjs.init('E3QV5yLSsjNpul7B5');
    
  useEffect(() => {
    // Initialize EmailJS with your User ID
    emailjs.init('E3QV5yLSsjNpul7B5');
  }, []);

    
  const showForm = () => {
    setIsFormVisible(true);
  };


    
  const [isFormVisible, setIsFormVisible] = useState(false);
  
  const [recipient, setRecipient] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

    const sendEmail = (e) => {
        e.preventDefault();
        // var emailuser='';
    
        // Define your EmailJS service ID and template ID
        const serviceId = 'service_ocftdic';
        const templateId = 'template_9pcxnfq';
    
        // Create a template parameters object with the email content
        const templateParams = {
          to_email: recipient, // Replace with the recipient's email address
          subject: subject,
          message: message,
        };
        console.log(templateParams);
    
        // Send the email using EmailJS
        emailjs
          .send(serviceId, templateId, templateParams)
          .then((response: EmailJSResponseStatus) => {
            console.log('Email sent successfully:', response);
            alert('Email sent successfully!');
          })
          .catch((error) => {
            console.error('Error sending email:', error);
            alert('Error sending email');
          });
          setIsFormVisible(false)
      };


    const sout = useHistory()
    const [showMenu, setShowMenu] = useState(false);
    const [sett, setSett] = useState(false)
    const [showPopover, setShowPopover] = useState<{
        open: boolean;
        event: Event | undefined;
    }>({ open: false, event: undefined });
    const [selectedFile, updateSelectedFile] = useState("default");
    const [billType, updateBillType] = useState(1);
    const [device] = useState(AppGeneral.getDeviceType());

    const store = new Local();

    const closeMenu = () => {
        setShowMenu(false);
    };

    const activateFooter = (footer) => {
        AppGeneral.activateFooterButton(footer);
    };

    useEffect(() => {
        const data = DATA["home"][device]["msc"];
        AppGeneral.initializeApp(JSON.stringify(data));
    }, []);

    useEffect(() => {
        activateFooter(billType);
    }, [billType]);
    const closeSett = () => {
        setSett(false)
    }

    const footers = DATA["home"][device]["footers"];
    const footersList = footers.map((footerArray) => {
        return (
            <IonButton
                key={footerArray.index}
                expand='full'
                color='light'
                className='ion-no-margin'
                onClick={() => {
                    updateBillType(footerArray.index);
                    activateFooter(footerArray.index);
                    setShowPopover({ open: false, event: undefined });
                }}
            >
                {footerArray.name}
            </IonButton>
        );
    });


    return (
        <IonApp>
            <IonPage>
                <IonContent>
                    <IonHeader>
                        <IonToolbar color='primary'>

                            {!isFormVisible ? (
                                <IonButton onClick={showForm}>Email</IonButton>
                            ) : (
                                <div></div>
                            )}

                            {selectedFile === "default" ? (
                                <IonIcon
                                    icon={settings}
                                    slot='end'
                                    className='ion-padding-end'
                                    size='large'
                                    onClick={(e) => {
                                        setShowPopover({ open: true, event: e.nativeEvent });
                                        setSett(true)
                                        console.log("Popover clicked");
                                    }}
                                />
                            ) : null}
                            <Files
                                store={store}
                                file={selectedFile}
                                updateSelectedFile={updateSelectedFile}
                                updateBillType={updateBillType}
                            />

                            <NewFile
                                file={selectedFile}
                                updateSelectedFile={updateSelectedFile}
                                store={store}
                                billType={billType}
                            />

                            <IonPopover
                                animated
                                keyboardClose
                                backdropDismiss
                                event={showPopover.event}
                                isOpen={showPopover.open}
                                onDidDismiss={() =>
                                    setShowPopover({ open: false, event: undefined })
                                }
                            >
                                {footersList}
                            </IonPopover>
                        </IonToolbar>
                    </IonHeader>

                    {sett && <IonActionSheet
                        animated
                        keyboardClose
                        isOpen={sett}
                        onDidDismiss={() => closeSett()}
                        buttons={[
                            {
                                text: "Sign Out",
                                icon: logOut,
                                handler: () => {

                                    console.log("Signed Out Successfully");
                                    sout.push('/login')

                                },
                            },

                        ]}
                    />
                    }

                    <IonToolbar color='secondary'>
                        <IonTitle className='ion-text-center'>
                            Editing : {selectedFile}
                        </IonTitle>
                    </IonToolbar>

                    <IonFab vertical='bottom' horizontal='end' slot='fixed'>
                        <IonFabButton type='button' onClick={() => setShowMenu(true)}>
                            <IonIcon icon={menu} />
                        </IonFabButton>
                    </IonFab>

                    <Menu
                        showM={showMenu}
                        setM={closeMenu}
                        file={selectedFile}
                        updateSelectedFile={updateSelectedFile}
                        store={store}
                        bT={billType}
                    />
                    {!isFormVisible ? (
                                <div></div>
                            ) : (
                                <IonList>
                                    <IonInput
                                        type="email"
                                        placeholder="Recipient Email"
                                        value={recipient}
                                        onIonChange={(e) => setRecipient(e.detail.value)}
                                    />
                                    <IonInput
                                        type="text"
                                        placeholder="Subject"
                                        value={subject}
                                        onIonChange={(e) => setSubject(e.detail.value)}
                                    />
                                    <IonInput
                                        placeholder="Message"
                                        value={message}
                                        onIonChange={(e) => setMessage(e.detail.value)}
                                    />
                                    <IonButton onClick={sendEmail}>Send Email</IonButton>
                                </IonList>
                            )}
                    <div className="invoiceSection">
                        <div id='workbookControl'></div>
                        <div id='tableeditor'>editor goes here</div>
                        <div id='msg'></div>

                    </div>
                    
                </IonContent>
            </IonPage>
        </IonApp>
    );
};

export default Home;
