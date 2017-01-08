/*-----------------------------------------------------------------------------
This template demonstrates how to use Waterfalls to collect input from a user using a sequence of steps.
For a complete walkthrough of creating this type of bot see the article at
https://docs.botframework.com/en-us/node/builder/chat/dialogs/#waterfall
-----------------------------------------------------------------------------*/
"use strict";
var builder = require("botbuilder");
var botbuilder_azure = require("botbuilder-azure");
var useEmulator = (process.env.NODE_ENV == 'development');
var intents = new builder.IntentDialog();
var connector = useEmulator ? new builder.ChatConnector() : new botbuilder_azure.BotServiceConnector({
    appId: process.env['MicrosoftAppId'],
    appPassword: process.env['MicrosoftAppPassword'],
    stateEndpoint: process.env['BotStateEndpoint'],
    openIdMetadata: process.env['BotOpenIdMetadata']
});
var bot = new builder.UniversalBot(connector);

var commands = [];
var scripts = [];
var strA = "No more commands";

bot.dialog('/', intents);

var devices = {Kalindu : ["138.51.96.241", "8081", "/controller"],
                Sakshaat: ["138.51.95.148", "8081", "/controller"]}

var connected = devices["Kalindu"];

intents.matches(/^choose current device/i, [
    function(session) {
        builder.Prompts.choice(session, "Which device would you like to work with?", devices);   
    },
    function(session, results) {
        if(results.response) {
            var choice = results.response.entity;

            if (results.response.entity in devices) {
                connected = devices[results.response.entity];
                session.send("The device is now active.");
            } else {
                session.send("Alright, that's ok.");
            }

            session.endDialog();
            
        }
    } 

]);

intents.matches(/^check paired devices/i, [
    function (session) {
        session.send("Here are your currently connected devices:");
        for (var device in devices) {
            session.send(device + " located at" + devices[device][0]);
        }
    }
    
]);

intents.matches(/^currently paired device/i, [
    function (session) {
        if(connected != undefined) {
            session.send("You are currently paired with: " + connected);
        } else {
            session.send("You are not currently paired with any device");
        }
    }
    
]);



intents.matches(/^hello/i, [
    function (session) {
        
        session.send("Hello I am here to assists you on running scripts from different computers");        
    }
  
]);

intents.matches(/^help/i, [
    function (session) {
        session.send("Please consult the experts");        
    }
    
    ]);



intents.matches(/^remove/i, [
    function (session) {
        commands.pop();
        session.send("Your script has been updated");
        
        
    },
    //function (session, results) {
     //   session.send('Ok... Changed your script name to %s', session.userData.name);
    //}
]);



intents.matches(/^run latest/i, [
    function (session) {
        
        session.send("Your script is now running");
        
        
    },
    //function (session, results) {
     //   session.send('Ok... Changed your script name to %s', session.userData.name);
    //}
]);

intents.matches(/^make new/i, [
     function (session) {
        
        session.beginDialog('/commandprompt');
        
        
    },
    
]);

intents.onDefault([
    function (session) {
        session.send("I am here to help");
    }
]);    
intents.matches(/^list current commands/i, [
    function (session) {
        session.send("%s", commands.toString());
        
        
        
        
    },
    //function (session, results) {
     //   session.send('Ok... Changed your script name to %s', session.userData.name);
    //}
]);
intents.matches(/^list current scripts/i, [

    function (session) {
        if(scripts.length != 0){
            for(var i = 0; i < scripts.length; i++){
                session.send("%i %s", i+1,scripts[i]);
            }
        }else{
            session.send("Command list is empty. Type \'make new\' to add commands.")
        }
    }
    //function (session, results) {
     //   session.send('Ok... Changed your script name to %s', session.userData.name);
    //}

]);
bot.dialog('/badcommand', [
    function(session){
        //builder.Prompts.text(session, ' What\'s the name of the Command you would like to add today?');
        session.send('Hello!');
        session.endDialog();
     }
    // function(session, results){
        
    //     session.userData.cmon = results.response;
      
    //     commands.push(results.response);
    //     session.send('Your command name "%s" has been saved.', session.userData.cmon);
    //     session.endDialog();
    //     session.beginDialog('/makescript')
        
        
    // }
]);

bot.dialog('/commandprompt', [
    function(session) {
        builder.Prompts.choice(session, "Would you like to make a script?", ["Yes", "No"]);   
    },
    function(session, results) {
        if(results.response) {
            var choice = results.response.entity;
            session.endDialog();
            if (choice == "Yes") {
                session.beginDialog('/badcommand');
            } else {
                session.send("Alright, that's ok.");
                
            }
            
        }
    } 


    ]
);

bot.dialog('/makescript', [
    function(session){
        builder.Prompts.text(session, ' Pass me the script so I can link them up ');
        //session.send('What would you like the new name to be?');
    },
    function(session, results){
        
        session.userData.script = results.response;
      
        scripts.push(results.response);
        session.send('Your script "%s" has been linked up.', session.userData.script);
        
        session.endDialog();
        
    }
]);



if (useEmulator) {
    var restify = require('restify');
    var server = restify.createServer();
    server.listen(3978, function() {
        console.log('test bot endpont at http://localhost:3978/api/messages');
    });
    server.post('/api/messages', connector.listen());    
} else {
    module.exports = { default: connector.listen() }
}
