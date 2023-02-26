import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AppConfigurationService {
  private config: Record<string, unknown> | null = null;

  private async load(): Promise<Record<string, unknown>> {
    const configPromises = [
      'assets/app-config.default.json',
      'assets/app-config.json',
    ].map(async (cfgPath) => {
      const configResponse = await fetch(cfgPath);
      return await configResponse.json();
    });

    const configs = await Promise.all(configPromises);
    const config = configs.reduce((acc, cfg) => ({ ...acc, ...cfg }), {});
    this.config = config;
    return config;
  }

  public async get(key: string) {
    let config: Record<string, unknown>;
    if (!this.config) {
      config = await this.load();
    } else {
      config = this.config;
    }

    return config[key];
  }
}
