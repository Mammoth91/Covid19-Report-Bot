var pdfText = require('pdf-text');
var finalText = "";

var pathToPdf = __dirname + "/info.pdf"

pdfText(pathToPdf, function(err, chunks) {
    for(i = 0; i < chunks.length; i++){
        finalText = finalText.concat(chunks[i])
    }
    console.log(finalText)
})