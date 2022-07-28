const express = require("express");
const router = express.Router();
const cheerio = require("cheerio");
const axios = require("axios");
const cors = require("cors");

router.use(cors());

router.route("/").get(async (req, res) => {
    let internationalNews = [];
    const url = 'https://www.bollywoodhungama.com/tag/international';

    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    await $('article').each(function (i, elem) {
        let title = $(this).find('h3').text();
        let link = $(this).find('a').attr('href');
        let image = $(this).find('img').attr('src');
        let date = $(this).find('time').text();
        let news = {
            id: i + 1,
            title: title,
            link: link,
            image: image,
            date: date
        }
        internationalNews.push(news);
    })
    res.send(internationalNews.slice(0, 12));
})

router.route("/page/:id").get(async (req, res) => {
    let internationalNews = [];
    const url = `https://www.bollywoodhungama.com/tag/international/page/${req.params.id}`;

    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    await $('article').each(function (i, elem) {
        let title = $(this).find('h3').text();
        let link = $(this).find('a').attr('href');
        let image = $(this).find('img').attr('src');
        let date = $(this).find('time').text();
        const id = (req.params.id - 1) * 12 + i + 1;
        let news = {
            id: id,
            title: title,
            link: link,
            image: image,
            date: date
        }
        internationalNews.push(news);
    }
    )
    res.send(internationalNews.slice(0, 12));
})

module.exports = router;