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
class BukalapakService {
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
                    message: "An error occurred while scraping Bukalapak.",
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
                    message: "An error occurred while scraping Bukalapak.",
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
            yield page.goto("https://www.bukalapak.com");
            const selector = ".bl-product-card__wrapper";
            yield page.waitForSelector(selector);
            const productElements = yield page.$$(selector);
            const products = [];
            for (const productElement of productElements) {
                const productName = yield productElement.$eval(".bl-product-card__description-name a", (link) => { var _a; return ((_a = link.textContent) === null || _a === void 0 ? void 0 : _a.trim()) || ""; });
                const productPrice = yield productElement.$eval(".bl-product-card__description-price .bl-text--subheading-2", (price) => { var _a; return ((_a = price.textContent) === null || _a === void 0 ? void 0 : _a.trim()) || ""; });
                const productImage = yield productElement.$eval("img", (element) => element.getAttribute("src"));
                products.push({
                    product_name: productName,
                    product_price: productPrice,
                    product_image: productImage,
                });
            }
            yield page.screenshot({ path: "testresult.png", fullPage: true });
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
            yield page.goto(`https://www.bukalapak.com/products?from=omnisearch&from_keyword_history=false&search%5Bkeywords%5D=${keyword}&search_source=omnisearch_keyword&source=navbar`);
            const selector = ".bl-product-card-new__wrapper";
            yield page.waitForSelector(selector);
            const productElements = yield page.$$(selector);
            yield page.evaluate(() => {
                window.scrollBy(0, 20000);
            });
            const products = [];
            yield delay(2000);
            for (const productElement of productElements) {
                const productName = yield productElement.$eval("a.bl-link", (link) => { var _a; return ((_a = link.textContent) === null || _a === void 0 ? void 0 : _a.trim()) || ""; });
                const productPrice = yield productElement.$eval(".bl-product-card-new__price-and-currency", (price) => { var _a; return ((_a = price.textContent) === null || _a === void 0 ? void 0 : _a.trim()) || ""; });
                const productImage = yield productElement.$eval("img", (element) => element.getAttribute("src"));
                products.push({
                    product_name: productName,
                    product_price: productPrice,
                    product_image: productImage,
                });
            }
            yield page.screenshot({ path: "testresult.png", fullPage: true });
            yield browser.close();
            console.log(`All done, check the screenshot. ✨`);
            return products;
        });
    }
}
exports.default = BukalapakService;
