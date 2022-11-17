import { Inject, Injectable } from '@nestjs/common';
import * as moment from 'moment';
import { TemplatesConfig, templatesConfig } from '../config/templates.config';

@Injectable()
export class TemplatesService {
  private readonly defaultTemplateFunctions = { moment };
}
