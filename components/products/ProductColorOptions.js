import { Box, FormControl, FormLabel, VisuallyHidden, Text } from '@chakra-ui/react'
import ColorSwatches from './ColorSwatches'

export default function ProductColorOptions({ name, values, selectedOptions, setOptions, productInventory, selectedVariant }) {

  return (
    <FormControl mt="10px">
      <Text as="legend" fontSize="sm">{name}:</Text>
      <Box display="inline-flex" gap={1} mt="8px">
        {
          values.map(value => {
            const id = `option-${name}-${value}`
            const checked = selectedOptions[name] === value

            return (
              <FormLabel key={id} htmlFor={id}>
                <input
                  type="radio"
                  id={id}
                  name={`option-${name}`}
                  value={value}
                  checked={checked}
                  onChange={() => {
                    setOptions(name, value)
                  }}
                  className="visually-hidden"
                />
                <Box
                 pos="relative"
                 w="auto"
                 h="auto"
                 borderColor="transparent"
                 borderRadius="50%"
                 mx="4px"
                 transition="box-shadow ease-in-out .15s"
                 cursor="pointer"
                 _hover={{
                   boxShadow: '0 0 0 3px #fff,0 0 0 4px rgba(33,33,33,0.7),0 0 3px 5px rgba(33,33,33,0.2)'
                 }}
                title={value}
                className={`${checked ? "color-checked" : ""}`}
                >
                  <ColorSwatches color={value} />
                </Box>
              </FormLabel>
            )
          })
        }
      </Box>
    </FormControl>
  )
}