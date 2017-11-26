<template>
    <div class="ratingselect">
        <div class="rating-type border-1px">
            <span class="block positive" :class="{'active':selectType===2}"  @click="select(2,$event)">
                {{desc.all}}
                <span class="count">{{ratings.length}}</span>
            </span>
            <span class="block positive" :class="{'active':selectType===0}"  @click="select(0,$event)">
                {{desc.positive}}
                <span class="count">{{positives.length}}</span>
            </span>
            <span class="block negative" :class="{'active':selectType===1}"  @click="select(1,$event)">
                {{desc.negative}}
                <span class="count">{{negatives.length}}</span>
            </span>
        </div>
        <div class="switch" :class="{'on':onlyContent}">
            <span class="icon-check_circle" @click="toggleContent($event)"></span>
            <span class="text">只看有内容的评论</span>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
 const ALL=2;
 const POSITIVE=0;
 const NEGATIVE=1;

export default {
    // props是外部父组件传进来的值
    props:{
        ratings:{
            type:Array,
            default(){
                return [];
            }
        },
        selectType:{
            type:Number,
            default:ALL
        },
        onlyContent:{
            type:Boolean,
            default:false
        },
        desc:{
            type:Object,
            default(){
                return {
                    all:'全部',
                    positive:'满意',
                    negative:'不满意'
                }
            }
        }
    },
    computed:{
        positives() {
            return this.ratings.filter((rating) => {
                return rating.rateType === POSITIVE;
            });
      },
      negatives() {
            return this.ratings.filter((rating) => {
                return rating.rateType === NEGATIVE;
            });
      }
    },
    methods:{
        select(type, event) {
            if (!event._constructed) {
                return;
            }
        // selectType是由父组件food传进来的，所以改变这个值也应由父组件改变，
        // 所以子组件ratingselect派发此事件是为了让父组件知道然后触发父组件的改变此值的方法
        this.$emit('select', type);
      },
      toggleContent(event){
          if (!event._constructed) {
                return;
        }
        // toggleContent是由父组件food传进来的，所以改变这个值也应由父组件改变，
        // 所以子组件ratingselect派发此事件是为了让父组件知道然后触发父组件的改变此值的方法
        this.$emit('toggleContent');
      }
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
 @import "../../common/stylus/mixin.styl"

.ratingselect
    .rating-type
        padding 18px 0
        margin 0 18px
        border-1px(rgba(7,17,27,.1))
        font-size 0
        .block
            display inline-block
            padding 8px 12px
            margin-right 8px
            line-height 16px
            border-radius 1px
            color rgb(77,85,93)
            font-size 12px
            &.active
                color #fff
            .count
                margin-left 2px
                font-size 10px
            &.positive
                background rgba(0,160,220,.2)
                &.active
                    background rgb(0,160,220) 
            &.negative
                background rgba(77,85,93,.2)
                &.active
                    background rgb(77,85,93)
    .switch
        padding 12px 18px
        margin 12px 0
        line-height 24px
        border-bottom 1px solid rgba(7,17,27,.1)
        color rgb(147,153,159)
        font-size 0
        &.on
            .icon-check_circle
                color #00c850
        .icon-check_circle
            display inline-block
            vertical-align top
            margin-right 4px 
            font-size 24px  
        .text
            display inline-block
            vertical-align top
            font-size 12px

</style>


