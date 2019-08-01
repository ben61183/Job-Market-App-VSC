import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  
  public lineChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public lineChartLabels = ['2006', '2007', '2008', '2009', '2010', '2011']
  public lineChartType = "line"
  public lineChartLegend = true
  
  public lineChartData = [
    {data: [100, 59, 80, 81, 56, 55, 40], label: 'Series A'},
    {data: [34, 53, 67, 19, 27, 90, 28], label: 'Series B'}
  ]
  

  constructor() { }

  

  ngOnInit() {
  }

}
