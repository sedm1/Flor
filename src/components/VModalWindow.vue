<template>
    <transition name="modal">
        <div class="modal__bg" v-if="IsModalOpen">
        <div class="modal__window">
            <button 
            class="modal__close"
            @click="CloseModal()"
            ><img src="@/assets/img/close.svg" alt="CloseButton"></button>
            <transition  name="window-animate" mode="out-in">
                <div class="modal__reg" v-if="IsRegistrationModal" key="registration">
                    <h2 class="modal__title">Регистрация</h2>
                    <form action="" method="POST">
                        <div class="form__item">
                            <p class="form__item-title">Введите ваш email</p>
                            <input 
                            type="text" 
                            name="email" 
                            placeholder="email@gmail.com"
                            v-model="RegistrationData.email"
                            >
                        </div>
                        <div class="form__item">
                            <p class="form__item-title">Введите ваш телефон</p>
                            <input 
                            type="tel" 
                            name="phone" 
                            placeholder="+7 (999) 999-99-99"
                            v-model="RegistrationData.phone"
                            >
                        </div>
                        <div class="form__item">
                            <p class="form__item-title">Введите ваш пароль</p>
                            <input 
                            type="password" 
                            name="pass" 
                            placeholder="********"
                            v-model="RegistrationData.pass"
                            >
                        </div>
                        <button class="form__button"
                        @click="Registration()"
                        type="button"
                        >Зарегистрироваться</button>
                    </form>
                    <button 
                    @click.prevent="RemakeModal()"
                    class="remake__modal"
                    
                    >Есть аккаунт? Войти</button>
                </div>
                <div class="modal__log" v-else key="autorisation">
                    <h2 class="modal__title">Авторизация</h2>
                    <form action="">
                        <div class="form__item">
                            <p class="form__item-title">Введите ваш email</p>
                            <input 
                            type="email" 
                            name="email" 
                            placeholder="email@gmail.com"
                            v-model="LoginData.email"
                            >
                        </div>
                        <div class="form__item">
                            <p class="form__item-title">Введите ваш пароль</p>
                            <input 
                            type="password" 
                            name="pass" 
                            placeholder="********"
                            v-model="LoginData.pass"
                            >
                        </div>
                        <button 
                        class="form__button"
                        @click.prevent="Login()"
                        type="button"
                        >Войти</button>
                    </form>
                    <button 
                    @click="RemakeModal()"
                    class="remake__modal"
                    >Нет аккаунта? Зарегистрироваться</button>
                </div>
            </transition >
        </div>
    </div>
    </transition>
    
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    name: "VModalWindow",
    data(){
        return {
            IsRegistrationModal: true,
            RegistrationData: {
                email: null,
                phone: null,
                pass: null
            },
            LoginData: {
                email: null,
                pass: null
            }
        }
    },
    props: {
        IsModalOpen: {
            type: Boolean, 
            default(){
                return false
            }
        }
    },
    methods: {
        ...mapActions([
            'REGISTRATION',
            'AUTORISATION'
        ]),
        CloseModal(){
            this.$emit('CloseModal')
        },
        RemakeModal(){
            this.IsRegistrationModal = !this.IsRegistrationModal
        },
        Registration(){
            let formData = new FormData();
            formData.append('email', this.RegistrationData.email)
            formData.append('phone', this.RegistrationData.phone)
            formData.append('pass', this.RegistrationData.pass)
            this.REGISTRATION(formData)
        },
        Login(){
            let formData = new FormData();
            formData.append('email', this.LoginData.email)
            formData.append('pass', this.LoginData.pass)
            this.AUTORISATION(formData)
        }
    },
    computed: {
        ...mapGetters([
            'USER'
        ])
    }
}
</script>
<style lang="sass" scoped>
.modal
    &__bg
        position: fixed
        top: 0
        left: 0
        width: 100%
        height: 100dvh
        background: rgba(0, 0, 0, 0.4)
        display: flex
        align-items: center
        justify-content: center
        transition: opacity 0.3s ease
    &__window
        padding: 48px
        position: relative
        background: $white
        transition: all 0.3s ease
        max-width: 476px
        width: 100%
        .form
            &__item
                margin-top: 20px
                &-title 
                    font-size: 14px
                    font-weight: 400
                    margin-bottom: 10px
                input
                    width: 100%
                    border-radius: 50px
                    border: 1px solid #B6B6B6
                    font-size: 16px
                    font-weight: 500
                    padding: 14px 0px
                    padding-left: 20px
                    &::placeholder
                        color: #B6B6B6
                        font-size: 16px
            &__button
                width: 100%
                padding: 16px 0px
                font-size: 14px
                font-weight: 600
                color: $white
                text-transform: uppercase
                margin-top: 30px
                background: $gray
                border-radius: 50px
        .remake__modal
            text-align: center
            width: 100%
            text-align: center
            margin-top: 20px
    &__close
        position: absolute
        width: 25px
        top: 17px
        right: 17px

    &-enter-from 
        opacity: 0
        .modal__window
            transform: scale(1.1)
    &-leave-to 
        opacity: 0
        .modal__window
            transform: scale(1.1)
    &__title
        font-size: 32px
        font-weight: 600
        text-align: center
        margin-bottom: 10px
.window-animate-enter-active, .window-animate-leave-active 
  transition: opacity 0.5s ease
.window-animate-enter-from, .window-animate-leave-to 
  opacity: 0

</style>