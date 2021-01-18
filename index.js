const request = require('request-promise');
const cheerio = require('cheerio');
const util = require('util');

const UN_URL = 'https://unjobs.org/duty_stations/suv';
const JOBS_URL = 'https://myjobsfiji.com/';
const GOV_URL = 'https://www.fiji.gov.fj/Vacancy';

(async () => {
    let response = await request(UN_URL);
    let $ = cheerio.load(response);

    $('a[class="jtitle"]').each((i, element) => {
        console.log(i + 1 + ': ' + $(element).text());
    });

    response = await request(JOBS_URL);
    $ = cheerio.load(response);


    console.log('\n');
    $(' div a[class="link"]').map((i, element) => {
        console.log(i + 1 + ': ' + $(element).text());
    });

    response = await request(GOV_URL);
    $ = cheerio.load(response);

    console.log('\n');
    $(' div [class="Header"]').map((i, element) => {
        console.log((i + 1 + ': ' + $(element).text()).trim());
    });
})();



