<template>
  <div>
    <TheHeader></TheHeader>
    <main>
      <section class="main">
        <div class="container">
          <div class="main__block">
            <h1 class="main__title">Spring mood</h1>
            <p class="main__descript">-20% на новую коллекцию.</p>
            <router-link to="/" class="main__link">В каталог <img src="@/assets/img/arrow__right.svg" alt="arrow"></router-link>
          </div>
        </div>
      </section>
      <section class="popular">
        <div class="container">
          <h2 class="section__title">Популярное</h2>
          <Products
          :ProductsArray="this.PopularProducts()"
          >
            
          </Products>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import TheHeader from '@/components/TheHeader.vue';
import Products from '@/components/Products.vue'
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'HomePage',
  components: { TheHeader, Products },
  methods: {
    ...mapActions([
      'GET_ALL_PRODUCTS_FORM_DB',
    ]),
    PopularProducts: function(){
      return this.ALLPRODUCTS.filter((ProductsItem) => {
        return ProductsItem['new'] == 1
      })
    }
  },
  computed: {
    ...mapGetters([
      'ALLPRODUCTS'
    ])
  },
  mounted(){
    this.GET_ALL_PRODUCTS_FORM_DB()
  }
}
</script>
<style lang="sass" scoped>
  .main
    margin-top: 54px
    .container
      background-image: url('@/assets/img/main__bg.jpeg')
      background-size: cover
      background-repeat: no-repeat
      background-position: center center
      padding: 132px 0px
      display: flex
      align-items: center
      justify-content: center
    &__block
      background: rgba(255, 255, 255, 0.7)
      border-radius: 20px
      padding: 88px 91px
      text-align: center
    &__title
      font-size: 64px
      font-weight: 500
      margin-bottom: 30px
    &__descript
      font-size: 30px
      font-weight: 500
    &__link
      padding: 18px 27px
      background: $gray
      border-radius: 50px
      text-transform: uppercase
      display: flex
      align-items: cente
      margin: 0 auto
      margin-top: 30px
      width: fit-content
      font-size: 14px
      font-weight: 600
      color: $white
      img
        width: 24px
        margin-left: 10px
</style>