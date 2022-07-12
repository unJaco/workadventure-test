/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');

let currentPopup: any = undefined;


// Waiting for the API to be ready
WA.onInit().then(() => {

    WA.chat.sendChatMessage('Hello world', 'Mr Robot');

    console.log('Start');
    console.log('Scripting API ready');
    console.log('Player tags: ',WA.player.tags);
    


    WA.room.onEnterLayer('clockZone').subscribe(() => {


        //fetch('http://localhost:8080/api/v1/book').then(res => res.json()).then(data => console.log(data));




        const today = new Date();
        const time = today.getHours() + ":" + today.getMinutes();   

        currentPopup = WA.ui.openPopup("clockPopup","It's " +time,[]);
      
        
        
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
