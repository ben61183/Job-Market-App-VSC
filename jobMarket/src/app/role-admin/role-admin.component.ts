import { Component, OnInit } from '@angular/core';
import { Role } from '../role';
import { RoleService } from '../role.service';
import { VacancyService } from '../vacancy.service';
import { Vacancy } from '../vacancy';
import { Company } from '../company';

@Component({
  selector: 'app-role-admin',
  templateUrl: './role-admin.component.html',
  styleUrls: ['./role-admin.component.css']
})
export class RoleAdminComponent implements OnInit {
  allRoles: Role[]
  roleID: number
  category: string
  role_name: string
  isEditable: boolean
  vacancyId:number;
  company:Company;
  description:string;
  job_type:boolean;
  link:string;
  location:string;
  postTime:string;
  salary:number;
  title: string;
  uploadYear: number;

  jobTypePerm:0;

  thisRole: Role;

  selectedRole:number;


  allVacancies: Vacancy[];
  selectedLevel;
  isVacancyFormVisible: boolean;
  isUpdateVacancyFormVisible:boolean;
  isVacancyEditable: Boolean;


  constructor(private roleSvc:RoleService, private vacSvc:VacancyService) { 
    this.roleID = 1
    this.category = "Programming Languages"
    this.role_name = "Python"

    this.isVacancyFormVisible=false;

    this.isVacancyEditable=false;

    this.vacancyId=7;
    this.company={companyId:0,linkedIn:"",hqLocation:"",companyName:""};
    this.description="default description";
    this.job_type=false;
    this.link="default website";
    this.location="default location";
    this.postTime="default post time";
    this.salary=0;
    this.title="default title";
    this.uploadYear=2015;
  }

  ngOnInit() {
    this.loadAllRoles() 
    this.showVacancyForm()
  }

  loadAllRoles(){
    this.roleSvc.loadAllRolesFromService().subscribe(
      response => {
        this.allRoles = response
      }
    )
  }

  toggleEdit() {
    this.isEditable = !this.isEditable
    this.updateRoleDetails() 
  }

  updateRoleDetails() {
    this.roleSvc.updateRoleOnServer({
      category: this.category,
      role_name: this.role_name
    }).subscribe(
    )
  }

  selected(){
    this.vacancyId=this.selectedLevel.vacancyId
  }

    loadAllVacancies(){
      this.vacSvc.loadAllVacanciesFromServer().subscribe(
        response =>
          {this.allVacancies=response}
      )
    }

    showVacancyForm(){
      this.isVacancyFormVisible=true
      this.loadAllVacancies()
    }

    showUpdateVacancyForm(){
      this.isUpdateVacancyFormVisible=true
      this.fetchCurrentVacancyFromService()
    }

    fetchCurrentVacancyFromService(){
      this.vacSvc.findVacancybyVacancyId(this.vacancyId).subscribe(
    
        response => {
          this.vacancyId=response.vacancyId
          this.company=response.thisCompany
          this.description=response.description
          this.job_type=response.job_type
          this.link=response.link
          this.location=response.location
          this.postTime=response.postTime
          this.salary=response.salary
          this.title=response.title
          this.uploadYear=response.uploadYear;
  
        }
      )
    }
   
    updateVacancyDetails(){
      this.vacSvc.updateVacancyOnServer({
        vacancyId:this.vacancyId, description:this.description,job_type:this.job_type,link:this.link,
        location:this.location,postTime:this.postTime,salary:this.salary,
        title:this.title,uploadYear:this.uploadYear,company:this.company
      }).subscribe(     
        response => {
          this.vacancyId=response.vacancyId
          this.company=response.thisCompany
          this.description=response.description
          this.job_type=response.job_type
          this.link=response.link
          this.location=response.location
          this.postTime=response.postTime
          this.salary=response.salary
          this.title=response.title
          this.uploadYear=response.uploadYear;
          console.log(response)
        }
          )
    }

    deleteVacancy(){
      this.vacSvc.deleteVacancybyVacancyId(this.vacancyId).subscribe(
      )
      //window.location.reload()
  }


    toggleEdits(){
      this.isVacancyEditable=!this.isVacancyEditable
      console.log(this.isVacancyEditable)
      this.updateVacancyDetails()
      if (this.isVacancyEditable == false){
        // window.location.reload()
        
      }
    }

}
