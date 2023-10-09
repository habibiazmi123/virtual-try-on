import React, { memo, useCallback, useEffect, useMemo } from 'react'
import { Image, Box, Center } from '@chakra-ui/react'
import Moveable from 'react-moveable'
import { isMobile } from 'react-device-detect'
import { CAT_BANGLES, CAT_BRACELETS, CAT_EARRINGS, CAT_NECKLACES, CAT_RINGS } from '../values/product_categories'
import useModelStore from '../stores/useModelStore'
import useParamsStore from '../stores/useParamsStore'
import useProductStore from '../stores/useProductStore'

function DragUseSpring() {
  const imageStackLS = useProductStore(s => s.productStackList)
  const index_selected_model = useModelStore(s => s.index_selected)
  const [valimgCtrl, setvalimgCtrl] = React.useState(0)
  const [__, setViewAble] = React.useState(false)
  const KoordinatsModels = JSON.parse(localStorage.getItem('KoordinatsModel'))
  const [trufalseRotate, settrufalseRotate] = React.useState(0)

  const current_cat = useParamsStore(s => s.cat)
  const setIndexProduct = useProductStore(s => s.setIndexProduct)

  const key_model = useMemo(() => {
    let key = ''
    if (current_cat === CAT_BRACELETS) {
      key = 'KoordinatBracelets'
    } else if (current_cat === CAT_RINGS) {
      key = 'KoordinatRings'
    } else if (current_cat === CAT_BANGLES) {
      key = 'KoordinatBangles'
    } else if (current_cat === CAT_NECKLACES) {
      key = 'KoordinatNecklaces'
    } else if (current_cat === CAT_EARRINGS) {
      key = 'KoordinatEarrings'
    }
    return key
  }, [current_cat])

  const dimensiProduct = React.useMemo(() => {
    let pw = '100%'
    if (current_cat === CAT_EARRINGS) {
      pw = '5%'
    } else if (current_cat === CAT_BRACELETS) {
      pw = '30%'
    } else if (current_cat === CAT_RINGS) {
      pw = '10%'
    } else if (current_cat === CAT_BANGLES) {
      pw = KoordinatsModels[key_model].model.width_percentage?.[index_selected_model] + '%'
    } else if (current_cat === CAT_NECKLACES) {
      pw = '42%'
    }
    return { ProductWidth: pw }
  }, [KoordinatsModels, current_cat, index_selected_model, key_model])

  const imageRef = React.useRef(null)
  const [target, setTarget] = React.useState()
  const [_, setimgCtrl] = React.useState('off')
  const [frame, setFrame] = React.useState({
    translate: [0, 0],
    rotate: 0,
    transformOrigin: '50% 50%',
  })

  const onImgClick = useCallback(() => {
    setimgCtrl(v => {
      if (v === 'on') {
        setvalimgCtrl(0.4)
        setViewAble(true)
        return 'off'
      } else {
        setvalimgCtrl(0)
        setViewAble(false)
        return 'on'
      }
    })
  }, [])

  React.useEffect(() => {
    document.addEventListener('mousedown', onImgClick)
    setTarget(document.querySelector('.target'))
    setFrame({
      translate: [0, 0],
      rotate: 0,
      transformOrigin: '0 0',
    })
  }, [onImgClick])

  // const product_model = useMemo(() => {
  //   let key = ''
  //   if (current_cat === CAT_BRACELETS) {
  //     key = 'KoordinatBracelets'
  //   } else if (current_cat === CAT_RINGS) {
  //     key = 'KoordinatRings'
  //   } else if (current_cat === CAT_BANGLES) {
  //     key = 'KoordinatBangles'
  //   } else if (current_cat === CAT_NECKLACES) {
  //     key = 'KoordinatNecklaces'
  //   }
  //   return KoordinatsModels[key].model
  // }, [KoordinatsModels, current_cat])

  const onDrag = useCallback(
    e => {
      // frame.translate = e.beforeTranslate
      setFrame(f => {
        f.translate = e.beforeTranslate
        return f
      })

      if (trufalseRotate === 0) {
        // frame.rotate = rotate_temp
        setFrame(f => {
          let rotate_temp = 0
          if (current_cat === CAT_BRACELETS) {
            rotate_temp = KoordinatsModels.KoordinatBracelets.model.rotasi[index_selected_model]
          } else if (current_cat === CAT_RINGS) {
            rotate_temp = KoordinatsModels.KoordinatRings.model.rotasi[index_selected_model]
          } else if (current_cat === CAT_BANGLES) {
            rotate_temp = KoordinatsModels.KoordinatBangles.model.rotasi[index_selected_model]
          } else if (current_cat === CAT_NECKLACES) {
            rotate_temp = KoordinatsModels.KoordinatNecklaces.model.rotasi[index_selected_model]
          }
          f.rotate = rotate_temp
          return f
        })
      }
    },
    [
      KoordinatsModels.KoordinatBangles.model.rotasi,
      KoordinatsModels.KoordinatBracelets.model.rotasi,
      KoordinatsModels.KoordinatNecklaces.model.rotasi,
      KoordinatsModels.KoordinatRings.model.rotasi,
      current_cat,
      index_selected_model,
      trufalseRotate,
    ]
  )

  const onDragEnd = ({ lastEvent }) => {
    if (lastEvent) {
      settrufalseRotate(0)
    }
  }

  const onRotateStart = useCallback(
    e => {
      if (frame.rotate > 0) {
        e.set(frame.rotate)
      } else if (current_cat === CAT_BRACELETS) {
        e.set(KoordinatsModels.KoordinatBracelets.model.rotasi[index_selected_model])
      } else if (current_cat === CAT_RINGS) {
        e.set(KoordinatsModels.KoordinatRings.model.rotasi[index_selected_model])
      } else if (current_cat === CAT_BANGLES) {
        e.set(KoordinatsModels.KoordinatBangles.model.rotasi[index_selected_model])
      } else if (current_cat === CAT_NECKLACES) {
        e.set(KoordinatsModels.KoordinatNecklaces.model.rotasi[index_selected_model])
      } else {
        e.set(0)
      }
    },
    [
      KoordinatsModels.KoordinatBangles.model.rotasi,
      KoordinatsModels.KoordinatBracelets.model.rotasi,
      KoordinatsModels.KoordinatNecklaces.model.rotasi,
      KoordinatsModels.KoordinatRings.model.rotasi,
      current_cat,
      frame.rotate,
      index_selected_model,
    ]
  )

  // init product image:
  useEffect(() => {
    const indexx = 0

    const dragimage =
      current_cat === CAT_RINGS
        ? imageStackLS.ProductImage.Rings[indexx]
        : current_cat === CAT_EARRINGS
        ? imageStackLS.ProductImage.Earings[indexx]
        : current_cat === CAT_BRACELETS
        ? imageStackLS.ProductImage.Bracelets[indexx]
        : current_cat === CAT_BANGLES
        ? imageStackLS.ProductImage.Bangles[indexx]
        : current_cat === CAT_NECKLACES
        ? imageStackLS.ProductImage.Necklaces[indexx]
        : []

    const productname =
      current_cat === CAT_RINGS
        ? imageStackLS.productName.Rings[indexx]
        : current_cat === CAT_EARRINGS
        ? imageStackLS.productName.Earings[indexx]
        : current_cat === CAT_BRACELETS
        ? imageStackLS.productName.Bracelets[indexx]
        : current_cat === CAT_BANGLES
        ? imageStackLS.productName.Bangles[indexx]
        : current_cat === CAT_NECKLACES
        ? imageStackLS.productName.Necklaces[indexx]
        : []
    const productprice =
      current_cat === CAT_RINGS
        ? imageStackLS.productPrice.Rings[indexx]
        : current_cat === CAT_EARRINGS
        ? imageStackLS.productPrice.Earings[indexx]
        : current_cat === CAT_BRACELETS
        ? imageStackLS.productPrice.Bracelets[indexx]
        : current_cat === CAT_BANGLES
        ? imageStackLS.productPrice.Bangles[indexx]
        : current_cat === CAT_NECKLACES
        ? imageStackLS.productPrice.Necklaces[indexx]
        : []

    if (dragimage) {
      console.log('ada image')
      document.querySelector('#productNotAvailable').style.display = 'none'
    } else {
      console.log('gk ada image')
      document.querySelector('#productNotAvailable').style.display = 'unset'
    }

    document.getElementById('productBox').setAttribute('src', dragimage ?? '')
    document.getElementById('productBoxCompare').setAttribute('src', dragimage ?? '')
    document.getElementById('box-title-product').textContent = productname
    document.getElementById('box-price-product').textContent = productprice
    // localStorage.setItem('indexProductStack', indexx)
    setIndexProduct(indexx)
  }, [
    current_cat,
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
  ])

  return (
    <>
      {isMobile ? (
        <Box
          id="boxprod"
          w={window.innerWidth}
          h={window.innerHeight}
          style={{
            position: 'absolute',
            // backgroundColor:'blue',
            // opacity:0.5
          }}
        >
          <Image
            id="productBox"
            alt=""
            ref={imageRef}
            w={`${dimensiProduct.ProductWidth}`}
            className="target"
            onTouchEnd={onImgClick}
            src=""
            style={{
              objectFit: 'cover',
              position: 'relative',
              transform: 'translate(0px, 0px) rotate(0deg) scale(1)',
              transition: 'transform 0.3s ease 0s',
              transformOrigin: '0px 0px 0px',
              zIndex: '1800',
            }}
          />

          <Image
            id="productBoxCompare"
            alt=""
            src=""
            style={{
              display: 'none',
            }}
          />
        </Box>
      ) : (
        <Box
          id="boxprod"
          w={'100%'}
          h={window.innerHeight}
          style={{
            position: 'absolute',
            // backgroundColor:'blue',
            // opacity:0.5
          }}
        >
          <Image
            id="productBox"
            alt=""
            ref={imageRef}
            w={`${dimensiProduct.ProductWidth}`}
            className="target"
            onClick={onImgClick}
            src=""
            style={{
              objectFit: 'cover',
              position: 'relative',
              transform: 'translate(0px, 0px) rotate(0deg) scale(1)',
              transition: 'transform 0.3s ease 0s',
              transformOrigin: '0px 0px 0px',
              zIndex: '1800',
            }}
          />
          <Image
            id="productBoxCompare"
            alt=""
            src=""
            style={{
              display: 'none',
            }}
          />
        </Box>
      )}
      <Moveable
        draggable
        rotatable
        resizable={false}
        target={target}
        zoom={valimgCtrl}
        onDrag={onDrag}
        onDragEnd={onDragEnd}
        onRotateStart={onRotateStart}
        onRotate={e => {
          frame.rotate = e.beforeRotate
        }}
        onRotateEnd={({ lastEvent }) => {
          if (lastEvent) {
            frame.rotate = lastEvent.beforeRotate
            settrufalseRotate(1)
          }
        }}
        onRender={e => {
          const { translate, rotate, transformOrigin } = frame
          localStorage.setItem('dragableStatus', true)
          e.target.style.transformOrigin = transformOrigin
          e.target.style.transform = `translate(${translate[0]}px, ${translate[1]}px)` + ` rotate(${rotate}deg)`

          // console.log('translate:', translate)
          // console.log('rotate:', rotate)
          // console.log('transformOrigin:', transformOrigin)
        }}
      />
      <Center w="full" h="full">
        <Box
          id="productNotAvailable"
          alt=""
          className="target"
          style={{
            display: 'none',
            objectFit: 'cover',
            position: 'relative',
            transform: 'translate(0px, 0px) rotate(0deg) scale(1)',
            transition: 'transform 0.3s ease 0s',
            transformOrigin: '0px 0px 0px',
            zIndex: '1800',
          }}
          bg="gray.700"
          rounded="sm"
          px="2"
          py="4"
          w="200px"
          textAlign="center"
          color="white"
          fontSize="sm"
          shadow="lg"
          fontWeight="bold"
        >
          ⚠️ image not found
        </Box>
      </Center>
    </>
  )
}

export default memo(DragUseSpring)
