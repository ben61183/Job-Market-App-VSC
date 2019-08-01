import { Component, OnInit, Input } from '@angular/core';
import { RoleService } from '../role.service';
import { Role } from '../role';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  role: Role
  oneRoleId: number 

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

  @Input('roleId') roleId: number

  constructor(private rolSvc: RoleService, private route: ActivatedRoute) {

    this.oneRoleId = this.route.snapshot.params.roleId

    
  }

  

  ngOnInit() {
    this.role.roleId = this.oneRoleId
    this.findOneRole(this.oneRoleId)
  }

  findOneRole(roleId){
    this.rolSvc.findRoleByRoleId(roleId).subscribe(
      response =>{
        this.role.roleName = response.roleName
        this.role.category = response.category

        
        // this.role.medSalaryNow = response.medSalaryNow
        // this.role.numVacanciesNow = response.numVacanciesNow
        // this.role.rankNow = response.rankNow
        // this.role.medSalaryPrev = response.medSalaryPrev
        // this.role.numVacanciesPrev = response.numVacanciesPrev
        // this.role.rankPrev = response.rankPrev
      }
    )
  }

}
