import { useState, useEffect, useContext } from "react"
import axios from "axios"
import useSWR from 'swr'
import { formatter } from '../../utils/helpers'
import ProductOptions from "./ProductOptions"
import { CartContext } from '@/context/shopifyContext'
import ProductColorOptions from "./ProductColorOptions"
import { Button, Stack, Box } from "@chakra-ui/react"

// setup inventory fetcher
const fetchInventory = (url, id) =>
  axios
    .get(url, {
      params: {
        id: id,
      },
    })
    .then((res) => res.data)

export default function ProductCardHover({ product }) {

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
  const [selectedColorOptions, setSelectedColorOptions] = useState(defaultValues)
  const [selectedOptions, setSelectedOptions] = useState(defaultValues)

  function setColorOptions(name, value) {
    setSelectedColorOptions(prevState => {
      return { ...prevState, [name]: value }
    })

    const selection = {
      ...selectedColorOptions,
      [name]: value
    }

    allVariantOptions.map(item => {
      if (JSON.stringify(item.options) === JSON.stringify(selection)) {
        setSelectedVariant(item)
      }
    })

    console.log(selectedColorOptions)
  }

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

    console.log(selectedOptions)
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

  // useEffect(() => {
  //   if (productInventory) {
  //     const checkAvailable = productInventory?.variants.edges.filter(item => item.node.id === selectedVariant.id)

  //     console.log(checkAvailable)
  //     if (checkAvailable[0].node.availableForSale) {
  //       setAvailable(true)
  //     } else {
  //       setAvailable(false)
  //     }
  //   }
  // }, [productInventory, selectedVariant])

  return (
    <Stack spacing={2}>
      {
        product.options.map(({ name, values }) => {
          if (name === 'Color')
            return <ProductColorOptions
                      key={`key-${name}`}
                      name={name}
                      values={values}
                      selectedOptions={selectedColorOptions}
                      setOptions={setColorOptions}
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
      <Box pt="5px">
        {
          available ?
            <Button
              onClick={() => {
                addToCart(selectedVariant)
              }}
              colorScheme="blue"
              variant="solid"
              w="100%"
            >
              Add To Cart
            </Button> :
            <Button
              colorScheme="gray"
              variant="solid"
              cursor="not-allowed"
            >
              Sold out!
            </Button>
        }
      </Box>
    </Stack>
  )
}