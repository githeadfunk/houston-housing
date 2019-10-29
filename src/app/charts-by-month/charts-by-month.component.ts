import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import { FileServiceService } from '../services/file-service.service';

@Component({
  selector: 'app-charts-by-month',
  templateUrl: './charts-by-month.component.html',
  styleUrls: ['./charts-by-month.component.css']
})
export class ChartsByMonthComponent implements OnInit {

  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    hover: { onHover: function(event, active) { } },
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
  public filterOptions = [];

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
  
  public yearSelected = -1;

  ngOnInit() {
    this.fileService.getHousingFileData().subscribe(
      data => {
        this.fileData = data;
        this.processData();
      }
    )
    this.initFilterOptions();
  }

  processData() {

    this.activeListing = [];
    this.daysOnMarket = [];
    this.medianPrice = [];
    this.monthsInventory = [];
    this.totalDollarVolume = [];
    this.totalPropertySales = [];
    this.yearMonth = [];

    if(this.yearSelected > 0) {
      var year = this.yearSelected;
      var yearData = this.fileData.filter(function(data) {
        if(data['year'] == year)
        return data;
      });
      yearData.forEach(element => {
        this.activeListing.push(element['Active Listings']);
        this.daysOnMarket.push(element['Days on market']);
        this.medianPrice.push(element['Median price, single-family home']);
        this.monthsInventory.push(element['Months inventory']);
        this.totalDollarVolume.push(element['Total dollar volume']);
        this.totalPropertySales.push(element['Total property sales']);
        this.yearMonth.push(element['year'] + '-' + element['month']);
      });
    }
    else {
      for(var i = 1; i <=12; i++) {
        var monthData = this.fileData.filter(function(data) {
          return data['month'] == i;
        });
        var activeListing = 0;
        var activeListingCount = 0;
        var medianPrice = 0;
        var medianPriceCount = 0;
        var monthsInventory = 0;
        var monthsInventoryCount = 0;
        var totalDollarVolume = 0;
        var totalDollarVolumeCount = 0;
        var totalPropertySales = 0;
        var totalPropertySalesCount = 0;
        // var yearMonth;
        monthData.forEach(element => {
          if(element['Active Listings']) {
            activeListing += element['Active Listings']
            activeListingCount += 1;
          }
          if(element['Median price, single-family home']) {
            medianPrice += element['Median price, single-family home']
            medianPriceCount += 1;
          }
          if(element['Months inventory']) {
            monthsInventory += element['Months inventory']
            monthsInventoryCount += 1;
          }
          if(element['Total dollar volume']) {
            totalDollarVolume += element['Total dollar volume']
            totalDollarVolumeCount += 1;
          }
          if(element['Total property sales']) {
            totalPropertySales += element['Total property sales']
            totalPropertySalesCount += 1;
          }
        });

        this.activeListing.push(activeListing / activeListingCount);
        this.medianPrice.push(medianPrice/ medianPriceCount);
        this.monthsInventory.push(monthsInventory / monthsInventoryCount);
        this.totalDollarVolume.push(totalDollarVolume/ totalDollarVolumeCount);
        this.totalPropertySales.push(totalPropertySales / totalPropertySalesCount);
        this.yearMonth.push(i);

      }
    }

    this.medianPriceChartData = [
        { data: this.medianPrice, label: 'median price' },
    ];
    this.totalPropertySalesChartData = [
      {data: this.totalPropertySales, label: 'total property sales'}
    ]
    this.activeListingChartData = [
      {data: this.activeListing, label: 'active listing'}
    ];
    this.totalDollorVolumeChartData = [
      {data: this.totalDollarVolume, label: 'total dollor volume'}
    ];
    this.monthsInventoryChartData = [
      {data: this.monthsInventory, label: 'months inventory'}
    ];
    this.lineChartLabels = this.yearMonth;
    this.chartReady = true;
  }

  initFilterOptions() {
    this.filterOptions.push({label: 'All', value: -1});
    for(var i = 2000; i < 2020; i++) {
      this.filterOptions.push({label:i + '', value: i});
    }
  }

}

