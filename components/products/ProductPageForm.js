import { useState, useEffect, useContext } from 'react'
import useSWR from 'swr'
import { fetchInventory } from '@/lib/fetcher'
import { formatter } from '../../utils/helpers'
import { CartContext } from '@/context/shopifyContext'
import ProductOptions from './ProductOptions'
import ProductColorOptions from './ProductColorOptions'
import { Box, Button, Divider, Heading, HStack, Input, Stack, Text, useNumberInput } from '@chakra-ui/react'
import MediaQuery from 'react-responsive'

export default function ProductPageForm({ product }) {

  const { data: productInventory } = useSWR(
    ['/api/available', product.handle],
    (url, id) => fetchInventory(url, id),
    { errorRetryCount: 3 }
  )

  const [available, setAvailable] = useState(true)
  const { addToCart } = useContext(CartContext)

  // set quantityAvailable as max in counter
  const [maxAmount, setMaxAmount] = useState(product.variants.edges[0].node.quantityAvailable)
  // quantity state and counter
  const [itemQuantity, setItemQuantity] = useState(1)
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
  useNumberInput({
    step: 1,
    defaultValue: 1,
    min: 1,
    max: maxAmount,
    precision: 0,
  })

  const inc = getIncrementButtonProps()
  const dec = getDecrementButtonProps()
  const input = getInputProps()

  // set quantity in state, in order to update allVariantOptions quanity when changing the variant
  useEffect(() => {
    setItemQuantity(input.value)
  }, [inc, dec, input.value])

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
      quantityAvailable: variant.node.quantityAvailable,
      variantQuantity: itemQuantity
    }
  })

  // set default values
  const defaultValues = {}
  product.options.map(item => {
    defaultValues[item.name] = item.values[0]
  })

  const [selectedVariant, setSelectedVariant] = useState(allVariantOptions[0])
  const [selectedOptions, setSelectedOptions] = useState(defaultValues)
  
  // update max quantityAvailable for quantity counter
  useEffect(() => {
    setMaxAmount(selectedVariant.quantityAvailable)
  }, [selectedOptions, selectedVariant.quantityAvailable])

  function setOptions(name, value) {
    // map state to find selected options
    setSelectedOptions(prevState => {
      return { ...prevState, [name]: value }
    })

    // settings selected options
    const selection = {
      ...selectedOptions,
      [name]: value
    }

    //return selection to state, which is passed to addToCart
    allVariantOptions.map(item => {
      if (JSON.stringify(item.options) === JSON.stringify(selection)) {
        setSelectedVariant(item)
      }
    })
  }

  // add quantity to selection
  const setQuantity = (value) => {
    setSelectedVariant(selectedVariant => ({
      ...selectedVariant,
      variantQuantity: value
    }))
  }

  useEffect(() => {
    // setting quantity
    setQuantity(parseInt(input.value))
  }, [itemQuantity, input.value])

  // prevent failed hydration when using MediaQuery
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // check to make sure the product is available with the selections
  useEffect(() => {
    if (productInventory) {
      const checkAvailable = productInventory?.variants.edges.filter(item => item.node.id === selectedVariant.id)

      if (checkAvailable[0].node.availableForSale) {
        setAvailable(true)
      } else {
        setAvailable(false)
      }
    }
  }, [productInventory, selectedVariant, mounted])
  
  return (
    <Box pos="relative" w={{ sm: '100%', lg: '50%', xl: '40%' }} px={{ lg: "40px"}}>
      <Stack spacing={6}>
        {mounted && (
          <MediaQuery minWidth={1024}>
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
          </MediaQuery>
        )}
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
              />
            return <ProductOptions
                      key={`key-${name}`}
                      name={name}
                      values={values}
                      selectedOptions={selectedOptions}
                      setOptions={setOptions}
                    />
          })
        }
        <Text as="legend" fontSize="sm">Quantity:</Text>
        <HStack spacing={1}>
          <Button
            height={8}
            border="1px solid rgba(33, 33, 33, 0.2)"
            borderRadius={0}
            bg="white"
            _hover={{
              border: '1px solid #212121',
              bg: "white"
            }}
            {...dec}
          >-</Button>
          <Input
            type="number"
            name="product-quantity"
            height={8}
            maxW="50px"
            borderRadius={0}
            {...input}
          />
          <Button
            height={8}
            border="1px solid rgba(33, 33, 33, 0.2)"
            borderRadius={0}
            bg="white"
            _hover={{
              border: '1px solid #212121',
              bg: "white"
            }}
            {...inc}
          >+</Button>
        </HStack>
        {
          available ?
              <>
                <Button
                  colorScheme="green"
                  variant="outline"
                  w="100%"
                  py={6}
                  _hover={{
                    bg: 'green.800',
                    color: "white"
                  }}
                  onClick={() => {
                    addToCart(selectedVariant)
                  }}
                >
                  Add To Card
                </Button>
                <Button
                colorScheme="blue"
                variant="INDIGO"
                w="100%"
                py={6}
                onClick={() => {
                  addToCart(selectedVariant)
                }}
              >
                Buy It Now
              </Button>
            </>
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