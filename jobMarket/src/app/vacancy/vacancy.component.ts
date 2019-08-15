import { Component, OnInit } from '@angular/core';
import { Role } from '../role';
import { VacancyService } from '../vacancy.service';
import { Vacancy } from '../vacancy';
import { Skill } from '../skill';
import { SkillService } from '../skill.service';
import { Company } from '../company';
import { UserIdService } from '../user-id.service';
import { CompanyIdService } from '../company-id.service';


// component no longer used

@Component({
  selector: 'app-vacancy',
  templateUrl: './vacancy.component.html',
  styleUrls: ['./vacancy.component.css']  ,
  providers: [UserIdService,CompanyIdService]

})
export class VacancyComponent implements OnInit {
  
  // variables of vacancy
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
  thisRole: Role;
  // skills associated with a vacancy
  vacancySkills: Skill[];
  // all skills
  skills: Skill[] = [];
  // editable toggle
  isEditable: Boolean;
  // role selected (for admin only)
  selectedRole:number;
 
  allVacancies: Vacancy[];

  
  myUserId:number

  myCompanyId:number


  constructor(private vacSvc: VacancyService, private skiSvc: SkillService,
    private uidSer:UserIdService, private cidSer:CompanyIdService) { 
  
  this.isEditable= false;
 



  this.vacancyId=828;
  this.company={companyName:"",hqLocation:"",linkedIn:"",companyId:0, password: "", username: "", email: ""};
  this.description="default description";
  this.job_type=false;
  this.link="default website";
  this.location="default location";
  this.postTime="default post time";
  this.salary=0;
  this.title="default title";
  this.uploadYear=2015;
  this.vacancySkills = [];

  // empty role object
  this.thisRole={
    roleId:2,
    category:"deafulat catagory",
    roleName:"default role",
    rankNow: 3,
    medSalaryNow: 1400,
    numVacanciesNow: 40,
    rankPrev:4,
    medSalaryPrev:1200,
    numVacanciesPrev:5432,
    vacCount: 0,
    vacancies: [],
    medChange: 15,
    sumSalaryNow: 1000, 
    sumSalaryPrev:700,
    rankChange: 0
   }
  }

  ngOnInit() {
    this.fetchCurrentVacancyFromService()
    this.loadAllVacancies()
    this.loadAllSkills()
    // get my ids from local
    this.myUserId = this.uidSer.getUserId()
    this.myCompanyId = this.cidSer.getCompanyId()

  }

  // fetch the vacancy
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

  // update selected role
  updateSelection(roleId){
    this.selectedRole=roleId;
  }

  // update vacancy details
  updateVacancyDetails(){
    this.vacSvc.updateVacancyOnServer({
      vacancyId:this.vacancyId, description:this.description,job_type:this.job_type,link:this.link,
      location:this.location,postTime:this.postTime,salary:this.salary,
      title:this.title,uploadYear:this.uploadYear,company:this.company
    }).subscribe(      
          response =>{
            this.fetchCurrentVacancyFromService();
        }
        )
  }

  // delete a vacancy
  deleteVacancy(vacancyId){
    console.log("delete:"+vacancyId);
    this.vacSvc.deleteVacancybyVacancyId(vacancyId)
  }

  // load all vacancies
  loadAllVacancies(){
    this.vacSvc.loadAllVacanciesFromServer().subscribe(
      response =>
        {this.allVacancies=response
          for(let vac of this.allVacancies){
            this.loadVacancySkills(vac.vacancyId)
          }
        }
    )
  }

  // toggle editable
  toggleEdits(){
    this.isEditable=!this.isEditable
    this.updateVacancyDetails()
    this.loadAllVacancies()
  }

  // load all skills from db
  loadAllSkills(){
    this.skiSvc.loadAllSkillsFromServer().subscribe(
      response => {
        this.skills = response
      }
    )
  }

  // load skills of vacancy
  loadVacancySkills(vacancyId){
    this.vacSvc.loadVacancySkillsFromServer(vacancyId).subscribe(
      response => {
        this.vacancySkills = response
      }
    )
  }  
}
