import * as Blocks from '@/blocks'

export default function BlockWrapper({ blocks, product, products, productsPage, featuredProduct, collectionCards, collectionProducts, ...page }) {
  return (
    <>
      {blocks.map((block) => {
        const Component = Blocks[block.component] || Blocks[block.__typename]

        if (!Component) return null

        return (
          <Component
            key={block.id}
            page={page}
            products={products}
            productsPage={productsPage}
            featuredProduct={featuredProduct}
            collections={collectionCards}
            collectionProducts={collectionProducts}
            {...block}
          />
        )
      })}
    </>
  )
}
