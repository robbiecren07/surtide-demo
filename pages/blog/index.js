import { blogPageQuery } from '@/lib/queries'
import { BlogPostCard } from '@/columns'
import { graphcmsClient } from '@/lib/client'
import { parsePostData } from '@/utils/parsePostData'
import Layout from '@/components/Layout'
import { Box, Grid } from '@chakra-ui/react'
import { FancyHeading } from '@/blocks'

export default function BlogPage({ data, posts }) {
  return (
    <>
      <Layout {...data}>
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

  const data = await client.request(blogPageQuery)

  const parsedPostData = await Promise.all(
    data.posts.map((post) => parsePostData(post))
  )

  return {
    props: {
      data,
      posts: parsedPostData,
      preview
    },
    revalidate: 60
  }
}