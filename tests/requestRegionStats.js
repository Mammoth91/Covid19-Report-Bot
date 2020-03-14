const jsdom = require('jsdom');
var request = require('request');
var infoLine = "";
var finalLine = "";

request('https://www.quebec.ca/en/health/health-issues/a-z/2019-coronavirus/', function (error, response, body) {
            if (!error && response.statusCode == 200) {
                body = body.split("\n");
                infoLine = body[310];
                //console.log(infoLine);
                const dom = new jsdom.JSDOM(infoLine);
                finalLine = dom.window.document.querySelector("tbody").textContent;

                pos1 = finalLine.search("06.*-.*Montr.*al");
                pos2 = finalLine.search("15.*-.*Laurentides");
                pos3 = finalLine.search("16.*-.*Mont.*r.*gie");
                pos4 = finalLine.search("Total");

                pos5 = finalLine.match(/06(.|)-(.|)Montr.al/g);
                pos6 = finalLine.match(/15(.|)-(.|)Laurentides/g);
                pos7 = finalLine.match(/16(.|)-(.|)Mont.r.gie/g);
                pos8 = finalLine.match(/Total/g);

                //console.log(finalLine.slice(pos1 + pos5[0].length, pos1 + pos5[0].length + 2));
                //console.log(finalLine.slice(pos2 + pos6[0].length, pos2 + pos6[0].length + 2));
                //console.log(finalLine.slice(pos3 + pos7[0].length, pos3 + pos7[0].length + 2));
                //console.log(finalLine.slice(pos4 + pos8[0].length, pos4 + pos8[0].length + 3));

                montreal = finalLine.slice(pos1 + pos5[0].length, pos1 + pos5[0].length + 2);
                laurentides = finalLine.slice(pos2 + pos6[0].length, pos2 + pos6[0].length + 2);
                monteregie = finalLine.slice(pos3 + pos7[0].length, pos3 + pos7[0].length + 2);
                total = finalLine.slice(pos4 + pos8[0].length, pos4 + pos8[0].length + 3)
            }else {
                console.log("Error, could not get HTML source")
            }
    });