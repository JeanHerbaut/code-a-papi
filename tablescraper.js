import axios from 'axios';
import cheerio from 'cheerio';
import fs from "fs";

let CIF = '';

(async function html_scraper() {
    const response = await axios('https://www.swissquote.ch/sq_mi/public/market/Detail.action?s=CH0324608568_4_CHF&searchQuery=cif');
    const html = await response.data;
    const $ = cheerio.load(html);
    //Selecting all rows inside our target table
    const allRows = $('table.FullquoteTable.u-textAlignCenter > tbody > tr > td')[15]
    const strings = allRows.children[0].data
    for (let index = 0; index < strings.length; index++) {
        if (strings[index] != " " && strings[index] !="\n" ) {
            CIF = CIF+strings[index]
        }
    }
    fs.writeFile("myCIF.txt", CIF, (err) => {
        if (err) {
            console.log(err);
            return;
        }
    })
   })();


