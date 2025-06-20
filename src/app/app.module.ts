import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { AuthInterceptor } from './auth.interceptor';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzAnchorModule } from 'ng-zorro-antd/anchor';
import { LoginComponent } from './pages/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { EyeOutline, EyeInvisibleOutline } from '@ant-design/icons-angular/icons';
import { MerchantModule } from './modules/merchant-management/merchant.module';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en'
import { en_US, NZ_I18N } from 'ng-zorro-antd/i18n';

registerLocaleData(en);
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgotPasswordComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    NzLayoutModule,
    NzMenuModule,
    NzDropDownModule,
    NzIconModule,
    NzIconModule.forRoot([EyeOutline, EyeInvisibleOutline]),
    BrowserAnimationsModule,
    NzBreadCrumbModule,
    NzAvatarModule,
    NzAnchorModule,
    ReactiveFormsModule,
    NzInputModule,
    NzButtonModule,
    MerchantModule,
    RouterModule.forRoot([]),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    { provide: NZ_I18N, useValue: en_US },
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
