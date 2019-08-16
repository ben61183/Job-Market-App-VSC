import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoleDashboardComponent } from './role-dashboard/role-dashboard.component';
import { RoleComponent } from './role/role.component';
import { VacancyComponent } from './vacancy/vacancy.component';
import { RoleAdminComponent} from './role-admin/role-admin.component'
import { NewListingComponent } from './new-listing/new-listing.component';
import { VacancyDetailsComponent } from './vacancy-details/vacancy-details.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { VacancyDashboardComponent } from './vacancy-dashboard/vacancy-dashboard.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';
import { CompanyComponent } from './company/company.component';
import { UserloginComponent } from './userlogin/userlogin.component';
import { UserDatatableComponent } from './user-datatable/user-datatable.component';
import { CompanyDashComponent } from './company-dash/company-dash.component';

const routes: Routes = [
  {path: "role-dashboard", component: RoleDashboardComponent},
  {path: "role/:roleId", component: RoleComponent},
  {path: "vacancy-dashboard", component: VacancyDashboardComponent},
  {path: "role-admin", component: RoleAdminComponent},
  {path: "new-listing",component: NewListingComponent},
  {path: "vacancy/:vacancyId", component: VacancyDetailsComponent},
  {path: "", component: WelcomeComponent},
  {path: "register", component: RegisterComponent},
  {path: "user/:userId", component: UserComponent},
  {path: "vacancy/:vacancyId", component: VacancyComponent},
  {path: "company/:companyId",component:CompanyComponent},
  {path: "user-login", component:UserloginComponent},
  {path: "viewUsers", component:UserDatatableComponent},
  {path: "company-dashboard",component:CompanyDashComponent}
  ];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

