<template>
  <div class="cartcontrol">
      <transition name="move">
          <!-- food由props传进来，由父组件shopcart传进来 -->
          <!--shopcart: <cartcontrol :food="food"></cartcontrol> -->
        <div class="cart-decrease" v-show="food.count>0" @click.stop.prevent="decreaseCart">
            <i class="inner icon-remove_circle_outline"></i>
        </div>
      </transition>
      <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
      <div class="cart-add" @click.stop.prevent="addCart">
          <i class="icon-add_circle"></i>
      </div>
  </div>
</template>

<script  type="text/ecmascript-6">
import Vue from 'vue'

export default {
  props:{
    //   food由props传进来，由父组件shopcart传进来
    // shopcart: <cartcontrol :food="food"></cartcontrol>
      food:{
          type:Object
      }
  },
  methods:{
      addCart(){
          if(!event._constructed){
          return;
        }
          if(!this.food.count){
              //给父组件添加属性
              Vue.set(this.food,'count',1)
          }else{
              this.food.count++;
          }
          this.$emit('add',event.target);//派发事件
      },
      decreaseCart(){
          if(!event._constructed){
          return;
        }
        if(this.food.count){
            this.food.count--;
        }
      }
  },
  created(){

  }
}
</script>

<style  lang="stylus" rel="stylesheet/stylus">
    .cartcontrol
        font-size 0
        .cart-decrease
            display inline-block
            padding 6px
             // 2.0动画写法
            .inner
                display: inline-block
                line-height: 24px
                font-size: 24px
                color: rgb(0, 160, 220)
                transition: all 0.4s linear
                transform: rotate(0)
                // 经历的过程
            &.move-enter-active, &.move-leave-active
                transition: all 0.4s linear
                // 最后的状态
            &.move-enter, &.move-leave-to
                opacity: 0
                transform: translate3d(24px, 0, 0)
                .inner
                    transform: rotate(180deg)
        .cart-count
            display inline-block
            vertical-align top
            text-align center
            width 12px
            padding-top 6px
            line-height 24px
            font-size 11px
            color rgb(147,153,159)            
        .cart-add
            display inline-block
            padding 6px
            line-height 24px
            font-size 24px
            color rgb(0,160,220)            
</style>
