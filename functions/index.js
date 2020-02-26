const functions = require('firebase-functions');  
const firebase = require('firebase-admin');
const express = require('express');
const engines = require('consolidate');

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

/* made a http function, stating on a Request we take the request,
    and respond to it. Taking the the response, storing it, it an export, 
    right now calling it helloWorld.
*/ 

/* currently error Cannot GET /timestamp.  Problem was in firebase.json had the 
    desitation set to index.html 
*/
const firebaseApp = firebase.initializeApp(
    functions.config().firebase
);

/* set up a database in mockproject-34abb named "facts". Not sure if it
will work.
*/

function getFacts(){
    const ref = firebaseApp.database().ref('facts');
    return ref.once('vaule').then(snap => snap.val()); 
}

const app = express();
app.engine('hbs', engines.handlebars);
app.set('views', './views');
app.set('view engine', 'hbs'); 


// app.get('/timestamp', (request, response) => {
//     response.send(`${Date.now()}`);
// });  Dont need after setting up above handlebars and consolidation

/* Having problems with eslint catching on getFacts... thinking the database is empty  */
app.get('/', (request, response) => {
    response.set('Cache-Control', 'public, max-age=300, s-maxage=600');
    response.send(`${Date.now()}`);
    // getFacts(facts).then(facts => {
    //     response.render('index.hbs', { facts });
    // });
});

//600 = 10 Mintues 


/*  changed exports.helloWorld to exports.app based on the firebase.json hosting -> rewrites -> function: "app"; 
*/

exports.app = functions.https.onRequest(app);
