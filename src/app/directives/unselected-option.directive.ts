import { AfterContentInit, AfterViewInit, Host, Input, OnDestroy, OnInit, Optional } from '@angular/core';
import { Directive, ElementRef , HostListener} from '@angular/core';
import { OptionFilterService } from '../services/option-filter.service';
import { RowOptionDirective } from './row-option.directive';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[unselectedOptions]'
})
export class UnselectedOptionDirective implements OnInit, OnDestroy, AfterViewInit {

  @Input('unselectedOptions') id: string;

  private prevValue: string;

  constructor(private element: ElementRef,
              private filterService: OptionFilterService
              ) {
  }

  private getValue(): any {
    return this.element.nativeElement.value;
  }
  // https://stackblitz.com/edit/angular-sbpcef?file=app%2Fapp.component.html

// https://github.com/angular/angular/blob/51610849171c8b02aa63a9cde163dd40f0585854/packages/common/src/directives/ng_switch.ts#L126
  @HostListener('change', ['$event']) onChange(event)  {
    this.filterService.setCleanValue(this.id, this.element.nativeElement.value, this.prevValue);
    this.prevValue = event.target.value;
    this.filterService.calculate(this.id);
  }

  ngOnInit(): void {
    const defaultValue = this.getValue();
    this.filterService.register(this.id, defaultValue);
  }

  ngAfterViewInit(): void {
    this.prevValue = this.getValue();
    this.filterService.setValue(this.id, this.prevValue);
    this.filterService.calculate(this.id);
  }

  ngOnDestroy(): void {
    this.filterService.unregister(this.id, this.getValue());
    this.filterService.calculate(this.id);
  }
}
