// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

const repo = process.env.GITHUB_REPOSITORY?.split('/')[1];
const isGithubPagesBuild = process.env.GITHUB_ACTIONS === 'true' && Boolean(repo);
const isCloudflarePagesBuild = process.env.CF_PAGES === '1';
const cloudflareSite = process.env.CF_PAGES_URL
  ? (process.env.CF_PAGES_URL.startsWith('http') ? process.env.CF_PAGES_URL : `https://${process.env.CF_PAGES_URL}`)
  : undefined;
const site = process.env.SITE
  ?? (isCloudflarePagesBuild ? cloudflareSite : undefined)
  ?? (isGithubPagesBuild ? `https://${process.env.GITHUB_REPOSITORY_OWNER}.github.io/${repo}` : undefined);
const rawBase = process.env.BASE_PATH ?? (isGithubPagesBuild ? `/${repo}` : undefined);
// Ensure BASE_URL always has a trailing slash so asset paths like `${BASE_URL}image.jpg` work
const base = rawBase ? (rawBase.endsWith('/') ? rawBase : `${rawBase}/`) : undefined;

// https://astro.build/config
export default defineConfig({
  site,
  base,
  trailingSlash: 'always',
  vite: {
    plugins: [tailwindcss()]
  }
});