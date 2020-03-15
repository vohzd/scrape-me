const express                             = require("express");

const router                              = express.Router();

const puppeteer                           = require("puppeteer");

router.get("/", async (req, res, next) => {
  return res.send("server booted");

});




router.get("/website", async (req, res, next) => {
  // call it like this example.com/website?url=https://YOURWEBSITE.com
  const url = req.query.url;
  console.log(req.query)
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  console.log("GOING")
  const images = await page.evaluate( () => Array.from( document.images, e => e.src ) );
  console.log(images);
  /* for all html
  let bodyHTML = await page.evaluate(() => document.querySelector("img"));*/
  return res.send({ "images": images });

});

module.exports = router;
