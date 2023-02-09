// pages/testasyn/testAsyn.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */

   
  onLoad() {

    // 声明该方法为异步方法，会返回一个Promise对象
    async function test(){
      return '云开发'
    }   
    console.log(test())
    test().then((res)=>{
      console.log("ook")
    })
    test().catch(err=>{
      console.log('nono')
    })
    const a1 = this.pro1()
    const a2 = this.pro2()
    console.log(a1)
    console.log(a2)
    this.test2()
  },

  pro1() {
    return new Promise((resolve, reject) => {
      resolve(1)
    })
  },
 pro2() {
    return new Promise((resolve, reject) => {
      resolve(2)
    })
  },
  pro3() {
    return new Promise((resolve, reject) => {
      //延时4秒
      setTimeout(()=>{
        resolve("延时4秒到")
      },4000)
    })
  },
  pro4() {
    return new Promise((resolve, reject) => {
      resolve(2)
    })
  },
  async  test2(){
    const a1 = await this.pro3()
    const a2 = await this.pro4()
    console.log(a1)
    console.log(a2)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})