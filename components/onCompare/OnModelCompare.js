import React, { useEffect, useRef } from 'react'
import { Container, Box } from '@chakra-ui/react'
import Dragable from '../dragable/DragUseSpringDefaultCompare'
import Dragable2 from '../dragable/DragUseSpring2'
import { isMobile } from 'react-device-detect'

export default function OnModelCompare() {
  useEffect(() => {
    localStorage.setItem('scaleZoom', 1)
  }, [])

  return (
    <Box
      w={'100%'}
      bg="#0e1c28f0"
      id="box-onmodel2"
      style={{
        touchAction: 'none',
        backgroundPosition: 'center center',
        backgroundImage: `url()`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        position: 'fixed',
        transform: 'scale(1)',
        transition: 'transform 0.3s ease 0s',
        transformOrigin: '195px 229px 0px',
        bottom: '250px',
        top: 0,
        zIndex: '1800',
      }}
    >
      <Container id="continer-compare" centerContent position={'relative'} top={isMobile ? '100%' : 0} w={'100%'}>
        <Dragable objectFit="cover" position="relative" />
        <Dragable2 objectFit="cover" position="relative" style={{ zIndex: '1800' }} />
      </Container>
    </Box>
  )
}
