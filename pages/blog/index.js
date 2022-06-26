import Layout from '@/components/Layout'
import { blogPageQuery } from '@/lib/queries'
import { BlogPostCard } from '@/columns'
import { graphcmsClient } from '@/lib/client'
import { parsePageData } from '@/utils/parsePageData'
import { parsePostData } from '@/utils/parsePostData'
import { Box, Grid } from '@chakra-ui/react'
import { FancyHeading } from '@/blocks'

export default function BlogPage({ page, navigation, posts }) {
  return (
    <>
      <Layout page={page} navigation={navigation}>
        <Box mt={20}>
          <FancyHeading fancyTitle="SurTide Blog" />
        </Box>
        <Box
          maxW={{ base: 'xl', lg: '7xl' }}
          mx="auto"
          px={[4, 6, null, 8]}
          py={[8, 12, null, 20]}
        >
          <Grid
            gridGap={14}
            gridTemplateColumns={{ base: 'repeat(1, 1fr)', lg: 'repeat(3, 1fr)' }}
          >
            {posts.map((post) => (
              <BlogPostCard key={post.id} {...post} />
            ))}
          </Grid>
        </Box>
      </Layout>
    </>
  )
}

export async function getStaticProps({ preview = false }) {
  const client = graphcmsClient(preview)

  const { page, posts, navigation } = await client.request(blogPageQuery)

  const parsedPageData = await parsePageData(page)
  const parsedPostData = await Promise.all(
    posts.map((post) => parsePostData(post))
  )

  return {
    props: {
      page: parsedPageData,
      posts: parsedPostData,
      navigation,
      preview
    },
    revalidate: 60
  }
}