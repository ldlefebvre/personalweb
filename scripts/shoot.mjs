import puppeteer from "puppeteer-core";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const BASE = process.env.SHOOT_BASE ?? "http://localhost:4321";

const targets = [
  { path: "/", name: "home" },
  { path: "/work", name: "work" },
  { path: "/work/sensium", name: "sensium" },
  { path: "/work/exad", name: "exad" },
  { path: "/work/nouri", name: "nouri" },
  { path: "/work/ripped-utopia", name: "ripped-utopia" },
  { path: "/work/usf-sport-marketing", name: "usf" },
  { path: "/work/easyfind", name: "easyfind" },
  { path: "/404", name: "notfound" },
];

const viewports = [
  { label: "desktop", width: 1440, height: 900 },
  { label: "mobile", width: 390, height: 844 },
];

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  userDataDir: "/tmp/pptr-profile",
  args: ["--no-sandbox", "--hide-scrollbars", "--disable-gpu"],
});

for (const t of targets) {
  for (const vp of viewports) {
    const page = await browser.newPage();
    await page.setViewport({ width: vp.width, height: vp.height, deviceScaleFactor: 1 });
    await page.goto(BASE + t.path, { waitUntil: "networkidle0" });
    // trigger reveals + lazy content
    await page.evaluate(async () => {
      window.scrollTo(0, document.body.scrollHeight);
      await new Promise((r) => setTimeout(r, 400));
      window.scrollTo(0, 0);
      await new Promise((r) => setTimeout(r, 250));
    });

    // overflow diagnostics (mobile only)
    if (vp.label === "mobile") {
      const diag = await page.evaluate((vw) => {
        const out = [];
        const docW = document.documentElement.scrollWidth;
        document.querySelectorAll("*").forEach((el) => {
          const r = el.getBoundingClientRect();
          if (r.right > vw + 1 || r.left < -1) {
            out.push({
              tag: el.tagName.toLowerCase(),
              cls: (el.className || "").toString().slice(0, 60),
              right: Math.round(r.right),
              left: Math.round(r.left),
            });
          }
        });
        return { docW, vw, offenders: out.slice(0, 12) };
      }, vp.width);
      console.log(`\n[${t.name} ${vp.label}] docWidth=${diag.docW} viewport=${diag.vw}`);
      diag.offenders.forEach((o) =>
        console.log(`  overflow <${o.tag} class="${o.cls}"> left=${o.left} right=${o.right}`),
      );
    }

    await page.screenshot({ path: `/tmp/${t.name}_${vp.label}.png`, fullPage: true });
    console.log(`✓ /tmp/${t.name}_${vp.label}.png`);
    await page.close();
  }
}

await browser.close();
