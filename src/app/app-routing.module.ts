import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { authGuard } from './gaurd/auth.guard';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: MainLayoutComponent, canActivate: [authGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }



// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';
// import { MainLayoutComponent } from './layout/main-layout/main-layout.component';

// const routes: Routes = [
//   { path: 'login', component: MainLayoutComponent },
//   { path: '', redirectTo: '/login', pathMatch: 'full' },
//   { path: '**', redirectTo: '/login' },
//   {
//     path: '',
//     component: MainLayoutComponent,
//     // canActivate: [AuthGuard],
//     children: [
//       {
//         path: 'dashboard',
//         // loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule),
//         // data: { breadcrumb: 'Dashboard' } — add inside DashboardModule instead
//       },
//       {
//         path: 'merchant',
//         loadChildren: () => import('./modules/merchant-management/merchant.module').then(m => m.MerchantModule),
//       }
//     ]
//   },

//   // { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
//   { path: '', redirectTo: '/login', pathMatch: 'full' },
//   { path: '**', redirectTo: '/login' },
// ];


// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })

// export class AppRoutingModule { }

