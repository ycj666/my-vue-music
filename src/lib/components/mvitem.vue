<template>
  <div class="mvitem" @click="openmv">
    <div class="img-wrapper">
      <img class="mv-img" v-lazy="imgurl" alt="name">

    </div>
    <div class="mv-info">
      <p class="name">{{name}} </p>
      <p class="author">歌手:{{author}}</p>
      <p class="date">发行时间:{{date}}</p>
      <div class="mv-playcount">
        <span>播放量:{{playcount | listenCount}}</span>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: ['name', 'author', 'playcount', 'date', 'vid'],
    components: {},
    data () {
      return {}
    },
    computed: {
      imgurl() {
        return "https://shp.qpic.cn/qqvideo_ori/0/" + this.vid + "_360_204/0"
      }
    },
    methods: {
      openmv(){
        window.open("https://y.qq.com/portal/mv/v/" + this.vid + ".html")
      }
    },
    filters: {
      listenCount: num => Math.round(num / 1000) / 10 + '万'
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" rel="stylesheet/less">
  .mvitem {
    background: #fff;
    border-radius: 5px;
    box-shadow: 0 0 10px #DDD;
    margin: 0px 0px 5px;
    display: flex;
    // flex-direction: row;
    justify-content: space-around;
    padding: 5px;
    cursor: pointer;
    overflow: hidden;
    // width: 100%;
    .img-wrapper {

      .mv-img {
        width: 49vw;
        max-height: 150px;
        display: block;
        border-radius: 5px;
      }
    }
    .mv-info {
      padding: 2px 5px 5px;
      font-weight: 300;
      font-size: 14px;
      position: relative;
      .author, .date {
        color: #777;
        line-height: 25px;
      }
      .mv-playcount {
        position: absolute;
        bottom: 0px;
        left: 5px;
        font-size: 14px;
        display: flex;
        flex-direction: row;
        align-items: center;
        color: #777;
      }
      .name {
        line-height: 28px;
        width: 40vw;
        text-overflow:ellipsis;
        overflow:hidden;
        white-space:nowrap;
      }
    }

  }
  /* iphone5 */
@media screen and (min-width: 310px) and (max-width: 359px) {
  .mvitem .mv-info .date,.mvitem .mv-info .name  {
    line-height: 18px;
  }
}
/* iphone6 */
@media screen and (min-width: 370px) and (max-width: 410px) {
    .mvitem .img-wrapper .mv-img {
        margin-right: 2vw;
    }
}
/* iphone6p */
@media screen and (min-width: 410px) and ( max-width: 470px) {
   .mvitem .img-wrapper .mv-img {
        margin-right: 2vw;
    }
}
</style>
