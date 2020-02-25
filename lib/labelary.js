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

        // Label index
        if (askGeneralQuestions.index == "Single page") {
            var index = "0/";
        }
        // Label index
        if (askGeneralQuestions.index == "Multi-page") {
            index = "";
        }

        // Import the ZPL label
        if (!fs.existsSync(askGeneralQuestions.filename)) {
            return console.log('ERROR: ZPL file/path not found. Try using a complete path.');
        }
        const zpl = fs.readFileSync(askGeneralQuestions.filename, (err) => {
            if (err) {
                return console.log(err);
            }
        });

        // Assign some variables
        var filename = `label${format}`;
        var options = {
            encoding: null,
            formData: { file: zpl },
            headers: formatHeaders,
            url: `http://api.labelary.com/v1/printers/${askGeneralQuestions.density}/labels/${askGeneralQuestions.size}/${index}`
        };

        // Create the PDF label from the ZPL
        request.post(options, function(err, body) {
            if (err) {
                return console.log(err);
            }
            fs.writeFile(filename, body, function(err) {
                if (err) {
                    return console.log(err);
                }
            });
        });

        console.log("Label generated!");
    },
};
