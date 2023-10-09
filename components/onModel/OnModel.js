import React, { useState, useEffect, useMemo } from 'react'
import { Box, Center } from '@chakra-ui/react'
import { Koordinats as KoordinatsModels } from '@/components/koordinat'
import DragUseSpring from '../dragable/DragUseSpring'
import useModelStore from '../stores/useModelStore'
import useParamsStore from '../stores/useParamsStore'
import { CAT_BANGLES, CAT_BRACELETS, CAT_EARRINGS, CAT_NECKLACES, CAT_RINGS } from '../values/product_categories'

export default function OnModel(props) {
  const index_model = useModelStore(s => s.index_selected)
  const onSelectModel = useModelStore(s => s.onSelect)
  const cat = useParamsStore(s => s.cat)

  const img = useMemo(() => props.params.img_list[index_model], [index_model, props.params.img_list])
  const [_, setscaleZoom] = useState({ scale: 1 })

  useEffect(() => {
    const scaleZoomLS = localStorage.setItem('scaleZoom', 1)
    if (scaleZoomLS) {
      setscaleZoom(scaleZoomLS)
    }
  }, [props.params.img_list.length])

  const style_model_product_default = useMemo(() => {
    const draggable_status = localStorage.getItem('dragableStatus')
    return cat === CAT_BANGLES
      ? {
          widthBox: KoordinatsModels.KoordinatBangles.model.marginMobile.widthBox[index_model],
          topBox: KoordinatsModels.KoordinatBangles.model.marginMobile.topBox[index_model],
          right: KoordinatsModels.KoordinatBangles.model.marginMobile.right[index_model],
          bottom: KoordinatsModels.KoordinatBangles.model.marginMobile.bottom[index_model],
          rotasi: KoordinatsModels.KoordinatBangles.model.rotasi[index_model],
          scale: KoordinatsModels.KoordinatBangles.model.scaleMobile[index_model],
          transformDesktop: KoordinatsModels.KoordinatBangles.model.transformDesktop[index_model],
          marginLeftMobile: KoordinatsModels.KoordinatBangles.model.marginMobile.marginLeft[index_model],
          marginTopMobile: KoordinatsModels.KoordinatBangles.model.marginMobile.marginTop[index_model],
          BGPositionMobile: [KoordinatsModels.KoordinatBangles.model.bgPositionX[index_model], KoordinatsModels.KoordinatBangles.model.bgPositionY[index_model]],
          BGSizeMobile: KoordinatsModels.KoordinatBangles.model.bgSizeMobile[index_model],
          marginLeftDesktop: KoordinatsModels.KoordinatBangles.model.marginDesktop.marginLeft[index_model],
          marginTopDesktop: KoordinatsModels.KoordinatBangles.model.marginDesktop.marginTop[index_model],
          BGPositionDesktop: [KoordinatsModels.KoordinatBangles.model.bgPositionXDesktop[index_model], KoordinatsModels.KoordinatBangles.model.bgPositionYDesktop[index_model]],
          BGSizeDesktop: KoordinatsModels.KoordinatBangles.model.bgSizeDesktop[index_model],
          LeftMobile: (KoordinatsModels.KoordinatBangles.model.koordinatasli.x[index_model] / KoordinatsModels.KoordinatBangles.model.dimensiAsli.width[index_model]) * 100,
          TopMobile: (KoordinatsModels.KoordinatBangles.model.koordinatasli.y[index_model] / KoordinatsModels.KoordinatBangles.model.dimensiAsli.height[index_model]) * 100,
          LeftDesktop: (KoordinatsModels.KoordinatBangles.model.koordinatasli.x[index_model] / KoordinatsModels.KoordinatBangles.model.dimensiAsli.width[index_model]) * 100,
          TopDesktop: (KoordinatsModels.KoordinatBangles.model.koordinatasli.y[index_model] / KoordinatsModels.KoordinatBangles.model.dimensiAsli.height[index_model]) * 100,
        }
      : cat === CAT_NECKLACES
      ? {
          widthBox: KoordinatsModels.KoordinatNecklaces.model.marginMobile.widthBox[index_model],
          topBox: KoordinatsModels.KoordinatNecklaces.model.marginMobile.topBox[index_model],
          right: KoordinatsModels.KoordinatNecklaces.model.marginMobile.right[index_model],
          bottom: KoordinatsModels.KoordinatNecklaces.model.marginMobile.bottom[index_model],
          rotasi: KoordinatsModels.KoordinatNecklaces.model.rotasi[index_model],
          scale: KoordinatsModels.KoordinatNecklaces.model.scaleMobile[index_model],
          transformDesktop: KoordinatsModels.KoordinatNecklaces.model.transformDesktop[index_model],
          marginLeftMobile: KoordinatsModels.KoordinatNecklaces.model.marginMobile.marginLeft[index_model],
          marginTopMobile: KoordinatsModels.KoordinatNecklaces.model.marginMobile.marginTop[index_model],
          BGPositionMobile: [KoordinatsModels.KoordinatNecklaces.model.bgPositionX[index_model], KoordinatsModels.KoordinatNecklaces.model.bgPositionY[index_model]],
          BGSizeMobile: KoordinatsModels.KoordinatNecklaces.model.bgSizeMobile[index_model],
          marginLeftDesktop: KoordinatsModels.KoordinatNecklaces.model.marginDesktop.marginLeft[index_model],
          marginTopDesktop: KoordinatsModels.KoordinatNecklaces.model.marginDesktop.marginTop[index_model],
          BGPositionDesktop: [KoordinatsModels.KoordinatNecklaces.model.bgPositionXDesktop[index_model], KoordinatsModels.KoordinatNecklaces.model.bgPositionYDesktop[index_model]],
          BGSizeDesktop: KoordinatsModels.KoordinatNecklaces.model.bgSizeDesktop[index_model],
          LeftMobile: (KoordinatsModels.KoordinatNecklaces.model.koordinatasli.x[index_model] / KoordinatsModels.KoordinatNecklaces.model.dimensiAsli.width[index_model]) * 100,
          TopMobile: (KoordinatsModels.KoordinatNecklaces.model.koordinatasli.y[index_model] / KoordinatsModels.KoordinatNecklaces.model.dimensiAsli.height[index_model]) * 100,
          LeftDesktop: (KoordinatsModels.KoordinatNecklaces.model.koordinatasli.x[index_model] / KoordinatsModels.KoordinatNecklaces.model.dimensiAsli.width[index_model]) * 100,
          TopDesktop: (KoordinatsModels.KoordinatNecklaces.model.koordinatasli.y[index_model] / KoordinatsModels.KoordinatNecklaces.model.dimensiAsli.height[index_model]) * 100,
        }
      : cat === CAT_EARRINGS
      ? {
          widthBox: KoordinatsModels.KoordinatEarrings.model.marginMobile.widthBox[index_model],
          topBox: KoordinatsModels.KoordinatEarrings.model.marginMobile.topBox[index_model],
          right: KoordinatsModels.KoordinatEarrings.model.marginMobile.right[index_model],
          bottom: KoordinatsModels.KoordinatEarrings.model.marginMobile.bottom[index_model],
          rotasi: KoordinatsModels.KoordinatEarrings.model.rotasi[index_model],
          scale: KoordinatsModels.KoordinatEarrings.model.scaleMobile[index_model],
          transformDesktop: KoordinatsModels.KoordinatEarrings.model.transformDesktop[index_model],
          marginLeftMobile: KoordinatsModels.KoordinatEarrings.model.marginMobile.marginLeft[index_model],
          marginTopMobile: KoordinatsModels.KoordinatEarrings.model.marginMobile.marginTop[index_model],
          BGPositionMobile: [KoordinatsModels.KoordinatEarrings.model.bgPositionX[index_model], KoordinatsModels.KoordinatEarrings.model.bgPositionY[index_model]],
          BGSizeMobile: KoordinatsModels.KoordinatEarrings.model.bgSizeMobile[index_model],
          marginLeftDesktop: KoordinatsModels.KoordinatEarrings.model.marginDesktop.marginLeft[index_model],
          marginTopDesktop: KoordinatsModels.KoordinatEarrings.model.marginDesktop.marginTop[index_model],
          BGPositionDesktop: [KoordinatsModels.KoordinatEarrings.model.bgPositionXDesktop[index_model], KoordinatsModels.KoordinatEarrings.model.bgPositionYDesktop[index_model]],
          BGSizeDesktop: KoordinatsModels.KoordinatEarrings.model.bgSizeDesktop[index_model],
          LeftMobile: (KoordinatsModels.KoordinatEarrings.model.koordinatasli.x[index_model] / KoordinatsModels.KoordinatEarrings.model.dimensiAsli.width[index_model]) * 100,
          TopMobile: (KoordinatsModels.KoordinatEarrings.model.koordinatasli.y[index_model] / KoordinatsModels.KoordinatEarrings.model.dimensiAsli.height[index_model]) * 100,
          LeftDesktop: (KoordinatsModels.KoordinatEarrings.model.koordinatasli.x[index_model] / KoordinatsModels.KoordinatEarrings.model.dimensiAsli.width[index_model]) * 100,
          TopDesktop: (KoordinatsModels.KoordinatEarrings.model.koordinatasli.y[index_model] / KoordinatsModels.KoordinatEarrings.model.dimensiAsli.height[index_model]) * 100,
        }
      : cat === CAT_BRACELETS
      ? {
          widthBox: KoordinatsModels.KoordinatBracelets.model.marginMobile.widthBox[index_model],
          topBox: KoordinatsModels.KoordinatBracelets.model.marginMobile.topBox[index_model],
          right: KoordinatsModels.KoordinatBracelets.model.marginMobile.right[index_model],
          bottom: KoordinatsModels.KoordinatBracelets.model.marginMobile.bottom[index_model],
          rotasi: KoordinatsModels.KoordinatBracelets.model.rotasi[index_model],
          scale: KoordinatsModels.KoordinatBracelets.model.scaleMobile[index_model],
          transformDesktop: KoordinatsModels.KoordinatBracelets.model.transformDesktop[index_model],
          marginLeftMobile:
            draggable_status === 'false'
              ? KoordinatsModels.KoordinatBracelets.model.marginMobile.marginLeft[index_model]
              : KoordinatsModels.KoordinatBracelets.model.marginMobile.marginLeftTrue[index_model],
          marginTopMobile:
            draggable_status === 'false'
              ? KoordinatsModels.KoordinatBracelets.model.marginMobile.marginTop[index_model]
              : KoordinatsModels.KoordinatBracelets.model.marginMobile.marginTopTrue[index_model],
          BGPositionMobile: [KoordinatsModels.KoordinatBracelets.model.bgPositionX[index_model], KoordinatsModels.KoordinatBracelets.model.bgPositionY[index_model]],
          BGSizeMobile: KoordinatsModels.KoordinatBracelets.model.bgSizeMobile[index_model],
          marginLeftDesktop:
            draggable_status === 'false'
              ? KoordinatsModels.KoordinatBracelets.model.marginDesktop.marginLeft[index_model]
              : KoordinatsModels.KoordinatBracelets.model.marginDesktop.marginLeftTrue[index_model],
          marginTopDesktop:
            draggable_status === 'false'
              ? KoordinatsModels.KoordinatBracelets.model.marginDesktop.marginTop[index_model]
              : KoordinatsModels.KoordinatBracelets.model.marginDesktop.marginTopTrue[index_model],
          BGPositionDesktop: [KoordinatsModels.KoordinatBracelets.model.bgPositionXDesktop[index_model], KoordinatsModels.KoordinatBracelets.model.bgPositionYDesktop[index_model]],
          BGSizeDesktop: KoordinatsModels.KoordinatBracelets.model.bgSizeDesktop[index_model],
          LeftMobile: (KoordinatsModels.KoordinatBracelets.model.koordinatasli.x[index_model] / KoordinatsModels.KoordinatBracelets.model.dimensiAsli.width[index_model]) * 100,
          TopMobile: (KoordinatsModels.KoordinatBracelets.model.koordinatasli.y[index_model] / KoordinatsModels.KoordinatBracelets.model.dimensiAsli.height[index_model]) * 100,
          LeftDesktop: (KoordinatsModels.KoordinatBracelets.model.koordinatasli.x[index_model] / KoordinatsModels.KoordinatBracelets.model.dimensiAsli.width[index_model]) * 100,
          TopDesktop: (KoordinatsModels.KoordinatBracelets.model.koordinatasli.y[index_model] / KoordinatsModels.KoordinatBracelets.model.dimensiAsli.height[index_model]) * 100,
        }
      : cat === CAT_RINGS
      ? {
          widthBox: KoordinatsModels.KoordinatRings.model.marginMobile.widthBox[index_model],
          topBox: KoordinatsModels.KoordinatRings.model.marginMobile.topBox[index_model],
          right: KoordinatsModels.KoordinatRings.model.marginMobile.right[index_model],
          bottom: KoordinatsModels.KoordinatRings.model.marginMobile.bottom[index_model],
          rotasi: KoordinatsModels.KoordinatRings.model.rotasi[index_model],
          scale: KoordinatsModels.KoordinatRings.model.scaleMobile[index_model],
          transformDesktop: KoordinatsModels.KoordinatRings.model.transformDesktop[index_model],
          marginLeftMobile:
            draggable_status === 'false' ? KoordinatsModels.KoordinatRings.model.marginMobile.marginLeft[index_model] : KoordinatsModels.KoordinatRings.model.marginMobile.marginLeftTrue[index_model],
          marginTopMobile:
            draggable_status === 'false' ? KoordinatsModels.KoordinatRings.model.marginMobile.marginTop[index_model] : KoordinatsModels.KoordinatRings.model.marginMobile.marginTopTrue[index_model],
          BGPositionMobile: [KoordinatsModels.KoordinatRings.model.bgPositionX[index_model], KoordinatsModels.KoordinatRings.model.bgPositionY[index_model]],
          BGSizeMobile: KoordinatsModels.KoordinatRings.model.bgSizeMobile[index_model],
          marginLeftDesktop:
            draggable_status === 'false'
              ? KoordinatsModels.KoordinatRings.model.marginDesktop.marginLeft[index_model]
              : KoordinatsModels.KoordinatRings.model.marginDesktop.marginLeftTrue[index_model],
          marginTopDesktop:
            draggable_status === 'false' ? KoordinatsModels.KoordinatRings.model.marginDesktop.marginTop[index_model] : KoordinatsModels.KoordinatRings.model.marginDesktop.marginTopTrue[index_model],
          BGPositionDesktop: [KoordinatsModels.KoordinatRings.model.bgPositionXDesktop[index_model], KoordinatsModels.KoordinatRings.model.bgPositionYDesktop[index_model]],
          BGSizeDesktop: KoordinatsModels.KoordinatRings.model.bgSizeDesktop[index_model],
          LeftMobile: (KoordinatsModels.KoordinatRings.model.koordinatasli.x[index_model] / KoordinatsModels.KoordinatRings.model.dimensiAsli.width[index_model]) * 100,
          TopMobile: (KoordinatsModels.KoordinatRings.model.koordinatasli.y[index_model] / KoordinatsModels.KoordinatRings.model.dimensiAsli.height[index_model]) * 100,
          LeftDesktop: (KoordinatsModels.KoordinatRings.model.koordinatasli.x[index_model] / KoordinatsModels.KoordinatRings.model.dimensiAsli.width[index_model]) * 100,
          TopDesktop: (KoordinatsModels.KoordinatRings.model.koordinatasli.y[index_model] / KoordinatsModels.KoordinatRings.model.dimensiAsli.height[index_model]) * 100,
        }
      : []
  }, [cat, index_model])

  useEffect(() => {
    document.getElementById('boxprod').style.width = `${style_model_product_default.widthBox}%`
    document.getElementById('boxprod').style.top = `${style_model_product_default.topBox}%`
    document.getElementById('productBox').style.right = `${style_model_product_default.right}%`
    document.getElementById('productBox').style.bottom = `${style_model_product_default.bottom}px`
    document.getElementById('productBox').style.transform = `${style_model_product_default.transformDesktop}`
    document.getElementById('box-onmodel').style.backgroundPosition = `${style_model_product_default.BGPositionDesktop[0]} ${style_model_product_default.BGPositionDesktop[1]}%`
    document.getElementById('box-onmodel').style.backgroundSize = `${style_model_product_default.BGSizeDesktop}`
    onSelectModel(index_model)
  }, [
    index_model,
    onSelectModel,
    style_model_product_default.BGPositionDesktop,
    style_model_product_default.BGSizeDesktop,
    style_model_product_default.bottom,
    style_model_product_default.right,
    style_model_product_default.topBox,
    style_model_product_default.transformDesktop,
    style_model_product_default.widthBox,
  ])

  return (
    <Center>
      <Box
        w="full"
        bg="white"
        style={{
          touchAction: 'none',
          position: 'fixed',
          transform: 'scale(1)',
          transition: 'transform 0.3s ease 0s',
          transformOrigin: '195px 229px 0px',
          bottom: '250px',
          top: '0px',
          zIndex: '1800',
        }}
      >
        &nbsp;
      </Box>
      <Box
        maxW="1024px"
        w="full"
        bg="#0e1c28f0"
        id="box-onmodel"
        style={{
          touchAction: 'none',
          backgroundPosition: 'center center',
          backgroundImage: `url(${img})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          position: 'fixed',
          transform: 'scale(1)',
          transition: 'transform 0.3s ease 0s',
          transformOrigin: '195px 229px 0px',
          bottom: '250px',
          top: '0px',
          zIndex: '1800',
        }}
      >
        <DragUseSpring
          position="relative"
          // params={{
          //   bgref: bgRef,
          //   lengslider: props.params.lengslider,
          //   ProductImage: props.params.ProductImage,
          // }}
        />
      </Box>
    </Center>
  )
}
