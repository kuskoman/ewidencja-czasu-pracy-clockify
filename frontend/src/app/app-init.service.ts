import { Injectable } from '@angular/core';
import { from, lastValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';

declare var window: any;

@Injectable()
export class AppInitService {
  public async init() {
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
            const mergedConfig = Object.assign({}, defaultConfig, config);
            window.config = mergedConfig;
            return;
          })
        );
      })
    );

    return await lastValueFrom(mergedConfig$);
  }
}
