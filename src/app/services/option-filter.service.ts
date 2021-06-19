import { ElementRef, Injectable } from '@angular/core';
import { THROW_IF_NOT_FOUND } from '@angular/core/src/di/injector';

@Injectable({
    providedIn: 'root'
})
export class OptionFilterService {
    private static readonly DEFAULT_KEY = 'default';

    private dictionary = {};
    private defaultValueDictionary = {};
    private rootElement: HTMLElement = null;
    private readonly HIDE_CLASS_NAME = 'display-none';

    constructor() { }

    /*
        **Internal Private methods**
    */
    private getParsedValue(value: any): string {
        const parsedValue = typeof (value) === 'string' ? value : JSON.stringify(value);
        return parsedValue;
    }

    private showOption(item: any) {
        item.classList.remove(this.HIDE_CLASS_NAME);
    }

    private hideOption(item: any) {
        item.classList.add(this.HIDE_CLASS_NAME);
    }

    private getOptions(selectElement: any) {
        return selectElement.options;
    }

    private hasDefaultValue(key: string) {
        return this.defaultValueDictionary[key] !== undefined;
    }

    private isDefaultValue(key: string, parsedValue: string) {
        return this.defaultValueDictionary[key] === parsedValue;
    }

    private getDefaultValue(key: string): string {
        const selectElements = this.getSelectElements(key);
        if (selectElements.length && this.getOptions(selectElements[0]).length) {
            const defaultOption = this.getOptions(selectElements[0])[0];
            return this.getParsedValue(defaultOption.value);
        }
        return null;
    }

    private deallocate(key: string) {
        delete this.dictionary[key];
        delete this.defaultValueDictionary[key];
    }

    setCleanValue(key: string, newValue: any, oldValue: any) {
        oldValue = this.getParsedValue(oldValue);
        this.removeValue(key, oldValue);
        newValue = this.getParsedValue(newValue);
        this.setValue(key, newValue);
    }

    setDefaultValue(key: string, parsedValue: string) {
        this.defaultValueDictionary[key] = parsedValue;
    }

    removeDefaultValue(key: string, parsedValue: string) {
        if (this.defaultValueDictionary[key]) {
            delete this.defaultValueDictionary[key];
        }
    }

    setValue(key: string, parsedValue: string) {
        if (this.dictionary[key] == null) {
            this.dictionary[key] = [];
        }
        this.dictionary[key].push(parsedValue);
    }

    removeValue(key: string, parsedValue: string) {
        if (this.dictionary[key]) {
            const index = this.dictionary[key].indexOf(parsedValue);
            if (index > -1) {
                this.dictionary[key].splice(index, 1);
            }
        }
    }

    register(key: string, value: any = null) {
        if (!key) {
            key = OptionFilterService.DEFAULT_KEY;
        }
        if (!this.hasDefaultValue(key)) {
            const parsedValue = this.getDefaultValue(key);
            this.setDefaultValue(key, parsedValue);
        }
    }

    unregister(key: string, value: any = null) {
        if (!this.dictionary[key]) {
            return;
        }
        if (value != null) {
            const parsedValue = this.getParsedValue(value);
            const index = this.dictionary[key].indexOf(parsedValue);
            this.dictionary[key].splice(index, 1);
        } else {
            this.deallocate(key);
        }
    }

    calculate(key: string) {
        const values = this.dictionary[key];
        if (values == null || (Array.isArray(values) && !values.length)) {
            return;
        }
        const selectElements = this.getSelectElements(key);
        if (selectElements == null || selectElements.length <= 1) {
            return;
        }

        for (const selectElement of selectElements as any) {

            const optionElements = this.getOptions(selectElement);
            for (const optionElement of optionElements) {

                if (optionElement.value === selectElement.value) {
                    continue;
                } else if (this.isDefaultValue(key, optionElement.value)) {
                    continue;
                }
                if (values.indexOf(optionElement.value) !== -1) {
                    this.hideOption(optionElement);
                } else {
                    this.showOption(optionElement);
                }
            }
        }
    }


    getSelectElements(key: string): HTMLElement[] {
        if (key === OptionFilterService.DEFAULT_KEY) {
            return Array.from(this.rootElement.querySelectorAll(`[unselectedOptions]`));
        }
        return Array.from(this.rootElement.querySelectorAll(`[unselectedOptions='${key}']`));
    }

    registerRootElement(element: ElementRef) {
        this.rootElement = element.nativeElement as HTMLElement;
    }

}
