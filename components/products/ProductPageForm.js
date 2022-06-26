import { useState, useEffect, useContext } from 'react'
import useSWR from 'swr'
import { fetchInventory } from '@/lib/fetcher'
import { formatter } from '../../utils/helpers'
import { CartContext } from '@/context/shopifyContext'
import ProductOptions from './ProductOptions'
import ProductColorOptions from './ProductColorOptions'
import { Box, Button, Divider, Heading, Link, Stack, Text } from '@chakra-ui/react'

export default function ProductPageForm({ product }) {

  const { data: productInventory } = useSWR(
    ['/api/available', product.handle],
    (url, id) => fetchInventory(url, id),
    { errorRetryCount: 3 }
  )

  const [available, setAvailable] = useState(true)
  const { addToCart } = useContext(CartContext)

  const allVariantOptions = product.variants.edges?.map(variant => {
    const allOptions = {}

    variant.node.selectedOptions.map(item => {
      allOptions[item.name] = item.value
    })

    return {
      id: variant.node.id,
      title: product.title,
      handle: product.handle,
      image: variant.node.image?.url,
      options: allOptions,
      variantTitle: variant.node.title,
      variantPrice: variant.node.priceV2.amount,
      variantQuantity: 1
    }
  })

  const defaultValues = {}
  product.options.map(item => {
    defaultValues[item.name] = item.values[0]
  })

  const [selectedVariant, setSelectedVariant] = useState(allVariantOptions[0])
  const [selectedOptions, setSelectedOptions] = useState(defaultValues)

  function setOptions(name, value) {
    setSelectedOptions(prevState => {
      return { ...prevState, [name]: value }
    })

    const selection = {
      ...selectedOptions,
      [name]: value
    }

    allVariantOptions.map(item => {
      if (JSON.stringify(item.options) === JSON.stringify(selection)) {
        setSelectedVariant(item)
      }
    })
  }

  useEffect(() => {
    if (productInventory) {
      const checkAvailable = productInventory?.variants.edges.filter(item => item.node.id === selectedVariant.id)

      if (checkAvailable[0].node.availableForSale) {
        setAvailable(true)
      } else {
        setAvailable(false)
      }
    }
  }, [productInventory, selectedVariant])

  return (
    <Box pos="relative" w={{ sm: '100%', lg: '50%', xl: '40%' }} px="40px">
      <Stack spacing={6}>
        <Heading
          as="h2"
          pos="relative"
          fontSize={['lg', 'xl', '2xl', '3xl']}
          lineHeight="1"
          fontWeight="medium"
          color="gray.900"
          mb={4}
          _after={{
            content: '""', position: 'absolute', bottom: '-1rem', left: '0', width: '40px', height: '3px', backgroundColor: 'green.700'
          }}
        >
          {product.title}
        </Heading>
        <Text fontSize="2xl" color="black">{formatter.format(product.variants.edges[0].node.priceV2.amount)}</Text>
        <Divider />
      </Stack>

      <Stack spacing={4}>
        {
          product.options.map(({ name, values }) => {
            if (name === 'Color')
              return <ProductColorOptions
                        key={`key-${name}`}
                        name={name}
                        values={values}
                        selectedOptions={selectedOptions}
                        setOptions={setOptions}
                        selectedVariant={selectedVariant}
                        productInventory={productInventory}
                        available={available}
              />
            return <ProductOptions
                      key={`key-${name}`}
                      name={name}
                      values={values}
                      selectedOptions={selectedOptions}
                      setOptions={setOptions}
                      selectedVariant={selectedVariant}
                      productInventory={productInventory}
                      available={available}
                    />
          })
        }
        {
          available ?
            <Button
              colorScheme="blue"
              variant="INDIGO"
              w="100%"
              py={6}
              onClick={() => {
                addToCart(selectedVariant)
              }}
            >
              Add To Card
            </Button>
          :
            <Button
              colorScheme="gray"
              variant="solid"
              cursor="not-allowed"
              w="100%"
              py={6}
            >
              Sold out!
            </Button>
        }
      </Stack>

      <Stack spacing={6} pt={4}>
        <Box pt={2}>
          <Divider />
        </Box>
        <Box>
          <Box
            dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
            className="product_description"
            color="black"
          />
        </Box>
      </Stack>
    </Box>
  )
}