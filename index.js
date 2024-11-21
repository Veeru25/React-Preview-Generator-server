// const express = require('express');
// const { GoogleGenerativeAI } = require('@google/generative-ai');
// const path = require('path');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// require('dotenv').config();

// const app = express();
// const port = 3031;

// const genAI = new GoogleGenerativeAI(process.env.API_KEY_5);
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
// // const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-002" });
// // const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-001" });
// // const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-exp-0827" });


// app.use(express.json());
// app.use(bodyParser.json())
// app.use(cors())
// app.use(express.static(path.join(__dirname, 'build')));
// app.use(express.urlencoded({extended: true }));

// app.get('/', (_req, res) => {
//     res.send('Welcome to the Google Generative ');
// });

// app.post('/chat', async (req, res) => {

//     console.log("called");
//     const {message , history } = req.body
//     // const appendedMessage = `${message}  in react using function App,inline styles without imports and exports`

    
//     try {
        
//         const chat = model.startChat({history});
//         let result = await chat.sendMessage({message});
//           console.log(result.response, 'result');
//         res.json({message:result.response.text()});
//         console.log(result.response.modelVersion , "result");
//     } catch (error) {
//         console.log(error, "err")   
//     }
// });

// // app.post('/chat', async (req, res) => {

// //     console.log("Request received");

// //     const { message, history } = req.body;

// //     console.log(history)

// //     const appendedMessage = `${message} using function App without imports and exports and inline styles`;

// //     try {
// //         const chat = await model.startChat({ history });
// //         let result = await chat.sendMessage({appendedMessage});

// //         res.json({ message: result.response.text() });

// //         console.log(result.response.modelVersion, "Model Version");
// //     } catch (error) {
// //         console.error("Error processing the request:", error);
// //         res.status(500).send({ error: "An error occurred while processing the request" });
// //     }
// // });


// app.listen(port, () => {
//     console.log(`Server listening on port http://localhost:${port}/chat`);
// });


// fixed appendendInput

const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const { dir } = require('console');
require('dotenv').config();

const app = express();
const port = 3031;

const genAI = new GoogleGenerativeAI(process.env.API_KEY_5);
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-002" });
const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: "Use the React function 'App' without any import or export statements, and ensure all styles are defined inline",
  });
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-exp-0827" });


app.use(express.json());
app.use(bodyParser.json())
app.use(cors())
app.use(express.static(path.join(__dirname, 'build')));
app.use(express.urlencoded({extended: true }));

app.get('/', (_req, res) => {
    res.send('Welcome to the Google Generative ');
});

app.post('/chat', async (req, res) => {

    console.log("called");
    const {message , history } = req.body
    const appendedMessage = `${message} `
    try {
        const chat = model.startChat({history});
        let result = await chat.sendMessage(appendedMessage);
        console.log(result, 'result');
        res.json({message:result.response.text()});
        console.log(result.response.modelVersion , "result");
    } catch (error) {
        console.log(error, "err")   
    }
});



app.listen(port, () => {
    console.log(`Server listening on port http://localhost:${port}/chat`);
});

