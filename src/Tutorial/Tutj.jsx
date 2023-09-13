import React from 'react';
import { IonSlides, IonSlide, IonContent, IonImg, IonTabBar, IonButton, IonPage } from '@ionic/react';
import Img1 from "./stock/img1.png"
import Img2 from "./stock/img2.png"
import Img3 from "./stock/img3.png"
import "./Tut.css"
import { useHistory } from 'react-router';
const slideOpts = {
  initialSlide: 0,
  speed: 200,
};


const Tutj = () => {
    const history = useHistory()
  return (
    <IonPage>
    <IonContent style={{ height: "100vh" }}>
      <IonSlides style={{ height: "100vh" }} pager={true} options={slideOpts}>
        <IonSlide class='ionTutSlide' style={{ display: "flex", flexDirection: "column", width: "70%", borderRadius: "25px" }}>
          <IonImg class='ionTutImg' src={Img1} />
          <h1>Powerful and Most reliable Solution for every Indian Shopkeepers</h1>
        </IonSlide>
        <IonSlide style={{ display: "flex", flexDirection: "column" }}>
          <IonImg class='ionTutImg' src={Img2} />
          <h1>Keep your bills and document organised with us</h1>
        </IonSlide>
        <IonSlide style={{ display: "flex", flexDirection: "column" }}>
          <IonImg class='ionTutImg' src={Img3} />
          <h1>Build in India with love</h1>
          <IonButton style={{position:"absolute", bottom:"5%"}} onClick={(()=>{
            history.push("/signup")
          })}>Get Started</IonButton>
        </IonSlide>
      </IonSlides>
    </IonContent>
  </IonPage>
  )
}

export default Tutj