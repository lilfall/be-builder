"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const express = require("express");
const puppeteer = require("puppeteer-extra");
// add stealth plugin and use defaults (all evasion techniques)
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());
const app = express();
app.listen(4000, () => {
    console.log("Server running");
});
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Running tests..");
    const browser = yield puppeteer.launch({ headless: true });
    const page = yield browser.newPage();
    yield page.goto("https://www.tokopedia.com/search?st=&q=sepeda&srp_component_id=02.01.00.00&srp_page_id=&srp_page_title=&navsource=");
    yield page.setViewport({ width: 1480, height: 1024 });
    yield page.waitForTimeout(5000);
    yield page.evaluate(() => {
        window.scrollTo(0, 1000); // Scroll ke bawah sejauh 1000 piksel
    });
    yield page.waitForTimeout(5000);
    yield page.evaluate(() => {
        window.scrollTo(0, 3000); // Scroll ke bawah sejauh 1000 piksel
    });
    yield page.waitForTimeout(5000);
    // Mendapatkan daftar elemen produk
    const productElements = yield page.$$(".pcv3__container");
    const products = [];
    // Iterasi melalui setiap elemen produk
    for (const productElement of productElements) {
        const productName = yield productElement.$eval(".prd_link-product-name", (element) => element.textContent);
        const productPrice = yield productElement.$eval(".prd_link-product-price", (element) => element.textContent);
        const productImageURL = yield productElement.$eval(".css-1q90pod", (element) => element.getAttribute("src"));
        const productInfo = {
            name: productName,
            price: productPrice,
            imageURL: productImageURL,
        };
        products.push(productInfo);
    }
    console.log(products);
    yield page.screenshot({ path: "testresult.png", fullPage: true });
    yield browser.close();
    console.log(`All done, check the screenshot. ✨`);
    res.json({ message: "success", products: products });
}));
