// miniprogram/pages/bluetooth/index/index.js
Page({

    /**
     * Page initial data
     */
    data: {
        loading: false,
        inputInfo: '',
        latitude: "23.099994",
        longitude: "113.324520",
      },
      /*
      bindLogin: function() {
        wx.login({
            success: function () {
              wx.getUserInfo({
                success: function (res) {
                    that.globalData.userInfo = res.userInfo
                    typeof cb == "function" && cb(that.globalData.userInfo)

                    var userInfo = res.userInfo
                    var nickName = userInfo.nickName
                    var avatarUrl = userInfo.avatarUrl
                    var gender = userInfo.gender //sex => 0: unknown ; 1: male ; 2：female
                    var province = userInfo.province
                    var city = userInfo.city
                    var country = userInfo.country
                }
              })
            }
          })
      },*/
    bindFormSubmit: function (e) {
        // Enable loading animation on send btn
        this.setData({
          loading: !this.data.loading
        })
        // Loading toast
        wx.showToast({
          title: 'Sending...',
          icon: 'loading',
          duration: 1500
        })
        setTimeout(function(){
            this.setData({
                loading: !this.data.loading
            })
       
            // Redirect user
            wx.reLaunch({
                url: '/pages/index/index'
            });
            }, 1500);
    },
    bindScan: function () {
        console.log('scanner')
        wx.scanCode({
            success: (res) => {
                console.log(res)
                wx.showModal({
                    title: 'QR Code data',
                    content: JSON.stringify(res),
                    confirmText: "Ok",
                    showCancel: false,
                    success: function (res) {}
                })
            }
        })
    },
    inputEvent: function (e) {
        console.log(e.detail.value)
        this.setData({
            inputInfo: e.detail.value
        })
    },
    saveToCache: function () {
        wx.setStorage({ key: 'inputInfo', data: this.data.inputInfo,
            success: function (res) {
                console.log("setStorage", res);
            }
        })

        wx.getStorage({
            key: 'inputInfo',
            success: function(res) {
                console.log("getStorage", res);
            }
        })
    },

    listenerBtnGetLocation: function () {
        wx.getLocation({
            type: 'wgs84',
            success: function(res) {
                var latitude = res.latitude
                var longitude = res.longitude
                var speed = res.speed
                var accuracy = res.accuracy
                console.log(res)
                wx.showModal({
                    title: 'QR Code data',
                    content: JSON.stringify(res),
                    confirmText: "Ok",
                    showCancel: false,
                    success: function (res) {}
                })
                wx.openLocation({
                    latitude: latitude,
                    longitude: longitude,
                    scale: 28
                })
            },
            fail: function(err) {
                console.log(err);
            }
        })
    },

    showModal: function() {
        wx.showModal({
            title: 'Modal title',
            content: 'Modal content ',
            confirmText: "Ok",
            showCancel: false,
            success: function (res) {
               console.log('success')
            }
        })
    },
    /*** Lifecycle function--Called when page load */
    onLoad: function (options) {
        // wx.showNavigationBarLoading()
        var that = this;
        wx.getStorage({
            key: 'inputInfo',
            success: function (res) {
                // console.log(res)
                that.setData({
                inputInfo: res.data,
                })
            }
        })
    },

    /*** Lifecycle function--Called when page is initially rendered */
    onReady: function () {
        wx.setNavigationBarTitle({
            title: 'My new navabar title',
            success: function(res){
                console.log("onReady--setNavigationBarTitle::",res)
            }
        })
    },

    /*** Lifecycle function--Called when page show */
    onShow: function () {
        wx.setNavigationBarTitle({
            title: 'My new navabar title',
            success: function(res){
                console.log("onShow--setNavigationBarTitle::", res)
            }
        })
    },

    /*** Lifecycle function--Called when page hide*/
    onHide: function () {},

    /*** Lifecycle function--Called when page unload*/
    onUnload: function () {},

    /** Page event handler function--Called when user drop down*/
    onPullDownRefresh: function () {},

    /* Called when page reach bottom*/
    onReachBottom: function () {},

    /*** Called when user click on the top right corner to share*/
    onShareAppMessage: function () {}
})