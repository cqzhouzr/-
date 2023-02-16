export class Calendar {
    // 字段

    theDay: ""; //记录当前日期，比如20230123    
   
    //构造函数
    constructor() {
        let now = new Date(); //记录今日
        this.theDay = this.getYearStr(now.getFullYear(), now.getMonth() + 1, now.getDate());
    };
	
    // 方法

    dateInit(year, month,firstday,lowerbound,upperbound) {
        //根据年和月，产生日期数据
        let dateArr = []; //需要遍历的日历数组数据
        let arrLen = 0; //dateArr的数组长度
        let startWeek = new Date(year + '/' + month + '/' + 1).getDay(); //目标月1号对应的星期
        let dayNums = new Date(year, month, 0).getDate(); //获取目标月有多少天
        let obj = {}; //dateArr[i]=obj
        let num = 0; //日期计数
        arrLen = startWeek + dayNums; //dayNums+1号前面的空格
        arrLen = arrLen + Math.ceil(arrLen / 7); //月历的每一行添加一列--教学周
        for (let i = 0; i < arrLen; i++) {
            if (i % 8 != 0) {
                if (i > startWeek) { //2月第1天是星期3，则第一行星期日-星期2，为空
                    num += 1;
                    obj = {
                        isToday: this.getYearStr(year, month, num),
                        dateNum: num,
                    }
                    if (obj.isToday == this.theDay)
                        obj.event = "\n今天哟";
                } else //1号前面的格子不填充任何数据
                    obj = {};
            } else { //处理第1列数据，一般是教学周的周数
                let d2 = new Date(year + '/' + month + '/' + (num + 1)); //每行的第一个日期
                //let firstSemesterDay = new Date(this.firstday.replace(/-/g, "/"));
                let daydiff = -1;
                let dataNumStr = month >= 7 && month <= 9 ? "暑假" : "寒假";
                let weekNum = 0; //第几周
                if (d2 > upperbound || d2 < lowerbound) //处理点击上月超出系统最早学期
                    dataNumStr = "未安排";
                else
                    if (d2 >= this.firstday) {
                        //计算第几周
                        daydiff = parseInt(d2.getTime() - this.firstday.getTime()) / (1000 * 60 * 60 * 24);
                        weekNum = Math.floor(daydiff / 7) + 1;
                        if (weekNum <= this.weeks)
                            dataNumStr = "第" + weekNum + "周";
                    }
                obj = {
                    dateNum: dataNumStr
                }
            }
            if (typeof(obj.event) == 'undefined')
                obj.event = "";
            obj.eventdetail = "";
            dateArr[i] = obj;
        }
        return dateArr;
    };
    getYearStr(year, month, day) {
        let m = month > 9 ? '' + month : '0' + month;
        let d = day > 9 ? '' + day : '0' + day;
        return '' + year + m + d;
    };

}
