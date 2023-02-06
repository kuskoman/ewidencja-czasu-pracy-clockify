import {
  ForbiddenException,
  Inject,
  Injectable,
  Logger,
  OnApplicationBootstrap,
} from '@nestjs/common';
import { readdir, readFile } from 'fs/promises';
import { join, resolve } from 'path';
import {
  templatesConfig,
  TemplatesConfig,
} from '../../config/templates.config';

@Injectable()
export class TemplatesLoaderService implements OnApplicationBootstrap {
  private readonly templatesCache = new Map<string, string>();
  private readonly logger = new Logger(TemplatesLoaderService.name);
  private allowedTemplates = new Set<string>();

  constructor(
    @Inject(templatesConfig.KEY)
    private readonly config: TemplatesConfig,
  ) {}

  public async getTemplate(templateName: string) {
    const templateLocation = this.getTemplatePath(templateName);

    const template = this.templatesCache.get(templateLocation);
    if (template) {
      return template;
    }

    return await this.loadTemplate(templateLocation);
  }

  public async onApplicationBootstrap() {
    await this.lazyInitAllowedTemplates();
  }

  private async loadTemplate(templateLocation: string): Promise<string> {
    await this.lazyInitAllowedTemplates();
    if (!this.allowedTemplates.has(templateLocation)) {
      const logMsg = `Attempted to load template ${templateLocation}, which is not in allowed list`;
      this.logger.error(logMsg);

      throw new ForbiddenException('Could not load template: not allowed');
    }

    const fileContent = await readFile(templateLocation, 'utf-8');
    this.templatesCache.set(templateLocation, fileContent);
    return fileContent;
  }

  private getTemplatePath(template: string) {
    const templateUnresolvedLocation = join(
      this.config.templatesPath,
      template,
    );
    const templateLocation = resolve(templateUnresolvedLocation);

    return templateLocation;
  }

  private async lazyInitAllowedTemplates() {
    const { templatesPath } = this.config;

    await this.addFilesToAllowedTemplates(templatesPath);
  }

  private async addFilesToAllowedTemplates(dir: string) {
    this.logger.verbose(`Looking for templates in ${dir}`);

    const dirents = await readdir(dir, { withFileTypes: true });
    await Promise.all(
      dirents.map((dirent) => {
        const res = resolve(dir, dirent.name);
        if (dirent.isDirectory()) {
          return this.addFilesToAllowedTemplates(res);
        }

        this.logger.debug(`Adding ${res} to allowed templates`);
        this.allowedTemplates.add(res);

        if (this.allowedTemplates.size > this.config.templatesLimit) {
          let errMsg = `Found more templates than allowed by limit (${this.config.templatesLimit}).`;
          errMsg += ` Please remove some templates from ${this.config.templatesPath}`;
          errMsg += ' or increase the limit in config';
          throw new Error(errMsg);
        }
      }),
    );
  }
}
