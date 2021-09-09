import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { LoginComponent } from './login.component';

@NgModule({
    declarations: [LoginComponent],
    imports: [MatDialogModule, FormsModule, ReactiveFormsModule, CommonModule],
    providers: [

    ],
    exports: [LoginComponent]
})
export class LoginModule { }