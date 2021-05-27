/* eslint-env node, mocha */
const assert = require('chai').assert
const questions = require('../lib/questions')

describe('CLI questions (validation)', function () {
    it('returns true when a valid zpl filename is passed', function () {
        const result = questions.invalidZplFilename('test_filename')
        assert.equal(result, true);
    });

    it('returns an error message prompting for a valid zpl filename', function () {
        const result = questions.invalidZplFilename('')
        assert.equal(result, 'Please enter a filename for your ZPL label.');
    });

    it('returns true when a valid new filename is passed', function () {
        const result = questions.invalidNewFilename('test_filename')
        assert.equal(result, true);
    });

    it('returns an error message prompting for a valid filename', function () {
        const result = questions.invalidNewFilename('')
        assert.equal(result, 'Please enter a desired name for your new label.');
    });
});

describe('CLI questions', function () {
    it('returns the CLI questions', function () {
        const setupQuestions = questions.setupQuestions()
        assert.instanceOf(setupQuestions, Array)
        // Check that one of the questions gets returned
        assert.deepInclude(setupQuestions,
            {
                name: "format",
                type: "list",
                message: "What format do you want your ZPL label in? (PDF's supports multi-page labels)",
                choices: [
                    "PDF",
                    "PNG",
                ]
            }
        )
    });
});

describe('promptQuestions', function () {
    it('returns the proper type', function () {
        const questionList = [
            {
                name: "format",
                message: "What format do you want your ZPL label in? (PDF's supports multi-page labels)",
                // "Mock" the answer here automatically to stop the test from hanging
                when: function (answers) {
                    answers.format = "PDF"
                    return false
                }
            }
        ]

        const promptQuestions = questions.promptQuestions(questionList)
        assert.instanceOf(promptQuestions, Object)
        return promptQuestions.then(answers => {
            assert.equal(answers.format, "PDF")
        });
    });
});
