import axios from 'axios'
import { createStore } from 'vuex'
import VuexPersistence from 'vuex-persist'
import { useToast } from 'vue-toastification'


/* eslint-disable */
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
    },
    LocalUserData: {
      name: null,
      lastname: null,
      email: null,
      phone: null,
      birthday: null,
      city: null,
      street: null,
      home: null,
      bonuses: null
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
    },
    USERDATA(state){
      return state.LocalUserData
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
    },
    SET_USER_TO_STATE: (state, UsersData) =>{
      let UserData = UsersData.data[0]
      state.LocalUserData.name = UserData['name']
      state.LocalUserData.lastname = UserData['lastname']
      state.LocalUserData.email = UserData['email']
      state.LocalUserData.phone = UserData['phone']
      state.LocalUserData.birthday = UserData['birthday']
      state.LocalUserData.city = UserData['city']
      state.LocalUserData.street = UserData['street']
      state.LocalUserData.home = UserData['home']
      state.LocalUserData.bonuses = UserData['bonuses']
    },
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
    },
    GET_USER_DATA({commit}, HashId){
      try {
        axios
        .post(API + 'userdata.php', HashId)
        .then((res) => {
          commit('SET_USER_TO_STATE', res)
        })
        .catch((err) => {
          console.log('Ошибка при получении данных пользователся')
          return err;
        })
      } catch(err){
        console.log('Ошибка при получении данных пользователся')
        return err;
      }
    },
    SEND_DATA_TO_BD({commit}, UserData){
      try {
        axios
        .post(API + 'newUserData.php', UserData)
        .then((res) => {
          console.log(res)
          toast.success("Данные успешно обновлены!", {
            timeout: 3000,
            closeOnClick: true,
            draggable: true,
            draggablePercent: 2,
            hideProgressBar: true,
          });
        })
        .catch((err) => {
          console.log("Ошибка при отправке доп. данных пользователя")
          return err;
        })
      } catch(err){
        console.log("Ошибка при отправке доп. данных пользователя")
        return err;
      }
    }
  },
  plugins: [Local.plugin]
})
