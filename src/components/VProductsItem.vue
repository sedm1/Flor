<template>
    <div class="products__item">
        <div class="products__item-img">
            <button class="products__item-like" @click="DeleteFromFavourites(ProductsItem.id)" v-if="this.IsProductExist"><img src="@/assets/img/like-active.png" alt="Like"></button>
            <button class="products__item-like" @click="AddToFavourites(ProductsItem)" v-else><img src="@/assets/img/like.svg" alt="Like"></button>
            <img :src="require('@/assets/img/products/' + ProductsItem.img)" alt="ProductsItemImg">
            <div class="products__item-plash">
                <div class="plash-item plash-item-discount" v-if="ProductsItem.discount > 0">-{{ ProductsItem.discount }}%</div>
                <div class="plash-item plash-item-type" v-if="ProductsItem.new == 1">New</div>
            </div>
        </div>
        <div class="products__item-body">
            <div class="products__item-header">
                <div class="products__item-price">{{ ProductsItem.price }} ₽</div>
                <button class="products__item-cart"><img src="@/assets/img/Bag-black.svg" alt="BagBlack"></button>
            </div>
            <div class="products__item-manufacturer">{{ ProductsItem.manufacturer }}</div>
            <div class="products__item-title">{{ ProductsItem.title }}</div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    name: "VProductsItem",
    data(){
        return {
            IsProductExist: false
        }
    },
    props: {
        ProductsItem: {
            type: Object,
            default(){
                return {}
            }
        }
    },
    methods: {
        AddToFavourites(ProductItem){
            this.$emit('AddToFavourites', ProductItem)
            this.IsProductExist = true
        },
        DeleteFromFavourites(ProductItemId){
            this.$emit('DeleteFromFavourites', ProductItemId)
            this.IsProductExist = false
        }
    },
    computed: {
        ...mapGetters([
            'FAVOURITES'
        ])
    },
    mounted(){
        for (let favouritesItem of this.FAVOURITES){
            if(favouritesItem.id == this.ProductsItem.id){
                this.IsProductExist = true
                break;
            }
        }
        
    }
}
</script>
<style lang="sass" scoped>
    .products__item
        &-img
            position: relative
            height: 463px
            img
                height: 100%
        &-like
            position: absolute
            width: 34px
            top: 20px
            right: 7px
        &-header
            margin-top: 20px
            display: flex
            align-items: center
            justify-content: space-between
        &-price
            font-size: 20px
            font-weight: 600
        &-manufacturer
            margin-top: 10px
            font-size: 14px
            font-weight: 400
        &-title
            margin-top: 5px
            font-size: 14px
            font-weight: 400
        &-plash
            display: flex
            align-items: center
            position: absolute
            left: 0
            bottom: 0
            color: $white
            .plash-item
                padding: 5px 11px
                font-size: 14px
                font-weight: 600
            .plash-item-discount
                background: $red
            .plash-item-type
                background: $green
            
</style>