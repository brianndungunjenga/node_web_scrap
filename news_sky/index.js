const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();

const PORT = process.env.PORT || 3000;

const website = "https://news.sky.com";

/*
try {
    axios(website).then((res) => {
        const html = res.data;
        const $ = cheerio.load(html);

        let content = [];
        let index = 0

        $('.sdc-site-tile__headline', html).each(function() {
            const title = $(this).text();
            const url = $(this).find('a').attr('href');
            index++;

            content.push({
                index,
                title,
                url,
            });

            app.get('/', (req, res) => {
                res.json(content);
            });
        });
    });
}
*/

try {
    axios(website).then((res) => {
        const html = res.data;
        const $ = cheerio.load(html);

        let content = [];
        let index = 0

        $('.sdc-site-tile__body', html).each(function() {
            const category = $(this).find('.sdc-site-tile__tag-link').text();
            const title = $(this).find('.sdc-site-tile__headline').text();
            const url = $(this).find('.sdc-site-tile__headline').find('a').attr('href');
            console.log($(this).find('.sdc-site-tile__headline').find('a').attr('href'))
            index++;

            // Clean the url const
            url_test = url.startsWith("http");
            let clean_url = "";

            if (url_test == 'True') {
                clean_url = url;
            }
            else {
                clean_url = "https://news.sky.com" + url;
            }
            
            
            content.push({
                index,
                category,
                title,
                clean_url,
            });

            app.get('/', (req, res) => {
                res.json(content);
            });
        });
    });
}

catch (error) {
    console.log(error, error.message);
}

app.listen(PORT, () => {
    console.log(`server is running on PORT:${PORT}`);
})
