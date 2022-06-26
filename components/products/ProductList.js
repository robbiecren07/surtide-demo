import { Box, Grid } from "@chakra-ui/react"
import ProductCard from "./ProductCard"

export default function ProductList({ products }) {

  return (
    <Box bg='white' mb={10}>
      <Box pos="relative" maxW="7xl" mx="auto" px={[4, 6, null, 8]}>
        <Grid templateColumns='repeat(3, 1fr)' columnGap={6} rowGap={10}>
          {
            products.map(product => (
              <ProductCard key={product.node.id} product={product} productID={product.node.id} />
            ))
          }
        </Grid>
      </Box>
    </Box>
  )
}