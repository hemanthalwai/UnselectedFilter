import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { UnselectedOptionDirective } from './directives/unselected-option.directive';
import { RowOptionDirective } from './directives/row-option.directive';

@NgModule({
  declarations: [
    AppComponent,
    UnselectedOptionDirective,
    RowOptionDirective
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
