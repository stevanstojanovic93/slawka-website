import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const pages = [
  { path: "/", lang: "sr", h1: "Individualni trening na pilates reformeru" },
  { path: "/en", lang: "en", h1: "Private training on the Pilates reformer" },
];

for (const p of pages) {
  test.describe(`${p.lang} page`, () => {
    test("renders the right language with hreflang alternates", async ({ page }) => {
      await page.goto(p.path);
      await expect(page.locator("html")).toHaveAttribute("lang", p.lang);
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(p.h1);
      for (const hreflang of ["sr", "en", "x-default"]) {
        await expect(page.locator(`link[rel="alternate"][hreflang="${hreflang}"]`)).toHaveCount(1);
      }
    });

    test("has no serious accessibility violations", async ({ page }) => {
      await page.goto(p.path);
      const { violations } = await new AxeBuilder({ page }).analyze();
      const serious = violations.filter((v) => v.impact === "serious" || v.impact === "critical");
      expect(serious.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(", ")}`)).toEqual([]);
    });
  });
}

test("/sr redirects to /", async ({ request }) => {
  const res = await request.get("/sr", { maxRedirects: 0 });
  expect(res.status()).toBe(308);
  expect(res.headers()["location"]).toBe("/");
});

test("language switcher links to the other locale", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Izaberi jezik" }).click();
  await page.getByRole("link", { name: /English/ }).click();
  await expect(page).toHaveURL(/\/en$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
});

test("map loads only after clicking the facade", async ({ page }) => {
  await page.goto("/en");
  const map = page.locator('iframe[title^="Map"]');
  await expect(map).toHaveCount(0);
  await page.getByRole("button", { name: "Show map" }).click();
  await expect(map).toHaveCount(1);
});

test("mobile menu is a modal dialog with focus handling", async ({ page, isMobile }) => {
  test.skip(!isMobile, "burger only exists on small screens");
  await page.goto("/en");
  const burger = page.getByRole("button", { name: "Open menu" });
  await burger.click();

  const dialog = page.getByRole("dialog", { name: "Menu" });
  await expect(dialog).toBeVisible();
  await expect.poll(() => page.evaluate(() => !!document.activeElement?.closest("dialog"))).toBe(true);

  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(burger).toBeFocused();

  // Navigating from the menu closes it and lands on the section.
  await burger.click();
  await dialog.getByRole("link", { name: "Contact" }).click();
  await expect(dialog).toBeHidden();
  await expect(page).toHaveURL(/#kontakt$/);
});
