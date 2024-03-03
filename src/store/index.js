import axios from 'axios'
import { createStore } from 'vuex'
import VuexPersistence from 'vuex-persist'
import { useToast } from 'vue-toastification'



const toast = useToast()
const Local = new VuexPersistence({
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
      HashId: '',
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
    SET_USER_TO_PROFILE: (state, UserId) => {
      state.User.HashId = UserId
      
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

    //USER
    REGISTRATION({commit}, RegistrationData){
      try {
        axios
        .post(API + 'registration.php', RegistrationData)
        .then((res) => {
          if (res.data.status == 'User Exist - email'){
            toast.error("Пользователь с такой почтой уже существует", {
              timeout: 3000,
              closeOnClick: true,
              draggable: true,
              draggablePercent: 2,
              hideProgressBar: true,
            });
          } else if(res.data.status == 'User Exist - phone'){
            toast.error("Пользователь с таким телефоном уже существует", {
              timeout: 3000,
              closeOnClick: true,
              draggable: true,
              draggablePercent: 2,
              hideProgressBar: true,
            });
          } else {
            commit('SET_USER_TO_PROFILE', res.data.id)
            toast.success("Регистрация успешена!", {
              timeout: 3000,
              closeOnClick: true,
              draggable: true,
              draggablePercent: 2,
              hideProgressBar: true,
            });
          }
          
        })
        .catch((err) => {
          console.log("Ошибка при отправке данных пользователя (регистрация) " + err)
          return err;
        })
      } catch(err){
        console.log("Ошибка при отправке данных пользователя (регистрация)")
        return err;
      }
    },
    AUTORISATION({commit}, AutorisationData){
      try{
        axios
        .post(API + 'autorisation.php', AutorisationData)
        .then((res) => {
          if (res.data.status == '1'){
            commit('SET_USER_TO_PROFILE', res.data.id)
            toast.success("Вход успешен!", {
              timeout: 3000,
              closeOnClick: true,
              draggable: true,
              draggablePercent: 2,
              hideProgressBar: true,
            });
          } else {
            toast.error("Профиль был не найден", {
              timeout: 3000,
              closeOnClick: true,
              draggable: true,
              draggablePercent: 2,
              hideProgressBar: true,
            });
          }
        })
        .catch((err) => {
          console.log("Ошибка при отправке данных пользователя (авторизация)")
          return err;
        })

      }catch(err){
        console.log("Ошибка при отправке данных пользователя (авторизация)")
        return err;
      }
    },
    LOGOUT({commit}){
      commit('SET_USER_TO_PROFILE', '')
    }
  },
  plugins: [Local.plugin]
})
