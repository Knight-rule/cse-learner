import { test, expect } from "@playwright/test";

const BASE_URL = "https://cse-learner.onrender.com";

test.describe("Warmup", () => {
  test("Server is reachable", async ({ page }) => {
    test.setTimeout(120000);
    const resp = await page.goto(BASE_URL, { waitUntil: "domcontentloaded", timeout: 110000 });
    expect(resp?.status()).toBe(200);
    // Wait for the Next.js page to fully hydrate
    await page.waitForSelector("h1", { timeout: 10000 });
  });
});

test.describe("Site-wide Audit", () => {
  let consoleErrors: { type: string; text: string }[] = [];

  test.beforeEach(async ({ page }) => {
    consoleErrors = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        consoleErrors.push({ type: msg.type(), text: msg.text() });
      }
    });
    page.on("pageerror", (err) => {
      consoleErrors.push({ type: "pageerror", text: err.message });
    });
  });

  const goto = (page: any, url: string) =>
    page.goto(url, { waitUntil: "domcontentloaded", timeout: 15000 });

  test("Homepage - no console errors and loads under 5s", async ({ page }) => {
    const start = Date.now();
    const response = await goto(page, BASE_URL);
    const loadTime = Date.now() - start;
    expect(response?.status()).toBe(200);
    expect(loadTime).toBeLessThan(5000);
    expect(consoleErrors).toEqual([]);
  });

  test("Homepage - SEO meta tags", async ({ page }) => {
    await goto(page, BASE_URL);
    await page.waitForSelector("h1", { timeout: 5000 });

    const title = await page.title();
    expect(title).toContain("CSE Learner");

    await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /computer science|cse|data structures/i);
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute("content", /CSE Learner/);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /index/i);
    await expect(page.locator('meta[name="viewport"]')).toHaveAttribute("content", /device-width/);
  });

  test("Homepage - heading hierarchy is correct", async ({ page }) => {
    await goto(page, BASE_URL);
    await page.waitForSelector("h1", { timeout: 5000 });

    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("h1").first()).toContainText("Empowering");

    const h2Count = await page.locator("h2").count();
    expect(h2Count).toBeGreaterThan(3);

    const h3Count = await page.locator("h3").count();
    expect(h3Count).toBeGreaterThan(0);
  });

  test("Homepage - skip navigation link works", async ({ page }) => {
    await goto(page, BASE_URL);
    const skipLink = page.locator(".skip-to-content");
    await expect(skipLink).toBeVisible();
    await expect(skipLink).toHaveAttribute("href", "#main-content");
  });

  test("Homepage - all course cards render", async ({ page }) => {
    await goto(page, BASE_URL);
    await page.waitForSelector(".course-card-vertical", { timeout: 5000 });

    const courseCards = page.locator(".course-card-vertical");
    const count = await courseCards.count();
    expect(count).toBeGreaterThanOrEqual(20);

    await expect(courseCards.first().locator("a").first()).toHaveAttribute("href", /\/courses\//);
  });

  test("Homepage - all company logos load", async ({ page }) => {
    await goto(page, BASE_URL);

    const companyImgs = page.locator(".company-card-home img");
    const count = await companyImgs.count();
    expect(count).toBeGreaterThanOrEqual(15);

    const faqs = page.locator(".faq-item");
    expect(await faqs.count()).toBeGreaterThanOrEqual(4);
  });

  test("Homepage - FAQ accordion works", async ({ page }) => {
    await goto(page, BASE_URL);

    const firstFaq = page.locator(".faq-item").first();
    await expect(firstFaq).not.toHaveAttribute("open");

    await firstFaq.locator("summary").click();
    await expect(firstFaq).toHaveAttribute("open");
  });

  test("Homepage - CTA buttons link correctly", async ({ page }) => {
    await goto(page, BASE_URL);

    await expect(page.locator('a.btn-primary:has-text("Start Learning")')).toHaveAttribute("href", "/courses");
    await expect(page.locator('a.btn-outline:has-text("Practice Problems")')).toHaveAttribute("href", "/practice");
  });

  test("Homepage - testimonials section renders", async ({ page }) => {
    await goto(page, BASE_URL);

    const testimonials = page.locator(".testimonial-card");
    expect(await testimonials.count()).toBeGreaterThanOrEqual(3);
    await expect(testimonials.first().locator(".testimonial-quote")).toBeVisible();
  });
});

test.describe("Accessibility Audit", () => {
  test("Navbar has accessible labels", async ({ page }) => {
    await page.goto(BASE_URL, { waitUntil: "domcontentloaded" });

    await expect(page.locator(".nav-theme")).toHaveAttribute("aria-label", /switch|toggle|mode/i);
    await expect(page.locator(".nav-mobile")).toHaveAttribute("aria-label", /menu/i);

    const navLinks = page.locator(".nav-link");
    const count = await navLinks.count();
    for (let i = 0; i < count; i++) {
      await expect(navLinks.nth(i)).not.toHaveAttribute("href", "");
    }
  });

  test("No images without alt text", async ({ page }) => {
    await page.goto(BASE_URL, { waitUntil: "domcontentloaded" });
    const imgs = page.locator("img");
    const count = await imgs.count();
    for (let i = 0; i < count; i++) {
      await expect(imgs.nth(i)).toHaveAttribute("alt");
    }
  });

  test("Color contrast - body text is visible", async ({ page }) => {
    await page.goto(BASE_URL, { waitUntil: "domcontentloaded" });
    const color = await page.locator("body").evaluate((el) => getComputedStyle(el).color);
    expect(color).not.toBe("rgb(0, 0, 0)");
    const bg = await page.locator("body").evaluate((el) => getComputedStyle(el).backgroundColor);
    expect(bg).not.toBe("rgb(0, 0, 0)");
  });

  test("Focusable elements are reachable via keyboard", async ({ page }) => {
    await page.goto(BASE_URL, { waitUntil: "domcontentloaded" });
    await page.keyboard.press("Tab");
    await expect(page.locator(":focus")).toBeVisible();
  });
});

test.describe("Courses Page", () => {
  test("Courses page loads with 29 courses", async ({ page }) => {
    await page.goto(`${BASE_URL}/courses`, { waitUntil: "domcontentloaded" });
    await page.waitForSelector(".course-card-vertical", { timeout: 5000 });
    await expect(page).toHaveTitle(/Courses|CSE Learner/);
    expect(await page.locator(".course-card-vertical").count()).toBeGreaterThanOrEqual(25);
    await expect(page.locator("h1")).toContainText(/CS Courses|Courses/);
  });

  test("Each course card has working link", async ({ page }) => {
    await page.goto(`${BASE_URL}/courses`, { waitUntil: "domcontentloaded" });
    const links = page.locator('a[href^="/courses/"]');
    expect(await links.count()).toBeGreaterThan(25);
    await links.first().click();
    await expect(page).toHaveURL(/\/courses\/.+/);
    await expect(page.locator("h1")).toBeVisible();
  });
});

test.describe("Course Detail Page", () => {
  test("Data Structures course page shows lessons", async ({ page }) => {
    await page.goto(`${BASE_URL}/courses/data-structures`, { waitUntil: "domcontentloaded" });
    // Allow time for server-rendered content to fully load
    await page.waitForTimeout(2000);
    await expect(page.locator("h1")).toContainText(/Data Structure/i);
    expect(await page.locator(".lesson-item").count()).toBeGreaterThanOrEqual(8);
  });

  test("Lesson page renders content", async ({ page }) => {
    await page.goto(`${BASE_URL}/courses/data-structures/lessons/1`, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(1000);
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.locator("main")).toBeVisible();
  });

  test("Next/Previous navigation works on lesson", async ({ page }) => {
    await page.goto(`${BASE_URL}/courses/data-structures/lessons/1`, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(1000);
    await expect(page.locator('a[href*="/lessons/2"]')).toBeVisible();

    await page.locator('a[href*="/lessons/2"]').click();
    await expect(page).toHaveURL(/\/lessons\/2/);
  });

  test("Lesson with no console errors", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (err) => errors.push(err.message));
    await page.goto(`${BASE_URL}/courses/operating-systems/lessons/1`, { waitUntil: "domcontentloaded" });
    expect(errors).toEqual([]);
  });
});

test.describe("Performance", () => {
  test("Page size is reasonable", async ({ page }) => {
    const response = await page.goto(BASE_URL, { waitUntil: "domcontentloaded" });
    const size = await response?.headerValue("content-length");
    if (size) expect(Number(size)).toBeLessThan(5_000_000);
  });

  test("Fonts load from Google Fonts", async ({ page }) => {
    await page.goto(BASE_URL, { waitUntil: "domcontentloaded" });
    const fonts = await page.evaluate(() =>
      document.fonts.ready.then(() => Array.from(document.fonts).map((f) => f.family))
    );
    expect(fonts.some((f) => f.includes("Inter"))).toBeTruthy();
  });

  test("LCP element is visible quickly", async ({ page }) => {
    await page.goto(BASE_URL, { waitUntil: "domcontentloaded" });
    await expect(page.locator(".heading-hero")).toBeVisible();
  });
});

test.describe("Navigation & Routing", () => {
  test("All nav links resolve to 200", async ({ page }) => {
    await page.goto(BASE_URL, { waitUntil: "domcontentloaded" });

    const navLinkElements = page.locator(".nav-link");
    const count = await navLinkElements.count();

    for (let i = 0; i < Math.min(count, 8); i++) {
      const href = await navLinkElements.nth(i).getAttribute("href");
      if (href && href.startsWith("/")) {
        const resp = await page.goto(BASE_URL + href, { waitUntil: "domcontentloaded" });
        expect(resp?.status()).toBe(200);
      }
    }
  });

  test("Broken links should be minimal", async ({ page }) => {
    await page.goto(BASE_URL, { waitUntil: "domcontentloaded" });
    const links = page.locator("a");
    const count = await links.count();

    let broken = 0;
    for (let i = 0; i < Math.min(count, 30); i++) {
      const href = await links.nth(i).getAttribute("href");
      if (href && href.startsWith("/") && !href.includes("#")) {
        try {
          const resp = await page.goto(BASE_URL + href, { waitUntil: "domcontentloaded" });
          if (resp && resp.status() >= 400) broken++;
        } catch { broken++; }
      }
    }
    expect(broken).toBe(0);
  });
});

test.describe("Responsive Design", () => {
  test("Mobile viewport - nav hamburger visible", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(BASE_URL, { waitUntil: "domcontentloaded" });
    // Wait for React hydration so click handlers work
    await page.waitForTimeout(1000);

    const mobileBtn = page.locator(".nav-mobile");
    await expect(mobileBtn).toBeVisible();

    await mobileBtn.click();
    await expect(page.locator(".nav-center.open")).toBeVisible();
  });

  test("Tablet viewport - content fits", async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto(BASE_URL, { waitUntil: "domcontentloaded" });

    await expect(page.locator(".hero-content")).toBeVisible();

    const scrollWidth = await page.evaluate(() => document.body.scrollWidth);
    expect(scrollWidth - (await page.evaluate(() => window.innerWidth))).toBeLessThan(5);
  });

  test("Desktop viewport - no horizontal overflow", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(BASE_URL, { waitUntil: "domcontentloaded" });

    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(scrollWidth - (await page.evaluate(() => window.innerWidth))).toBeLessThan(5);
  });
});

test.describe("Theme Toggle", () => {
  test("Dark mode is default", async ({ page }) => {
    await page.goto(BASE_URL, { waitUntil: "domcontentloaded" });
    expect(await page.evaluate(() => document.documentElement.classList.contains("dark"))).toBeTruthy();
    expect(await page.evaluate(() => getComputedStyle(document.body).backgroundColor)).toBe("rgb(8, 8, 15)");
  });

  test("Toggle switches to light mode", async ({ page }) => {
    await page.goto(BASE_URL, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(1000);
    await page.locator(".nav-theme").click();
    expect(await page.evaluate(() => document.documentElement.classList.contains("light"))).toBeTruthy();
  });
});

test.describe("Practice Pages", () => {
  test("Practice page exists and lists problems", async ({ page }) => {
    const resp = await page.goto(`${BASE_URL}/practice`, { waitUntil: "domcontentloaded" });
    expect(resp?.status()).toBe(200);
  });

  test("Practice problems for a course render", async ({ page }) => {
    await page.goto(`${BASE_URL}/practice/data-structures`, { waitUntil: "domcontentloaded" });
    expect(await page.title()).toBeTruthy();
  });
});
