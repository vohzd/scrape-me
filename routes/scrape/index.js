const express                             = require("express");

const router                              = express.Router();

const puppeteer                           = require("puppeteer");

router.get("/", async (req, res, next) => {

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://www.boohoo.com/");
  let bodyHTML = await page.evaluate(() => document.body.innerHTML);
  console.log(bodyHTML);
  return res.send({ "html": bodyHTML});

});


module.exports = router;
