const express = require("express");
const puppeteer = require("puppeteer-extra");

// add stealth plugin and use defaults (all evasion techniques)
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());

const app = express();

app.listen(4000, () => {
  console.log("Server running");
});

app.get("/", async (req, res) => {
  console.log("Running tests..");
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(
    "https://www.tokopedia.com/search?st=&q=sepeda&srp_component_id=02.01.00.00&srp_page_id=&srp_page_title=&navsource="
  );
  await page.setViewport({ width: 1480, height: 1024 });
  await page.waitForTimeout(5000);
  await page.evaluate(() => {
    window.scrollTo(0, 1000); // Scroll ke bawah sejauh 1000 piksel
  });
  await page.waitForTimeout(5000);
  await page.evaluate(() => {
    window.scrollTo(0, 3000); // Scroll ke bawah sejauh 1000 piksel
  });
  await page.waitForTimeout(5000);
  // Mendapatkan daftar elemen produk
  const productElements = await page.$$(".pcv3__container");

  const products = [];

  // Iterasi melalui setiap elemen produk
  for (const productElement of productElements) {
    const productName = await productElement.$eval(
      ".prd_link-product-name",
      (element) => element.textContent
    );
    const productPrice = await productElement.$eval(
      ".prd_link-product-price",
      (element) => element.textContent
    );
    const productImageURL = await productElement.$eval(
      ".css-1q90pod",
      (element) => element.getAttribute("src")
    );

    const productInfo = {
      name: productName,
      price: productPrice,

      imageURL: productImageURL,
    };

    products.push(productInfo);
  }

  console.log(products);

  await page.screenshot({ path: "testresult.png", fullPage: true });
  await browser.close();
  console.log(`All done, check the screenshot. ✨`);

  res.json({ message: "success", products: products });
});
