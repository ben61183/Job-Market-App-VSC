import { Vacancy } from './vacancy';

export interface Role {
    // tabulated
  roleId: number
  category: String
  roleName: String

  // calculated
  vacCount: number
  vacancies: Vacancy[]
  medChange: number
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

<<<<<<< HEAD
  

  
=======

>>>>>>> f988d19f3144a9606f10c0b833541a3631253924
}
