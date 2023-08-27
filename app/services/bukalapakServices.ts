import { executablePath } from "puppeteer";
import { Bukalapak } from "../models/bukalapak";
const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");

puppeteer.use(StealthPlugin());

class BukalapakService {
  async getAllProducts(): Promise<{
    status: string;
    message?: string;
    total?: number;
    data?: Bukalapak[];
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
        message: "An error occurred while scraping Bukalapak.",
      };
    }
  }

  async getProductByKeyword(keyword: string): Promise<{
    status: string;
    message?: string;
    total?: number;
    data?: Bukalapak[];
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
        message: "An error occurred while scraping Bukalapak.",
      };
    }
  }

  async scrapeProducts(): Promise<Bukalapak[]> {
    const browser = await puppeteer.launch({
      headless: true,
      executablePath: executablePath(),
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    await page.goto("https://www.bukalapak.com");

    const selector = ".bl-product-card__wrapper";

    await page.waitForSelector(selector);

    const productElements = await page.$$(selector);

    const products: Bukalapak[] = [];

    for (const productElement of productElements) {
      const productName = await productElement.$eval(
        ".bl-product-card__description-name a",
        (link: Element) => link.textContent?.trim() || ""
      );

      const productPrice = await productElement.$eval(
        ".bl-product-card__description-price .bl-text--subheading-2",
        (price: Element) => price.textContent?.trim() || ""
      );

      const productImage = await productElement.$eval(
        "img",
        (element: HTMLImageElement) => element.getAttribute("src")
      );

      products.push({
        product_name: productName,
        product_price: productPrice,
        product_image: productImage,
      });
    }

    await page.screenshot({ path: "testresult.png", fullPage: true });

    await browser.close();
    console.log(`All done, check the screenshot. ✨`);
    return products;
  }

  async scrapeProductsByKeyword(keyword: string): Promise<Bukalapak[]> {
    const browser = await puppeteer.launch({
      headless: true,
      executablePath: executablePath(),
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    await page.goto(
      `https://www.bukalapak.com/products?from=omnisearch&from_keyword_history=false&search%5Bkeywords%5D=${keyword}&search_source=omnisearch_keyword&source=navbar`
    );

    const selector = ".bl-product-card-new__wrapper";

    await page.waitForSelector(selector);

    const productElements = await page.$$(selector);
    await page.evaluate(() => {
      window.scrollBy(0, 0);
    });
    const products: Bukalapak[] = [];

    for (const productElement of productElements) {
      const productName = await productElement.$eval(
        "a.bl-link",
        (link: Element) => link.textContent?.trim() || ""
      );

      const productPrice = await productElement.$eval(
        ".bl-product-card-new__price-and-currency",
        (price: Element) => price.textContent?.trim() || ""
      );

      const productImage = await productElement.$eval(
        "img",
        (element: HTMLImageElement) => element.getAttribute("src")
      );

      products.push({
        product_name: productName,
        product_price: productPrice,
        product_image: productImage,
      });
    }

    await page.screenshot({ path: "testresult.png", fullPage: true });

    await browser.close();
    console.log(`All done, check the screenshot. ✨`);
    return products;
  }
}

export default BukalapakService;
