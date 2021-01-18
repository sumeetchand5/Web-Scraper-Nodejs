const request = require('request-promise');
const cheerio = require('cheerio');
const util = require('util');
const proxy = require("node-global-proxy").default;

proxy.setConfig({
    http: "http://proxy.vodafone.com.fj:80",
    https: "http://proxy.vodafone.com.fj:80",
});
proxy.start();

const UN_URL = 'https://unjobs.org/duty_stations/suv';
const JOBS_URL = 'https://myjobsfiji.com/';
const GOV_URL = 'https://www.fiji.gov.fj/Vacancy';



(async () => {
    let un_job = [];
    let response = await request(UN_URL);
    let $ = cheerio.load(response);

    $('a[class="jtitle"]').each((i, element) => {
       // console.log(i + 1 + ': ' + $(element).text());
        un_job.push({title : $(element).text(),update :null});
    });

    $('time[class="upd timeago"]').each((i, element) => {
        // console.log(i + 1 + ': ' + $(element).text());
        un_job[i].update = $(element).text();
    });

    un_job.forEach((val,i) => console.log(`${i+1} : ${val.title} (updated : ${val.update.substring(0,9)} )`));



    response = await request(JOBS_URL);
    $ = cheerio.load(response);


    console.log('\n');
    $(' div[class="media-body"] > div[class="media-heading listing-item__title"] > a[class="link"]').map((i, element) => {
        console.log(i + 1 + ': ' + $(element).text());
    });

    response = await request(GOV_URL);
    $ = cheerio.load(response);

    console.log('\n');
    $(' div [class="Header"]').map((i, element) => {
        console.log((i + 1 + ': ' + $(element).text()).trim());
    });
})();



