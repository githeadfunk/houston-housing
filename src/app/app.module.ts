import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRountingModuleModule } from 'src/app/app-rounting-module/app-rounting-module.module';
import { FileServiceService } from 'src/app/services/file-service.service';
import { HttpClientModule } from '@angular/common/http';
import { ChartsComponent } from './charts/charts.component';
import { ChartsModule } from 'ng2-charts';
import { ChartsIndexComponent } from './charts-index/charts-index.component';
import { ChartsByMonthComponent } from './charts-by-month/charts-by-month.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { 
  MatFormFieldModule, 
  MatInputModule,
  MatSelectModule ,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatToolbarModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    ChartsComponent,
    ChartsIndexComponent,
    ChartsByMonthComponent
  ],
  imports: [
    BrowserModule,
    AppRountingModuleModule,
    HttpClientModule,
    ChartsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    BrowserAnimationsModule,
    CommonModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule
  ],
  providers: [FileServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
