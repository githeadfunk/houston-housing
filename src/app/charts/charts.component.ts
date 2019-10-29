import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import { FileServiceService } from '../services/file-service.service';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {

  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
        },
      ]
    },
    annotation: {
      
    },
  };
  public lineChartColors: Color[] = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // red
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [pluginAnnotations];

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

  constructor(private fileService: FileServiceService) { }
  
  public fileData;

  public activeListing: Array<any> = [];
  public daysOnMarket: Array<any> = [];
  public medianPrice: Array<any> = [];
  public monthsInventory: Array<any> = [];
  public totalDollarVolume: Array<any> = [];
  public totalPropertySales: Array<any> = [];
  public yearMonth: Array<any> = [];

  public chartReady = false;

  public medianPriceChartData: ChartDataSets[];
  public totalPropertySalesChartData: ChartDataSets[];
  public activeListingChartData: ChartDataSets[];
  public totalDollorVolumeChartData: ChartDataSets[];
  public monthsInventoryChartData: ChartDataSets[];
  public lineChartLabels: Label[];

  ngOnInit() {
    this.fileService.getHousingFileData().subscribe(
      data => {
        console.log('data: ', data);
        this.fileData = data;
        this.processData();
      }
    )
  }

  processData() {

    this.fileData.forEach(element => {
      this.activeListing.push(element['Active Listings']);
      this.daysOnMarket.push(element['Days on market']);
      this.medianPrice.push(element['Median price, single-family home']);
      this.monthsInventory.push(element['Months inventory']);
      this.totalDollarVolume.push(element['Total dollar volume']);
      this.totalPropertySales.push(element['Total property sales']);
      this.yearMonth.push(element['year'] + '-' + element['month']);
    });

    this.medianPriceChartData = [
        { data: this.medianPrice, label: 'median price($)' },
    ];
    this.totalPropertySalesChartData = [
      {data: this.totalPropertySales, label: 'total property sales'}
    ]
    this.activeListingChartData = [
      {data: this.activeListing, label: 'active listing'}
    ];
    this.totalDollorVolumeChartData = [
      {data: this.totalDollarVolume, label: 'total dollor volume(Mil$)'}
    ];
    this.monthsInventoryChartData = [
      {data: this.monthsInventory, label: 'months inventory'}
    ];
    this.lineChartLabels = this.yearMonth;
    this.chartReady = true;
  }

}
