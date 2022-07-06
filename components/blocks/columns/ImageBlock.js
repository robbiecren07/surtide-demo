import NextImage from 'next/image'
import Button from '@/components/Button'
import { Box } from '@chakra-ui/react'

function ButtonBlock({ buttons }) {
  
  return (
    <>
      {buttons.map((button) => (
          <Box key={button.href} w="fit-content" mt={4} mx="auto">
            <Button href={button.href} label={button.label} theme={button.theme} />
          </Box>
        ))
      }
    </>
  )
}

export default function ImageBlock({ blockImage, buttons }) {

  return (
    <>
      {blockImage.map((image) => (
        <Box key={image.id} mx="auto">
          <NextImage
            src={image.url}
            alt="SurTide Clothing Company logo"
            width={image.width}
            height={image.height}
          />
        </Box>
      ))}

      {buttons &&
        <ButtonBlock buttons={buttons} />
      }
    </>
  )
}
