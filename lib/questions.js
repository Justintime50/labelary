const inquirer = require("inquirer");

function invalidZplFilename(value) {
    if (!value.length) {
        return "Please enter a filename for your ZPL label.";
    }
    return true;
}

function invalidNewFilename(value) {
    if (!value.length) {
        return "Please enter a desired name for your new label.";
    }
    return true;
}

function setupQuestions() {
    const questions = [
        {
            name: "zpl_filename",
            type: "input",
            message: "What's the name/path of your ZPL label (eg: label.zpl)?",
            validate: invalidZplFilename
        },
        {
            name: "format",
            type: "list",
            message: "What format do you want your ZPL label in? (PDF's supports multi-page labels)",
            choices: [
                "PDF",
                "PNG",
            ],
        },
        {
            name: "size",
            type: "list",
            message: "What size do you want your label?",
            choices: [
                "4x6",
                "4x8",
            ],
        },
        {
            name: "density",
            type: "list",
            message: "What print density will your label have?",
            choices: [
                "8dpmm",
                "6dpmm",
                "12dpmm",
                "24dpmm",
            ],
        },
        {
            name: "index",
            type: "list",
            message: "Does your ZPL label have 1 or multiple pages?",
            choices: [
                "Single-page",
                "Multi-page",
            ],
        },
        {
            name: "new_label_filename",
            type: "input",
            message: "What's the desired name of your new label (don't include a file extension -- eg: my_label)?",
            validate: invalidNewFilename
        },
    ];
    return questions;
}

function promptQuestions(questions) {
    const prompt = inquirer.prompt(questions)
    return prompt
}

module.exports = {
    invalidZplFilename,
    invalidNewFilename,
    setupQuestions,
    promptQuestions,
};
