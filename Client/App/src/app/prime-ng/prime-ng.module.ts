import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';
import { CheckboxModule } from 'primeng/checkbox';
import { AccordionModule } from 'primeng/accordion';
import { SpinnerModule } from 'primeng/spinner';
import { RadioButtonModule } from 'primeng/radiobutton';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';
import {RatingModule} from 'primeng/rating';
import {ListboxModule} from 'primeng/listbox';
import {TooltipModule} from 'primeng/tooltip';

@NgModule({
  imports: [
    CommonModule,
    InputTextModule,
    DropdownModule,
    ButtonModule,
    TableModule,
    MultiSelectModule,
    CheckboxModule,
    AccordionModule,
    SpinnerModule,
    RadioButtonModule,
    MessageModule,
    MessagesModule,
    ToastModule,
    RatingModule,
    ListboxModule,
    TooltipModule
  ],
  exports: [
    InputTextModule,
    DropdownModule,
    ButtonModule,
    ButtonModule,
    TableModule,
    MultiSelectModule,
    CheckboxModule,
    AccordionModule,
    SpinnerModule,
    RadioButtonModule,
    MessageModule,
    MessagesModule,
    ToastModule,
    RatingModule,
    ListboxModule,
    TooltipModule
  ],
  declarations: []
})
export class PrimeNgModule { }
