import { Skill } from './skill';

export interface Vacancy {
    vacancyId:number;
    company:string;
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