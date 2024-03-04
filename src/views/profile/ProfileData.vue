<template>
    <div>
        <div class="profile__block">
            <h3 class="profile__title">Личные данные</h3>
            <form method="POST">
                <div class="profile__input">
                    <p class="profile__input-title">имя <span>*</span></p>
                    <input 
                    type="text" 
                    class="profile__input-input" 
                    name="name"
                    v-model="this.RealUserData.name"
                    >
                </div>
                <div class="profile__input">
                    <p class="profile__input-title">фамилия <span>*</span></p>
                    <input 
                    type="text" 
                    class="profile__input-input" 
                    name="lastname"
                    v-model="this.RealUserData.lastname"
                    >
                </div>
                <div class="profile__input">
                    <p class="profile__input-title">email <span>*</span></p>
                    <input 
                    type="text" 
                    class="profile__input-input" 
                    name="email"
                    :value="this.UserData.email"
                    >
                </div>
                <div class="profile__input">
                    <p class="profile__input-title">Телефон <span>*</span></p>
                    <input 
                    type="tel" 
                    class="profile__input-input" 
                    name="phone"
                    placeholder="+7"
                    :value="this.UserData.phone"
                    >
                </div>
                <div class="profile__input">
                    <p class="profile__input-title">Дата рождения <span>*</span></p>
                    <input 
                    type="text" 
                    class="profile__input-input" 
                    name="birtday"
                    placeholder="--.--.--"
                    v-model="this.RealUserData.birtday"
                    >
                </div>
                <button class="profile__button" @click.prevent="SaveData()">Сохранить изменения</button>
            </form>
        </div>
        <div class="profile__block">
            <h3 class="profile__title">Адрес доставки</h3>
            <form method="POST">
                <div class="profile__input">
                    <p class="profile__input-title">город</p>
                    <input 
                    type="text" 
                    class="profile__input-input" 
                    name="city"
                    v-model="this.RealUserData.city"
                    >
                </div>
                <div class="profile__input">
                    <p class="profile__input-title">улица</p>
                    <input 
                    type="text" 
                    class="profile__input-input" 
                    name="street"
                    v-model="this.RealUserData.street"
                    >
                </div>
                <div class="profile__input">
                    <p class="profile__input-title">дом</p>
                    <input 
                    type="text" 
                    class="profile__input-input" 
                    name="house"
                    v-model="this.RealUserData.house"
                    >
                </div>
                <button class="profile__button" @click.prevent="SaveData()">Сохранить изменения</button>
            </form>
        </div>
        <div class="profile__block">
            <h3 class="profile__title">Смена пароля</h3>
            <form method="POST">
                <div class="profile__input">
                    <p class="profile__input-title">Новый пароль</p>
                    <input 
                    type="text" 
                    class="profile__input-input"
                    name="newpass"
                    v-model="this.RealUserData.newpass"
                    >
                </div>
                <button class="profile__button" @click.prevent="SaveData()">Сохранить изменения</button>
            </form>
        </div>
        
    </div>
</template>
<script>

export default {
    name: "ProfileData",
    props: {
        UserData: {
            type: Object,
            default(){
                return {}
            }
        }
    },
    data(){
        return {
            RealUserData: {
                name: null,
                lastname: null,
                birtday: null,
                city: null,
                street: null,
                house: null,
                newpass: null
            }
            
        }
    }
}
</script>
<style lang="sass">
    
</style>