import puppeteer from "puppeteer-core";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const BASE = process.env.SHOOT_BASE ?? "http://localhost:4322";

// node shoot_section.mjs "/path" "#selector" outname [width]
const [, , path, selector, name, widthArg] = process.argv;
const width = Number(widthArg ?? 1440);

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  userDataDir: "/tmp/pptr-profile",
  args: ["--no-sandbox", "--hide-scrollbars", "--disable-gpu"],
});
const page = await browser.newPage();
await page.setViewport({ width, height: 1000, deviceScaleFactor: 2 });
await page.goto(BASE + path, { waitUntil: "networkidle0" });
await page.evaluate(async () => {
  window.scrollTo(0, document.body.scrollHeight);
  await new Promise((r) => setTimeout(r, 500));
  window.scrollTo(0, 0);
  await new Promise((r) => setTimeout(r, 300));
});
const el = await page.$(selector);
if (!el) {
  console.error("selector not found:", selector);
} else {
  await el.scrollIntoView();
  await new Promise((r) => setTimeout(r, 400));
  await el.screenshot({ path: `/tmp/${name}.png` });
  console.log(`✓ /tmp/${name}.png`);
}
await browser.close();
