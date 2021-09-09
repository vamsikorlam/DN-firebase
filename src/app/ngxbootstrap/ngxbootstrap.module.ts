import { NgModule } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
@NgModule({
    imports: [BrowserAnimationsModule, ModalModule.forRoot(), BsDropdownModule.forRoot()],

})

export class ngxModule {
    constructor() {
        console.log("module loaded")
    }
}
