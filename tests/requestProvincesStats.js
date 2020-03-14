var request = require('request');
const jsdom = require('jsdom');
var finalIp = "";
var finalText = "";

request('https://www.canada.ca/en/public-health/services/diseases/2019-novel-coronavirus-infection.html', function (error, response, body) {
            if (!error && response.statusCode == 200) {
                //pos1 = body.search('<td>British Columbia</td>');
                //pos2 = body.search('<td>Alberta</td>');
                //pos3 = body.search('<td>Saskatchewan</td>');
                //pos4 = body.search('<td>Manitoba</td>');
                //pos5 = body.search('<td>Ontario</td>');
                //pos6 = body.search('<td>Quebec</td>');
                //pos7 = body.search('<td>New Brunswick</td>');
                //pos8 = body.search('<td>Repatriated Canadians</td>');
                //pos9 = body.search('<td><strong>Total cases</strong></td>');
                //pos10 = body.search('</table>');

                //britishColumbia = body.slice(pos1 + 32, pos2 - 36);
                //alberta = body.slice(pos2 + 23, pos3 - 36);
                //saskatchewan = body.slice(pos3 + 28, pos4 - 36);
                //manitoba = body.slice(pos4 + 24, pos5 - 36);
                //ontario = body.slice(pos5 + 23, pos6 - 36);
                //quebec = body.slice(pos6 + 22, pos7 - 36);
                //newBrunswick = body.slice(pos7 + 29, pos8 - 36);
                //others = body.slice(pos8 + 37, pos9 - 36);
                //total = body.slice(pos9 + 52, pos10 - 65);

                console.log(britishColumbia);
                console.log(alberta);
                console.log(saskatchewan);
                console.log(manitoba);
                console.log(ontario);
                console.log(quebec);
                console.log(newBrunswick);
                console.log(others);
                console.log(total);
            }
            else {
                console.log("Error, could not get HTML source")
            }
        })