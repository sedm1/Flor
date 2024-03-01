<template>
    <header>
        <p class="header__top">Lorem ipsum is placeholder text commonly used   -20%</p>
        <div class="container">
            <router-link to="/" class="header__logo">Logo</router-link>
            <div class="header__right">
                <router-link class="header__right-item" to="/"><img src="@/assets/img/User.svg" alt="HeaderRightIcon"></router-link>
                <router-link class="header__right-item" to="/"><img src="@/assets/img/like.svg" alt="HeaderRightIcon"></router-link>
                <router-link class="header__right-item" to="/"><img src="@/assets/img/Bag.svg" alt="HeaderRightIcon"></router-link>
            </div>
        </div>
    </header>
</template>
<script>
export default {
    name: 'TheHeader',
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
            &:last-child
                margin-right: 0px
    &__logo
        font-size: 20px
        font-weight: 700
        color: $white
</style>