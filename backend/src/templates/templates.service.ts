import { Injectable } from '@nestjs/common';
import * as moment from 'moment';
import { TemplatesLoaderService } from './templates-loader/templates-loader.service';
import { render } from 'ejs';

@Injectable()
export class TemplatesService {
  private readonly defaultTemplateFunctions = Object.freeze({ moment });

  constructor(private readonly templatesLoader: TemplatesLoaderService) {}

  public async renderTemplate(
    template: string,
    variables: Record<string, unknown>,
  ): Promise<string> {
    const ejsTemplate = await this.templatesLoader.getTemplate(template);
    const mergedVariables = { ...variables, ...this.defaultTemplateFunctions };

    return render(ejsTemplate, mergedVariables);
  }
}
