import { Vacancy } from './vacancy';

// role interface
export interface Role {
  // db variables
  roleId: number
  category: String
  roleName: String

  // calculated variables
  vacCount: number
  vacancies: Vacancy[]
  medChange: number
  rankChange:number
  
  // values for now (this year)
  rankNow: number // rank according to num this year
  sumSalaryNow: number // sum salaries this year
  medSalaryNow: number // med salary this year
  numVacanciesNow: number // num salaries this year
  
  // values for previous (previous year)
  rankPrev: number
  sumSalaryPrev: number
  medSalaryPrev: number
  numVacanciesPrev: number

}
