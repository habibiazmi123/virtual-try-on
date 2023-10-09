import React, { useCallback } from 'react'

import { Image, Box, Stack } from '@chakra-ui/react'
import { Carousel } from 'react-responsive-carousel'

// import { isMobile } from 'react-device-detect'
import { CAT_BANGLES, CAT_BRACELETS, CAT_EARRINGS, CAT_NECKLACES, CAT_RINGS } from '@/components/values/product_categories'
import useProductStore from './stores/useProductStore'
import useParamsStore from './stores/useParamsStore'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

// If you want to use your own Selectors look up the Advancaed Story book examples

const SliderStack = ({ slides }) => {
  const imageStackLS = useProductStore(s => s.productStackList)
  const cat = useParamsStore(s => s.cat)
  const setIndexProduct = useProductStore(s => s.setIndexProduct)
  //

  const changeSlide = useCallback(
    (indexx, _images) => {
      const dragimage =
        cat === CAT_RINGS
          ? imageStackLS.ProductImage.Rings[indexx]
          : cat === CAT_EARRINGS
          ? imageStackLS.ProductImage.Earings[indexx]
          : cat === CAT_BRACELETS
          ? imageStackLS.ProductImage.Bracelets[indexx]
          : cat === CAT_BANGLES
          ? imageStackLS.ProductImage.Bangles[indexx]
          : cat === CAT_NECKLACES
          ? imageStackLS.ProductImage.Necklaces[indexx]
          : []
      const productname =
        cat === CAT_RINGS
          ? imageStackLS.productName.Rings[indexx]
          : cat === CAT_EARRINGS
          ? imageStackLS.productName.Earings[indexx]
          : cat === CAT_BRACELETS
          ? imageStackLS.productName.Bracelets[indexx]
          : cat === CAT_BANGLES
          ? imageStackLS.productName.Bangles[indexx]
          : cat === CAT_NECKLACES
          ? imageStackLS.productName.Necklaces[indexx]
          : []
      const productprice =
        cat === CAT_RINGS
          ? imageStackLS.productPrice.Rings[indexx]
          : cat === CAT_EARRINGS
          ? imageStackLS.productPrice.Earings[indexx]
          : cat === CAT_BRACELETS
          ? imageStackLS.productPrice.Bracelets[indexx]
          : cat === CAT_BANGLES
          ? imageStackLS.productPrice.Bangles[indexx]
          : cat === CAT_NECKLACES
          ? imageStackLS.productPrice.Necklaces[indexx]
          : []

      if (dragimage) {
        document.querySelector('#productNotAvailable').style.display = 'none'
      } else {
        console.log('ini')
        document.querySelector('#productNotAvailable').style.display = 'unset'
      }

      document.getElementById('productBox').setAttribute('src', dragimage ?? '')
      document.getElementById('productBoxCompare').setAttribute('src', dragimage ?? '')

      // document.getElementById('productBoxCompare').setAttribute('src', imagesss) // ? @todo
      document.getElementById('box-title-product').textContent = productname
      document.getElementById('box-price-product').textContent = productprice
      // localStorage.setItem('indexProductStack', indexx)
      setIndexProduct(indexx)
    },
    [
      cat,
      imageStackLS.ProductImage.Bangles,
      imageStackLS.ProductImage.Bracelets,
      imageStackLS.ProductImage.Earings,
      imageStackLS.ProductImage.Necklaces,
      imageStackLS.ProductImage.Rings,
      imageStackLS.productName.Bangles,
      imageStackLS.productName.Bracelets,
      imageStackLS.productName.Earings,
      imageStackLS.productName.Necklaces,
      imageStackLS.productName.Rings,
      imageStackLS.productPrice.Bangles,
      imageStackLS.productPrice.Bracelets,
      imageStackLS.productPrice.Earings,
      imageStackLS.productPrice.Necklaces,
      imageStackLS.productPrice.Rings,
      setIndexProduct,
    ]
  )

  const renderCustomThumbs = useCallback(() => {
    const thumbList = slides.img.image.map((product, index) => (
      <Stack key={`img5-${index}`} direction="row" onClick={() => changeSlide(index, product)}>
        <Image alt="" accessKey={index} boxSize="69px" objectFit="cover" src={product} />
      </Stack>
    ))
    return thumbList
  }, [changeSlide, slides.img.image])

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
        dynamicHeight={false}
      >
        {Array.isArray(slides.img) && !slides.img.length
          ? ''
          : slides.img.image.map((slide, index) => {
              return <Box key={`img6-${index}`}></Box>
            })}
      </Carousel>
    </div>
  )
}

export default SliderStack
