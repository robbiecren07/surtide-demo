const description = `Learn how to build modern marketing websites, with localization and SEO, using GraphCMS, NextJS, Chakra UI, and Vercel.`
const title = `Build Modern Marketing Websites with a Headless CMS`
const url = `https://surtide.robbiecrenshaw.dev/`

const seo = {
  title,
  titleTemplate: '%s | SurTide Clothing',
  description,
  openGraph: {
    description,
    title,
    type: 'website',
    url
  },
  twitter: {
    handle: '@robbiecren',
    site: '@robbiecren'
  }
}

export { seo as defaultSEO, url as defaultUrl }