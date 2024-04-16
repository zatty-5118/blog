import { defineConfig } from 'astro/config';
import react from "@astrojs/react";
import { astroImageTools } from "astro-imagetools";
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(), 
    mdx(),
    astroImageTools
  ],
  image: {
    domains: ['https://']
  },
  site: 'https://zatty-5118.github.io/',
  base: 'blog',
  cacheDir: './node_modules/.cache/',
  outDir: './dist',
  build: {
    assets: 'assets'
  },
  prefetch: {
    defaultStrategy: 'viewport',
    prefetchAll: true
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "src/styles/global/mixin/mixin.scss";`
        }
      }
    },
    build: {
      emptyOutDir: true,
      cssCodeSplit: true
    }
  },
  markdown: {
    syntaxHighlight: 'prism',
  },
  markdownOptions: {
    render: [
	    '@astrojs/markdown-remark',
      {
        rehypePlugins: [
          ['rehype-figure-for-img'],
        ]
      },
	  ],
	},
});