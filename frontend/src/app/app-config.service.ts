import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AppConfigurationService {
  private config: any = null;

  constructor() {}

  private async load() {
    const configPromises = [
      'assets/app-config.default.json',
      'assets/app-config.json',
    ].map(async (cfgPath) => {
      const configResponse = await fetch(cfgPath);
      return await configResponse.json();
    });

    const configs = await Promise.all(configPromises);
    this.config = configs.reduce((acc, cfg) => ({ ...acc, ...cfg }), {});
  }

  public async get(key: string) {
    if (!this.config) {
      await this.load();
    }

    return this.config[key];
  }
}
