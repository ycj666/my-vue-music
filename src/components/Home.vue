<template>
  <div id="home">
    <!--<action-sheet></action-sheet>-->
    <transition :name="routerViewAnimation">
      <router-view v-show="!blurBgShow"></router-view>
    </transition>

    <search v-show="!blurBgShow"
            @searchshow="rankshow=false"
            @searchhide="rankshow=true">
    </search>
    <div class="content-warper" v-show="rankshow&&!blurBgShow">
      <swiper :options="swiperOption" class="swiper-box">
        <swiper-slide class="swiper-item">
          <recommand></recommand>
        </swiper-slide>
        <swiper-slide class="swiper-item">
          <rank></rank>
        </swiper-slide>
        <swiper-slide class="swiper-item">
          <personal></personal>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination" id="swiper-pagination"></div>
      </swiper>
    </div>

    <!--<transition name="play-slide"
                @after-enter="showBlurBg"
                @before-leave="hideBlurBg"
                @after-leave="routerViewAnimation='page-slide'">
      <play v-show="playPageShow"></play>
    </transition>
    <transition name="play-slide">
      <playing-list v-if="$store.state.NotifyService.playingList.show"></playing-list>
    </transition>

    <transition name="bar-slide">
      <div id="play-bar" v-show="!playPageShow">
        <audio id="music"
               :src="dataUrl"
               @timeupdate="updateTime"
               @ended="playContinue"
               autoplay></audio>
        <div class="play-bar-image-container" @touchstart="showPlayPage" @click="showPlayPage">
          <img class="play-bar-image" v-lazy="coverImgUrl">
        </div>
        <p class="play-bar-text" @touchstart="showPlayPage" @click="showPlayPage">{{song.name}}</p>
        <img class="play-bar-button"
             :src="playing?iconPause:iconPlay"
             @touchend="tapButton"
             @click="tapButton">
      </div>
    </transition>-->
  
    <div class="menu" v-show="!playPageShow">
      <img src="../assets/icon-menu.png" alt="个人中心" @click='menuShow = !menuShow'>
    </div>
    <div class="mask" v-if="menuShow" @click='menuShow = !menuShow'></div>
    
    <transition name="person-slide">
      <div class="person-page" v-if="menuShow" id='person-page' @touchend='menuShow = !menuShow'>
        <div class="person-head">
          <div class="head-img">
            <img src="../assets/icon.png" alt="" class="person-head-img">
          </div>
          <div class="head-title">琥珀音乐，更懂你的音乐</div>
          <div class="head-login" v-show="!loggedOn"><router-link to='/login' class="login">立即登录</router-link></div>
          <div class="logged-txt" v-show="loggedOn"><img src="../assets/user-head-img.png" alt="" class="logged-img">{{ username }}</div>
        </div>
        <div class="person-list">
          <div class="slide-list list-line">
            <img src="../assets/icon-message.png" alt="" class="slide-img">
            <p>我的消息</p>
          </div>
          <div class="slide-list">
            <img src="../assets/icon-group.png" alt="" class="slide-img">
            <p>我的好友</p>
          </div>
          <div class="slide-list list-line">
            <img src="../assets/icon-coordinates.png" alt="" class="slide-img">
            <p>附近的人</p>
          </div>
          <div class="slide-list list-line">
            <img src="../assets/icon-about-2.png" alt="" class="slide-img">
            <p>关于</p>
          </div>
          <div class="slide-list last-list" @click='logout' v-show="loggedOn">
            <img src="../assets/icon-logout.png" alt="" class="slide-img">
            <p>退出登录</p>
          </div>
        </div>
      </div>
    </transition>

    <div id="toast"></div>
    <span id="toast1"></span>
  </div>
</template>

<script type="text/ecmascript-6">
  import Search from './Search.vue'
  import Play from './Play'
  import Rank from './Rank'
  import Recommand from './Recommand'
  // import ActionSheet from './ActionSheet'
  // import PlayingList from './PlayingList'
  import Personal from './Personal'
  // import Login from './Login.vue'
  // import PlayBar from './PlayBar.vue'

  import {mapMutations, mapState, mapGetters} from 'vuex'
  import {swiper, swiperSlide} from 'vue-awesome-swiper'

  const TAB_NAME = ['推荐', '排行榜','我的']

  export default {
    components: {
      Search,
      Play,
      Rank,
      Recommand,
      Personal,
      // ActionSheet,
      // PlayingList,
      swiper,
      swiperSlide,
      // PlayBar
    },
    methods: {
      tapButton(event) {
        event.preventDefault()
        this.playing ? this.pause() : this.play()
      },
      hidePlayPage(event) {
        event.preventDefault()
        this.playPageShow = false
      },
      showBlurBg() {
        this.routerViewAnimation = 'fade'
        this.blurBgShow = true
      },
      hideBlurBg () {
        this.blurBgShow = false
      },
      updateTime() {
        this.$store.commit('updateCurrentTime', parseInt(document.getElementById('music').currentTime))
        this.$store.commit('updateDuration', parseInt(document.getElementById('music').duration))
      },
      ...mapMutations([
        'play', 'pause', 'playContinue'
      ]),
      logout() {
        let that = this
        console.log('注销登录');
        localStorage.removeItem('currentUserId');
        localStorage.removeItem('currentUserName');
        console.log(localStorage.length);
        that.drawToast('注销成功')
        setTimeout (function () {        
          that.$router.push({
           name:'login'
          })
        },500)
      },
      drawToast: function (message) {
          var alert = document.getElementById('toast');
          if (alert.className.match(new RegExp('(\\s|^)' + 'show' + '(\\s|$)'))) {
            return false;
          }
          alert.className = alert.className.replace('lines', '');
          alert.style.opacity = .8;
          alert.innerHTML = message;
          var temp_alert = document.getElementById('toast1');
          temp_alert.innerHTML = message;
          alert.className += 'show';
          alert.style.marginLeft = '-' + temp_alert.offsetWidth / 2 + 'px';
          var intervalCounter = setTimeout(function() {
            alert.style.opacity = 0;
            clearInterval(intervalCounter);
          }, 1500);
          setTimeout(function() {
            alert.className = alert.className.replace('show', '');
          }, 2000);
        }
      
    },
    data () {
      return {
        iconPlay: require('../assets/icon-play.png'),
        iconPause: require('../assets/icon-pause.png'),
        playPageShow: false,
        blurBgShow: false,
        rankshow: true,
        menuShow: false,
        loginShow: false,
        routerViewAnimation: 'page-slide',
        swiperOption: {
          pagination: '.swiper-pagination',
          paginationClickable: true,
          paginationBulletRender(swiper, index, className) {
            return `<span class="${className} swiper-pagination-bullet-custom">${TAB_NAME[index]}</span>`
            // return '<span class="' + className + ' swiper-pagination-bullet-custom' + '">' + (index + 1) + '</span>';
          }
        },
        username: ''
      }
    },
    computed: {
      ...mapGetters([
        'coverImgUrl'
      ]),
      ...mapState({
        dataUrl (state) {
          return 'http://ws.stream.qqmusic.qq.com/' + state.PlayService.song.id + '.m4a?fromtag=46'
        },
        playing: state => state.PlayService.playing,
        song: state => state.PlayService.song
      }),
      loggedOn: function () {
        console.log(localStorage.length);   
        console.log(localStorage.getItem('currentUserName'));
        this.username = localStorage.getItem('currentUserName')
        if(localStorage.length === 0 || localStorage.length === 2) {
          return (localStorage.length === 2) ? 1 : 0;
        }
        else {
          return (localStorage.length === 3) ? 1 : 0;
        }    
      }
    },
    watch: {
      playing(val) {
        if (val) {
          document.getElementById('music').play()
        } else {
          document.getElementById('music').pause()
        }
      },
    //   song(song) {
    //     if (this.$store.state.PlayService.playList.length > 0 && typeof song.albummid === 'undefined') {
    //       this.$http.jsonp('http://120.27.93.97/weappserver/get_music_info.php', {
    //         params: {
    //           mid: song.mid
    //         },
    //         jsonp: 'callback'
    //       }).then((response) => {
    //         this.$store.commit('setAlbummid', response.data.albummid)
    //       })
    //     }
    //   }
    },
    mounted () {
      window.addEventListener('scroll',this.fixTabBar) 
    }
}
</script>

<style scoped>
  * {
    margin: 0;
    padding: 0;
  }

  html {
    overflow-x: hidden;
    background: #EEEEEE;
  }

  body {
    display: flex;
    overflow-x: hidden;
  }
  .menu {
    position: fixed;
    top: 0px;
    z-index: 3;
    cursor: pointer;
  }
  .menu img {
    width: 24px;
    height: 24px;
    margin: 18px 10px 0 15px;
    cursor: pointer;
  }

  #play-bar {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 50px;
    background: -webkit-linear-gradient(top, #f9f9f9, #f3f3f3);
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    z-index: 2;
  }

  .play-bar-image-container {
    width: 37.5px;
    height: 37.5px;
    padding-left: 15px;
    cursor: pointer;
  }

  .play-bar-image {
    width: 37.5px;
    height: 37.5px;
    border-radius: 5px;
    display: inline-block;
  }

  .play-bar-text {
    flex-grow: 1;
    padding-left: 10px;
    cursor: pointer;
  }

  .play-bar-button {
    width: 20px;
    height: 20px;
    padding-right: 15px;
    cursor: pointer;
  }

  .page-slide-enter-active {
    transition: all .3s ease;
  }

  .page-slide-leave-active {
    transition: all .3s ease-out;
  }

  .page-slide-enter, .page-slide-leave-active {
    transform: translateX(100%);
  }

  .fade-enter-active {
    transition: all .3s ease;
  }

  .fade-leave-active {
    transition: all .3s ease-out;
  }

  .fade-enter, .fade-leave-active {
    opacity: 0;
  }

  .play-slide-enter-active {
    transition: all .3s ease;
  }

  .play-slide-leave-active {
    transition: all .3s ease-out;
  }

  .play-slide-enter, .play-slide-leave-active {
    transform: translateY(100vh);
  }

  .bar-slide-enter-active {
    transition: all .3s ease;
  }

  .bar-slide-leave-active {
    transition: all .3s ease-out;
  }

  .bar-slide-enter, .bar-slide-leave-active {
    margin-bottom: -50px;
  }

  .person-slide-enter-active {
    transition: all .3s ease;
  }
  .person-slide-leave-active {
    transition: all .3s ease-out;
  }
  .person-slide-enter, .person-slide-leave-active {
    transform: translateX(-45vh);
    /*opacity: 0;*/
  }
  .person-page {
    position: fixed;
    top: 0;
    left: 0px;
    width: 80vw;
    height: 100%;
    z-index: 4;
    background: -webkit-linear-gradient(top, #eee, #fff);
    /*background-color: #ddd;*/
  }
  /*.person-page-slide {
    left: 0vh;
    transition: all 0.3s ease-out;
  }*/
  .person-head {
    height: 60vw;
    /*background:-webkit-gradient(linear, 0 0, 0 bottom, from(rgba(76, 162, 191, 0.8)), to(#eee));*/
    text-align: center;
    background: url('../assets/background.jpg') center no-repeat;
    background-size: cover;
  }
  .head-title {
    padding: 10px 0 20px;
    color: #eee;
  }
  .head-login {
    margin: 0 auto;
    width: 180px;
    border: 1px solid #eee;
    border-radius: 15px;
    padding: 5px 0;
    color: #eee;
  }
  .logged-txt {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px 0;
    color: #eee;
    font-size: 20px;
  }
  .logged-img {
    width: 40px;
    height: 40px;
    margin-right: 10px;
  }
  .login {
    display: block;
    color: #eee;
    width: 100%;
  }
  .person-list {
    height: 100%;
    width: 100%;
  }
  .person-list p{
    /*margin: 0 0 20px 0;*/
    font-size: 14px;
  }
  .slide-list {
    /*border-bottom: 6px solid #ddd;*/
    padding: 12px 0 12px 15px;
    list-style: none;
    /*margin:15px 0;*/
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  .slide-img {
    width: 22px;
    height: 22px;
    margin-right: 10px;
  }
  .list-line {
    border-bottom: 6px solid #eee;
  }
  .head-img {
    margin: 0 auto;
    padding-top: 10vw;
  }
  .person-head-img {
    width: 15vw;
    height: 15vw;
  }


  .mask {
    z-index: 3;
    position:fixed;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background:#000;
    opacity:0.4;
    filter:alpha(opacity=40);
    /*display: none;*/
    cursor: pointer;
  }


  @media screen and (min-width: 68vh) {
    body {
      width: 68vh;
      margin: 0 auto;
    }

    #play-bar {
      width: 68vh;
    }
  }

  /*border-1px 部分*/
  .border-1px {
    position: relative;
  }

  .border-1px-after:after {
    border-top: 1px solid #d0d0d0;
    content: ' ';
    display: block;
    width: 100%;
    position: absolute;
    left: 0;
  }

  .border-1px-before:before {
    border-top: 1px solid #d0d0d0;
    content: ' ';
    display: block;
    width: 100%;
    position: absolute;
    left: 0;
  }

  .border-1px:before {
    top: 0;
  }

  .border-1px:after {
    bottom: 0;
  }

  @media (-webkit-min-device-pixel-ratio: 1.5), (min-device-pixel-ratio: 1.5) {
    .border-1px:after, .border-1px:before {
      -webkit-transform: scaleY(.7);
      -webkit-transform-origin: 0 0;
      transform: scaleY(.7);
    }

    .border-1px:after {
      -webkit-transform-origin: left bottom;
    }
  }

  @media (-webkit-min-device-pixel-ratio: 2), (min-device-pixel-ratio: 2) {
    .border-1px:after, .border-1px:before {
      -webkit-transform: scaleY(.5);
      transform: scaleY(.5);
    }
  }

  @-webkit-keyframes imgFadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes imgFadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  img[lazy=loaded] {
    /*-webkit-animation-duration: 1s;
    animation-duration: 1s;*/
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    -webkit-animation-name: imgFadeIn;
    animation-name: imgFadeIn;
  }

  img[lazy=error] {
    border-radius: 2px;
    -webkit-animation-duration: 1s;
    animation-duration: 1s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    -webkit-animation-name: imgFadeIn;
    animation-name: imgFadeIn;
  }

  .content-warper {
    margin-top: 60px;
  }

  .swiper-box {
    width: 100%;
    height: 100%;
    margin: 0 auto;
  }

  .swiper-item {
    height: 100%;
  }
  .swiper-slide {
    height: 10px;
  }
  .swiper-slide-active {
    height: auto
  }

  .swiper-pagination-bullet-custom {
    width: 100% !important;
    height: 100% !important;
    margin: 0 !important;
    text-align: center;
    line-height: 50px;
    color: #999999;
    border-radius: 0 !important;
    background: #fff !important;
    opacity: 1 !important;
  }

  .swiper-pagination-bullet-custom.swiper-pagination-bullet-active {
    color: #000;

  }

  .swiper-pagination {
    top: 0;
    height: 50px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 100%;
  }

  #swiper-pagination {
  }
  #toast {
    position: fixed;
    bottom: 20px;
    left: 50%;
    line-height: 37px;
    background-color: #000000;
    color: #ffffff;
    text-align: center;
    opacity: 0;
    border-radius: 10px;
    font-size: 16px;
    font-weight: 500;
    padding: 0 10px;
    z-index: 9999;
    /*The good stuff */
    -webkit-transition: opacity 0.5s ease-out;
    /* Saf3.2+, Chrome */
    -moz-transition: opacity 0.5s ease-out;
    /* FF4+ */
    -ms-transition: opacity 0.5s ease-out;
    /* IE10? */
    -o-transition: opacity 0.5s ease-out;
    /* Opera 10.5+ */
    transition: opacity 0.5s ease-out;
  }
  #toast1 {
    font-size: 16px;
    font-weight: 500;
    padding: 0 10px;
    visibility: hidden;
    white-space: nowrap;
  }


</style>
