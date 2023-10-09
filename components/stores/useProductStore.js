import { create } from 'zustand'

const useProductStore = create(set => ({
  index_product: 0,
  productStackList: {
    ProductImage: {
      Rings: [],
      Bracelets: [],
      Earings: [],
      Bangles: [],
      Necklaces: [],
    },
    ProductImageThumb: {
      Rings: [],
      Bracelets: [],
      Earings: [],
      Bangles: [],
      Necklaces: [],
    },
    productName: {
      Rings: [],
      Bracelets: [],
      Earings: [],
      Bangles: [],
      Necklaces: [],
    },
    productPrice: {
      Rings: [],
      Bracelets: [],
      Earings: [],
      Bangles: [],
      Necklaces: [],
    },
    productID: {
      Rings: [],
      Bracelets: [],
      Earings: [],
      Bangles: [],
      Necklaces: [],
    },
  },
  setProductStackList: obj => set({ productStackList: obj }),
  setIndexProduct: index => set({ index_product: index }),
}))

export default useProductStore
