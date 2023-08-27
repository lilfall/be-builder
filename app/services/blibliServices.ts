import { executablePath } from "puppeteer";
import { Blibli } from "../models/blibli";
const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");

puppeteer.use(StealthPlugin());

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

class BlibliService {
  async getAllProducts(): Promise<{
    status: string;
    message?: string;
    total?: number;
    data?: Blibli[];
  }> {
    try {
      const products = await this.scrapeProducts();
      const result = {
        status: "success",
        total: products.length,
        data: products,
      };
      return result;
    } catch (error) {
      console.error("Error during scraping:", error);
      return {
        status: "error",
        message: "An error occurred while scraping Blibli",
      };
    }
  }

  async getProductByKeyword(keyword: string): Promise<{
    status: string;
    message?: string;
    total?: number;
    data?: Blibli[];
  }> {
    try {
      const products = await this.scrapeProductsByKeyword(keyword);
      const result = {
        status: "success",
        total: products.length,
        data: products,
      };
      return result;
    } catch (error) {
      console.error("Error during scraping:", error);
      return {
        status: "error",
        message: "An error occurred while scraping Blibli.",
      };
    }
  }

  async scrapeProducts(): Promise<Blibli[]> {
    const browser = await puppeteer.launch({
      headless: true,
      executablePath: executablePath(),
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    await page.goto("https://www.blibli.com");
    await delay(1000);
    await page.evaluate(() => {
      window.scrollTo(0, 20000);
    });

    await delay(4000);
    await page.evaluate(() => {
      window.scrollTo(0, 20000);
    });

    await delay(2000);

    const productElements = await page.$$(".blu-product");

    const products: Blibli[] = [];

    for (const productElement of productElements) {
      const productName = await productElement
        .$eval(
          ".blu-product__name",
          (element: Element) => element.textContent?.trim() || ""
        )
        .catch(() => "");
      const productPrice = await productElement
        .$eval(
          ".blu-product__price-after",
          (element: Element) => element.textContent?.trim() || ""
        )
        .catch(() => "");
      const productImageURL = await productElement
        .$eval(
          ".blu-product__img-main",
          (element: Element) => element.getAttribute("data-src") || ""
        )
        .catch(() => "");
      products.push({
        product_name: productName,
        product_price: productPrice,
        product_image: productImageURL,
      });
    }

    await delay(1000);
    await page.screenshot({ path: "blibli.png", fullPage: false });

    await browser.close();
    console.log(`All done, check the screenshot. ✨`);
    return products;
  }

  async scrapeProductsByKeyword(keyword: string): Promise<Blibli[]> {
    const browser = await puppeteer.launch({
      headless: true,
      executablePath: executablePath(),
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    await page.goto(`https://www.blibli.com/cari/${keyword}`);
    await delay(1000);
    await page.evaluate(() => {
      window.scrollTo(0, 20000);
    });

    await delay(4000);
    await page.evaluate(() => {
      window.scrollTo(0, 20000);
    });

    await delay(2000);

    const productElements = await page.$$(".blu-product");

    const products: Blibli[] = [];

    for (const productElement of productElements) {
      const productName = await productElement
        .$eval(
          ".blu-product__name",
          (element: Element) => element.textContent?.trim() || ""
        )
        .catch(() => "");
      const productPrice = await productElement
        .$eval(
          ".blu-product__price-after",
          (element: Element) => element.textContent?.trim() || ""
        )
        .catch(() => "");
      const productImageURL = await productElement
        .$eval(
          ".blu-product__img-main",
          (element: Element) => element.getAttribute("data-src") || ""
        )
        .catch(() => "");
      products.push({
        product_name: productName,
        product_price: productPrice,
        product_image: productImageURL,
      });
    }

    await delay(1000);
    await page.screenshot({ path: "blibli.png", fullPage: false });

    await browser.close();
    console.log(`All done, check the screenshot. ✨`);
    return products;
  }
}

export default BlibliService;
