import { ElementRef, Injectable } from '@angular/core';
import { THROW_IF_NOT_FOUND } from '@angular/core/src/di/injector';

@Injectable({
    providedIn: 'root'
})
export class OptionFilterService {
    public count = 0;
    private dictionary = {};
    private defaultValueDictionary = {};
    private rootElement: any = null;
    private readonly HIDE_CLASS_NAME = 'display-none';
    private readonly DEFAULT_KEY = 'default';

    constructor() { }

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
            key = this.DEFAULT_KEY;
        }
        if (value != null) {
            const parsedValue = this.getParsedValue(value);
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
        for (const selectElement of selectElements) {

            const optionElements = this.getOptions(selectElement);
            for (const optionElement of optionElements) {

                if (optionElement.value === selectElement.value) {
                    continue;
                } else if (optionElement.value === this.defaultValueDictionary[key]) {
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

    getSelectElements(key: string) {
        if (key === this.DEFAULT_KEY) {
            return this.rootElement.querySelectorAll(`[unselectedOptions]`);
        }
        return this.rootElement.querySelectorAll(`[unselectedOptions='${key}']`);
    }

    registerRootElement(element: ElementRef) {
        this.rootElement = element.nativeElement;
    }

    private deallocate(key: string) {
        delete this.dictionary[key];
        delete this.defaultValueDictionary[key];
    }
    log(from: string) {
        console.log(from + 'Service instance', ++this.count);
    }
}
