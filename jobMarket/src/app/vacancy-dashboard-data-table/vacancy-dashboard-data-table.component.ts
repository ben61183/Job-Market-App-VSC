import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { MatTableDataSource, MatDialog } from '@angular/material';

import { VacancyDashboardDataTableDataSource, VacancyDashboardDataTableItem } from './vacancy-dashboard-data-table-datasource';

import { VacancyService } from '../vacancy.service';
import { Vacancy} from '../vacancy';
import { Router } from '@angular/router';
import { VacancyDetailsComponent } from '../vacancy-details/vacancy-details.component';
import { VacancyIdService } from '../vacancy-id.service';

@Component({
  selector: 'app-vacancy-dashboard-data-table',
  templateUrl: './vacancy-dashboard-data-table.component.html',
  styleUrls: ['./vacancy-dashboard-data-table.component.css']
})

export class VacancyDashboardDataTableComponent implements OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  

  dataSource: MatTableDataSource<Vacancy>;

  displayedColumns = ['title', 'company', 'description', 'location', 'uploadYear', 'salary'];
  allVacancy: Vacancy[]
  vacancy: Vacancy

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(private vacSvc:VacancyService, private router: Router, public dialog: MatDialog,
    private vidSvc:VacancyIdService) {
    this.vacancy={
      vacancyId: 0,
      thisCompany: {companyId:0,linkedIn:"",hqLocation:"",companyName:"", password: "", username: ""},
      description: "description",
      job_type: true,
      link: "link",
      location: "location",
      postTime: "12:55",
      salary: 0,
      title: "title",
      uploadYear: 2019,
      vacancySkills: []
    }
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

    this.vacSvc.loadAllVacanciesFromServer().subscribe(
      response => {
        this.allVacancy = response
        this.dataSource.data = response
        for(let vacancy of this.allVacancy){
          if(vacancy.description.length>100){
            vacancy.description = vacancy.description.slice(0,100)+"..."
          } // a vacancy MUST be owned by a company, otherwise errors
          console.log(vacancy.thisCompany.companyName)
        }
      }
    )
  }

  openVacancy(vacancyId){
    console.log(vacancyId)
    this.vidSvc.changeVacancyId(vacancyId)
    this.dialog.open(VacancyDetailsComponent);

  }
  
}
