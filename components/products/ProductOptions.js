import { Box, FormControl, FormLabel, Text } from '@chakra-ui/react'

export default function ProductOptions({ name, values, selectedOptions, setOptions }) {

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
                  minW="50px"
                  h="28px"
                  display="inline-flex"
                  justifyContent="center"
                  alignItems="center"
                  fontSize="sm"
                  fontWeight="normal"
                  border="1px solid rgba(33, 33, 33, 0.2)"
                  px="18px"
                  transition="all 0.3s ease-in-out"
                  cursor="pointer"
                  _hover={{
                    border: '1px solid #212121',
                    boxShadow: '0 0 3px 1px rgba(33, 33, 33, 0.2)'
                  }}
                  className={`${checked ? "size-checked" : ""}`}
                >
                  <span>{value}</span>
                </Box>
              </FormLabel>
            )
          })
        }
      </Box>
    </FormControl>
  )
}