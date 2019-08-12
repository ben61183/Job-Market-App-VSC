import { Component, OnInit } from '@angular/core';
import { Skill } from '../skill';
import { VacancyService } from '../vacancy.service';
import { Vacancy } from '../vacancy';
import { SkillService } from '../skill.service';
import { FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn } from '@angular/forms';
import { of } from 'rxjs';
import { RoleService } from '../role.service';
import { Role } from '../role';
import { VacancyComponent } from '../vacancy/vacancy.component';
import * as moment from 'moment'
import { CompanyComponent } from '../company/company.component';
import { Company } from '../company';
import { CompanyService } from '../company.service';
import { CompanyIdService } from '../company-id.service';
import { UserIdService } from '../user-id.service';


@Component({
  selector: 'app-new-listing',
  templateUrl: './new-listing.component.html',
  styleUrls: ['./new-listing.component.css']  ,
  providers: [UserIdService,CompanyIdService]

})
export class NewListingComponent implements OnInit {

  newVacancyId: number
  newTitle: string
  newCompany: Company
  newDescription:string;
  newJobType:boolean;
  newLink:string;
  newLocation:string;
  newPostTime:string;
  newSalary:number;
  newUploadYear: number;
  newVacancySkills: Skill[];
  newRole: Role

  selectedRoleId:number
  roles: Role[]
  skills: Skill[] = [];
  allVacancies:Vacancy[]=[]

  myCompanyId:number

  // used for validation
  valid:boolean
  validError:string

  
  constructor(private vacSvc: VacancyService, private skiSvc:SkillService, private rolSvc:RoleService,
    private comSvc:CompanyService, private cidSer:CompanyIdService) {  

    this.newVacancyId=0
    this.newTitle=""
    this.newDescription=""
    this.newJobType=null
    this.newLink=""
    this.newLocation=""
    this.newPostTime="00:00AM"
    this.newSalary=null
    this.newUploadYear=0
    this.newCompany={
      companyId:251,
      companyName:"default",
      hqLocation:"default",
      linkedIn:"linkedin.com",
    }
    this.newVacancySkills=[]

    this.newRole={
      roleId : 0,
      category : "category",
      roleName : "role",
      rankNow : 0,
      sumSalaryNow: 0,
      medSalaryNow : 0,
      numVacanciesNow : 0,
      rankPrev : 0,
      sumSalaryPrev : 0,
      medSalaryPrev : 0,
      numVacanciesPrev : 0,
      vacCount: 0,
      medChange: 0,
      rankChange: 0,
      vacancies : []    
    }

    this.selectedRoleId=0


    this.skills=[]
    this.roles=[]

    this.valid=true
    this.validError=""

    }

     
    ngOnInit() {
    this.loadAllSkills()
    this.loadAllRoles()
    this.cidSer.currentCompanyId.subscribe(myCompanyId => this.myCompanyId = myCompanyId)
  }

  loadAllSkills(){
    this.skiSvc.loadAllSkillsFromServer().subscribe(
      response => {
        this.skills = response
      }
    )
  }

  loadAllRoles(){
    this.rolSvc.loadAllRolesFromService().subscribe(
    response => {
      this.roles = response
    })
  }

  createNewVacancy(){
    console.log(this.newJobType)
    this.dateAndTime()
    // reset validity
    this.valid=true
    this.validError=""

    this.validationChecks()
    if(this.valid){
    this.vacSvc.updateVacancyOnServer({thisCompany:this.newCompany, vacancyId:this.newVacancyId,title:this.newTitle,description:this.newDescription,job_type:this.newJobType,link:this.newLink,location:this.newLocation,postTime:this.newPostTime,salary:this.newSalary,uploadYear:this.newUploadYear,skills:this.newVacancySkills,role:this.newRole}).subscribe(
      response=>{
            console.log(this.newVacancySkills)
            console.log(response)
            this.newVacancyId = response.vacancyId
            this.newTitle = response.title
            this.newLink = response.link
            this.newDescription = response.description
            this.newLocation = response.location
            this.newUploadYear = response.uploadYear
            this.newJobType = response.job_type
            this.newPostTime = response.postTime
            this.newSalary = response.salary

            this.comSvc.addVacancyToCompanyOnService(this.newCompany.companyId,this.newVacancyId).subscribe(
              responseComp=>{
                this.newCompany=responseComp
                console.log(responseComp)
              }
            )

            this.vacSvc.updateVacancyRoleOnServer(this.newVacancyId,this.selectedRoleId).subscribe( 
              responseVac =>{
              this.newRole = responseVac.thisRole
              console.log("response role:"+responseVac.thisRole.roleName)
              console.log("this.newrole"+this.newRole.roleName)
          })
            
            for(let skill of this.newVacancySkills)
              this.vacSvc.updateVacancySkillsOnServer(this.newVacancyId,skill.skillId).subscribe(
                responseSkill =>{
                  console.log(skill)
                }
            )
            
      }
    )
      window.location.reload(); // comment out to view console
    }
  }

  // check validity of fields
  validationChecks(){
    if(this.newSalary != Number(this.newSalary) || this.newSalary == null || this.newSalary == 0){
      this.valid = false
      this.validError+="Invalid Salary. Numbers only"
    }
    if(this.newDescription == "" || this.newDescription == null){
      this.valid = false
      this.validError+=" Invalid/Empty Description."
    }
    if(this.newLocation == "" || this.newLocation == null){
      this.valid = false
      this.validError+=" Invalid/Empty Location."
    }
    if(this.newTitle == "" || this.newTitle == null){
      this.valid = false
      this.validError+=" Invalid/Empty Job Title."
    }
    if(this.selectedRoleId == 0 || this.selectedRoleId == null){
      this.valid = false
      this.validError+=" Choose a Role."
    }
    if(this.newJobType == null){
      this.valid = false
      this.validError+=" Choose Contract/Permanent."
    }
  }

  
  addToSkills(skill){
    this.newVacancySkills.push(skill)
    console.log(this.newVacancySkills)
  }

  updateRole(roleId){
    this.selectedRoleId = roleId
  }

  setJobType(result){
    if(result){
      this.newJobType=true
    }
    else if(!result){
      this.newJobType=false
    }
    else{
      this.newJobType=true
    }
    console.log(this.newJobType)
  }

  dateAndTime(){
    this.newUploadYear = Number(moment(new Date()).format('YYYY'))
    this.newPostTime = new Date().getHours()+":"+new Date().getMinutes()
  }
}
