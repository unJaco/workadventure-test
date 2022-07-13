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

        
        //console.log('Fetch Call');
        //fetch('http://localhost:8080/api/v1/book').then(res => res.json()).then(data => console.log(data));

        



        if(WA.player.state.allowed == "true"){
            const today = new Date();
        const time = today.getHours() + ":" + today.getMinutes();   

        currentPopup = WA.ui.openPopup("clockPopup","It's " +time,[]);
            console.log(WA.player.state.allowed);
            console.log(WA.player.state.hasVariable('allowed'));
        } else if(WA.player.state.hasVariable("allow")){
            currentPopup = WA.ui.openPopup("clockPopup", "coool", []);

            console.log(WA.player.state.loadVariable("allow"));
            console.log(WA.player.state.allow);
        }
    
        
        else {
            currentPopup = WA.ui.openPopup("clockPopup", "Something went wrong!", []);
            


            console.log(WA.player.state.loadVariable("allow"));

            console.log(WA.player.state.hasVariable('allow'));
            console.log(WA.player.state.hasVariable('allowed'));
            console.log(WA.player.state.allowed);
            
        }
        
    });

    WA.room.onEnterLayer('setVariable').subscribe(() => {

        WA.player.state.allowed = "true";
        WA.player.state.saveVariable("allow", true);

    });

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
