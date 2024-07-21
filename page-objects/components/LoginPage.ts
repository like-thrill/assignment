import { Locator,expect,type Page } from '@playwright/test'
import { AbstractPage } from '../AbstractPage'

export class LoginPage extends AbstractPage{

  readonly page: Page
  readonly userNameInput: Locator
  readonly passwordInput: Locator
  readonly loginButton: Locator

  constructor(page: Page) {
    super(page)
    this.page = page
    this.userNameInput = page.locator('data-test=username')
    this.passwordInput = page.locator('data-test=password')
    this.loginButton = page.locator('data-test=login-button')
  }

  async login(userName, password) {
   
    await this.userNameInput.click()
    await this.userNameInput.fill(userName);
    this.passwordInput.fill(password);
    this.loginButton.click();

    //Verify login successfully.
    await expect(this.page.getByText('Swag Labs')).toHaveCount(1)
  }


}