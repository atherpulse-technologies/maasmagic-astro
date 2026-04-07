// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

const repo = process.env.GITHUB_REPOSITORY?.split('/')[1];
const isGithubPagesBuild = process.env.GITHUB_ACTIONS === 'true' && Boolean(repo);
const site = process.env.SITE ?? (isGithubPagesBuild ? `https://${process.env.GITHUB_REPOSITORY_OWNER}.github.io/${repo}` : undefined);
const base = process.env.BASE_PATH ?? (isGithubPagesBuild ? `/${repo}` : undefined);

// https://astro.build/config
export default defineConfig({
  site,
  base,
  vite: {
    plugins: [tailwindcss()]
  }
});