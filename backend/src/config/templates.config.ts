import { ConfigType, registerAs } from '@nestjs/config';
import { join } from 'path';

export const TEMPLATES_CONFIG_KEY = 'TEMPLATES_CONFIG';

export const templatesConfig = registerAs(TEMPLATES_CONFIG_KEY, () => ({
  templatesPath:
    process.env.TEMPLATES_LOCATION || join(__dirname, '..', '..', 'templates'),
  templatesLimit: 100,
}));

export type TemplatesConfig = ConfigType<typeof templatesConfig>;
