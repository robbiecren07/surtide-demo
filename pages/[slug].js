import { gql } from 'graphql-request'
import { graphcmsClient } from '@/lib/client'
import { pageQuery } from '@/lib/queries'
import { parsePageData } from '@/utils/parsePageData'
import { getAllCollections } from '@/lib/shopify'
import Layout from '@/components/Layout'
import BlockWrapper from '@/components/BlockWrapper'
import * as Marketing from '@/marketing'

export default function Page({ data, page, collectionCards }) {
  const pageNewsletter = page?.marketing?.find(
    (block) => block.__typename === 'Newsletter'
  )

  return (
    <>
      <Layout {...data}>
        <BlockWrapper {...page} collectionCards={collectionCards} />

        {pageNewsletter && <Marketing.NewsletterSignup {...pageNewsletter} />}
      </Layout>
    </>
  )
}

export async function getStaticPaths() {
  const client = graphcmsClient()

  const { pages } = await client.request(gql`
    {
      pages(where: { slug_not_in: ["home", "blog", "products", "collections"] }) {
        slug
      }
    }
  `)

  return {
    paths:
      pages.map((page) => {
        const slug = page.slug

        return {
          params: {
            slug: slug,
          },
        }
      }) || [],
    fallback: false,
  }
}

export async function getStaticProps({ params, preview = false }) {
  const client = graphcmsClient(preview)

  const data = await client.request(pageQuery, {
    slug: params.slug
  })

  if (!data.page) {
    return {
      notFound: true
    }
  }

  const collectionCards = await getAllCollections()
  const parsedPageData = await parsePageData(data.page)

  return {
    props: {
      data,
      page: parsedPageData,
      collectionCards,
      preview
    },
    revalidate: 60
  }
}