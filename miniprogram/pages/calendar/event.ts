
export class Event {
  // 字段
  eventsBase: [];
  //构造函数
  constructor() {  
  };
  // 方法
  async getevent() {
      let db = wx.cloud.database();
      let res = await db.collection('events').get();
      console.log('事件请求成功', res);
      this.eventsBase = res.data;	  
  };

  addEvents(dateArr) {
      //月历中填充事件      
      if(typeof(this.eventsBase) == 'undefined')
        return;
      for (let i = 0; i < this.eventsBase.length; i++) {
          for (let j = 0; j < dateArr.length; j++) {
              let obj = dateArr[j];
              if (this.eventsBase[i].eventdate == obj.isToday) {
                  let eventstr = this.eventsBase[i].eventdetail;
                  let eventsubstr = eventstr.substr(0, 4);
                  obj.event = obj.event + "\n" + eventsubstr;
                  if (obj.eventdetail.length > 0)
                      obj.eventdetail = obj.eventdetail + "\r\n" + eventstr;
                  else
                      obj.eventdetail = eventstr;
              }
              dateArr[j] = obj;
          }
      }
      return dateArr;

  };
}