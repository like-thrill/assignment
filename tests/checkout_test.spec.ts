
import {test} from '@playwright/test'
import { HomePage } from '../page-objects/components/HomePage'
import { LoginPage } from '../page-objects/components/LoginPage'
import { CartPage } from '../page-objects/components/CartPage';
import { CheckoutPage } from '../page-objects/components/CheckoutPage';
import { GlobalConstants } from '../constants/GlobalConstants';


test.describe('Navigate to home', () => {
    test.beforeEach(async ({ page }) => {
        const login = new LoginPage(page)

        //Navigate to home page.
        await login.visit()

        //Login with standard user
        await login.login(GlobalConstants.USER_NAME,GlobalConstants.PASSWORD)
    });

[
{ items: 3 },
].forEach(({ items }) => {
test(`Customer random ${items} item(s) checkout flow`, async ({page} )=> {
    const home = new HomePage(page)
    const cart = new CartPage(page)
    const checkout = new CheckoutPage(page)
    const itemsToCheckout = Number(items);

    //Select random items
    let selectedItems =  await home.selectRandomProducts(itemsToCheckout)
   
    //Checkout
    await home.goToCheckout()
   
    //Verify added items on cart page and checkout
    await cart.verifyAddedItemsAndMovetoCheckOut(selectedItems)

    //Fill checkout information
    await checkout.fillPersonalInformationsAndContinue(
        GlobalConstants.FNAME,GlobalConstants.LNAME, GlobalConstants.ZIP)

    //Verify successfully checkout
    await checkout.verifyOverviewAndFinish(selectedItems)
    });
})
});