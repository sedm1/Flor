import axios from 'axios'
import { createStore } from 'vuex'
import VuexPersistence from 'vuex-persist'
const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  reducer: (state) => ({
    Favourites: state.Favourites,
    User: state.User
  })
})
const API = 'http://flor/src/api/'




export default createStore({
  state: {
    AllProducts: [],
    Favourites: [],
    User: {
      name: '',
      lastname: '',
      email: '',
      phone: '',
      birthday: '',
      city: '',
      street: '',
      home: '',
      bonuses: 0,
      IsUserExist: false
    }
  },
  getters: {
    ALLPRODUCTS(state){
      return state.AllProducts
    },
    FAVOURITES(state){
      return state.Favourites
    },
    USER(state){
      return state.User
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
    REMOVE_PRODUCT_FROM_FAVOURITES: (state, FavouritesItemId) => {
      state.Favourites = state.Favourites.filter((item) => item.id !== FavouritesItemId)
    },
    SET_USER_TO_PROFILE: (state, RegistrationData) => {
      let RegistrationDataJson = Object.fromEntries(RegistrationData)
      state.User.email = RegistrationDataJson['email']
      state.User.phone = RegistrationDataJson['phone']
      state.User.IsUserExist = true
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
      commit('REMOVE_PRODUCT_FROM_FAVOURITES', FavouritesItemId)
    },
    REGISTRATION({commit}, RegistrationData){
      try {
        axios
        .post(API + 'registration.php', RegistrationData)
        .then(() => {
          commit('SET_USER_TO_PROFILE', RegistrationData)
        })
        .catch((err) => {
          console.log("Ошибка при отправке данных пользователя" + err)
          return err;
        })
      } catch(err){
        console.log("Ошибка при отправке данных пользователя")
        return err;
      }
    }
    
  },
  plugins: [vuexLocal.plugin]
})
