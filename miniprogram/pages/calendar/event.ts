
export class Event {
  // 字段
  eventsBase:any;
   //构造函数
  constructor() {
      //this.owner = engine;
  };

  // 方法
  async getevent(){
    let db=wx.cloud.database();
	  let res=await db.collection('events').get();
    console.log('请求成功',res); 
	  this.eventsBase=res.data;
  }
}