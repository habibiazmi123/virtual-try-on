import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Text, Flex, Divider, Image, Box } from '@chakra-ui/react'
import Moveable from 'react-moveable'
import { isMobile } from 'react-device-detect'
import { CAT_BRACELETS, CAT_EARRINGS, CAT_RINGS } from '../values/product_categories'
import useProductStore from '../stores/useProductStore'
import useParamsStore from '../stores/useParamsStore'

export default function Dragable() {
  const imageRef = useRef(null)
  const [target, setTarget] = useState()
  const [_, setimgCtrl] = useState('off')
  const [valimgCtrl, setvalimgCtrl] = useState(0)
  const [viewAble, setViewAble] = useState(false)

  const imageStackLS = useProductStore(s => s.productStackList)
  const cat = useParamsStore(s => s.cat)
  const productIndex = useProductStore(s => s.index_product)

  const [imageProductDefault, setimageProductDefault] = useState()

  const dimensiProduct = useMemo(() => {
    return cat === CAT_EARRINGS ? { ProductWidth: '50%' } : cat === CAT_BRACELETS ? { ProductWidth: '100%' } : cat === CAT_RINGS ? { ProductWidth: isMobile ? '66%' : '23%' } : []
  }, [cat])

  useEffect(() => {
    const productImages = imageStackLS.ProductImage
    switch (cat) {
      case CAT_RINGS:
        setimageProductDefault(productImages.Rings[productIndex])
        break
      case CAT_BRACELETS:
        setimageProductDefault(productImages.Bracelets[productIndex])
        break
      case CAT_EARRINGS:
        setimageProductDefault(productImages.Earings[productIndex])
        break
      default:
        setimageProductDefault('')
    }
  }, [cat, imageStackLS.ProductImage, productIndex])

  const DimensionViewable = React.useMemo(
    () => ({
      name: 'dimensionViewable',
      props: {},
      events: {},
      render() {
        const CW = !imageRef.current ? 100 : imageRef.current.clientWidth
        const CH = !imageRef.current ? 100 : imageRef.current.clientHeight
        const geserW = cat === 'rings' ? 20 : cat === 'bracelets' ? -40 : cat === 'earrings' ? 20 : 20
        const scaleCat = cat === 'rings' ? 0.8 : cat === 'bracelets' ? 1 : cat === 'earrings' ? 1 : 1
        return (
          <div
            key={'dimension-viewer'}
            className={'moveable-dimension'}
            id="dimensi"
            style={{
              position: 'absolute',
              zIndex: 3001,
              borderRadius: '2px',
              padding: '2px 4px',
              color: 'white',
              fontSize: '13px',
              whiteSpace: 'nowrap',
              fontWeight: 'bold',
              willChange: 'transform',
              transform: `translate(${CW - (CW + geserW)}px, ${CH}px) scale(${scaleCat},${scaleCat})`,
            }}
          >
            <Box
              id="height"
              style={{
                rotate: '90deg',
                position: 'absolute',
                transform: `translate(${(CW / 4 - CW) / 2 - 0}px, ${CH - CH / 2 - 40}px) scale(1, 1)`,
              }}
              display={cat === 'earrings' ? 'block' : 'none'}
            >
              <Flex alignItems="center" gap={0}>
                <Divider border="1px" orientation="horizontal" width={'10'} />
                <Divider border="1px" orientation="vertical" h={'5'} />
                <Text sx={{ whiteSpace: 'nowrap' }} padding={2}>
                  {cat === 'earrings' ? 'All Size' : ''}
                </Text>
                <Divider border="1px" orientation="vertical" h={'5'} />
                <Divider border="1px" orientation="horizontal" width={'10'} />
              </Flex>
            </Box>
            <Box id="width" display={cat === 'earrings' ? 'none' : 'block'}>
              <Flex alignItems="center" gap={0}>
                <Divider border="1px" orientation="horizontal" width={'10'} />
                <Divider border="1px" orientation="vertical" h={'5'} />
                <Text sx={{ whiteSpace: 'nowrap' }} padding={2}>
                  {cat === 'rings' ? '16.20 mm' : cat === 'bracelets' ? 'All Size' : cat === 'earrings' ? '' : ''}
                </Text>
                <Divider border="1px" orientation="vertical" h={'5'} />
                <Divider border="1px" orientation="horizontal" width={'10'} />
              </Flex>
            </Box>
            {}
          </div>
        )
      },
    }),
    [cat]
  )
  const [frame, setFrame] = React.useState({
    translate: [0, 0],
    rotate: 0,
    transformOrigin: '0 0',
  })

  const ImageClick = React.useCallback(() => {
    const moveableOrigin = document.querySelectorAll('.moveable-origin')
    const moveableDirections = document.querySelectorAll('.moveable-direction')
    if (moveableOrigin[0]) moveableOrigin[0].style.opacity = 0
    if (moveableDirections[0]) moveableDirections[0].style.opacity = 0
    if (moveableDirections[1]) moveableDirections[1].style.opacity = 0
    if (moveableDirections[2]) moveableDirections[2].style.opacity = 0
    if (moveableDirections[3]) moveableDirections[3].style.opacity = 0

    setimgCtrl(imgCtrl => {
      if (imgCtrl === 'on') {
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
    document.addEventListener('mousedown', ImageClick)
    setTarget(document.querySelector('.target'))
    setFrame({
      translate: [0, 0],
      rotate: 0,
      transformOrigin: '0 0',
    })
  }, [ImageClick])

  return (
    <>
      {isMobile ? (
        <>
          <Box
            id="boxprod2"
            w={window.innerWidth / 2}
            h={'100%'}
            style={{
              position: 'absolute',
              // backgroundColor:'blue',
              opacity: 0.5,
            }}
          >
            <Image
              alt=""
              id="productBox"
              ref={imageRef}
              w={`${dimensiProduct.ProductWidth}`}
              className="target"
              onTouchEnd={ImageClick}
              src={`${imageProductDefault}`}
              style={{
                objectFit: 'contain',
                position: 'relative',
                transform: 'translate(0px, 0px) rotate(0deg) scale(1)',
                transition: 'transform 0.3s ease 0s',
                transformOrigin: '0px 0px 0px',
                zIndex: '1800',
                bottom: cat === 'earrings' ? '146px' : '120px',
                left: cat === 'earrings' ? '-32px' : '-72px',
              }}
            />
          </Box>
        </>
      ) : (
        <>
          {/* width set permodel */}
          <Box
            id="boxprod2"
            w={'100%'}
            h={window.innerHeight}
            margin={-2}
            padding="0"
            style={{
              position: 'absolute',
              opacity: 0.5,
              left: '-55%',
            }}
          >
            <Image
              alt=""
              id="productBox"
              ref={imageRef}
              w={`${dimensiProduct.ProductWidth}`}
              className="target"
              onClick={ImageClick}
              src={`${imageProductDefault}`}
              style={{
                objectFit: 'contain',
                position: 'relative',
                transform: 'translate(0px, 0px) rotate(0deg) scale(1)',
                transition: 'transform 0.3s ease 0s',
                transformOrigin: '0px 0px 0px',
                maxWidth: cat === 'bracelets' ? '250px' : '172px',
                maxHeight: '125px',
                display: 'inline-block',
                zIndex: '1800',
                top: cat === 'earrings' ? '200px' : '252px',
                left: '77%',
              }}
            />
          </Box>
        </>
      )}
      <Moveable
        target={target}
        zoom={valimgCtrl}
        draggable={true}
        resizable={false}
        rotatable={false}
        ables={[DimensionViewable]}
        props={{
          dimensionViewable: viewAble,
        }}
        onDrag={e => {
          frame.translate = e.beforeTranslate
        }}
        onRotateStart={e => {
          e.set(frame.rotate)
        }}
        onRotate={e => {
          frame.rotate = e.beforeRotate
        }}
        onRender={e => {
          const { translate, rotate, transformOrigin } = frame
          localStorage.setItem('dragableStatus', 'true')
          e.target.style.transformOrigin = transformOrigin
          e.target.style.transform = `translate(${translate[0]}px, ${translate[1]}px)` + ` rotate(${rotate}deg)`
        }}
      />
    </>
  )
}
