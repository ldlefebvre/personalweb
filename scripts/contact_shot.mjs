import puppeteer from "puppeteer-core";
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const b = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  userDataDir: "/tmp/pptr-profile",
  args: ["--no-sandbox", "--hide-scrollbars", "--disable-gpu"],
});
const p = await b.newPage();
await p.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
await p.goto("http://localhost:4321/#contact", { waitUntil: "networkidle0" });
await new Promise((r) => setTimeout(r, 1000));
const el = await p.$("#contact");
await el.screenshot({ path: "/tmp/contact_section.png" });
console.log("done");
await b.close();
