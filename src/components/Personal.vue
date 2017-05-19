<template>
  <div class="personal">
    <div class="like-head">
      <div class="logo-img">
        <img src="../assets/icon.png" alt="" class="head-img">
      </div>
      <div class="user-info">
        <p class="like-title">我喜欢的音乐</p>
        <div class="user-login-info">
          <img src="../assets/icon-singer.png" alt="" class="user-head-img">
          <span class="user-name">未登录 ></span>
        </div>
      </div>
    </div>
    <div class="unlogin-tip">
      <div class="tip-title">暂无音乐</div>
      <div class="tip-txt">播放音乐时，点击<div class="like-img"></div>按钮可以把音乐加入到自己的歌单</div>
    </div>
    <div class="like-list">

    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import RankPage from './RankPage'
  export default {
    components: {RankPage},
    data () {
      return {
        topList: null
      }
    },
    methods: {
      showRank: function (id) {
        this.$router.push({name: 'rank', params: {id: id}})
      }
    },
    created: function () {
      this.$store.dispatch('getRankList').then((response) => {
        this.topList = response.data.data.topList
      })
    },
    filters: {
      listenCount: num => {
        return Math.round(num / 1000) / 10 + '万'
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .personal {
    width: 100%;
    margin-top: 50px;
    height: 80vh;
    background: url('../assets/background.jpg') center no-repeat;
    background-size: cover;
  }

  .personal ul {
    
    padding: 10px;
    margin-bottom: 50px;
    display: flex;
    flex-direction: column;
    list-style: none;
  }

  .like-head {
    display: flex;
    align-items: center;
    -webkit-align-items:center;
    justify-content: space-around;
    -webkit-justify-content: space-around;
    height: 40vh;
    /*background:-webkit-gradient(linear, 0 0, 0 bottom, from(rgba(76, 162, 191, 0.8)), to(#eee));*/
    /*background:-webkit-gradient(linear, 0 0, 0 bottom, from(rgba(76, 162, 191, 0.8)), to(#eee));*/

  }
  .head-img {
    width: 100px;
    height: 100px;
  }
  .logo-img {
    padding: 10px;
    /*background-color: #555;*/
  }
  .user-info {
    width: 38vw;
    height: 12vh;
    margin-left: -12vh;
  }
  .user-login-info {
    display: flex;
    align-items: center;
    -webkit-align-items:center;
  }
  .user-head-img {
    width: 20px;
    height: 20px;
    margin-right: 5px;
    margin-top: -1px;
  }
  .like-title {
    /*font-size: 18px;*/
    color: #eee;
    margin-bottom: 15px;
  }
  .user-name {
    color: #eee;
  }
  .unlogin-tip {
    text-align: center;
  }
  .tip-title {
    /*font-size: 18px;*/
    color: #eee;
    margin-bottom: 25px;
  }
  .tip-txt {
    width: 80vw;
    margin: 0 auto;
    color: #eee;
    font-size: 14px;
    line-height: 20px;
  }
  .like-img {
    width: 25px;
    height: 25px;
    display: inline-block;
    background: url('../assets/icon-like.png') center no-repeat;
    background-size: cover;
    margin-bottom: -6px;
  }

</style>
