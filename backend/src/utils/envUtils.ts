export const requireEnv = (name: string) => {
  const val = process.env[name];
  if (!val) {
    throw new Error(`Could not find environment value ${name}`);
  }

  return val;
};
