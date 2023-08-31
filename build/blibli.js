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
    const testUrl = "https://www.blibli.com/cari/motor";
    const browser = yield puppeteer.launch({ headless: true });
    const page = yield browser.newPage();
    yield page.goto(testUrl);
    yield page.setViewport({ width: 1480, height: 1024 });
    yield page.waitForTimeout(2000);
    const buttonSelector = "button"; // Ganti dengan selector sesuai kebutuhan Anda
    const element = yield page.$(buttonSelector);
    yield element.click();
    const buttonSelector2 = "button"; // Ganti dengan selector sesuai kebutuhan Anda
    const element2 = yield page.$(buttonSelector2);
    yield element2.click();
    yield page.evaluate(() => {
        window.scrollTo(0, 2000); // Scroll ke bawah sejauh 1000 piksel
    });
    yield page.waitForTimeout(3000);
    yield page.evaluate(() => {
        window.scrollTo(0, 3000); // Scroll ke bawah sejauh 1000 piksel
    });
    yield page.waitForTimeout(3000);
    // Mendapatkan daftar elemen produk
    const productElements = yield page.$$(".product__item-container");
    const products = [];
    // Iterasi melalui setiap elemen produk
    for (const productElement of productElements) {
        const productName = yield productElement.$eval(".product__title", (element) => element.textContent.trim());
        const productPrice = yield productElement.$eval(".product__body__price__display", (element) => element.textContent.trim());
        const productImageURL = yield productElement.$eval("img", (element) => element.getAttribute("data-src"));
        products.push({
            poduct_name: productName,
            product_price: productPrice,
            product_image: productImageURL,
        });
    }
    yield page.screenshot({ path: "testresult.png", fullPage: true });
    yield browser.close();
    console.log(`All done, check the screenshot. ✨`);
    res.json({
        message: "success",
        data_from: testUrl,
        total: products.length,
        products: products,
    });
}));
