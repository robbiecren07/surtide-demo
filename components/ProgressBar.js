import { useNProgress } from '@tanem/react-nprogress'
import { Box } from '@chakra-ui/react'

export default function ProgressBar({ isAnimating }) {
  const { animationDuration, isFinished, progress } = useNProgress({
    isAnimating,
  })

  return (
    <Box position="fixed" left="0" top="0" pointerEvents="none" w="100%" h="3px" bg="green.700"
      style={{
        opacity: isFinished ? 0 : 1,
        transition: `opacity ${animationDuration}ms linear`,
      }}
    >
      <Box position="absolute" left="0" top="0" z-index="50" w="100%" h="3px" bg="#222222" transform="translateX(0)"
        style={{
          transform: `translateX(${progress * 100}%)`,
          transition: `transform ${animationDuration}ms linear`,
        }}
      ></Box>
    </Box>
  )
}