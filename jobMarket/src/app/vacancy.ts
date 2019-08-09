import { Skill } from './skill' 
import { Company } from './company';

export interface Vacancy {
    vacancyId:number;
    thisCompany:Company;
    description:string;
    job_type:boolean;
    link:string;
    location:string;
    postTime:string;
    salary:number;
    title: string;
    uploadYear: number;
    vacancySkills: Skill[];
}