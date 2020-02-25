#!/usr/bin/env node

// Import modules
const questions  = require("./lib/questions");
const general = require("./lib/labelary");

// Run the main program flow
const run = async () => {
    console.log("Labelary: ZPL => PDF/PNG");
    const askGeneralQuestions = await questions.askGeneralQuestions();
    general.useGeneralQuestions(askGeneralQuestions);
};

run();
