import { Injectable } from '@angular/core';
import { from, lastValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AppConfigurationService {
  private config$: any = null;

  constructor() {}

  private async load() {
    const defaultConfig$ = from(
      fetch('assets/app-config.default.json').then((response) =>
        response.json()
      )
    );

    const config$ = from(
      fetch('assets/app-config.json').then((response) => response.json())
    );

    const mergedConfig$ = defaultConfig$.pipe(
      map((defaultConfig) => {
        return config$.pipe(
          map((config) => {
            return Object.assign({}, defaultConfig, config);
          })
        );
      })
    );

    this.config$ = await lastValueFrom(mergedConfig$);
  }

  public async get(key: string) {
    if (!this.config$) {
      await this.load();
    }

    return this.config$[key];
  }
}
