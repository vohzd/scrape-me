const express                             = require("express");

const router                              = express.Router();

const puppeteer                           = require("puppeteer");

router.get("/", async (req, res, next) => {
  await browser = puppeteer.launch({
    args: ["--disable-dev-shm-usage"],
    executablePath: "/usr/bin/chromium-browser"
  });
  puppeteer.launch().then(async browser => {
      const page = await browser.newPage();
      await page.goto("https://www.boohoo.com/");

      /*
      const productName = await page.$('.product-name');
      const text = await (await productName.getProperty('textContent')).jsonValue();
      console.log(text);*/

      let bodyHTML = await page.evaluate(() => document.body.innerHTML);
      console.log(bodyHTML);

      return res.send({ "html": bodyHTML});
  });
});


module.exports = router;
