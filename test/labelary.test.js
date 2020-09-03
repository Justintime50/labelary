/* eslint-env node, mocha */
const assert = require('chai').assert
const labelary = require('../lib/labelary');

describe('#determineLabelFormat', function () {
    it('returns PDF values when the label format is PDF', function () {
        const result = labelary.determineLabelFormat('PDF')
        assert.deepEqual(result[0], { 'Accept': 'application/pdf' });
        assert.equal(result[1], '.pdf');
    });

    it('returns PNG values when the label format is PNG', function () {
        const result = labelary.determineLabelFormat('PNG')
        assert.deepEqual(result[0], { 'Accept': 'image/png' });
        assert.equal(result[1], '.png');
    });
});

describe('#determineLabelIndex', function () {
    it('returns single-page label index', function () {
        const result = labelary.determineLabelIndex('Single-page')
        assert.equal(result, '0/');
    });

    it('returns multi-page label index', function () {
        const result = labelary.determineLabelIndex('Multi-page')
        assert.equal(result, '');
    });
});

describe('#importZplLabel', function () {
    it('returns a new label name and preps form data', function () {
        const result = labelary.importZplLabel('test_label', '.pdf', 'test_filename')
        assert.equal(result[0], 'test_label.pdf');
        assert.ok(result[1]);
    });
});

describe('#createLabel', function () {
    it('returns a message stating the label was generated', async function () {
        // TODO: Mock this file creation instead of actually creating it
        const result = await labelary.createLabel('./test/files/test_file.txt', 'dummy data')
        assert.equal(result, true);
    });

    it('returns an error when a file cannot be generated', async function () {
        // TODO: Mock this file creation instead of actually creating it
        const result = await labelary.createLabel('///////~.123', 'dummy data')
        assert.equal(result, 'Error: EROFS: read-only file system, open \'///////~.123\'');
    });
});

describe('#labelaryApiRequest', function () {
    it('returns an error when bad data is passed to the Labelary API', async function () {
        // TODO: BAD SIDE-EFFECTS HERE, we should figure out how to only test the API response
        // TODO: We should be mocking this request instead
        const zplLabel = labelary.importZplLabel('./test/files/test_new_label.png', '.png', './test/files/test_zpl_label.zpl')
        const labelFormat = labelary.determineLabelFormat('PNG')
        const result = await labelary.labelaryApiRequest('8dpmm', '4x6', '000', zplLabel, labelFormat) // Bad data '000' passed for index
        assert.equal(result, 'HTTPError: Response code 404 (Not Found)')
    });
});

describe('#run', function () {
    it('returns an error when the input file cannot be found', async function () {
        // TODO: We should be mocking this request instead
        const prompt = {
            "zpl_filename": "./test/files/bad_filename.zpl",
            "format": "PNG",
            "size": "4x6",
            "density": "8dpmm",
            "index": "Single-page",
            "new_label_filename": "./test/files/test_bad_filename"
        }
        const result = await labelary.run(prompt)
        assert.equal(result, 'RequestError: ENOENT: no such file or directory, stat \'./test/files/bad_filename.zpl\'')
    });

    it('returns a response from the Labelary API based on input', async function () {
        // TODO: We should be mocking this request instead
        const prompt = {
            "zpl_filename": "./test/files/test_zpl_label.zpl",
            "format": "PNG",
            "size": "4x6",
            "density": "8dpmm",
            "index": "Single-page",
            "new_label_filename": "./test/files/test_new_label"
        }
        const result = await labelary.run(prompt)
        assert.equal(result.statusCode, 200)
    });

    it('returns a response from the Labelary API based on input', async function () {
        // TODO: We should be mocking this request instead
        const prompt = {
            "BAD DATA": "BAD DATA"
        }
        assert.throws(await function () { labelary.run(prompt) }, Error)
    });
});
