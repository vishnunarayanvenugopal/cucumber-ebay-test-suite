const { $ } = require('@wdio/globals')
const Page = require('./page');

class ProductPage extends Page {

    checkBox (checkBoxText) 
    {
        return $("//div[@class='x-msku__box-cont']//select/option[text()="+checkBoxText+"]");
    }

    purchaseCount () 
    {
        return $('//div[@class="d-quantity__availability"]//span[@class="ux-textspans"][3]');
    }

    textbox(name)
    {
        return $("//div[@class='textbox']/input[@name='"+name+"']");
    }


    async selectDropdown (option) 
    {
        //need to be improved with unique identifier
        await super.clickElement(this.checkBox(option));
    }


    async applySelections (filters,caseColor,Specs) 
    {

        for(var i=0;i<filters.length;i++)
        {
            //this.filterScrollSelection();
            await browser.pause(3000);
            if(filters[i]=="Cover Color")
            {
                await this.checkBox(caseColor);
            }
            if(filters[i]=="Spec")
            {
                await this.checkBox(Specs);
            }
        }

    }

    async fillShippingAddress(filters,country,firstName,lastName,streetAddress,city,state,email,zip,phone_no) 
    {

        for(var i=0;i<filters.length;i++)
        {
            //this.filterScrollSelection();
            await browser.pause(3000);
            if(filters[i]=="Country")
            {
                await this.selectDropdown(country);
            }
            if(filters[i]=="First Name")
            {
                await this.textbox("firstName").setValue(firstName);
            }
            if(filters[i]=="Last Name")
            {
                await this.textbox("lastName").setValue(lastName);
            }
            if(filters[i]=="Street Address")
            {
                await this.textbox("addressLine1").setValue(streetAddress);
            }
            if(filters[i]=="City")
            {
                await this.textbox("city").setValue(city);
            }
            if(filters[i]=="State")
            {
                await this.selectDropdown(state);
            }
            if(filters[i]=="email")
            {
                
                await this.textbox("email").setValue(email);
                await this.textbox("emailConfirm").setValue(email);
            }
            if(filters[i]=="zip")
            {
                await this.textbox("postalCode").setValue(zip);
            }
            if(filters[i]=="phone number")
            {
                await this.textbox("phoneNumber").setValue(phone_no);
            }

        }

    }

    async checkoutAsGuest()
    {
        await super.navigateToElementTypeByTextValue("a","Buy It Now");
        await super.navigateToElementTypeByTextValue("span","Check out as guest");
    }
}

module.exports = new ProductPage();
