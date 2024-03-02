<template>
    <div>
        <TheHeader></TheHeader>
        <main>
            <h2 class="section__title">Мой профиль</h2>
            <section class="info__header">
                <div class="container">
                    <div class="info__header-item">
                        <div class="item-title">Контакты</div>
                        <h3 class="item-descript">{{ this.USER.phone }}</h3>
                    </div>
                    <div class="info__header-item">
                        <div class="item-title">Адрес доставки</div>
                        <h3 class="item-descript" v-if="this.USER.city">{{ this.USER.city }}, {{ this.USER.street }}, {{ this.USER.home }}</h3>
                        <h3 class="item-descript" v-else>Укажите в профиле</h3>
                    </div>
                    <div class="info__header-item">
                        <div class="item-title">Дата рождения</div>
                        <h3 class="item-descript" v-if="this.USER.birthday ">{{ this.USER.birthday }}</h3>
                        <h3 class="item-descript" v-else>Укажите в профиле</h3>
                    </div>
                    <div class="info__header-item">
                        <div class="item-title">Бонусы</div>
                        <h3 class="item-descript">{{ this.USER.bonuses }}</h3>
                    </div>
                </div>
            </section>
        </main>
    </div>
</template>
<script>
import TheHeader from '@/components/TheHeader.vue';
import { mapGetters } from 'vuex';
export default {
    name: "ProfilePage",
    components: { TheHeader },
    computed: {
        ...mapGetters([
            'USER'
        ])
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
</style>