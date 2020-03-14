var request = require('request');
var pdfText = require('pdf-text')
var finalIp = "";
var finalText = "";

request('https://www.who.int/emergencies/diseases/novel-coronavirus-2019/situation-reports', function (error, response, body) {
            if (!error && response.statusCode == 200) {
                pos1 = body.search('/docs/default-source/coronaviruse/');
                pos2 = body.search('"><strong>Situation report');
                ip = body.slice(pos1, pos2)
                url = "https://www.who.int"
                finalIp = url.concat(ip)
                console.log(finalIp);
            }
            else {
                console.log("Error, could not get HTML source")
            }
        })