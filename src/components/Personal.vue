<template>
  <div class="personal">
    <div class="like-head">
      <!--<div class="logo-img">
        <img src="../assets/icon.png" alt="" class="head-img">
      </div>-->
      <div class="user-info">
        <p class="like-title">我喜欢的音乐</p>
        <div class="user-login-info" v-if="!loggedOn">
          <img src="../assets/icon-singer-white.png" alt="" class="icon-head-img">
          <router-link class="user-name" to='/login'>未登录 ></router-link>
        </div>
        <div class="user-login-info" v-if="loggedOn">
          <img src="../assets/user-head-img.png" alt="" class="user-head-img">
          <span class="user-name">{{ username }}</span>
        </div>
      </div>
    </div>
    <div class="unlogin-tip" v-if="!loggedOn">
      <div class="tip-title">暂无音乐</div>
      <div class="tip-txt">播放音乐时，点击<div class="like-img"></div>按钮可以把音乐加入到自己的歌单</div>
    </div>
    <div class="like-list" v-if="loggedOn">
      <div class="tittle border-1px border-1px-after ">
        <img :src="buttonImage" :alt="playModeName" @click="changePlayMode">
        <!--<p class="tittle-text">{{playModeName}} {{playList.length}}首歌曲</p>-->
      </div>
      <div class="m-list">
        <!--<ul>
          <li class="border-1px border-1px-after" v-for="(item,index) in topListData.songlist">
            <div class="index" :class="{dark:isDark}">{{index+1}}</div>
            <div class="music-info" @click="play(index)">
              <div class="music-name" :class="{dark:isDark}">
                {{item.data.songorig}}
              </div>
              <div class="music-singer">
                <span v-for="singername in item.data.singer">{{singername.name}}-</span>
                <span>{{item.data.albumname}}</span>
              </div>
            </div>
            <div class="action-button" @touchend.prevent="showMenu(index)" @click="showMenu(index)">
              <img src="../assets/icon-...black.png" alt="">
            </div>
          </li>
        </ul>-->
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapState, mapMutations} from 'vuex'
  import * as def from './../config/def'
  // export default {
  //   data () {
  //     return {
  //       menuedIndex: 0,
  //     }
  //   },
  //   methods: {
  //     play: function (index) {
  //       this.$store.commit('playIndex', index)
  //     },
  //     hidePlayList: function () {
  //       this.$store.commit('closePlayingList')
  //     },
  //     showMenu: function (num) {
  //       this.menuedIndex = num
  //       let that = this
  //       this.$store.dispatch('notifyActionSheet', {
  //           menus:{
  //             'title.noop': this.playList[num].name + '<br/><span style="color:#666;font-size:12px;">' + this.getSingerStr(this.playList[num].singer) + '</span>',
  //             delete: '删除'
  //           },
  //         handler:{
  //           ['cancel'](){
  //           },
  //           ['delete'](){
  //             that.$store.commit('deleteFromPlayList', that.menuedIndex)
  //           }
  //         }
  //       })
  //     },
  //     getSingerStr: val => {
  //       if (typeof val === 'string') {
  //         return val
  //       } else if (val instanceof Array) {
  //         let singer = ''
  //         val.forEach(item => {
  //           singer = singer + item.name + ' '
  //         })
  //         return singer
  //       }
  //     },
  //     ...mapMutations(['changePlayMode'])
  //   },
  //   computed: {
  //     buttonImage: function () {
  //       return def.PLAY_MODE_IMG[this.playMode]
  //     },
  //     playModeName:function(){
  //       return def.PLAY_MODE_NAME[this.playMode]
  //     },
  //     ...mapState({
  //       playList: state=>state.PlayService.playList,
  //       playMode: state=>state.PlayService.playMode,
  //       index: state=>state.PlayService.index
  //     }),
  //     loggedOn: function () {
  //       console.log(localStorage.length);   
  //       console.log(localStorage.getItem('currentUserName'));
  //       this.username = localStorage.getItem('currentUserName')
  //       if(localStorage.length === 0 || localStorage.length === 2) {
  //         return (localStorage.length === 2) ? 1 : 0;
  //       }
  //       else {
  //         return (localStorage.length === 3) ? 1 : 0;
  //       }    
  //     }
  //   },
  //   filters: {
  //     singer: val => {
  //       if (typeof val === 'string') {
  //         return val
  //       } else if (val instanceof Array) {
  //         let singer = ''
  //         val.forEach(item => {
  //           singer = singer + item.name + ' '
  //         })
  //         return singer
  //       }
  //     }
  //   }
  // }

   export default {
    data () {
      return {
        topListData: null,
        opacity: 0,
        menuedIndex: 0,
        topid:this.$route.params.id
      }
    },
    methods: {
    //   hideSinger: function () {
    //     this.$router.go(-1)
    //   },
    //   play: function (index) {
    //     let list = []
    //     this.topListData.songlist.forEach(item => {
    //       list.push({
    //         id: item.data.songid,
    //         mid: item.data.songmid,
    //         name: item.data.songorig,
    //         singer: item.data.singer,
    //         albummid: item.data.albummid
    //       })
    //     })
    //     this.$store.commit('setPlayList', {
    //       index: index,
    //       list: list
    //     })
    //     this.$store.commit('play')
    //   },
      // showMenu: function (num) {
      //   this.menuedIndex = num
      //   let that = this
      //   this.$store.dispatch('notifyActionSheet', {
      //     menus: {
      //       'title.noop': this.topListData.songlist[num].data.songorig + '<br/><span style="color:#666;font-size:12px;">' + this.getSingerStr(this.topListData.songlist[num].data.singer) + '</span>',
      //       playAsNext: '下一首播放',
      //       addToPlayList: '添加到播放列表'
      //     },
      //     handler: {
      //       ['cancel'](){
      //       },
      //       ['playAsNext'](){
      //         that.$store.commit('addToPlayListAsNextPlay', {
      //           id: that.topListData.songlist[that.menuedIndex].data.songid,
      //           mid: that.topListData.songlist[that.menuedIndex].data.songmid,
      //           name: that.topListData.songlist[that.menuedIndex].data.songorig,
      //           singer: that.topListData.songlist[that.menuedIndex].data.singer,
      //           albummid: that.topListData.songlist[that.menuedIndex].data.albummid
      //         })
      //       },
      //       ['addToPlayList'](){
      //         that.$store.commit('addToPlayList', {
      //           id: that.topListData.songlist[that.menuedIndex].data.songid,
      //           mid: that.topListData.songlist[that.menuedIndex].data.songmid,
      //           name: that.topListData.songlist[that.menuedIndex].data.songorig,
      //           singer: that.topListData.songlist[that.menuedIndex].data.singer,
      //           albummid: that.topListData.songlist[that.menuedIndex].data.albummid
      //         })
      //       }
      //     }
      //   })
      // },
      getSingerStr: val => {
        if (typeof val === 'string') {
          return val
        } else if (val instanceof Array) {
          var singer = ''
          val.forEach(item => {
            singer = singer + item.name + ' '
          })
          return singer
        }
      }
    },
    computed: {
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
      },
      // getLikeList: function () {
      //   if(this.loggedOn) {
      //     this.$http({
      //         url:'//192.168.1.123:3000/vuemusic/getLikeList/'+ localStorage.getItem('currentUserId') + '/' + this.password,
      //         method: 'GET', 
      //         before: function() {
      //           this.loadingShow = true;
      //           this.maskShow = true;
      //         }
      //         }).then((res) => {
      //           let that = this
      //           that.loadingShow = false;
      //           that.maskShow = false;
      //           console.log(res);
      //           if(res.status == 200) {  //创建成功 定向到home                   
      //             let uid = res.bodyText.split(' ')[0]
      //             let uname = res.bodyText.split(' ')[1]
      //             console.log('uid:'+ uid)
      //             console.log('uname:' +uname)
      //             localStorage.setItem('currentUserId',uid)   //存储当前用户uid到localstorage
      //             localStorage.setItem('currentUserName',uname)
      //             console.log(localStorage.length);
      //             that.drawToast('登录成功,即将跳转到首页');
      //             setTimeout(function () {
      //               that.$router.push({
      //                 name:'home'
      //                 // params: {uid: uid}
      //               })
      //             }, 1500);
      //           }
      //         }, (err) => {
      //           let that = this
      //           that.loadingShow = false
      //           that.maskShow = false
      //           if(err.status == 404) { //status=404 表示用户名不存在
      //             that.drawToast('用户名不存在');
      //           }
      //           else {
      //              that.drawToast('请检查网络');
      //           }    
      //         });
      //   }
      // }
    }
}
      // changeOpacity() {
      //   this.scroll = document.body.scrollTop
      //   console.log(this.scroll)
      //   this.width = document.body.offsetWidth;
      //   if(this.scroll < this.width) {
      //     this.opacity += this.scroll*0.1
      //     console.log(this.opacity)
      //   }
      // }



  // import RankPage from './RankPage'
  // export default {
  //   components: {RankPage},
  //   data () {
  //     return {
  //       topList: null
  //     }
  //   },
  //   methods: {
  //     showRank: function (id) {
  //       this.$router.push({name: 'rank', params: {id: id}})
  //     }
  //   },
  //   created: function () {
  //     this.$store.dispatch('getRankList').then((response) => {
  //       this.topList = response.data.data.topList
  //     })
  //   },
  //   filters: {
  //     listenCount: num => {
  //       return Math.round(num / 1000) / 10 + '万'
  //     }
  //   },
  //   computed: {
  //     loggedOn: function () {
  //       console.log(localStorage.length);   
  //       console.log(localStorage.getItem('currentUserName'));
  //       this.username = localStorage.getItem('currentUserName')
  //       if(localStorage.length === 0 || localStorage.length === 2) {
  //         return (localStorage.length === 2) ? 1 : 0;
  //       }
  //       else {
  //         return (localStorage.length === 3) ? 1 : 0;
  //       }    
  //     }
  //   }
  // }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .personal {
    width: 100%;
    margin-top: 50px;
    /*height: 80vh;*/
    /*background: url('../assets/background.jpg') center no-repeat;
    background-size: cover;*/
  }

  .personal ul {
    
    padding: 10px;
    margin-bottom: 25px;
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
    height: 30vh;
    background: url('../assets/head-img-3.jpg') center no-repeat;
    background-size: cover;
    /*background:-webkit-gradient(linear, 0 0, 0 bottom, from(rgba(76, 162, 191, 0.8)), to(#eee));*/
    /*background:-webkit-gradient(linear, 50% 0, 0 bottom, from(rgba(76, 162, 191, 1)), to(#eee));*/

  }
  .head-img {
    width: 90px;
    height: 90px;
  }
  .logo-img {
    padding: 10px;
    /*background-color: #555;*/
  }
  .user-info {
    width: 38vw;
    /*height: 45vw;*/
    margin-left: 25vh;
    margin-top: 6vw;
  }
  .user-login-info {
    display: flex;
    align-items: center;
    -webkit-align-items:center;
    cursor: pointer;
  }
  .icon-head-img {
    width: 20px;
    height: 20px;
    margin-right: 5px;
    margin-top: -1px;   
  }
  .user-head-img {
    width: 40px;
    height: 40px;
    margin-right: 5px;
    margin-top: -1px;
  }
  .like-title {
    /*font-size: 18px;*/
    color: #fff;
    margin: 0px 0 15px 0;
  }
  .user-name {
    color: #fff ;
  }
  .unlogin-tip {
    text-align: center;
  }
  .tip-title {
    /*font-size: 18px;*/
    color: #333;
    margin: 50px 0 25px 0;
  }
  .tip-txt {
    width: 80vw;
    margin: 0 auto;
    color: #333;
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

  .like-list {
    /*z-index: 10;*/
    /*position: absolute;*/
    /*top: 36vh;*/
    width: 100%;
    min-height: 100%;
    background: #fff;
  }

  .tittle {
    height: 50px;
    display: flex;
    align-items: center;
    background: #fff;
    width: 100%;
    max-width: 68vh;
    z-index: 3;
  }

  .tittle .tittle-text {
    flex-grow: 1;
  }

  .tittle .tittle-button {
    margin-right: 10px;
    cursor: pointer;
  }

  .tittle img {
    width: 25px;
    display: inline-block;
    cursor: pointer;
    padding-left: 10px;
  }

  .tittle p {
    padding-left: 5px;
  }

  .m-list {
    /*margin-top: 50px;*/
  }

  .m-list ul {
    list-style: none;
  }

  .m-list .list-item {
    height: 40px;
    padding: 5px 0;
    margin-left: 10px;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
  }

  .m-list .list-item .music-info {
    height: 40px;
    overflow: hidden;
    display: flex;
    flex-direction: row;
    flex-grow: 1;
    align-items: center;
    cursor: pointer;
  }

  .m-list .list-item .music-info .music-name {
    line-height: 20px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .m-list .list-item .music-info .music-author {
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #8f8f8f;
    font-size: 12px;
    line-height: 20px;
    overflow: hidden;
  }

  .m-list .list-item .music-info .music-playing {
    width: 15px;
    height: 15px;
    margin-left: 10px;
  }

  .m-list .list-item .action-button {
    width: 20px;
    height: 20px;
    padding: 10px;
  }

  .m-list .list-item .action-button img {
    width: 20px;
  }

  @media screen and (min-width: 68vh) {
    #playing-list {
      width: 68vh;
    }
  }
</style>
