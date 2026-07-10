// ==========================================
// FILE: tests/e2e/login.spec.ts
// PRIMARY DEVELOPER: Santosh (DevSecOps & QA Lead)
// CO-DEVELOPERS / COLLABORATORS: All Members (Unit & E2E Testing, Security Reviews)
// FOCUS: End-to-End browser validation, Sign-in flows, Redirect logic
//
// CRITERIA & OPERATIONAL REQUIREMENTS:
// 1. Launch a headless browser routing to the login route (/login).
// 2. Assert the presence of Clerk auth container elements and CTA headers.
// 3. Simulate clicking the mock "Bypass Auth" button and assert successful redirect to `/workspaces`.
// 4. Validate that viewport resizing updates container styles correctly.
// ==========================================

import { test, expect } from "@playwright/test";

test.describe("Login Routing & Auth Bypass E2E Checks", () => {
  test("should load the login page and bypass auth successfully in demo mode", async ({ page }) => {
    // Note: This test expects the local development server running at http://localhost:3000
    await page.goto("http://localhost:3000/login");

    // Check title/header elements
    await expect(page.locator("h2")).toContainText("Welcome to Cadence");

    // Click on bypass action button
    const bypassButton = page.locator("#btn-bypass-auth");
    await expect(bypassButton).toBeVisible();

    await bypassButton.click();

    // Verify redirected path has workspaces url
    await expect(page.url()).toContain("/workspaces");
  });
});
