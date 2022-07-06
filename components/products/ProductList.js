import { Box, Grid } from "@chakra-ui/react"
import ProductCard from "./ProductCard"

export default function ProductList({ products }) {

  return (
    <Box bg='white' mb={10}>
      <Box pos="relative" maxW="7xl" mx="auto" px={[4, 6, null, 8]}>
        <Grid templateColumns={['1fr', '1fr 1fr', null, 'repeat(3, 1fr)']} columnGap={6} rowGap={[ 14, null, null, 14 ]}>
          {
            products.map(product => (
              <ProductCard key={product.node.id} product={product} />
            ))
          }
        </Grid>
      </Box>
    </Box>
  )
}