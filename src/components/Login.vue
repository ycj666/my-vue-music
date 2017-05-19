<template>
  <transition name='login-slide'>
    <div class="login-page">
        <div class="head-img">
          <img src="../assets/icon.png" alt="" class="icon-img">
        </div>
        <div class="login-info">
          <div class="temp">
            <img src="../assets/icon-user.png" alt="" class="user-icon">
            <input type="text" placeholder="用户名" class="username" id='username' autofocus="autofocus">
          </div>
          <div class="temp">
            <img src="../assets/icon-lock.png" alt="" class="lock-icon">
            <input type="password" placeholder="密码" class="password" id='password'>
          </div>
          <div class="login-btn" @click='login'>
          <!--<router-link to=''>登录</router-link>-->
            登录
          </div>
          <div class="no-userid">
            <router-link to='/register' class="register-link">没有账号？点击注册</router-link>
          </div>
        </div>

        <div id="loading" v-show="loadingShow"></div>
        <div id="mask" v-show="maskShow"></div>
        <div id="toast"></div>
	      <span id="toast1"></span>
        
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  export default {
    props: ['name', 'author', 'playcount', 'date', 'vid'],
    components: {},
    data () {
      return {
        username: '',
        password: '',
        loadingShow: false,
        maskShow: false,
        uid: 0
      }
    },
    watch: {

    },
    computed: {

    },
    methods: {
     login: function() {
            this.username = document.getElementById('username').value
            this.password = document.getElementById('password').value
            // let userinfo = JSON.stringify({
            //         UserName: this.username,
            //         Password: this.password,
            //     })
            // console.log(userinfo)
            this.$http({
              url:'//localhost:3000/vuemusic/login/'+ this.username + '/' + this.password,
              method: 'GET', 
              before: function() {
                this.loadingShow = true;
                this.maskShow = true;
              }
              }).then((res) => {
                let that = this
                that.loadingShow = false;
                that.maskShow = false;
                console.log(res);
                if(res.status == 200) {  //创建成功 定向到home
                  that.drawToast('登录成功,即将跳转到首页');
                  let uid = res.bodyText
                  console.log(uid)
                  setTimeout(function (uid) {
                    that.$router.push({
                      name:'home',
                      params: {uid: uid}
                    })
                  }, 1500);
                }
              }, (err) => {
                let that = this
                that.loadingShow = false
                that.maskShow = false
                if(err.status == 404) { //status=404 表示用户名不存在
                  that.drawToast('用户名不存在');
                }
                else {
                   that.drawToast('请检查网络');
                }    
              });
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
    filters: {
      listenCount: num => Math.round(num / 1000) / 10 + '万'
    }

  }
  // var userFocus = document.getElementById('username').focus();
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  * {
    margin: 0;
    padding: 0;
  }
  /*#play-bar {
    margin-bottom: -50px;
  }*/
  .login-page{
    width: 100%;
    height: 100vh;
    /*z-index: 300;*/
    background: url('../assets/background.jpg') center no-repeat;
    background-size: cover;
  }
  .login-slide-enter-active {
    transition: all .3s ease;
  }
  .login-slide-leave-active {
    transition: all .3s ease;
  }
  .login-slide-enter,.login-slide-leave-active {
    transform: translateX(100%);
  }

  .head-img {
    padding-top: 10vw;
    text-align: center;
  }
  .icon-img {
    width: 100px;
    height: 100px;
  }
  .login-info {
    margin-top: 30px;
  }
  .temp {
    /*text-align: center;*/
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 25px;
    /*background-color: #458;*/
    height: 40px;
    border: 1px solid #fff;
    border-radius: 10px;
    width: 73vw;
    margin: 0 auto 20px;
    position: relative;
  }
  .user-icon, .lock-icon{
    width: 18px;
    height: 18px;
    margin: 0 0 0 15px;
    position: absolute;
    top: 10px;
    left: 0;
  }
  .temp input {
    border: 0;
    outline: 0;
    background-color: transparent;
    height: 100%;
    width: 70%;
    /*margin: 0 0 0 10px;*/
    color: #fff;
    /*font-size: 15px;*/
  }
  ::-webkit-input-placeholder {
    color: #456;
    margin-top: 5px;
  }
  .login-btn {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 74vw;
    height: 40px;
    margin: 0 auto;
    /*background-color: #789;*/
    background:-webkit-gradient(linear, 50% top, 0 bottom, from(rgba(76, 162, 191, 0.8)), to(#eee));
    border-radius: 10px;
    color: #ddd;
    letter-spacing: 5px;
    font-size: 18px;
  }
  .no-userid {
    margin: 25px;
    width: 79vw;
  }
  .register-link {
    font-size: 14px;
    color: #eee;
    float: right;
    cursor: pointer;
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
