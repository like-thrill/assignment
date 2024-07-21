import { Locator, Page, expect } from '@playwright/test'
import { AbstractPage } from '../AbstractPage'

export class CheckoutPage extends AbstractPage{

  readonly page: Page
  readonly inventoryItems: Locator
  readonly checkOutButton: Locator
  readonly fName: Locator
  readonly lName: Locator
  readonly zip: Locator
  readonly continueButton:Locator
  readonly finishButton:Locator
  readonly successCheckout:Locator


  constructor(page: Page) {
    super(page)
    this.page = page
    this.checkOutButton = page.locator('data-test=checkout')
    this.fName = page.locator('data-test=firstName')
    this.lName = page.locator('data-test=lastName')
    this.zip = page.locator('data-test=postalCode')
    this.continueButton= page.locator('data-test=continue')
    this.finishButton= page.locator('data-test=finish')
    this.inventoryItems = page.locator('data-test=inventory-item-name')
    this.successCheckout = page.locator('data-test=complete-header')
 
  }

  async fillPersonalInformationsAndContinue(fName,lName,zip)
  {
    this.verifyTitle("Checkout: Your Information")

    await this.fName.click()
    await this.fName.fill(fName)
    await this.lName.click()
    await this.lName.fill(lName)
    await this.zip.click()
    await this.zip.fill(zip)

    await this.continueButton.click()
  }

  async verifyOverviewAndFinish(names) {
    this.verifyTitle("Checkout: Overview")

    const itemsName = await this.inventoryItems.all()
    let actualNames = new Array()
    
    for(const item of itemsName)
    {
      await item.scrollIntoViewIfNeeded()
      const name =await item.innerText()
      actualNames.push(name)
    }

    expect(names.sort(),'Selected items and checkout items are not same.').toEqual(actualNames.sort())

    await this.finishButton.click()

    const message = await this.successCheckout.innerText()

    expect(message,"Success checkout message not displayed.").toEqual("Thank you for your order!")
}

}