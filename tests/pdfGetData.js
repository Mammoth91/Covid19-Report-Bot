var pdfText = require('pdf-text');
var finalText = "";
var entry = 0;
var cases = "";
var newCases = "";
var deaths = "";
var newDeaths = "";
var pathToPdf = __dirname + "/info.pdf"

pdfText(pathToPdf, function(err, chunks) {
    for(i = 0; i < chunks.length; i++){
        if(chunks[i] === 'Canada'){
            entry = i;
            cases = chunks[i + 1];
            newCases = chunks[i + 2];
            deaths =  chunks[i + 3];
            newDeaths = chunks[i + 4];
            break;
        }
    }
    console.log(entry);
    console.log(cases);
    console.log(newCases);
    console.log(deaths);
    console.log(newDeaths);
})