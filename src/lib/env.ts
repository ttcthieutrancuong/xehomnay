export const env = {
  get databaseUrl(): string | undefined {
    return process.env.DATABASE_URL;
  },
};
