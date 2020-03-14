const Discord = require('discord.js');
const client = new Discord.Client();
const jsdom = require('jsdom');
var request = require('request');
var cmd = require('node-cmd');
var exec = require('child_process').exec;
var pdfText = require('pdf-text');
var setInterval = require('set-interval');
var words = ""
var finalIp = ""
var finalText = "";
var finalCommand = "";
var global = "";
var china = "";
var other = "";
var entry = 0;
var cases = "";
var newCases = "";
var deaths = "";
var newDeaths = "";
var infoLine = "";
var finalLine = "";

var message = setInterval.start(dailyMessage, 86400000);

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

function dailyMessage() {
    request('https://www.who.int/emergencies/diseases/novel-coronavirus-2019/situation-reports', function(error, response, body) {
        if (!error && response.statusCode == 200) {
            pos1 = body.search('/docs/default-source/coronaviruse/');
            pos2 = body.search('"><strong>Situation report');
            ip = body.slice(pos1, pos2);
            url = "https://www.who.int";
            finalIp = url.concat(ip);
            //console.log(finalIp);
            finalCommand = "curl " + finalIp + " --output info.pdf";
            exec(finalCommand,
                function(error, stdout, stderr) {
                    //console.log('stdout: ' + stdout);
                    //console.log('stderr: ' + stderr);
                    var pathToPdf = __dirname + "/info.pdf"
                    pdfText(pathToPdf, function(err, chunks) {
                        for (i = 0; i < chunks.length; i++) {
                            finalText = finalText.concat(chunks[i])
                        }
                        pos3 = finalText.search('Globally ');
                        pos4 = finalText.search('China');
                        global = finalText.slice(pos3, pos4);
                        pos5 = finalText.search('China');
                        pos6 = finalText.search('Outside of China');
                        china = finalText.slice(pos5, pos6);
                        pos7 = finalText.search('Outside of China');
                        pos8 = finalText.search('WHO RISK ASSESSMENT');
                        other = finalText.slice(pos7, pos8);

                        global = global.replace("Globally ", "");
                        global = global.replace("confirmed ", " confirmed");
                        global = global.replace("deaths ", "deaths");
                        global = global.replace("new)", " new) ");
                        global = global.replace("  ", " ");
                        china = china.replace("China", "");
                        china = china.replace("confirmed ", " confirmed");
                        china = china.replace("deaths ", "deaths");
                        china = china.replace("new)", " new) ");
                        china = china.replace("  ", " ");
                        other = other.replace("Outside of China", "");
                        other = other.replace("confirmed ", " confirmed");
                        other = other.replace("deaths ", "deaths");
                        other = other.replace("new)", " new) ");
                        other = other.replace("new)1", "new) 1");
                        other = other.replace("  ", " ");
                        other = other.replace("  areas (", "area(");

                        //console.log(global);
                        //console.log(china);
                        //console.log(other);

                        const channel = client.channels.find(channel => channel.name === "covid-19-news");
                        channel.send("@everyone **Covid-19 daily update:** \n__Globally:__\n" + global + "\n__China:__\n" + china + "\n__Other:__\n" + other);

                        exec('del /f info.pdf',
                            function(error, stdout, stderr) {
                                //console.log('stdout: ' + stdout);
                                //console.log('stderr: ' + stderr);
                                if (error !== null) {
                                    console.log('exec error: ' + error);
                                }
                            });
                    })
                    if (error !== null) {
                        console.log('exec error: ' + error);
                    }
                });
        } else {
            console.log("Error, could not get HTML source")
        }
    })
}

client.on('message', msg => {
    if (msg.content === 'corona info') {
        request('https://www.who.int/emergencies/diseases/novel-coronavirus-2019/situation-reports', function(error, response, body) {
            if (!error && response.statusCode == 200) {
                pos1 = body.search('/docs/default-source/coronaviruse/');
                pos2 = body.search('"><strong>Situation report');
                ip = body.slice(pos1, pos2)
                url = "https://www.who.int"
                finalIp = url.concat(ip)
                //console.log(finalIp);
                msg.reply("Here is the latest daily update of the World Health Organisation: " + finalIp)
            } else {
                console.log("Error, could not get HTML source")
            }
        })
    }
    if (msg.content === 'corona stats') {
        request('https://www.who.int/emergencies/diseases/novel-coronavirus-2019/situation-reports', function(error, response, body) {
            if (!error && response.statusCode == 200) {
                pos1 = body.search('/docs/default-source/coronaviruse/');
                pos2 = body.search('"><strong>Situation report');
                ip = body.slice(pos1, pos2);
                url = "https://www.who.int";
                finalIp = url.concat(ip);
                //console.log(finalIp);
                finalCommand = "curl " + finalIp + " --output info.pdf";
                exec(finalCommand,
                    function(error, stdout, stderr) {
                        //console.log('stdout: ' + stdout);
                        //console.log('stderr: ' + stderr);
                        var pathToPdf = __dirname + "/info.pdf"
                        pdfText(pathToPdf, function(err, chunks) {
                            for (i = 0; i < chunks.length; i++) {
                                finalText = finalText.concat(chunks[i])
                            }
                            pos3 = finalText.search('Globally ');
                            pos4 = finalText.search('China');
                            global = finalText.slice(pos3, pos4);
                            pos5 = finalText.search('China');
                            pos6 = finalText.search('Outside of China');
                            china = finalText.slice(pos5, pos6);
                            pos7 = finalText.search('Outside of China');
                            pos8 = finalText.search('WHO RISK ASSESSMENT');
                            other = finalText.slice(pos7, pos8);

                            global = global.replace("Globally ", "");
                            global = global.replace("confirmed ", " confirmed");
                            global = global.replace("deaths ", "deaths");
                            global = global.replace("new)", " new) ");
                            global = global.replace("  ", " ");
                            china = china.replace("China", "");
                            china = china.replace("confirmed ", " confirmed");
                            china = china.replace("deaths ", "deaths");
                            china = china.replace("new)", " new) ");
                            china = china.replace("  ", " ");
                            other = other.replace("Outside of China", "");
                            other = other.replace("confirmed ", " confirmed");
                            other = other.replace("deaths ", "deaths");
                            other = other.replace("new)", " new) ");
                            other = other.replace("new)1", "new) 1");
                            other = other.replace("  ", " ");
                            other = other.replace("  areas (", "area(");

                            //console.log(global);
                            //console.log(china);
                            //console.log(other);

                            msg.reply("\n**Covid-19 cases:**" + "\n__Globally:__\n" + global + "\n__China:__\n" + china + "\n__Other:__\n" + other)

                            exec('del /f info.pdf',
                                function(error, stdout, stderr) {
                                    //console.log('stdout: ' + stdout);
                                    //console.log('stderr: ' + stderr);
                                    if (error !== null) {
                                        console.log('exec error: ' + error);
                                    }
                                });
                        })
                        if (error !== null) {
                            console.log('exec error: ' + error);
                        }
                    });
            } else {
                console.log("Error, could not get HTML source")
            }
        })
    }
    if (msg.content.toString().search("corona country") != -1) {
        request('https://www.who.int/emergencies/diseases/novel-coronavirus-2019/situation-reports', function(error, response, body) {
            if (!error && response.statusCode == 200) {
                pos1 = body.search('/docs/default-source/coronaviruse/');
                pos2 = body.search('"><strong>Situation report');
                ip = body.slice(pos1, pos2);
                url = "https://www.who.int";
                finalIp = url.concat(ip);
                //console.log(finalIp);
                finalCommand = "curl " + finalIp + " --output info.pdf";
                exec(finalCommand,
                    function(error, stdout, stderr) {
                        //console.log('stdout: ' + stdout);
                        //console.log('stderr: ' + stderr);
                        entry = 0;
                        countryName = msg.content.toString().slice(15, msg.content.toString().length);
                        if (countryName == "Usa" || countryName == "USA" || countryName == "Us" || countryName == "US" || countryName == "United-States" || countryName == "United-states" || countryName == "United-States of America" || countryName == "United States of America" || countryName == "United States" || countryName == "United states") {
                            countryName = "America";
                        }
                        if (countryName == "China") {
                            entry = -1;
                        }
                        var pathToPdf = __dirname + "/info.pdf"
                        pdfText(pathToPdf, function(err, chunks) {
                            for (i = 0; i < chunks.length; i++) {
                                if (chunks[i] === countryName && entry != -1) {
                                    entry = i;
                                    cases = chunks[i + 1];
                                    newCases = chunks[i + 2];
                                    deaths = chunks[i + 3];
                                    newDeaths = chunks[i + 4];
                                    break;
                                }
                            }

                            //console.log(msg.content.toString().slice(15, msg.content.toString().length));
                            //console.log(entry);
                            //console.log(cases);
                            //console.log(newCases);
                            //console.log(deaths);
                            //console.log(newDeaths);

                            if (entry == 0) {
                                msg.reply("\nSorry, but " + msg.content.toString().slice(15, msg.content.toString().length) + " is an invalid country name. Please check CAPITALISATION, s p a c e s and spehllyngh");
                            } else if (entry == -1) {
                                msg.reply("\nTo get China's info, use corona stats.");
                            } else {
                                msg.reply("\n**Covid-19 cases in " + msg.content.toString().slice(15, msg.content.toString().length) + ":**\n__Total Cases:__\n" + cases + "\n__New Cases Today:__\n" + newCases + "\n__Total Deaths:__\n" + deaths + "\n__New Deaths Today:__\n" + newDeaths);
                            }
                            exec('del /f info.pdf',
                                function(error, stdout, stderr) {
                                    //console.log('stdout: ' + stdout);
                                    //console.log('stderr: ' + stderr);
                                    if (error !== null) {
                                        console.log('exec error: ' + error);
                                    }
                                });
                        })
                        if (error !== null) {
                            console.log('exec error: ' + error);
                        }
                    });
            } else {
                console.log("Error, could not get HTML source")
            }
        })
    }
    if (msg.content === "corona province Canada") {
        request('https://www.canada.ca/en/public-health/services/diseases/2019-novel-coronavirus-infection.html', function(error, response, body) {
            if (!error && response.statusCode == 200) {
                pos1 = body.search('<td>British Columbia</td>');
                pos2 = body.search('<td>Alberta</td>');
                pos3 = body.search('<td>Saskatchewan</td>');
                pos4 = body.search('<td>Manitoba</td>');
                pos5 = body.search('<td>Ontario</td>');
                pos6 = body.search('<td>Quebec</td>');
                pos7 = body.search('<td>New Brunswick</td>');
                pos8 = body.search('<td>Repatriated .*</td>');
                pos9 = body.search('<td><strong>Total cases</strong></td>');
                pos10 = body.search('</table>');

                britishColumbia = body.slice(pos1 + 32, pos2 - 36);
                alberta = body.slice(pos2 + 23, pos3 - 36);
                saskatchewan = body.slice(pos3 + 28, pos4 - 36);
                manitoba = body.slice(pos4 + 24, pos5 - 36);
                ontario = body.slice(pos5 + 23, pos6 - 36);
                quebec = body.slice(pos6 + 22, pos7 - 36);
                newBrunswick = body.slice(pos7 + 29, pos8 - 36);
                others = body.slice(pos8 + 37, pos9 - 36);
                total = body.slice(pos9 + 52, pos10 - 65);

                //console.log(britishColumbia);
                //console.log(alberta);
                //console.log(saskatchewan);
                //console.log(manitoba);
                //console.log(ontario);
                //console.log(quebec);
                //console.log(newBrunswick);
                //console.log(others);
                //console.log(total);
                msg.reply("\n**Covid-19 cases in the provinces of Canada:**\n__Total Cases:__\n" + total + "\n__Quebec:__\n" + quebec + "\n__Ontario:__\n" + ontario +"\n__Manitoba:__\n" + manitoba + "\n__Saskatchewan:__\n" + saskatchewan + "\n__Alberta:__\n" + alberta + "\n__British Columbia:__\n" + britishColumbia + "\n__New Brunswick:__\n" + newBrunswick);
            } else {
                console.log("Error, could not get HTML source")
            }
        })
    }
    if (msg.content === "corona region Quebec") {
        request('https://www.quebec.ca/en/health/health-issues/a-z/2019-coronavirus/', function(error, response, body) {
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

                msg.reply("\n**Covid-19 cases in the regions of Quebec:**\n__Total Cases:__\n" + total + "\n__Montreal:__\n" + montreal + "\n__Monteregie:__\n" + monteregie + "\n__Laurentides:__\n" + laurentides)
            } else {
                console.log("Error, could not get HTML source")
            }
        });
    }
    if(msg.content === "corona help"){
        msg.reply("\n**Commands:**\n__corona  help__ ==>> displays help\n__corona  info__ ==>> gives the link to the newest WHO report\n__corona  stats__ ==>> gives the latest statistics\n__corona  country <country name>__ ==>> give the stats of the specified country\n__corona  province Canada__ ==>> give the stats of the provinces in Canada\n__corona  region Quebec__ ==>> give the stats of the regions in Quebec");
    }
});

client.login('Njg3NzgxNzA3Njc5NjYyMTk4.Xmq80w.f2wM_ZJjaSufZ4MKY0APt99pjjw');