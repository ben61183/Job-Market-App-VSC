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

  //line chart options
  public lineChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  //line chart labels
  public lineChartLabels = []
  public lineChartType = "line"
  public lineChartLegend = true
  
  //lince chart data
  public lineChartData = []

  @Input('roleId') roleId: number

  constructor(private rolSvc: RoleService, private route: ActivatedRoute) {

    this.oneRoleId = this.route.snapshot.params.roleId

    
  }

  //upload role on upload of page
  ngOnInit() {
    this.role.roleId = this.oneRoleId
    this.findOneRole(this.oneRoleId)
  }

  //find role from form
  findOneRole(roleId){
    this.rolSvc.findRoleByRoleId(roleId).subscribe(
      response =>{
        this.role.roleName = response.roleName
        this.role.category = response.category

      }
    )
  }

}
