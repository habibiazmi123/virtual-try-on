import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import Metatags from '@/components/metatags'
import { Koordinats } from '@/components/koordinat'
import { URL_PRODUCT_CATEGORY } from '@/components/api/urls'
import LandingPage from '@/components/home/LandingPage'
import dynamic from 'next/dynamic'
import { CAT_BANGLES, CAT_BRACELETS, CAT_EARRINGS, CAT_NECKLACES, CAT_RINGS } from '@/components/values/product_categories'
import { Text } from '@chakra-ui/react'
import useModelStore from '@/components/stores/useModelStore'
import useParamsStore from '@/components/stores/useParamsStore'
import useProductStore from '@/components/stores/useProductStore'
// import LoadingPlaceholder from '@/components/home/LoadingPlaceholder'

const Detail = dynamic(() => import('@/components/detail/Detail'), {
  ssr: false,
})

const imageModelDefault = {
  Rings: { image: Koordinats.KoordinatRings.model.image },
  Bracelets: { image: Koordinats.KoordinatBracelets.model.image },
  Earings: { image: Koordinats.KoordinatEarrings.model.image },
  Bangles: { image: Koordinats.KoordinatBangles.model.image },
  Necklaces: { image: Koordinats.KoordinatNecklaces.model.image },
}

export default function Home() {
  const params = useSearchParams()
  const cat = params.get('cat')
  const id_cat = params.get('id_cat')
  const id_model = params.get('model_id')
  const id_product = params.get('product_id')

  const onSelectModel = useModelStore(s => s.onSelect)
  const setParams = useParamsStore(s => s.setParams)
  const [error, setError] = useState('')
  const [items, setItems] = useState([]) // @todo: where does "items" used?

  const productStackList = useProductStore(s => s.productStackList)
  const setProductStackList = useProductStore(s => s.setProductStackList)
  const setIndexProduct = useProductStore(s => s.setIndexProduct)
  const setFooterParams = useModelStore(s => s.setFooterParams)

  const init = useCallback(() => {
    // fetch from API
    const url = `${URL_PRODUCT_CATEGORY}/${id_cat}`
    fetch(url)
      .then(res => res.json())
      .then(
        result => {
          const arrImgStackProduct = []
          const arrImgStackThumb = []
          const arrTitle = []
          const arrPrice = []
          const arrProductID = []
          if (result.data) {
            for (let s = 0; s < result.data.length; s++) {
              const pricenumb = result.data[s].price
              const imageslider = result.data[s].photo_1
              arrProductID.push(result.data[s].id)
              arrTitle.push(result.data[s].title)
              arrPrice.push(
                'IDR ' +
                  parseFloat(pricenumb)
                    .toFixed(2)
                    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
              )
              arrImgStackThumb.push(imageslider.replace('https://adm.mizora.jewelry/storage/', 'https://assets.mizora.jewelry/'))
              arrImgStackProduct.push(result.data[s].photo_vto)

              // hardcode sementara, pke dummy. @todo: hapus jika API udh bener.
              if (arrImgStackProduct.length && cat === CAT_BANGLES) {
                arrImgStackProduct[0] = '/dummy_bangles/1.png'
              } else if (cat === CAT_NECKLACES) {
                arrImgStackProduct[0] = '/dummy_necklaces/1.png'
                arrImgStackProduct[1] = '/dummy_necklaces/2.png'
                arrImgStackProduct[2] = '/dummy_necklaces/3.png'
                arrImgStackProduct[3] = '/dummy_necklaces/4.png'
                arrImgStackProduct[4] = '/dummy_necklaces/5.png'
                arrImgStackProduct[5] = '/dummy_necklaces/6.png'
                arrImgStackProduct[6] = '/dummy_necklaces/7.png'
                arrImgStackProduct[7] = '/dummy_necklaces/8.png'
                arrImgStackProduct[8] = '/dummy_necklaces/9.png'
                arrImgStackProduct[9] = '/dummy_necklaces/10.png'
              }
            }
          }

          setTimeout(() => {
            setProductStackList({
              ProductImage: {
                Rings: cat === CAT_RINGS ? arrImgStackProduct : [],
                Bracelets: cat === CAT_BRACELETS ? arrImgStackProduct : [],
                Earings: cat === CAT_EARRINGS ? arrImgStackProduct : [],
                Bangles: cat === CAT_BANGLES ? arrImgStackProduct : [],
                Necklaces: cat === CAT_NECKLACES ? arrImgStackProduct : [],
              },
              ProductImageThumb: {
                Rings: cat === CAT_RINGS ? arrImgStackThumb : [],
                Bracelets: cat === CAT_BRACELETS ? arrImgStackThumb : [],
                Earings: cat === CAT_EARRINGS ? arrImgStackThumb : [],
                Bangles: cat === CAT_BANGLES ? arrImgStackThumb : [],
                Necklaces: cat === CAT_NECKLACES ? arrImgStackThumb : [],
              },
              productName: {
                Rings: cat === CAT_RINGS ? arrTitle : [],
                Bracelets: cat === CAT_BRACELETS ? arrTitle : [],
                Earings: cat === CAT_EARRINGS ? arrTitle : [],
                Bangles: cat === CAT_BANGLES ? arrTitle : [],
                Necklaces: cat === CAT_NECKLACES ? arrTitle : [],
              },
              productPrice: {
                Rings: cat === CAT_RINGS ? arrPrice : [],
                Bracelets: cat === CAT_BRACELETS ? arrPrice : [],
                Earings: cat === CAT_EARRINGS ? arrPrice : [],
                Bangles: cat === CAT_BANGLES ? arrPrice : [],
                Necklaces: cat === CAT_NECKLACES ? arrPrice : [],
              },
              productID: {
                Rings: cat === CAT_RINGS ? arrProductID : [],
                Bracelets: cat === CAT_BRACELETS ? arrProductID : [],
                Earings: cat === CAT_EARRINGS ? arrProductID : [],
                Bangles: cat === CAT_BANGLES ? arrProductID : [],
                Necklaces: cat === CAT_NECKLACES ? arrProductID : [],
              },
            })
            setItems(result)
          })
        },
        error => {
          setError(error)
        }
      )
      .catch(e => {
        alert('Fetch Error: ' + e)
      })
      .finally(() => {
        localStorage.setItem('KoordinatsModel', JSON.stringify(Koordinats))
        localStorage.setItem('dragableStatus', false)
        // localStorage.setItem('IndexParams', 0)
        onSelectModel(+id_model)
        // localStorage.setItem('indexProductStack', 0)
        setIndexProduct(+id_product)
      })
  }, [id_cat, setProductStackList, cat, onSelectModel, setIndexProduct])

  useEffect(() => {
    if (cat && id_cat) {
      // localStorage.setItem('params', JSON.stringify(params))
      setParams({
        cat,
        id_cat,
        login: params.get('login'),
        customer_id: params.get('customer_id'),
      })
      init()
    }
  }, [init, setParams, params, cat, id_cat])

  const footer_params = useMemo(() => {
    if (!params) {
      return null
    }

    if (cat === CAT_RINGS) {
      return {
        img_list: imageModelDefault.Rings.image,
        ProductImageThumb: productStackList.ProductImageThumb.Rings,
        ProductImage: productStackList.ProductImage.Rings,
        productName: productStackList.productName.Rings,
        productPrice: productStackList.productPrice.Rings,
        productID: productStackList.productID.Rings,
      }
    } else if (cat === CAT_BRACELETS) {
      return {
        img_list: imageModelDefault.Bracelets.image,
        ProductImageThumb: productStackList.ProductImageThumb.Bracelets,
        ProductImage: productStackList.ProductImage.Bracelets,
        productName: productStackList.productName.Bracelets,
        productPrice: productStackList.productPrice.Bracelets,
        productID: productStackList.productID.Bracelets,
      }
    } else if (cat === CAT_EARRINGS) {
      return {
        img_list: imageModelDefault.Earings.image,
        ProductImageThumb: productStackList.ProductImageThumb.Earings,
        ProductImage: productStackList.ProductImage.Earings,
        productName: productStackList.productName.Earings,
        productPrice: productStackList.productPrice.Earings,
        productID: productStackList.productID.Earings,
      }
    } else if (cat === CAT_BANGLES) {
      return {
        img_list: imageModelDefault.Bangles.image,
        ProductImageThumb: productStackList.ProductImageThumb.Bangles,
        ProductImage: productStackList.ProductImage.Bangles,
        productName: productStackList.productName.Bangles,
        productPrice: productStackList.productPrice.Bangles,
        productID: productStackList.productID.Bangles,
      }
    } else if (cat === CAT_NECKLACES) {
      return {
        img_list: imageModelDefault.Necklaces.image,
        ProductImageThumb: productStackList.ProductImageThumb.Necklaces,
        ProductImage: productStackList.ProductImage.Necklaces,
        productName: productStackList.productName.Necklaces,
        productPrice: productStackList.productPrice.Necklaces,
        productID: productStackList.productID.Necklaces,
      }
    }

    return null
  }, [
    cat,
    params,
    productStackList.ProductImage.Bangles,
    productStackList.ProductImage.Bracelets,
    productStackList.ProductImage.Earings,
    productStackList.ProductImage.Necklaces,
    productStackList.ProductImage.Rings,
    productStackList.ProductImageThumb.Bangles,
    productStackList.ProductImageThumb.Bracelets,
    productStackList.ProductImageThumb.Earings,
    productStackList.ProductImageThumb.Necklaces,
    productStackList.ProductImageThumb.Rings,
    productStackList.productID.Bangles,
    productStackList.productID.Bracelets,
    productStackList.productID.Earings,
    productStackList.productID.Necklaces,
    productStackList.productID.Rings,
    productStackList.productName.Bangles,
    productStackList.productName.Bracelets,
    productStackList.productName.Earings,
    productStackList.productName.Necklaces,
    productStackList.productName.Rings,
    productStackList.productPrice.Bangles,
    productStackList.productPrice.Bracelets,
    productStackList.productPrice.Earings,
    productStackList.productPrice.Necklaces,
    productStackList.productPrice.Rings,
  ])

  useEffect(() => {
    setFooterParams(footer_params)
  }, [footer_params, setFooterParams])

  return (
    <>
      <Metatags />
      {error ? <Text color="red.400">ERROR: {error}</Text> : null}
      {!error && cat && id_cat ? <Detail /> : null}
      {!cat && !id_cat ? <LandingPage /> : null}
    </>
  )
}
