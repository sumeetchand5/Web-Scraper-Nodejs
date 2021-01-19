const request = require('request-promise');
const cheerio = require('cheerio');
const util = require('util');
const proxy = require("node-global-proxy").default;

proxy.setConfig({
    http: "http://proxy.vodafone.com.fj:80",
    https: "http://proxy.vodafone.com.fj:80",
});
// proxy.start();

const UN_URL = 'https://unjobs.org/duty_stations/suv';
const JOBS_URL = 'https://myjobsfiji.com/';
const GOV_URL = 'https://www.fiji.gov.fj/Vacancy';
const USP_URL = 'http://sols.usp.ac.fj/kiosk/pub/vacancies.pl';
const RBF_URL = 'https://www.rbf.gov.fj/careers/';



(async () => {
    let un_job = [];
    let jobs = [];
    let usp_job = [];
    let rbf_job= [];
    let response = await request(UN_URL);
    let $ = cheerio.load(response);

    $('a[class="jtitle"]').each((i, element) => {
        // console.log(i + 1 + ': ' + $(element).text());
        un_job.push({title: $(element).text(), update: null, org: 'UN Job'});
    });

    $('time[class="upd timeago"]').each((i, element) => {
        // console.log(i + 1 + ': ' + $(element).text());
        un_job[i].update = $(element).text().substring(0, 10);
    });

    un_job.forEach((val, i) => console.log(`${i + 1} : ${val.title} (updated : ${val.update.substring(0, 10)} )  - ${val.org}`));

    response = await request(USP_URL);
    $ = cheerio.load(response);

    console.log('\n');
    $(' td[class="unitbtralt"] >  a ').each((i, element) => {
        // console.log(i + 1 + ': ' + $(element).text());
        usp_job.push({title: $(element).text(), update: null, org: 'USP Job'});
    });

    $('td[class="unitbtralt"]').each((i, element) => {
        // console.log(i + 1 + ': ' + $(element).text());
        //usp_job[i].update = $(element).text().trim('\n');
    });

    usp_job.forEach((val, i) => console.log(`${i + 1} : ${val.title} (updated : ${val.update})  - ${val.org}`));
    
    response = await request(JOBS_URL);
    $ = cheerio.load(response);

    console.log('\n');
    $(' div[class="media-body"] > div[class="media-heading listing-item__title"] > a[class="link"]').each((i, element) => {
        // console.log(i + 1 + ': ' + $(element).text());
        jobs.push({title: $(element).text(), update: null, org: 'Fiji Job'});
    });

    $('div[class="listing-item__date"]').each((i, element) => {
        // console.log(i + 1 + ': ' + $(element).text());
        jobs[i].update = $(element).text().trim('\n');
    });

    jobs.forEach((val, i) => console.log(`${i + 1} : ${val.title} (updated : ${val.update})  - ${val.org}`));




   // console.log(jobs);
   // console.log(un_job);

    response = await request(GOV_URL);
    $ = cheerio.load(response);

    console.log('\n');
    $(' div [class="Header"]').map((i, element) => {
        console.log((i + 1 + ': ' + $(element).text()).trim());
    });
})();





