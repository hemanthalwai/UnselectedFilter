import { AfterContentInit, QueryList } from '@angular/core';
import { Directive, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { OptionFilterService } from '../services/option-filter.service';
import { UnselectedOptionDirective } from './unselected-option.directive';


@Directive({
  selector: '[appRowOption]',
  providers: [OptionFilterService]
})
export class RowOptionDirective implements OnInit, AfterContentInit {

  @ViewChildren(UnselectedOptionDirective)filterOptionDirective: QueryList<UnselectedOptionDirective>;


  constructor(private element: ElementRef,
              private filterService: OptionFilterService
              ) {

  }

  ngAfterContentInit(): void {
    if (!this.filterOptionDirective) {
      return;
    }
  }

  ngOnInit(): void {
    this.filterService.registerRootElement(this.element);
  }

}
