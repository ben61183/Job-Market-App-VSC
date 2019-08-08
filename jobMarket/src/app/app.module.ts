import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VacancyComponent } from './vacancy/vacancy.component';
import { UserComponent } from './user/user.component';
import { RegisterComponent } from './register/register.component';
import { RoleComponent } from './role/role.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RoleDashboardComponent } from './role-dashboard/role-dashboard.component';
import { ChartComponent } from './chart/chart.component';
import { ChartsModule } from 'ng2-charts';
import { RoleAdminComponent } from './role-admin/role-admin.component';
import { ReactiveFormsModule } from '@angular/forms';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { NewListingComponent } from './new-listing/new-listing.component';
import { RoleDashboardDataTableComponent } from './role-dashboard-data-table/role-dashboard-data-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { VacancyDashboardComponent } from './vacancy-dashboard/vacancy-dashboard.component';
import { MatDialogModule, MatInputModule } from '@angular/material';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';


import { VacancyDetailsComponent } from './vacancy-details/vacancy-details.component';
import { WelcomeComponent } from './welcome/welcome.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    RegisterComponent,
    VacancyComponent,
    RoleComponent,
    RoleDashboardComponent,
    ChartComponent,
    RoleAdminComponent,
    NavBarComponent,
    NewListingComponent,
    RoleDashboardDataTableComponent,
    VacancyDashboardComponent,
    VacancyDetailsComponent,
    WelcomeComponent
  ],
  entryComponents: [NewListingComponent],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ChartsModule,
    Ng2SearchPipeModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,

    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
