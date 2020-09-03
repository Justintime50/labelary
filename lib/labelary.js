const fs = require('fs');
const got = require('got');
const FormData = require('form-data');

function determineLabelFormat(format) {
    if (format == 'PDF') {
        const formatHeaders = { 'Accept': 'application/pdf' };
        const extension = '.pdf';
        return [formatHeaders, extension]
    } else if (format == 'PNG') {
        const formatHeaders = { 'Accept': 'image/png' };
        const extension = '.png';
        return [formatHeaders, extension]
    }
}

function determineLabelIndex(index) {
    if (index == 'Single-page') {
        const labelIndex = '0/';
        return labelIndex
    } else if (index == 'Multi-page') {
        const labelIndex = '';
        return labelIndex
    }
}

function importZplLabel(label, format, filename) {
    const newLabelName = `${label}${format}`;
    const formData = new FormData();
    formData.append('file', fs.createReadStream(filename));
    return [newLabelName, formData]
}

async function createLabel(label, response) {
    try {
        await fs.promises.writeFile(label, response)
        console.log(`${label} generated!`)
        return true
    } catch (error) {
        console.log(error)
        return error
    }
}

async function labelaryApiRequest(density, size, index, label, format) {
    try {
        const response = await got.post(`http://api.labelary.com/v1/printers/${density}/labels/${size}/${index}`, {
            body: label[1],
            responseType: 'buffer',
            headers: format[0]
        });
        await createLabel(label[0], response.body)
        return response
    } catch (error) {
        console.log(error)
        return error
    }
}

function run(prompt) {
    // Set the label extension and headers based on requested format
    const labelFormat = determineLabelFormat(prompt.format)
    // Set the label index (single or multi-page label)
    const labelIndex = determineLabelIndex(prompt.index)
    // Import the ZPL label to convert to PDF/PNG
    const zplLabel = importZplLabel(prompt.new_label_filename, labelFormat[1], prompt.zpl_filename)
    // Create the PDF/PNG label from the ZPL via the Labelary API
    const request = labelaryApiRequest(prompt.density, prompt.size, labelIndex, zplLabel, labelFormat)
    return request
}

module.exports = {
    determineLabelFormat,
    determineLabelIndex,
    importZplLabel,
    createLabel,
    labelaryApiRequest,
    run
};
