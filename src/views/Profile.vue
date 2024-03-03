<template>
    <div>
        <TheHeader></TheHeader>
        <main>
            <h2 class="section__title">Мой профиль</h2>
            <section class="info__header">
                <div class="container">
                    <div class="info__header-item">
                        <div class="item-title">Контакты</div>
                        <h3 class="item-descript">{{ this.USER }}</h3>
                    </div>
                    <div class="info__header-item">
                        <div class="item-title">Адрес доставки</div>
                        <h3 class="item-descript" v-if="this.USER">{{ this.USER }}, {{ this.USER.street }}, {{ this.USER.home }}</h3>
                        <h3 class="item-descript" v-else>Укажите в профиле</h3>
                    </div>
                    <div class="info__header-item">
                        <div class="item-title">Дата рождения</div>
                        <h3 class="item-descript" v-if="this.USER ">{{ this.USER }}</h3>
                        <h3 class="item-descript" v-else>Укажите в профиле</h3>
                    </div>
                    <div class="info__header-item">
                        <div class="item-title">Бонусы</div>
                        <h3 class="item-descript">{{ this.USER }}</h3>
                    </div>
                </div>
            </section>
            <section class="info__main">
                <div class="container">
                    <div class="info__main-tabs">
                        <ul class="tabs-list">
                            <li><router-link to="/profile/personal">Личные данные</router-link></li> 
                            <li><router-link to="/profile/orders">Заказы</router-link></li>   
                            <li><router-link to="/profile/favourites">Избранное</router-link></li>  
                            <li><button class="logout" @click="logout()">Выйти</button></li>
                        </ul>
                    </div>
                    <div class="info__main-block">
                        <router-view></router-view>
                    </div>
                </div>
            </section>
        </main>
    </div>
</template>
<script>
import TheHeader from '@/components/TheHeader.vue';
import { mapGetters, mapActions } from 'vuex';
export default {
    name: "ProfilePage",
    components: { TheHeader },
    computed: {
        ...mapGetters([
            'USER'
        ])
    },
    methods: {
        ...mapActions([
            'LOGOUT'
        ]),
        logout(){
            this.LOGOUT()
            this.$router.push('/')
        }
    }
}
</script>
<style lang="sass">
.section__title
    text-align: center
    margin-top: 50px
.info
    &__header
        .container
            display: grid
            grid-template-columns: 1fr 1fr 1fr 1fr
            padding-bottom: 43px
            border-bottom: 1px solid $gray
        &-item 
            text-align: center
        .item-title
            font-size: 14px
            font-weight: 400
        .item-descript
            margin-top: 13px
            font-size: 14px
            font-weight: 600
    &__main
        .container
            display: flex
            align-items: flex-start
            justify-content: space-between
        &-block
            max-width: 900px
            width: 100%
.tabs-list
    .router-link-active
        &::before
            width: 5px
            height: 5px
            border-radius: 100%
            background: $black
            position: absolute
            top: 5px
            left: -21px
            content: ""
    li
        margin-bottom: 24px
        font-size: 14px
        font-weight: 500
        color: $gray
        text-transform: uppercase
        a
            position: relative
    button
        color: #A8A8A8
        font-size: 14px
        font-weight: 500
        text-transform: uppercase
</style>