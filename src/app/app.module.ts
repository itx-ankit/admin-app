import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { ExternalGuard } from './guards/external.guard';
import { StoreModule } from '@ngrx/store';
import { UserReducer } from './state/user.reducer';
import { InternalGuard } from './guards/internal.guard';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

const routes: Routes = [
  {
    path: '',
    canActivate: [ExternalGuard],
    loadComponent: async () =>
      (await import('./core/components/login/login.component')).LoginComponent,
  },
  {
    path: 'login',
    canActivate: [ExternalGuard],
    loadComponent: async () =>
      (await import('./core/components/login/login.component')).LoginComponent,
  },
  {
    path: 'user-list',
    canActivate: [InternalGuard],
    loadChildren: async () =>
      (await import('./core/components/table/table.module')).TableModule,
  },
  {
    path: '**',
    canActivate: [ExternalGuard],
    loadComponent: async () =>
      (await import('./core/components/error-page/error-page.component'))
        .ErrorPageComponent,
  },
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({ user: UserReducer }),
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent],
})
export class AppModule {}
