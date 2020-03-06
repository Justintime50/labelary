#!/usr/bin/env node

// Import modules
const questions  = require("./lib/questions");
const labelary = require("./lib/labelary");

// Run the main program flow
const run = async () => {
    console.log("Labelary: Create PDF's or PNG's from ZPL labels via the Labelary API.");
    const askGeneralQuestions = await questions.askGeneralQuestions();
    labelary.useGeneralQuestions(askGeneralQuestions);
};

run().catch(err => {
    if (err.code === 'ENOENT') {
      console.log('ERROR: "' + err.path + '" not found. Try using a complete path.')
    }
}).catch(console.error);
