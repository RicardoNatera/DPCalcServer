const { Console } = require("console");
const fs = require("fs");
// create Date object for current location
var date = new Date();

// convert to milliseconds, add local time zone offset and get UTC time in milliseconds
var utcTime = date.getTime() + (date.getTimezoneOffset() * 60000);

// time offset for Venezuela is +4
var timeOffset = 4;

// create new Date object for a different timezone using supplied its GMT offset.
var VenezuelaTime = new Date(utcTime + (3600000 * timeOffset));

const scraperObject = {
	BCVurl: 'https://www.bcv.org.ve/',
	async scraper(browser){

		let page = await browser.newPage();
		console.log(`Navigating to ${this.BCVurl}...`);
		await page.goto(this.BCVurl, {timeout: 0});

		const dolarBCV = await page.$eval("#dolar > div > div > div.col-sm-6.col-xs-6.centrado > strong", el=>el.innerHTML) 

		let dolarValor = { 
			bcv:{
				horaAct: VenezuelaTime.getUTCHours(),
				minutosAct: VenezuelaTime.getUTCMinutes(), 
				valorDolarBCV: parseFloat(dolarBCV.trim().replace(",",".")),
				diaAct: VenezuelaTime.getUTCDate(),
				mesAct: VenezuelaTime.getUTCMonth()+1,
				annoAct: VenezuelaTime.getUTCFullYear()
			}
		};
		
		let data = JSON.stringify(dolarValor);
		fs.writeFileSync('dolarItems.json', data);

		
		
		
	}
}

module.exports = scraperObject;
