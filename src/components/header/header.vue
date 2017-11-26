<template>
    <div class="header">
        <div class="content-wrapping">
            <div class="avatar">
                <img width="64" height="64" :src="seller.avatar" alt="">
            </div>
            <div class="content">
                <div class="title">
                    <span class="brand"></span>
                    <span class="name">{{seller.name}}</span>
                </div>
                <div class="description">
                    {{seller.description}}/{{seller.deliveryTime}}分钟送达
                </div>
                <div v-if="seller.supports" class="supports">
                    <span :class="classMap[seller.supports[0].type]" class="icon"></span>
                    <span class="text">{{seller.supports[0].description}}</span>
                </div>
            </div>
            <div class="supports-count" @click="showDetail">
                <span v-if="seller.supports" class="count">{{seller.supports.length}}个</span>
                <i class="icon-keyboard_arrow_right"></i>
            </div>
        </div>
        <div class="bulletin-wrapping" @click="showDetail">
            <span class="bulletin-icon"></span><span class="bulletin-text">{{seller.bulletin}}</span>
            <i class="icon-keyboard_arrow_right"></i>   
        </div>
        <div class="background">
            <img :src="seller.avatar" width="100%" height="100%" alt="">
        </div>
        <transition name="fade">
            <div v-show="detailShow" class="detail">
                <div class="detail-wrapper clearfix">
                    <div class="detail-main">
                        <div class="name">{{seller.name}}</div>
                        <div class="star-wrapper">
                            <star :size="48" :score="seller.score"></star>                        
                        </div>
                        <div class="title">
                            <div class="line"></div>
                            <div class="text">优惠信息</div>
                            <div class="line"></div>                        
                        </div>
                        <ul v-if="seller.supports" class="supports">
                            <!-- 注意2.0中index的写法 -->
                            <li v-for="(item,index) in seller.supports" class="supports-item">  
                                <span class="icon" :class="classMap[seller.supports[index].type]"></span>
                                <span class="text">{{seller.supports[index].description}}</span>
                            </li>
                        </ul>
                        <div class="title">
                            <div class="line"></div>
                            <div class="text">商家公告</div>
                            <div class="line"></div>                        
                        </div>
                        <div class="bulletin">
                            <div class="content">
                                <p>{{seller.bulletin}}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="detail-close" @click="hideDetail">
                    <i class="icon-close"></i>
                </div>
            </div>
        </transition>
       
    </div>
</template>

<script type="text/ecmascript-6">
import star from '../star/star'

export default {
  props:{
      seller:{
          type:Object
      }
  },
  data(){
      return{
        detailShow:false
      }
  },
  created(){
      this.classMap=["decrease","discount",'special','invoice','guarantee'];
  },
  methods:{
      showDetail(){
          this.detailShow=true;
      },
      hideDetail(){
          this.detailShow=false;
      }
  },
  components: {
      'star': star
    }
}
</script>
   

<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixin.styl';
 .header
    position relative
    overflow hidden
    color:#fff
    background rgba(7,17,27,0.5)
    .content-wrapping
        position relative
        padding:24px 12px 18px 24px
        font-size:0
        .avatar
            display:inline-block
            vertical-align top
            img
                border-radius 2px
        .content
            display:inline-block
            margin-left:16px
            .title
                margin 2px 0 8px 0
                .brand
                    display:inline-block
                    vertical-align:top
                    width:30px
                    height:18px
                    bg-image("brand")
                    background-size:30px 18px
                    background-repeat:no-repeat
                .name
                    margin-left:6px
                    font-size:16px
                    line-height:18px
                    font-weight:bold
            .description
                font-size 12px
                line-height 12px
                margin-bottom 10px
            .supports
                .icon
                    display inline-block
                    width 12px
                    height 12px
                    margin-right 4px
                    vertical-align top
                    background-size 12px 12px
                    background-repeat no-repeat
                    &.decrease
                        bg-image('decrease_1')
                    &.discount
                        bg-image('discount_1')
                    &.guarantee
                        bg-image('guarantee_1')
                    &.invoice
                        bg-image('invoice_1')
                    &.special
                        bg-image('special_1')
                .text
                    font-size 12px
                    line-height 16px
        .supports-count
            position absolute
            right 12px
            bottom 14px
            padding 0 8px
            height 24px
            border-radius 14px
            background rgba(0,0,0,0.2)
            line-height 24px
            text-align center
            .count
                font-size 10px
                vertical-align top
            .icon-keyboard_arrow_right
                margin-left 2px
                line-height 24px
                font-size 10px                    
    .bulletin-wrapping
        position relative
        height 28px
        line-height 28px
        padding 0 22px 0 12px
        // 设置文字折叠
        white-space nowrap
        overflow hidden
        text-overflow ellipsis
        background rgba(7,17,27,0.2)
        .bulletin-icon
            display inline-block
            vertical-align top
            margin-top 8px
            width:22px
            height:12px
            bg-image("bulletin")
            background-size:22px 12px
            background-repeat:no-repeat
        .bulletin-text
            vertical-align top
            font-size 10px
            margin 0 4px
        .icon-keyboard_arrow_right
            position absolute
            right 12px
            top 8px
            font-size 10px
    .background
        position absolute
        top 0
        left 0
        width 100%
        height 100%
        z-index -1
        filter blur(10px)//模糊滤镜
    .detail
        position fixed
        width 100%
        height 100%
        top 0
        right 0
        z-index 100
        overflow auto
        background rgba(7,17,27,0.8)
        backdrop-filter:blur(10px)
        // 2.0动画写法
        // 过渡状态
        &.fade-enter-active,&.fade-leave-active
            transition all .5s 
            opacity 1
            background rgba(7,17,27,0.8)
        // 最终状态
        &.fade-enter,&.fade-leave-to
            opacity 0
            background rgba(7,17,27,0)
    .detail-wrapper
        min-height 100%  //最小高度为视口
        width 100%  //撑开容器，让.name设置text-align生效
        .detail-main
            margin-top 64px
            padding-bottom 64px//留给×位置
            .name
                font-size 16px
                font-weight 700
                line-height 16px
                text-align center
            .star-wrapper
                margin-top 18px
                padding 2px 0
                text-align center
            .title
                display flex
                width 80%
                margin 28px auto 24px auto
                .line  //自适应横线
                    flex 1  //均分布局
                    position relative
                    top -6px
                    border-bottom  1px solid rgba(255,255,255,0.2)
                .text
                    padding 0 12px
                    font-size 14px
                    font-weight 700
            .supports
                 margin 0 auto
                 width 80%
                .supports-item
                    padding 0 12px
                    margin-bottom 12px
                    font-size 0
                    &:last-child
                        margin-bottom 0
                    .icon
                        display inline-block
                        width 16px
                        height 16px
                        vertical-align top
                        margin-right 6px
                        background-size 16px 16px
                        background-repeat no-repeat
                        &.decrease
                            bg-image('decrease_2')
                        &.discount
                            bg-image('discount_2')
                        &.guarantee
                            bg-image('guarantee_2')
                        &.invoice
                            bg-image('invoice_2')
                        &.special
                            bg-image('special_2')
                    .text
                        font-size 12px
                        line-height 16px
            .bulletin
                width 80%
                margin 0 auto
                .content
                    padding 0 12px
                    font-size 12px
                    line-height 24px

    .detail-close
        position relative
        width 32px
        height 32px
        margin -64px auto 0 auto//水平居中，且让x一直处于底部一定的位置（-64px）
        clear both//清除浮动
        font-size 32px

</style>

