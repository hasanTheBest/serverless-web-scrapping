const puppeteer = require("puppeteer-core");
const express = require("express");
const chromium = require("@sparticuz/chromium-min");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 5000;

const localPath = `C:/Users/WINDOW~1/AppData/Local/Temp/localChromium/chromium/win64-1253105/chrome-win/chrome.exe`;
// const localPath = `C:\Users\WINDOW~1\AppData\Local\Temp\localChromium\chromium\win64-1253105\chrome-win\chrome.exe`;
// "/Temp/localChromium/chromium/win64-1253105/chrome-win/chrome";

app.get("/", (req, res) => {
  res.send("Server is running.");
});

app.get("/scrape", async (req, res) => {
  try {
    /* const browser = await puppeteer.launch({
      args:
        process.env.NODE_ENV === "development"
          ? puppeteer.defaultArgs()
          : chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath:
        process.env.NODE_ENV === "development"
          ? // ? "/tmp/localChromium/chromium/linux-1122391/chrome-linux/chrome"
            localPath
          : await chromium.executablePath(),
      headless:
        process.env.NODE_ENV === "development" ? false : chromium.headless,
    }); */

    const browser = await puppeteer.launch({
      args: puppeteer.defaultArgs(),
      defaultViewport: chromium.defaultViewport,
      executablePath: localPath,
      headless: chromium.headless,
    });

    const page = await browser.newPage();

    // await page.goto("https://www.example.com", { waitUntil: "networkidle0" });
    await page.goto("https://www.prothomalo.com/", {
      waitUntil: "networkidle0",
    });

    const pageTitle = await page.title();

    console.log("Chromium:", await browser.version());
    console.log("Page Title:", pageTitle);
    res.send(pageTitle);

    await page.close();
    await browser.close();
  } catch (error) {
    res.send(`error: ${error.message}`);
    console.error(error);
  }
});

app.listen(PORT, () => {
  console.log(`App is listening to the port: ${PORT}`);
});
