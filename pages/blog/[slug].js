import NextLink from 'next/link'
import Image from 'next/image'
import { gql } from 'graphql-request'
import SEO from '@/components/SEO'
import Layout from '@/components/Layout'
import { MDXRemote } from 'next-mdx-remote'
import { blogPostQuery } from '@/lib/queries'
import { graphcmsClient } from '@/lib/client'
import { parsePostData } from '@/utils/parsePostData'
import {
  Box,
  Heading,
  List,
  VisuallyHidden,
  Link,
  Stack,
  HStack
} from '@chakra-ui/react'

export default function BlogPost({ page, navigation, nextPost, post, previousPost }) {
  return (
    <>
      <SEO {...post.seo} />
      <Layout page={page} navigation={navigation} post={post}>
        <Box
          as="article"
          pos="relative"
          maxW={{ base: 'xl', lg: '7xl' }}
          mx="auto"
          px={[4, 6, null, 8]}
          py={[8, 12, null, 20]}
        >
          <Box as="header" pt={6} pb={{ lg: 10 }}>
            <Stack spacing={1} textAlign="center">
              <Stack as="dl" spacing={10}>
                <div>
                  <VisuallyHidden as="dt">Published on</VisuallyHidden>
                  <Box
                    as="dd"
                    fontSize="md"
                    lineHeight="6"
                    fontWeight="medium"
                    color="gray.500"
                  >
                    <Box as="time" dateTime={post.published}>
                      {post.formattedPublished}
                    </Box>
                  </Box>
                </div>
              </Stack>
              <div>
                <Heading
                  as="h1"
                  fontWeight="extrabold"
                  color="gray.900"
                  lineHeight="none"
                  letterSpacing="tight"
                  fontSize={['4xl', '5xl', '6xl', '5xl', '6xl']}
                >
                  {post.title}
                </Heading>
              </div>
            </Stack>
          </Box>
          <Box
            display={{ lg: 'grid' }}
            pb={{ base: 16, lg: 20 }}
            gridTemplateColumns={{ lg: 'repeat(4, 1fr)' }}
            gridTemplateRows="auto 1fr"
            gridColumnGap={6}
          >
            <Box
              pb={{ lg: 0 }}
              gridColumn="span 3 / span 3"
              gridRow="span 2 / span 2"
            >
              {post.coverImage && (
                <Box mx="auto">
                  <Image
                    className="cover-image"
                    src={post.coverImage.url}
                    alt={post.coverImage.title}
                    title={post.coverImage.title}
                    height={post.coverImage.height}
                    width={post.coverImage.width}
                    objectFit="cover"
                  />
                </Box>
              )}
              <Box maxW="none" pt={10} pb={8} color="gray.500" className="prose">
                <MDXRemote {...post.content.mdx} />
              </Box>
            </Box>
            <Box
              as="footer"
              fontSize="sm"
              fontWeight="medium"
              lineHeight="5"
              gridColumnStart={{ lg: '1' }}
              gridRowStart={{ lg: '2' }}
            >
              {(nextPost || previousPost) && (
                <Stack
                  py={8}
                  borderWidth="1px 0"
                  borderStyle="solid"
                  borderColor="gray.200"
                  spacing={8}
                >
                  {nextPost && (
                    <div>
                      <Heading
                        as="h2"
                        fontSize="xs"
                        fontWeight="medium"
                        letterSpacing="wide"
                        textTransform="uppercase"
                        lineHeight="4"
                        color="gray.500"
                      >
                        Next Post
                      </Heading>
                      <Box
                        color="indigo.500"
                        _hover={{
                          color: 'indigo.600'
                        }}
                      >
                        <NextLink href={`/blog/${nextPost.slug}`}>
                          <a>{nextPost.title}</a>
                        </NextLink>
                      </Box>
                    </div>
                  )}
                  {previousPost && (
                    <div>
                      <Heading
                        as="h2"
                        fontSize="xs"
                        fontWeight="medium"
                        letterSpacing="wide"
                        textTransform="uppercase"
                        lineHeight="4"
                        color="gray.500"
                      >
                        Previous Post
                      </Heading>
                      <Box
                        color="indigo.500"
                        _hover={{
                          color: 'indigo.600'
                        }}
                      >
                        <NextLink href={`/blog/${previousPost.slug}`}>
                          <a>{previousPost.title}</a>
                        </NextLink>
                      </Box>
                    </div>
                  )}
                </Stack>
              )}
              <Box pt={8}>
                <NextLink href="/blog">
                  <Link
                    color="indigo.500"
                    _hover={{
                      color: 'indigo.600'
                    }}
                  >
                    &larr; Back to the blog
                  </Link>
                </NextLink>
              </Box>
            </Box>
          </Box>
        </Box>
      </Layout>
    </>
  )
}

export async function getStaticProps({ params, preview = false }) {
  const client = graphcmsClient(preview)

  const { allPosts, page, post, navigation } = await client.request(blogPostQuery, {
    slug: params.slug
  })

  if (!post) {
    return {
      notFound: true
    }
  }

  const postIndex = allPosts.findIndex(({ id }) => id === post.id)

  const nextPost = allPosts[postIndex + 1] || null
  const previousPost = allPosts[postIndex - 1] || null

  const parsedPostData = await parsePostData(post)

  return {
    props: {
      nextPost,
      page,
      navigation,
      post: parsedPostData,
      previousPost,
      preview
    },
    revalidate: 60
  }
}

export async function getStaticPaths() {

  const client = graphcmsClient()

  const { posts } = await client.request(gql`
    {
      posts: blogPosts {
        slug
      }
    }
  `)

  return {
    paths:
      posts.map((post) => {
        const slug = post.slug

        return {
          params: {
            slug: slug,
          },
        }
      }) || [],
    fallback: false,
  }
}