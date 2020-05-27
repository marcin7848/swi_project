import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule as AngularCommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdvancedSearchComponent } from './components/advanced-search/advanced-search.component';
import { RecentsComponent } from './components/recents/recents.component';
import {SharedModule} from "../shared/shared.module";

@NgModule({
  imports: [
    AngularCommonModule,
    FlexLayoutModule,
    PrimeNgModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [
    DashboardComponent
  ],
  declarations: [DashboardComponent, AdvancedSearchComponent, RecentsComponent]
})
export class DashboardModule { }
