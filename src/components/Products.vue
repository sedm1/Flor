<template>
    <div class="products">
        <VProductsItem 
        v-for="ProductsItem in this.ProductsArray"
        :key="ProductsItem.id"
        :ProductsItem="ProductsItem"
        @AddToFavourites="AddToFavourites"
        @DeleteFromFavourites="DeleteFromFavourites"
        >
        </VProductsItem>
    </div>
</template>
<script>
import VProductsItem from '@/components/VProductsItem.vue'
import { mapActions } from 'vuex'
export default {
    name: "ProductsBlock",
    components: {VProductsItem},
    props: {
        ProductsArray: {
            type: Object,
            default(){
                return {}
            }
        }
    },
    methods: {
        ...mapActions([
            'ADD_TO_FAVOURITES',
            'DELETE_FROM_FAVOURITES'
        ]),
        AddToFavourites(item){
            this.ADD_TO_FAVOURITES(item)
        },
        DeleteFromFavourites(itemId){
            this.DELETE_FROM_FAVOURITES(itemId)
        }
    }
}
</script>
<style lang="sass" scoped>
    .products
        display: grid
        grid-template-columns: repeat(4, 1fr)
        gap: 34px 30px
        margin-top: 50px
</style>