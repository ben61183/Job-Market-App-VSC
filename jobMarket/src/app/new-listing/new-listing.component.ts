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


@Component({
  selector: 'app-new-listing',
  templateUrl: './new-listing.component.html',
  styleUrls: ['./new-listing.component.css']
})
export class NewListingComponent implements OnInit {

  newVacancyId: number
  newTitle: string
  newCompany: string
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


  constructor(private vacSvc: VacancyService, private skiSvc:SkillService, private rolSvc:RoleService) {  

    this.newVacancyId=0
    this.newTitle=""
    this.newCompany=""
    this.newDescription=""
    this.newJobType=false
    this.newLink=""
    this.newLocation=""
    this.newPostTime=""
    this.newSalary=0
    this.newUploadYear=0

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

    this.newVacancySkills=[]

    this.skills=[]
    this.roles=[]

    }

     
    ngOnInit() {
    this.loadAllSkills()
    this.loadAllRoles()
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
    this.vacSvc.updateVacancyOnServer({vacancyId:this.newVacancyId,title:this.newTitle,company:this.newCompany,description:this.newDescription,job_type:this.newJobType,link:this.newLink,location:this.newLocation,postTime:this.newPostTime,salary:this.newSalary,uploadYear:this.newUploadYear,skills:this.newVacancySkills,role:this.newRole}).subscribe(
      response=>{
            console.log(this.newVacancySkills)
            console.log(response)
            this.newVacancyId = response.vacancyId
            this.newTitle = response.title
            this.newCompany = response.company
            this.newLink = response.link
            this.newDescription = response.description
            this.newLocation = response.location
            this.newUploadYear = response.uploadYear
            this.newJobType = response.job_type
            this.newPostTime = response.postTime

            
            this.vacSvc.updateVacancyRoleOnServer(this.newVacancyId,this.selectedRoleId).subscribe( 
                responseRole =>{
                this.newRole = responseRole.thisRole
            })
              
            for(let skill of this.newVacancySkills)
              this.vacSvc.updateVacancySkillsOnServer(this.newVacancyId,skill.skillId).subscribe(
                responseSkill =>{
                  // this.newVacancySkills = responseSkill.vacancySkills
                  console.log(skill)
                }
            )
            
      }
    )
    window.location.reload(); // comment out to view console
  }

  
  addToSkills(skill){
    this.newVacancySkills.push(skill)
    console.log(this.newVacancySkills)
  }

  updateRole(roleId){
    this.selectedRoleId = roleId
  }
}