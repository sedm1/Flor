<template>
    <header>
        <teleport to="body">
            <VModalWindow
            :IsModalOpen="IsModalOpen"
            :TypeOfModal="'Registration'"
            @CloseModal="CloseModal"
            ></VModalWindow>
        </teleport>
        <p class="header__top">Lorem ipsum is placeholder text commonly used   -20%</p>
        <div class="container">
            <router-link to="/" class="header__logo">Logo</router-link>
            <div class="header__right">
                <button 
                class="header__right-item" 
                @click="OpenProfile()"
                ><img src="@/assets/img/User.svg" alt="HeaderRightIcon"></button>


                <router-link class="header__right-item" to="/">
                    <img src="@/assets/img/like.svg" alt="HeaderRightIcon">
                    <div class="item-count" v-if="this.FAVOURITES.length">{{ this.FAVOURITES.length }}</div>
                </router-link>
                <router-link class="header__right-item" to="/"><img src="@/assets/img/Bag.svg" alt="HeaderRightIcon"></router-link>
            </div>
        </div>
    </header>
</template>
<script>
import { mapGetters } from 'vuex';
import VModalWindow from './VModalWindow.vue';

export default {
    name: 'TheHeader',
    data(){
        return {
            IsModalOpen: false
        }
    },
    computed: {
        ...mapGetters([
            'FAVOURITES',
            'USER'
        ])
    },
    methods: {
        OpenProfile() {
            if (this.USER.IsUserExist) {
                this.$router.push('profile');
            }
            else {
                this.IsModalOpen = true
            }
        },
        CloseModal(){
            this.IsModalOpen = false
        }
    },
    components: { VModalWindow }
}
</script>
<style lang="sass" scoped>
header
    background: $black
    .container
        padding: 23px 0px
        display: flex
        align-items: center
        justify-content: space-between
.header
    &__top
        padding: 18px 0px
        text-align: center
        background: $white
        font-weight: 600
        font-size: 14px
        color: $gray
        text-transform: uppercase
    &__right
        display: flex
        align-items: center
        &-item
            width: 24px
            margin-right: 20px
            position: relative
            &:last-child
                margin-right: 0px
            .item-count
                position: absolute
                top: -10px
                right: -10px
                font-size: 12px
                color: $white
                background: $red
                border-radius: 100%
                display: flex
                align-items: center
                justify-content: center
                width: 18px
                height: 18px
    &__logo
        font-size: 20px
        font-weight: 700
        color: $white
</style>