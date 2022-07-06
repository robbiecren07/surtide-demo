import Button from '../Button'
import { ProductList } from '../products'
import FancyHeading from './FancyHeading'
import { Box, Flex } from '@chakra-ui/react'

export default function ShowProductList({ showProducts, products, productListTitle, button, productsPage, collectionProducts }) {
  if (!showProducts) return null

  let theProducts
  if (products !== undefined) {
    theProducts = products
  } else if (collectionProducts !== undefined) {
    theProducts = collectionProducts.edges
  } else if (productsPage !== undefined) {
    theProducts = productsPage.edges
  } else {
    return null
  }

  return (
    <>
      {products ? 
        <Box mt={[ 20, null, null, 40]}>
          <Box display="flex">
            <FancyHeading fancyTitle={productListTitle} />
          </Box>

          <ProductList products={theProducts} />
        
          <Flex w="100%" justifyContent="center">
            <Button href={button.href} label={button.label} theme={button.theme} />
          </Flex>
        </Box>
        :
        <Box my={{ lg: 40 }}>
          {productListTitle &&
            <Box display="flex" mb={20}>
              <FancyHeading fancyTitle={productListTitle} />
            </Box>
          }
          <ProductList products={theProducts} />
        </Box>
      }
    </>
  )
}
