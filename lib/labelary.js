var fs = require('fs');
var request = require('request');

module.exports = {

    useGeneralQuestions: (askGeneralQuestions) => {

        // PDF format
        if (askGeneralQuestions.format == "PDF") {
            var formatHeaders = { 'Accept': 'application/pdf' };
            var format = ".pdf";
        }
        // PNG format
        if (askGeneralQuestions.format == "PNG") {
            formatHeaders = "";
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
        const zpl = fs.readFileSync(askGeneralQuestions.filename, "utf8")

        // Assign some variables
        var label = `${askGeneralQuestions.label}${format}`;
        var options = {
            encoding: null,
            formData: { file: zpl },
            headers: formatHeaders,
            url: `http://api.labelary.com/v1/printers/${askGeneralQuestions.density}/labels/${askGeneralQuestions.size}/${index}`
        };

        // Create the PDF label from the ZPL
        request.post(options, (err, resp, body) => {
            if (err) {
                return console.log(err);
            }
            fs.writeFile(label, body, (err) => {
                if (err) {
                    return console.log(err);
                }
            });
        });

        console.log(label, "generated!");
    },
};
