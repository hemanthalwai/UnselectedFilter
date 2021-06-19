import { AfterContentInit, AfterViewChecked, AfterViewInit, Host, Input, OnDestroy, OnInit, Optional } from '@angular/core';
import { Directive, ElementRef , HostListener} from '@angular/core';
import { NgModel } from '@angular/forms';
import { OptionFilterService } from '../services/option-filter.service';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[unselectedOptions]',
  providers: [NgModel]
})
export class UnselectedOptionDirective implements OnInit, OnDestroy, AfterViewInit {

  @Input('unselectedOptions') id: string;

  private prevValue: string;
  private readonly DEFAULT_KEY = 'default';

  constructor(private element: ElementRef,
              private ngModel: NgModel,
              private filterService: OptionFilterService
              ) {
  }

  private getValue(): any {
    return this.element.nativeElement.value || this.ngModel.model;
  }

  private getNativeValue(): any {
    return this.element.nativeElement.value;
  }
  // https://stackblitz.com/edit/angular-sbpcef?file=app%2Fapp.component.html

// https://github.com/angular/angular/blob/51610849171c8b02aa63a9cde163dd40f0585854/packages/common/src/directives/ng_switch.ts#L126
  @HostListener('change', ['$event']) onChange(event)  {
    this.filterService.setCleanValue(this.id, this.element.nativeElement.value, this.prevValue);
    this.prevValue = event.target.value;
    this.filterService.calculate(this.id);
  }


  private getDefaultValue(): string {
    let temp = this.getValue();
    if (!temp && this.element.nativeElement.options.length) {
      temp = this.element.nativeElement.options[0].value;
      this.ngModel.model = temp;
    }
    return temp;
  }

  ngOnInit(): void {
    const defaultValue = this.getValue();
    this.id = this.id || this.DEFAULT_KEY;
    this.filterService.register(this.id, defaultValue);
  }

  ngAfterViewInit(): void {
    this.prevValue = this.getValue();
    if (!this.getNativeValue()) {
      this.element.nativeElement.value = this.prevValue;
    }
    this.filterService.setValue(this.id, this.prevValue);
    this.filterService.calculate(this.id);
  }

  ngOnDestroy(): void {
    this.filterService.unregister(this.id, this.getValue());
    this.filterService.calculate(this.id);
  }
}
