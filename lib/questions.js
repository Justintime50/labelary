const inquirer = require("inquirer");

module.exports = {
    askGeneralQuestions: () => {
        const questions = [
            {
                name: "filename",
                type: "input",
                message: "What's the name/path of your ZPL label (eg: label.zpl)?",
                validate: function(value) {
                    if (value.length) {
                        return true;
                    } else {
                        return "Please enter a filename for your ZPL label.";
                    }
                },
            },
            {
                name: "format",
                type: "list",
                message: "What format do you want your ZPL label in?",
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
                name: "index",
                type: "list",
                message: "Does your ZPL label have 1 or multiple pages?",
                choices: [
                    "Single page",
                    "Multi-page",
                    ],
            },
        ];
        return inquirer.prompt(questions);
    },
};
