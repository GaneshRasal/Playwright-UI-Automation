import { setWorldConstructor } from "@cucumber/cucumber";

class CustomWorld{
    constructor(){
        this.browser=null;
        this.context=null;
        this.page=null;
    }
}

setWorldConstructor(CustomWorld);