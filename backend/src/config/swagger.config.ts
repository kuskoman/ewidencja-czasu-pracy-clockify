import { ConfigType, registerAs } from '@nestjs/config';

export const SWAGGER_CONFIG_KEY = 'SWAGGER_CONFIG';

export const swaggerConfig = registerAs(SWAGGER_CONFIG_KEY, () => ({
  path: 'api',
}));

export type SwaggerConfig = ConfigType<typeof swaggerConfig>;
