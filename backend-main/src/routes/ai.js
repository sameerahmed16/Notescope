const express = require('express');
const router = express.Router();
//import OpenAI from "openai";

const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});




// Define a route for AI-related requests
router.get('/', (req, res) => {
    res.send('Welcome to the AI route!');
});

// Define a new route for processing text input and returning a response
router.post('/process-text', async (req, res) => {
    try {
        const { message } = req.body;

        const messages = [
            { role: "user", content: message }
        ];

        const completion = await openai.chat.completions.create({
            messages: messages,
            model: "gpt-4",
        });

        return res.json({
            response: completion.choices[0].message.content
        });
    } catch (error) {
        console.error("Error processing text:", error);
        res.status(500).send("Internal Server Error");
    }
});


// create a route to generate a short summary based on the markdown
router.post('/generate-summary', async (req, res) => {
    try {
        const { markdown } = req.body;

        const messages = [
            { role: "user", content: `
                Please provide a concise summary of the following markdown content. The summary should capture the main points and be presented in a clear and concise manner. Here is the markdown content: ${markdown}
            `}
        ];

        const completion = await openai.chat.completions.create({
            messages: messages,
            model: "gpt-4o",
        });

        return res.json({
            summary: completion.choices[0].message.content
        });
    } catch (error) {
        console.error("Error generating summary:", error);
        res.status(500).send("Internal Server Error");
    }
});

// generate a snippet
router.post('/generate-snippet', async (req, res) => {
    try {
        const { message, markdown } = req.body;
        console.log(markdown)
        const messages = [
            { role: "user", content: `
                Generate a markdown snippet based on the following transcription. You don't need to give anything outside the very markdown we are going to insert. So there is no need to specify its a markdown block or anything like that. Ensure the response is only in markdown format.
                 Responses sent back should look like this '**test**' not 'backtickbacktickbacktick**markdown**backtickbacktickbacktick' The blocks you generate are going to be used in a notes document, so they should make sense and not be just a transcription every single time.  The amrkdown is being rendered in an area where its already specified that the format is markdown so you don't need to do any special specification for that. There user already has the following notes: [START OF USER NOTES] ${markdown} [END OF USER NOTES]Here is your context for what you need to make a markdown block of: ` + message }
        ];

        const completion = await openai.chat.completions.create({
            messages: messages,
            model: "gpt-4o",
        });

        return res.json({
            response: completion.choices[0].message.content
        });
    } catch (error) {
        console.error("Error processing text:", error);
        res.status(500).send("Internal Server Error");
    }
});

   // create a route to chat with the document
   router.post('/chat-with-document', async (req, res) => {
    try {
        const { question, documentContent } = req.body;

        const messages = [
            { role: "system", content: "You are a helpful assistant." },
            { role: "user", content: `Here is the document content: ${documentContent}` },
            { role: "user", content: `Question: ${question}` }
        ];

        const completion = await openai.chat.completions.create({
            messages: messages,
            model: "gpt-4o",
        });

        return res.json({
            response: completion.choices[0].message.content
        });
    } catch (error) {
        console.error("Error chatting with document:", error);
        res.status(500).send("Internal Server Error");
    }
});

// Export the router
module.exports = router;
