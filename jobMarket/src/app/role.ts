import { Vacancy } from './vacancy';

export interface Role {
    // tabulated
  roleId: number
  category: String
  roleName: String

  // calculated
  vacCount: number
  // values for now (this year)
  rankNow: number // rank according to num this year
  sumSalaryNow: number // sum salaries this year
  medSalaryNow: number // med salary this year
  numVacanciesNow: number // num salaries this year
  
  // values for last (previous year)
  rankPrev: number
  sumSalaryPrev: number
  medSalaryPrev: number
  numVacanciesPrev: number
  vacancies: Vacancy[]
}
