import React, { useCallback, useEffect } from 'react'
import { Image, Box, Stack } from '@chakra-ui/react'
import { Carousel } from 'react-responsive-carousel'
import { isMobile } from 'react-device-detect'
import useModelStore from './stores/useModelStore'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
// If you want to use your own Selectors look up the Advancaed Story book examples

const SliderOnCompare = ({ slides }) => {
  const onSelectModel = useModelStore(state => state.onSelect)
  const indexParams = useModelStore(s => s.index_selected)

  const images = slides.img
  const changeSlide = useCallback(
    (indexx, imagesss) => {
      document.getElementById('productBox2').setAttribute('src', imagesss)
      if (indexx > 0 && isMobile) {
        document.getElementById('productBox2').style.width = '100%'
        document.getElementById('productBox2').style.left = '67px'
        document.getElementById('productBox2').style.bottom = '302px'
        document.getElementById('continer-compare').style.transform = 'scale(0.85)'
      } else if (indexx > 0 && !isMobile) {
        document.getElementById('productBox2').style.width = '100%'
        document.getElementById('productBox2').style.left = '0px'
        document.getElementById('productBox2').style.bottom = '258px'
        document.getElementById('continer-compare').style.transform = 'scale(0.85)'
      } else if (indexx === 0 && !isMobile) {
        document.getElementById('productBox2').style.width = '100%'
        document.getElementById('productBox2').style.left = '0px'
        document.getElementById('productBox2').style.bottom = '258px'
        document.getElementById('continer-compare').style.transform = 'scale(1)'
      } else if (indexx === 0 && isMobile) {
        document.getElementById('continer-compare').style.transform = 'scale(1)'
      }
      // localStorage.setItem('IndexParams',indexx)
      onSelectModel(indexx)
    },
    [onSelectModel]
  )
  //console.log(WindowScreen)
  useEffect(() => {
    // localStorage.setItem('IndexParams', indexParams)
    onSelectModel(indexParams)
  }, [indexParams, onSelectModel])

  const renderCustomThumbs = () => {
    const thumbList = images.image.map((product, index) => (
      <Stack key={`img-${index}`} direction="row" onClick={() => changeSlide(index, product)}>
        <Image alt="" accessKey={index} boxSize="69px" objectFit="cover" src={product} />
      </Stack>
    ))
    return thumbList
  }

  return (
    <div>
      <Carousel
        infiniteLoop
        showArrows={false}
        showStatus={false}
        showIndicators={false}
        showThumbs={true}
        autoPlay={false}
        transitionTime={500}
        swipeable={false}
        emulateTouch={true}
        renderThumbs={renderCustomThumbs}
        // width="500px"
        dynamicHeight={false}
        // onClickItem={}
      >
        {Array.isArray(images) && !images.length
          ? ''
          : images.image.map((slide, index) => {
              return <Box key={`img2-${index}`}></Box>
            })}
      </Carousel>
    </div>
  )
}

export default SliderOnCompare
