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
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer_1 = require("puppeteer");
const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());
function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
class BlibliService {
    getAllProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield this.scrapeProducts();
                const result = {
                    status: "success",
                    total: products.length,
                    data: products,
                };
                return result;
            }
            catch (error) {
                console.error("Error during scraping:", error);
                return {
                    status: "error",
                    message: "An error occurred while scraping Blibli",
                };
            }
        });
    }
    getProductByKeyword(keyword) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield this.scrapeProductsByKeyword(keyword);
                const result = {
                    status: "success",
                    total: products.length,
                    data: products,
                };
                return result;
            }
            catch (error) {
                console.error("Error during scraping:", error);
                return {
                    status: "error",
                    message: "An error occurred while scraping Blibli.",
                };
            }
        });
    }
    scrapeProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            const browser = yield puppeteer.launch({
                headless: true,
                executablePath: (0, puppeteer_1.executablePath)(),
            });
            const page = yield browser.newPage();
            yield page.setViewport({ width: 1920, height: 1080 });
            yield page.goto("https://www.blibli.com");
            yield delay(2000);
            yield page.evaluate(() => {
                window.scrollTo(0, 20000);
            });
            yield page.evaluate(() => {
                window.scrollTo(0, 20000);
            });
            yield delay(2000);
            const productElements = yield page.$$(".blu-product");
            const products = [];
            for (const productElement of productElements) {
                const productName = yield productElement
                    .$eval(".blu-product__name", (element) => { var _a; return ((_a = element.textContent) === null || _a === void 0 ? void 0 : _a.trim()) || ""; })
                    .catch(() => "");
                const productPrice = yield productElement
                    .$eval(".blu-product__price-after", (element) => { var _a; return ((_a = element.textContent) === null || _a === void 0 ? void 0 : _a.trim()) || ""; })
                    .catch(() => "");
                const productImageURL = yield productElement
                    .$eval(".blu-product__img-main", (element) => element.getAttribute("data-src") || "")
                    .catch(() => "");
                products.push({
                    product_name: productName,
                    product_price: productPrice,
                    product_image: productImageURL,
                });
            }
            yield delay(1000);
            yield page.screenshot({ path: "blibli.png", fullPage: false });
            yield browser.close();
            console.log(`All done, check the screenshot. ✨`);
            return products;
        });
    }
    scrapeProductsByKeyword(keyword) {
        return __awaiter(this, void 0, void 0, function* () {
            const browser = yield puppeteer.launch({
                headless: true,
                executablePath: (0, puppeteer_1.executablePath)(),
            });
            const page = yield browser.newPage();
            yield page.setViewport({ width: 1920, height: 1080 });
            yield page.goto(`https://www.blibli.com/cari/${keyword}`);
            yield delay(1000);
            yield page.evaluate(() => {
                window.scrollTo(0, 20000);
            });
            yield delay(4000);
            yield page.evaluate(() => {
                window.scrollTo(0, 20000);
            });
            yield delay(2000);
            const productElements = yield page.$$(".blu-product");
            const products = [];
            for (const productElement of productElements) {
                const productName = yield productElement
                    .$eval(".blu-product__name", (element) => { var _a; return ((_a = element.textContent) === null || _a === void 0 ? void 0 : _a.trim()) || ""; })
                    .catch(() => "");
                const productPrice = yield productElement
                    .$eval(".blu-product__price-after", (element) => { var _a; return ((_a = element.textContent) === null || _a === void 0 ? void 0 : _a.trim()) || ""; })
                    .catch(() => "");
                const productImageURL = yield productElement
                    .$eval(".blu-product__img-main", (element) => element.getAttribute("data-src") || "")
                    .catch(() => "");
                products.push({
                    product_name: productName,
                    product_price: productPrice,
                    product_image: productImageURL,
                });
            }
            yield delay(1000);
            yield page.screenshot({ path: "blibli.png", fullPage: false });
            yield browser.close();
            console.log(`All done, check the screenshot. ✨`);
            return products;
        });
    }
}
exports.default = BlibliService;
