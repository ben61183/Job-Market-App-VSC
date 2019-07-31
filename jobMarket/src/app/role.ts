export interface Role {
    // tabulated
  roleId: number
  category: String
  roleName: String

  // calculated
  // values for now (past six months)
  rankNow: number
  medSalaryNow: number
  numVacanciesNow: number
  // values for last (previous six months)
  rankPrev: number
  medSalaryPrev: number
  numVacanciesPrev: number

  

  
}
