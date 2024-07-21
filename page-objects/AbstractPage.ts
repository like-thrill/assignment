import { Page, Locator, expect } from '@playwright/test'

export class AbstractPage {

    readonly page: Page
    readonly pageTitle: Locator
  
    constructor(page: Page) {
      this.page = page
      this.pageTitle = page.locator('data-test=title')
    }
  
    async verifyTitle(title:string)
    {
      expect(title,'Page title not matched.').toEqual(await this.pageTitle.innerText())
    }

    async waitForNetworkIdle() {
      await this.page.waitForLoadState("networkidle")
        }

    async visit()
    {
      await this.page.goto("/")
    }

    async visitTo(url)
    {
      await this.page.goto(url)
    }
  }