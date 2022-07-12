/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');

let currentPopup: any = undefined;

let obj: any = undefined;

// Waiting for the API to be ready
WA.onInit().then(() => {

    console.log('Scripting API ready');
    console.log('Player tags: ',WA.player.tags)

    WA.room.onEnterLayer('clockZone').subscribe(() => {

        const userAction = async () => {
            const response = await fetch('http://localhost:8080/api/v1/book');
            const myJson = await response.json(); //extract JSON from the http response
            // do something with myJson
            
            console.log('DO SOMETHING!!');
           obj = JSON.parse(myJson);

          }

          console.log('HELLO');
        console.log(userAction.toString);
        console.log(obj);

        const today = new Date();
        const time = today.getHours() + ":" + today.getMinutes();   

        if(obj){
            currentPopup = WA.ui.openPopup("clockPopup","It's " + obj.title,[]);
        } else {
            currentPopup = WA.ui.openPopup("clockPopup","It's " +time,[]);
        }
        
        
    })

    WA.room.onLeaveLayer('clockZone').subscribe(closePopUp)

    // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

}).catch(e => console.error(e));

function closePopUp(){
    if (currentPopup !== undefined) {
        currentPopup.close();
        currentPopup = undefined;
    }
}

export {};
