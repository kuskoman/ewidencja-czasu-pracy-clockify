import { ConfigType, registerAs } from '@nestjs/config';

export const CSV_CONFIG_KEY = 'CSV_CONFIG';

export const csvConfig = registerAs(CSV_CONFIG_KEY, () => ({
  delimeter: ',',
}));

export type CsvConfig = ConfigType<typeof csvConfig>;
