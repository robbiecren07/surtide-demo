import { gql } from 'graphql-request'

export const blogPageQuery = gql`
  fragment BlogPostFields on BlogPost {
    id
    category
    content
    excerpt
    published
    slug
    title
    coverImage {
      id
      height
      url
      width
    }
  }

  query BlogPageQuery {
    navigations {
      id
      slug
      subMenuImage {
        id
        height
        url
        width
      }
      pages(where: {slug_not: "home"}) {
        id
        navigationLabel
        slug
        hasSubMenu
      }
    }
    footer(where: {slug: "global"}) {
      id
      aboutText
      slug
      title
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
    }
    posts: blogPosts(orderBy: published_DESC) {
      ...BlogPostFields
    }
  }
`

export const blogPostQuery = gql`
  query BlogPostQuery($slug: String!) {
    navigations {
      id
      slug
      subMenuImage {
        id
        height
        url
        width
      }
      pages(where: {slug_not: "home"}) {
        id
        navigationLabel
        slug
        hasSubMenu
      }
    }
    footer(where: {slug: "global"}) {
      id
      aboutText
      slug
      title
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
    }
    allPosts: blogPosts(orderBy: published_ASC) {
      id
      slug
      title
    }
    post: blogPost(where: { slug: $slug }) {
      id
      category
      content
      slug
      title
      excerpt
      published
      coverImage {
        id
        height
        url
        width
      }
      seo {
        id
        description
        keywords
        noIndex
        title
        image {
          id
          height
          url
          width
        }
      }
    }
  }
`

export const pageQuery = gql`
  query PageQuery($slug: String!) {
    navigations {
      id
      slug
      subMenuImage {
        id
        height
        url
        width
      }
      pages(where: {slug_not: "home"}) {
        id
        navigationLabel
        slug
        hasSubMenu
      }
    }
    footer(where: {slug: "global"}) {
      id
      aboutText
      slug
      title
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
    }
    page(where: { slug: $slug }) {
      id
      subtitle
      title
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
      blocks {
        __typename
        ... on Grid {
          id
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
          containerSize
          columns {
            __typename
            ... on BlogPost {
              id
              category
              content
              excerpt
              published
              slug
              title
              coverImage {
                id
                height
                url
                width
              }
            }
            ... on Faq {
              id
              content
              title
            }
            ... on Feature {
              id
              slug
              title
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
            }
            ... on ImageBlock {
              id
              imageBlockSlug
              blockImage {
                id
                height
                width
                url
              }
              buttons {
                id
                label
                theme
                href
              }
            }
          }
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
          buttons {
            id
            label
            theme
            href
          }
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
        ... on ShowCollections {
          id
          showAllCollections
          collectionTitle
        }
        ... on InternalHero {
          id
          heroContent
          slug
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
        ... on ContactInfo {
          id
          storeAddress
          storeHours
          storeName
          showContactForm
          mapImage {
            id
            height
            url
            width
          }
        }
      }
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
      }
    }
  }
`

export const globalQuery = gql`
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

export const homePageQuery = gql`
  query HomePageQuery {
    navigations {
      id
      slug
      subMenuImage {
        id
        height
        url
        width
      }
      pages(where: {slug_not: "home"}) {
        id
        navigationLabel
        slug
        hasSubMenu
      }
    }
    footer(where: {slug: "global"}) {
      id
      aboutText
      slug
      title
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
    }
    page(where: { slug: "home" }) {
      id
      subtitle
      title
      seo {
        id
        description
        keywords
        noIndex
        title
        image {
          id
          height
          url
          width
        }
      }
      blocks {
        __typename
        ... on Grid {
          id
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
          containerSize
          columns {
            __typename
            ... on Faq {
              id
              content
              title
            }
            ... on Feature {
              id
              slug
              title
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
            }
          }
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
      }
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
    }
  } 
`