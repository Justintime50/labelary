var fs = require('fs');
var request = require('request');

module.exports = {

    useGeneralQuestions: (askGeneralQuestions) => {

        // PDF format
        if (askGeneralQuestions.format == "PDF") {
            var formatHeaders = "{ 'Accept': 'application/pdf' }";  // omit this line to get PNG images back
            var format = ".pdf";
        }
        // PNG format
        if (askGeneralQuestions.format == "PNG") {
            var formatHeaders = "";
            var format = ".png";
        }

        // Label size 4x6
        if (askGeneralQuestions.size == "4x6") {
            var size = "4x6";
        }
        // Label size 4x8
        if (askGeneralQuestions.size == "4x8") {
            var size = "4x8";
        }

        // Label index
        if (askGeneralQuestions.index == "Single page") {
            var index = "0/";
        }
        // Label index
        if (askGeneralQuestions.index == "Multi-page") {
            var index = "";
        }

        // Import the ZPL label
        zpl = fs.readFileSync(askGeneralQuestions.filename, (err, data) => {
            if (err) {
            console.error(err);
            return
            }
        });

        // Assign some variables
        var options = {
            encoding: null,
            formData: { file: zpl },
            headers: { 'Accept': 'application/pdf' },
            url: `http://api.labelary.com/v1/printers/8dpmm/labels/${size}/${index}` // adjust print density (8dpmm), label width (4 inches), label height (6 inches), and label index (0) as necessary
        };

        // Create the PDF label from the ZPL
        request.post(options, function(err, resp, body) {
            if (err) {
                return console.log(err);
            }
            var filename = `label${format}`; // change file name for PNG images
            fs.writeFile(filename, body, function(err) {
                if (err) {
                    console.log(err);
                }
            });
        });
    },
};
