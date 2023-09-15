import React, { useState } from "react";
import {
    IonIcon,
    IonButton,
    IonInput,
    IonList,
    IonItem,
    IonModal,
    IonPage,
    IonContent,
    IonImg
} from "@ionic/react";
import { person } from "ionicons/icons";
import { Cloud } from "../storage/CloudStorage";
import { APP_NAME } from "../app-data.js";
import { useHistory } from 'react-router';


const SignUp = () => {

    const history = useHistory()
    const [login, setlLogin] = useState(false);
    const [openLoginModal, setOpenLoginModal] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [panNumber, setPanNumber] = useState("")

    const cloud = new Cloud();

    const doAuth = () => {
        console.log("Loggin in... " + email);
        setlLogin(true);
        const data = { email: email, password: password, appname: APP_NAME };
        cloud._auth(data);
    };

    return (
        <>
            <IonPage>
                <IonContent>
                    
                    <IonImg style={{height:"35%"}} src="https://i.giphy.com/media/QMI6md8Rb7CWHSHND7/giphy.webp" alt="Your GIF"/>
                    <div className="signHSide" style={{display:"flex", alignItems:"center", flexDirection:"column"}}>
                    <h1 style={{width:"90%", textAlign: "center"}}>UIDocsIndia </h1>
                    <p style={{width:"90%", textAlign: "center"}}>India's Most powerful Bills management system</p>

                    </div>
                    <IonList>
                        <div className="nameSectionSignUp" style={{ display: "flex" }}>
                            <IonItem>
                                <IonInput
                                    required
                                    clearInput
                                    value={firstName}
                                    onIonChange={(e) => setFirstName(e.detail.value)}
                                    placeholder='First Name'
                                />
                            </IonItem>
                            <IonItem>
                                <IonInput
                                    required
                                    clearInput
                                    value={lastName}
                                    onIonChange={(e) => setLastName(e.detail.value)}
                                    placeholder='Last Name'
                                />
                            </IonItem>

                        </div>
                        <IonItem>
                            <IonInput
                                required
                                clearInput
                                value={panNumber}
                                onIonChange={(e) => setPanNumber(e.detail.value)}
                                placeholder='PAN Number'
                            />
                        </IonItem>


                        <IonItem>
                            <IonInput
                                required
                                clearInput
                                inputMode='email'
                                pattern='email'
                                id='email'
                                value={email}
                                onIonChange={(e) => setEmail(e.detail.value)}
                                placeholder='Email..'
                            />
                        </IonItem>
                        <IonItem>
                            <IonInput
                                required
                                clearInput
                                pattern='password'
                                id='password'
                                value={password}
                                onIonChange={(e) => setPassword(e.detail.value)}
                                placeholder='Password..'
                            />
                        </IonItem>
                        <IonButton
                            // onClick={(e)=>{

                            //  }}
                            expand='full'
                            className='ion-text-center'
                            onClick={(e) => {
                                doAuth();
                                setOpenLoginModal(false);
                                e.preventDefault()
                                history.push('/home')
                            }}
                        >
                            Sign Up
                        </IonButton>
                        <IonButton
                            expand='block'
                            color='secondary'
                            fill="outline"
                            onClick={() => {
                                // setOpenLoginModal(false);
                                history.push("/login")
                            }}
                        >
                            Login
                        </IonButton>

                    </IonList>
                    {/* </IonModal> */}
                </IonContent>
            </IonPage>
        </>
    )
}

export default SignUp