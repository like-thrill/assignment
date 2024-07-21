import { Locator, Page, expect } from '@playwright/test'
import { AbstractPage } from '../AbstractPage'
import { isNumberObject } from 'util/types'
import { it } from 'node:test'

export class HomePage extends AbstractPage{

  readonly page: Page
  readonly inventoryItems: Locator
  readonly cartBadge: Locator
  readonly cartIcon : Locator
  readonly itemName : Locator

  constructor(page: Page) {
    super(page)
    this.page = page
    this.inventoryItems = page.locator("//*[contains(@data-test,'add-to-cart-sauce-labs')]")
    this.cartBadge = page.locator('data-test=shopping-cart-badge')
    this.cartIcon = page.locator('data-test=shopping-cart-link')
    this.itemName = page.locator("//*[contains(text(),'Remove')]/../..//*[@data-test='inventory-item-name']")
   
  }

  async selectRandomProducts (items: number) {
    this.verifyTitle("Products")
    //Safe check
    expect(items,"Can't select 0 items.").toBeGreaterThan(0)
    
    //Wait for load network call
    await this.waitForNetworkIdle()
    
    const additems = await this.inventoryItems.all()
    
    //For selecting random items
    const shuffled = Array.from(additems).sort(() => 0.5 - Math.random());
    const usageable= shuffled.slice(0, items);

    for(const item of usageable)
    {
      await item.scrollIntoViewIfNeeded()
      await item.click()
    }
  
    let names = new Array()
    const itemsName= await this.itemName.all()
    
    for(const item of itemsName)
    {
      await item.scrollIntoViewIfNeeded()
      const name =await item.innerText()
      names.push(name)
    }

    //Confirm items selected.
    const cartCount = await this.cartBadge.innerText()
    expect(Number(cartCount)).toEqual(items)

    return names
}

async goToCheckout() {
  //Click on cart icon.
  await this.cartIcon.click()
}

}