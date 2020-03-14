var exec = require('child_process').exec;
var pdfText = require('pdf-text');
var request = require('request');
var finalText = "";
var finalIp = "";
var finalText = "";
var finalCommand = "";
var global = "";
var china = "";
var other = "";

request('https://www.who.int/emergencies/diseases/novel-coronavirus-2019/situation-reports', function (error, response, body) {
            if (!error && response.statusCode == 200) {
                pos1 = body.search('/docs/default-source/coronaviruse/');
                pos2 = body.search('"><strong>Situation report');
                ip = body.slice(pos1, pos2);
                url = "https://www.who.int";
                finalIp = url.concat(ip);
                console.log(finalIp);
                finalCommand = "curl " + finalIp + " --output info.pdf";
                exec(finalCommand,
                    function (error, stdout, stderr) {
                        //console.log('stdout: ' + stdout);
                        //console.log('stderr: ' + stderr);
                        var pathToPdf = __dirname + "/info.pdf"
                        pdfText(pathToPdf, function(err, chunks) {
                            for(i = 0; i < chunks.length; i++){
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

                            console.log(global);
                            console.log(china);
                            console.log(other);
                            exec('del /f info.pdf',
                                function (error, stdout, stderr) {
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
            }
            else {
                console.log("Error, could not get HTML source")
            }
        })