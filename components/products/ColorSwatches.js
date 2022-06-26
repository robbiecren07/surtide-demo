import { Box, Heading, VisuallyHidden } from '@chakra-ui/react'

export default function ColorSwatches({ color }) {

  const black = 'url("/img/black_68x.png")'
  const washedDenim = 'url("/img/washed-denim_68x.png")'
  const blueRed = 'url("/img/blue-red_68x.png")'
  const yellowGreen = 'url("/img/yellow-green_68x.png")'
  const oxblood = 'url("/img/oxblood_68x.png")'
  const humbug = 'url("/img/humbug_68x.png")'
  const navy = 'url("/img/navy_68x.png")'
  const marl = 'url("/img/marl_68x.png")'
  const teal = 'url("/img/teal_68x.png")'

  let theColor
  if (color === 'Black') {
    theColor = black
  }
  if (color === 'Washed Denim') {
    theColor = washedDenim
  }
  if (color === 'Blue Red') {
    theColor = blueRed
  }
  if (color === 'Yellow Green') {
    theColor = yellowGreen
  }
  if (color === 'Oxblood') {
    theColor = oxblood
  }
  if (color === 'Humbug') {
    theColor = humbug
  }
  if (color === 'Navy') {
    theColor = navy
  }
  if (color === 'Marl') {
    theColor = marl
  }
  if (color === 'Teal') {
    theColor = teal
  }

  return (
    // <Box as="label"
    //   pos="relative"
    //   w="auto"
    //   h="auto"
    //   borderColor="transparent"
    //   borderRadius="50%"
    //   mx="4px"
    //   transition="box-shadow ease-in-out .15s"
    //   cursor="pointer"
    //   _hover={{
    //     boxShadow: '0 0 0 3px #fff,0 0 0 4px rgba(33,33,33,0.7),0 0 3px 5px rgba(33,33,33,0.2)'
    //   }}
    //   title={color}
    // >
      <Box as="span" display="block" w="22px" h="22px"
        boxShadow="0 0 0 1px #212121"
        borderRadius="50%"
        backgroundSize="cover"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        backgroundImage={theColor}
      >
        <VisuallyHidden>{color}</VisuallyHidden>
      </Box>
    // </Box>
  )
}
