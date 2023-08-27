import express, { Request, Response } from "express";
const puppeteer = require("puppeteer-extra");

// add stealth plugin and use defaults (all evasion techniques)
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());

const app = express();

app.listen(4000, () => {
  console.log("Server running http://localhost:4000");
});

app.get("/", async (req: Request, res: Response) => {
  console.log("Running tests..");
  const testUrl = "https://www.blibli.com/cari/motor";
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(testUrl);
  await page.setViewport({ width: 1480, height: 1024 });
  await page.waitForTimeout(2000);
  const buttonSelector = "button"; // Ganti dengan selector sesuai kebutuhan Anda
  const element = await page.$(buttonSelector);
  await element.click();
  const buttonSelector2 = "button"; // Ganti dengan selector sesuai kebutuhan Anda
  const element2 = await page.$(buttonSelector2);
  await element2.click();

  await page.evaluate(() => {
    window.scrollTo(0, 2000); // Scroll ke bawah sejauh 1000 piksel
  });
  await page.waitForTimeout(5000);
  await page.evaluate(() => {
    window.scrollTo(0, 3000); // Scroll ke bawah sejauh 1000 piksel
  });
  await page.waitForTimeout(5000);
  // Mendapatkan daftar elemen produk
  const productElements = await page.$$(".product__item-container");
  const products = [];
  // Iterasi melalui setiap elemen produk
  for (const productElement of productElements) {
    const productName = await productElement.$eval(
      ".product__title",
      (element: HTMLDivElement) => element.textContent!.trim()
    );
    const productPrice = await productElement.$eval(
      ".product__body__price__display",
      (element: HTMLDivElement) => element.textContent!.trim()
    );
    const productImageURL = await productElement.$eval(
      "img",
      (element: HTMLImageElement) => element.getAttribute("data-src")
    );

    products.push({
      poduct_name: productName,
      product_price: productPrice,
      product_image: productImageURL,
    });
  }

  await page.screenshot({ path: "testresult.png", fullPage: true });
  await browser.close();

  console.log(`All done, check the screenshot. ✨`);

  res.json({
    message: "success ",
    data_from: testUrl,
    total: products.length,
    products: products,
  });
});
