const { $ } = require('@wdio/globals')
const Page = require('./page');

class CategoryPage extends Page {

    expandMainmenu (menuName) 
    {
        return $('//button/span[text()="'+menuName+'"]');
    }

    async navigateToSubmenuUnderMainMenu (subMenu,mainMenu) {
        if(mainMenu && this.expandMainmenu(mainMenu).isDisplayed())
        {
            super.clickElement(this.expandMainmenu(mainMenu));
        }
        if(subMenu)
        {
            super.clickElement(super.navigateToElementTypeByTextValue("a",subMenu));
        }
    }

    async navigateToMainMenu (mainMenu) {
            super.clickElement(super.navigateToElementTypeByTextValue("a",mainMenu));
    }

    open () {
        return super.open('');
    }
}

module.exports = new CategoryPage();
