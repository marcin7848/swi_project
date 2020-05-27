import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultListComponent } from './components/result-list/result-list.component';
import { ResultBasicComponent } from './components/result-basic/result-basic.component';
import { ResultDetailComponent } from './components/result-detail/result-detail.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {SharedModule} from "../shared/shared.module";

@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        PrimeNgModule,
        RouterModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule
    ],
  exports: [ResultListComponent],
  declarations: [ResultListComponent, ResultBasicComponent, ResultDetailComponent]
})
export class SearchModule { }
