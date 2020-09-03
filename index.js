#!/usr/bin/env node
const questions = require("./lib/questions");
const labelary = require("./lib/labelary");

// Run the Labelary CLI tool
!async function () {
    console.log("Labelary: Create PDF's or PNG's from ZPL labels via the Labelary API on the CLI.");
    const setupQuestions = questions.setupQuestions();
    const prompt = await questions.promptQuestions(setupQuestions).catch(console.error);
    labelary.run(prompt).catch(console.error);
}();
