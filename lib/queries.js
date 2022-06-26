import { gql } from 'graphql-request'

const blogPageQuery = gql`
  fragment BlogPostFields on BlogPost {
    id
    category
    content
    coverImage {
      id
      height
      url
      width
    }
    excerpt
    published
    slug
    title
  }

  query BlogPageQuery {
    page( where: { slug: "blog" }) {
      id
      footer {
        id
        primaryLinks {
          id
          navigationLabel
          slug
        }
        secondaryLinks {
          id
          navigationLabel
          slug
        }
        aboutText
        slug
        title
      }
      navigation {
        id
        slug
        pages(where: { slug_not: "home" }) {
          id
          navigationLabel
          slug
        }
      }
      seo {
        id
        description
        image {
          id
          height
          url
          width
        }
        keywords
        noIndex
        title
      }
      subtitle
      title
    }
    posts: blogPosts(orderBy: published_DESC) {
      ...BlogPostFields
    }
    navigation(where: {id: "ckevecpsg09rf0148tewdm2tv"}) {
      id
      slug
      pages(where: {slug_not: "home"}) {
        id
        navigationLabel
        slug
      }
    }
  }
`

const blogPostQuery = gql`
  query BlogPostQuery($slug: String!) {
    allPosts: blogPosts(orderBy: published_ASC) {
      id
      slug
      title
    }
    page(where: { slug: "blog" }) {
      footer {
        id
        primaryLinks {
          id
          navigationLabel
          slug
        }
        secondaryLinks {
          id
          navigationLabel
          slug
        }
        aboutText
        slug
        title
      }
      navigation {
        id
        slug
        pages(where: { slug_not: "home" }) {
          id
          navigationLabel
          slug
        }
      }
      seo {
        id
        description
        image {
          id
          height
          url
          width
        }
        keywords
        noIndex
        title
      }
    }
    post: blogPost(where: { slug: $slug }) {
      id
      category
      content
      coverImage {
        id
        height
        url
        width
      }
      excerpt
      published
      seo {
        id
        description
        image {
          id
          height
          url
          width
        }
        keywords
        noIndex
        title
      }
      slug
      title
    }
    navigation(where: {id: "ckevecpsg09rf0148tewdm2tv"}) {
      id
      slug
      pages(where: {slug_not: "home"}) {
        id
        navigationLabel
        slug
      }
    }
  }
`

const pageQuery = gql`
  query PageQuery($slug: String!) {
    page(where: { slug: $slug }) {
      blocks {
        __typename
        ... on Grid {
          id
          columns {
            __typename
            ... on BlogPost {
              id
              category
              content
              coverImage {
                id
                height
                url
                width
              }
              excerpt
              published
              slug
              title
            }
            ... on Faq {
              id
              content
              title
            }
            ... on Feature {
              id
              featureContent
              image {
                id
                height
                url
                width
              }
              button {
                id
                href
                label
                theme
              }
              slug
              title
            }
          }
          columnComponent
          component
          gridHeadline: headline
          layout
          slug
          gridSubtitle: subtitle
          gridTag: tag
          theme
          gridTitle: title
          width
        }
        ... on Testimonial {
          id
          content
          name
          role
          photo {
            id
            height
            url
            width
          }
        }
        ... on CTAFullWidth {
          id
          ctaTitle
          ctaLineOne
          ctaLineTwo
          buttonLabel
          buttons {
            id
            href
            label
            theme
          }
          image {
            id
            height
            url
            width
          }
        }
        ... on FancyHeading {
          id
          fancyTitle
          fancyContent
        }
        ... on ShowProductList {
          id
          productListTitle
          showProducts
          button {
            id
            href
            label
            theme
          }
        }
        ... on ShowFeaturedSingle {
          id
          showProduct
        }
        ... on ShowCollections {
          id
          showAllCollections
          collectionTitle
        }
        ... on HeroFullWidth {
          id
          heroTitle
          heroSubTitle
          buttonLabel
          heroButton: button {
            id
            href
            label
            theme
          }
          image {
            id
            height
            url
            width
          }
        }
        ... on InternalHero {
          id
          heroContent
          buttons {
            id
            href
            label
            theme
          }
          image {
            id
            height
            url
            width
          }
          slug
        }
      }
      footer {
        id
        primaryLinks {
          id
          navigationLabel
          slug
        }
        secondaryLinks {
          id
          navigationLabel
          slug
        }
        aboutText
        slug
        title
      }
      id
      marketing {
        __typename
        ... on Banner {
          id
          content
          href
          slug
          theme
        }
        ... on Newsletter {
          id
          ctaLabel
          subtitle
          title
        }
        ... on PopUp {
          id
          popUpDescription
          cta
          popUpTitle
          popUpUrl
        }
      }
      seo {
        id
        description
        image {
          id
          height
          url
          width
        }
        keywords
        noIndex
        title
      }
      subtitle
      title
    }
    navigation(where: {id: "ckevecpsg09rf0148tewdm2tv"}) {
      id
      slug
      pages(where: {slug_not: "home"}) {
        id
        navigationLabel
        slug
      }
    }
  }
`

const globalQuery = gql`
  query GlobalQuery {
    navigation(where: {id: "ckevecpsg09rf0148tewdm2tv"}) {
      id
      slug
      pages(where: {slug_not: "home"}) {
        id
        navigationLabel
        slug
      }
    }
  }
`
export { blogPageQuery, blogPostQuery, pageQuery, globalQuery }