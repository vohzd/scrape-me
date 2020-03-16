const express                             = require("express");

const router                              = express.Router();

const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
console.log(StealthPlugin)
puppeteer.use(StealthPlugin())

router.get("/", async (req, res, next) => {
  return res.send("server booted");

});




router.get("/website", async (req, res, next) => {
  // call it like this example.com/website?url=https://YOURWEBSITE.com
  const url = req.query.url;
  console.log(req.query)
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(url);
    await page.waitFor(1000)
  console.log("GOING")


  try {
    let bodyHTML = await page.evaluate(() => document.body.innerHTML);
    //const images = await page.evaluate( () => Array.from( document.images, e => e.src ) );
    return res.send({ "html": bodyHTML });

  }
  catch (e){
    return res.send({ "res": "fail" });

  }
  /* for all html
  let bodyHTML = await page.evaluate(() => document.querySelector("img"));*/

});

module.exports = router;
