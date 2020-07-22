var fs = require('fs');
const got = require('got');
const FormData = require('form-data');

module.exports = {

    useGeneralQuestions: (askGeneralQuestions) => {

        // PDF format
        if (askGeneralQuestions.format == "PDF") {
            var formatHeaders = { 'Accept': 'application/pdf' };
            var format = ".pdf";
        }
        // PNG format
        if (askGeneralQuestions.format == "PNG") {
            formatHeaders = { 'Accept': 'image/png' };
            format = ".png";
        }

        // Label index for single page
        if (askGeneralQuestions.index == "Single page") {
            var index = "0/";
        }
        // Label index for multiple pages
        if (askGeneralQuestions.index == "Multi-page") {
            index = "";
        }

        // Import the ZPL label
        var label = `${askGeneralQuestions.label}${format}`;
        const form = new FormData();
        form.append('file', fs.createReadStream(askGeneralQuestions.filename));

        // Create the PDF label from the ZPL
        (async () => {
            const response = await got.post(`http://api.labelary.com/v1/printers/${askGeneralQuestions.density}/labels/${askGeneralQuestions.size}/${index}`, {
                body: form,
                responseType: 'buffer',
                headers: formatHeaders
            });
            fs.writeFile(label, response.body, (err) => {
                if (err) {
                    return console.log(err);
                }
            });
            console.log(label, "generated!");
        })().catch(console.log);
    },
};
