import FancyHeading from "../blocks/FancyHeading"
import ProductCard from "./ProductCard"
import { Grid } from "@chakra-ui/react"

export default function RecommendedList({ products, current }) {
  return (
    <>
      <FancyHeading fancyTitle="You may also like" />
      <Grid
        templateColumns={['1fr', 'repeat(2, 1fr)', 'repeat(2, 1fr)', 'repeat(4, 1fr)']}
        gap={10}
        pt={8}
      >
        {
          products.map(product => (
            product.node.id === current ? null : <ProductCard key={product.node.id} product={product} />
          ))
        }
      </Grid>
    </>
  )
}