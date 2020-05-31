const express                             = require("express");

const router                              = express.Router();

const puppeteer = require('puppeteer')
//const StealthPlugin = require('puppeteer-extra-plugin-stealth')
//puppeteer.use(StealthPlugin())

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

    /*

    for all html
    const bodyHTML = await page.evaluate(() => document.querySelector("img"));

    for all images
    const images = await page.evaluate( () => Array.from( document.images, e => e.src ) );


    */

    await page.close();
    await browser.close();
    return res.send({ "html": bodyHTML });

  }
  catch (e){
    await page.close();
    await browser.close();
    return res.send({ "res": "fail" });

  }


});


router.get("/website-screenshot", async (req, res, next) => {
  // call it like this example.com/website?url=https://YOURWEBSITE.com
  const url = req.query.url;
  console.log(req.query)


  try {

    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url);

    const fileName = `${Date.now()}.jpg`;
    const path = `./screenshots/${fileName}`;

    await page.screenshot({ path: path, type: 'jpeg' });

    await page.close();
    await browser.close();

    return res.send(fileName);
  }
  catch (e){
    console.log(e)
    return res.send({ "res": "fail" });
  }


});

module.exports = router;
