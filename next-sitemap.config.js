// next-sitemap.config.js
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://nextjs-mytodoapp-5dpyga0et-christianes-projects-478caaf8.vercel.app', // Remplace par ton URL publique définitive si tu en as une plus propre
  generateRobotsTxt: true, // Génère aussi le fichier robots.txt
  sitemapSize: 7000, // Nombre max d'URLs par fichier sitemap (par défaut 5000)
  exclude: ["/tasks"], // (facultatif) pages à exclure du sitemap si elles nécessitent login
};
