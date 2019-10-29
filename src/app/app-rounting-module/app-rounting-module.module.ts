import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ChartsComponent } from '../charts/charts.component';
import { ChartsIndexComponent } from '../charts-index/charts-index.component';
import { ChartsByMonthComponent } from '../charts-by-month/charts-by-month.component';


const appRoutes: Routes = [
  { path: 'charts', component: ChartsComponent },
  { path: 'index', component: ChartsIndexComponent },
  { path: 'charts-by-month', component: ChartsByMonthComponent },
  { path: '',
    redirectTo: '/index',
    pathMatch: 'full'
  },
];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    )
  ],
  exports: [RouterModule]
})
export class AppRountingModuleModule { }
