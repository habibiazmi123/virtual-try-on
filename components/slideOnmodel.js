import React, { useCallback, useEffect } from 'react'
import { Image, Box, Stack } from '@chakra-ui/react'
import { Carousel } from 'react-responsive-carousel'
import { Koordinats } from '@/components/koordinat'
import { isMobile } from 'react-device-detect'
import { CAT_BANGLES, CAT_BRACELETS, CAT_EARRINGS, CAT_NECKLACES, CAT_RINGS } from './values/product_categories'
import useModelStore from './stores/useModelStore'
import useParamsStore from './stores/useParamsStore'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

const SliderOnmodel = () => {
  const onSelectModel = useModelStore(state => state.onSelect)
  const index_params = useModelStore(s => s.index_selected)
  const cat = useParamsStore(s => s.cat)
  const img_list = useModelStore(s => s.footer_params.img_list)
  //

  const changeSlide = useCallback(
    (indexx, imagesss) => {
      const KoordinatsModels = Koordinats
      let key_koordinat = ''
      if (cat === CAT_EARRINGS) {
        key_koordinat = 'KoordinatEarrings'
      } else if (cat === CAT_BANGLES) {
        key_koordinat = 'KoordinatBangles'
      } else if (cat === CAT_NECKLACES) {
        key_koordinat = 'KoordinatNecklaces'
      } else if (cat === CAT_BRACELETS) {
        key_koordinat = 'KoordinatBracelets'
      } else if (cat === CAT_RINGS) {
        key_koordinat = 'KoordinatRings'
      }

      const style_model_product = {
        transformOrigin: KoordinatsModels[key_koordinat].model.transformOrigin[indexx],
        widthBox: KoordinatsModels[key_koordinat].model.marginMobile.widthBox[indexx],
        topBox: KoordinatsModels[key_koordinat].model.marginMobile.topBox[indexx],
        right: KoordinatsModels[key_koordinat].model.marginMobile.right[indexx],
        bottom: KoordinatsModels[key_koordinat].model.marginMobile.bottom[indexx],
        rotasi: KoordinatsModels[key_koordinat].model.rotasi[indexx],
        scale: KoordinatsModels[key_koordinat].model.scaleMobile[indexx],
        transformDesktop: KoordinatsModels[key_koordinat].model.transformDesktop[indexx],
        marginLeftMobile: KoordinatsModels[key_koordinat].model.marginMobile.marginLeft[indexx],
        marginTopMobile: KoordinatsModels[key_koordinat].model.marginMobile.marginTop[indexx],
        BGPositionMobile: [KoordinatsModels[key_koordinat].model.bgPositionX[indexx], KoordinatsModels[key_koordinat].model.bgPositionY[indexx]],
        BGSizeMobile: KoordinatsModels[key_koordinat].model.bgSizeMobile[indexx],
        marginLeftDesktop: KoordinatsModels[key_koordinat].model.marginDesktop.marginLeft[indexx],
        marginTopDesktop: KoordinatsModels[key_koordinat].model.marginDesktop.marginTop[indexx],
        BGPositionDesktop: [KoordinatsModels[key_koordinat].model.bgPositionXDesktop[indexx], KoordinatsModels[key_koordinat].model.bgPositionYDesktop[indexx]],
        BGSizeDesktop: KoordinatsModels[key_koordinat].model.bgSizeDesktop[indexx],
        LeftMobile: (KoordinatsModels[key_koordinat].model.koordinatasli.x[indexx] / KoordinatsModels[key_koordinat].model.dimensiAsli.width[indexx]) * 100,
        TopMobile: (KoordinatsModels[key_koordinat].model.koordinatasli.y[indexx] / KoordinatsModels[key_koordinat].model.dimensiAsli.height[indexx]) * 100,
        LeftDesktop: (KoordinatsModels[key_koordinat].model.koordinatasli.x[indexx] / KoordinatsModels[key_koordinat].model.dimensiAsli.width[indexx]) * 100,
        TopDesktop: (KoordinatsModels[key_koordinat].model.koordinatasli.y[indexx] / KoordinatsModels[key_koordinat].model.dimensiAsli.height[indexx]) * 100,
      }

      document.getElementById('box-onmodel').style.backgroundImage = 'url(' + imagesss + ')'

      // if (isMobile) {
      //   document.getElementById('productBox').style.transform = `translate(0px, 0px) rotate(${style_model_product.rotasi}deg)`
      // }
      document.getElementById('boxprod').style.width = `${style_model_product.widthBox}%`
      document.getElementById('boxprod').style.top = `${style_model_product.topBox}%`
      document.getElementById('productBox').style.right = `${style_model_product.right}%`
      document.getElementById('productBox').style.bottom = `${style_model_product.bottom}px`
      document.getElementById('productBox').style.transform = `${style_model_product.transformDesktop}`
      if (isMobile) {
        document.getElementById('box-onmodel').style.backgroundPosition = `${style_model_product.BGPositionMobile[0]} ${style_model_product.BGPositionMobile[1]}%`
      } else {
        document.getElementById('box-onmodel').style.backgroundPosition = `${style_model_product.BGPositionDesktop[0]} ${style_model_product.BGPositionDesktop[1]}%`
      }
      document.getElementById('box-onmodel').style.backgroundSize = `${style_model_product.BGSizeDesktop}`
      document.getElementById('box-onmodel').style.transformOrigin = `${style_model_product.transformOrigin}`
      // localStorage.setItem('IndexParams', indexx)
      onSelectModel(indexx)
    },
    [cat, onSelectModel]
  )

  useEffect(() => {
    const indexParams = !index_params || img_list.length === 1 ? 0 : index_params
    onSelectModel(indexParams)
  }, [index_params, onSelectModel, img_list.length])

  const renderCustomThumbs = useCallback(() => {
    const thumbList = img_list.map((product, index) => (
      <Stack key={`img3-${index}`} direction="row" onClick={() => changeSlide(index, product)}>
        <Image alt="" accessKey={index} boxSize="69px" objectFit="cover" src={product} />
      </Stack>
    ))
    return thumbList
  }, [changeSlide, img_list])

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
        {Array.isArray(img_list)
          ? img_list.map((_, index) => {
              return <Box key={`img4-${index}`}></Box>
            })
          : null}
      </Carousel>
    </div>
  )
}

export default SliderOnmodel
