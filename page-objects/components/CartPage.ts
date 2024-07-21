import { Locator, Page, expect } from '@playwright/test'
import { AbstractPage } from '../AbstractPage'

export class CartPage extends AbstractPage{

  readonly page: Page
  readonly inventoryItems: Locator
  readonly checkOutButton: Locator


  constructor(page: Page) {
    super(page)
    this.page = page
    this.inventoryItems = page.locator('data-test=inventory-item-name')
    this.checkOutButton = page.locator('data-test=checkout')
  }

  async verifyAddedItemsAndMovetoCheckOut(names:any)
  {
    this.verifyTitle("Your Cart")

    const itemsName = await this.inventoryItems.all()
    let actualNames = new Array()
    
    for(const item of itemsName)
    {
      await item.scrollIntoViewIfNeeded()
      const name =await item.innerText()
      actualNames.push(name)
    }

    expect(names.sort(),'Selected items and cart items are not same.').toEqual(actualNames.sort())

    await this.checkOutButton.click()
  }

}