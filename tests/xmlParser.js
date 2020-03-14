const jsdom = require('jsdom');

const dom = new jsdom.JSDOM(``);
console.log(dom.window.document.querySelector("p").textContent); // "Hello world"