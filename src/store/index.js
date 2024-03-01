import axios from 'axios'
import { createStore } from 'vuex'
import VuexPersistence from 'vuex-persist'
const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
})

const API = 'http://flor/src/api/'

export default createStore({
  state: {
    AllProducts: [],
    Favourites: []
  },
  getters: {
    ALLPRODUCTS(state){
      return state.AllProducts
    },
    FAVOURITES(state){
      return state.Favourites
    }
  },
  mutations: {
    SET_PRODUCTS_TO_STATE: (state, products) =>{
      state.AllProducts = products
    },
    SET_PRODUCT_TO_FAVOURITES: (state, FavouritesItem) => {
      if (state.Favourites.length){
        let IsProductExist = false
        state.Favourites.map((item) => {
          if (item.id == FavouritesItem.id){
            IsProductExist = true
          }
        })
        if (!IsProductExist){
          state.Favourites.push(FavouritesItem)
        }
      } else {
        state.Favourites.push(FavouritesItem)
      }
    }, 
    REMOVE_PRODUCT_FROM_FVOURITES: (state, FavouritesItemId) => {
      state.Favourites = state.Favourites.filter((item) => item.id !== FavouritesItemId)
    }
  },
  actions: {
    async GET_ALL_PRODUCTS_FORM_DB({commit}){
      try {
        const products = await axios(API + 'api.php?action=GetAllProducts', {
          method: "POST"
        })
        commit('SET_PRODUCTS_TO_STATE', products.data)
        return products.data
      } catch (error) {
        console.log("Ошибка при получении продуктов " + error)
        return error
      }
    },
    ADD_TO_FAVOURITES({commit}, FavouritesItem){
      commit('SET_PRODUCT_TO_FAVOURITES', FavouritesItem)
    },
    DELETE_FROM_FAVOURITES({commit}, FavouritesItemId){
      commit('REMOVE_PRODUCT_FROM_FVOURITES', FavouritesItemId)
    }
    
  },
  plugins: [vuexLocal.plugin]
})
