import { baseRoutes } from "../astroRoutes.js";
import { enabledLocales, localizePath } from "../locales.js";

export const prerender = true;

export function GET() {
  const origin = "https://chelonaki-ai-studio.o-some.chatgpt.site";
  const routes = ["/", ...baseRoutes];
  const urls = routes.flatMap((route) =>
    enabledLocales.map(
      (locale) =>
        `  <url><loc>${origin}${localizePath(route, locale.code)}</loc></url>`,
    ),
  );
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>`,
    { headers: { "Content-Type": "application/xml; charset=utf-8" } },
  );
}
