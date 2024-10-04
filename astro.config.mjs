import { defineConfig } from 'astro/config';
import react from "@astrojs/react";
import { astroImageTools } from "astro-imagetools";
import mdx from "@astrojs/mdx";
import partytown from "@astrojs/partytown";

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(), 
    mdx(), 
    astroImageTools,
    partytown({
      config: {
        forward: ['dataLayer.push'],
        resolveUrl: {
          function(url, location) {
            if (url.href.startWith(location.origin + '/proxy')) {
              return url;
            }
            if (url.href.startsWith('https://')) {
              const host = url.host;
              const path = url.pathname === '/' ? '' : url.pathname;
              const search = url.search === '?' ? '' : url.search;
              const proxyUrl = new URL(location.origin + '/proxy' + path + search);
              proxyUrl.searchParams.append('target_party_host', host);
              return proxyUrl;
            }
            return url;
          }
        }
      }
    }), 
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
  markdownOptions: {
    render: ['@astrojs/markdown-remark', {
      rehypePlugins: [['rehype-figure-for-img']]
    }]
  }
});