export class Semester {
    // 字段
    year: 2023; //所要查看的月的所在年，界面
    month: 3; //所要查看的月，界面
    semesterTiltle: [];
    theDay: ""; //记录当前日期，比如20230123
    semesters: []; //学期数据，从云数据库读取
    firstday: ""; //查看的学期的第一天
    semester: ""; //查看的学期
    weeks: 0; //查看的学期的周数
    lowerbound: ""; //系统日历数据下界
    upperbound: ""; //系统日历数据上界

    // 构造函数
    constructor() {};
    // 方法
    async loadSemester() { //同步从云数据库读取学期数据
        let db = wx.cloud.database();
        let res = await db.collection('semester').get();
        console.log('学期请求结果：', res);
        this.semesters = res.data;
		//设置学期数据的上下界，即最早学期的第一天，最晚学期的最后一天
        this.lowerbound = new Date(this.semesters[0].firrstDay.replace(/-/g, "/"));
        let length = this.semesters.length;
        this.upperbound = new Date(this.semesters[length - 1].firrstDay.replace(/-/g, "/"));
        let weeks = this.semesters[length - 1].weeks;
        this.upperbound.setDate(this.upperbound.getDate() + weeks * 7 - 1);
    };
    setSemester(year, month) {
        //根据year和month设置所在学期数据,例如： ['2016-2017-1', '2016-9-4', 19, 6]
        if (typeof(this.semesters) == 'undefined')
            return;
        let d = new Date(year + '/' + month + '/' + 1);
        d.setMonth(d.getMonth() + 1);
        d.setDate(d.getDate() - 1); //取该月的最后一天判断所在的学期        
        for (let i = 0; i < this.semesters.length; i++) {
            let startDay = new Date(this.semesters[i].firrstDay.replace(/-/g, "/"));
            let endDay = new Date(this.semesters[i].firrstDay.replace(/-/g, "/")); ;
            let weeks = this.semesters[i].weeks + this.semesters[i].holiday;
            endDay.setDate(endDay.getDate() + weeks * 7);
            if (d >= startDay && d <= endDay) {
                this.firstday = new Date(this.semesters[i].firrstDay.replace(/-/g, "/"));
                this.semester = this.semesters[i].semesterTitle;
                this.weeks = this.semesters[i].weeks;
                break;
            };
        };
    };
    dateInit(year, month) {
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
                if (d2 > this.upperbound || d2 < this.lowerbound) //处理点击上月超出系统最早学期
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
    yearOfFirstMonth(index) {
        if (typeof(this.semesters) == 'undefined')
            return 0;
        //根据学期index设置学期第一月所在年
        let str = this.semesters[index].firrstDay;
        let strarray = str.split("-");
        return 1 * strarray[0];
    };
    monthOfFirstMonth(index) {
        if (typeof(this.semesters) == 'undefined')
            return 0;
        //根据学期index设置学期第一月所在月
        let str = this.semesters[index].firrstDay;
        let strarray = str.split("-");
        return 1 * strarray[1];
    };
    setSemesterTiltle() {
        let title = [];
        for (let i = 0; i < this.semesters.length; i++)
            title[i] = this.semesters[i].semesterTitle;
        this.semesterTitle = title;
        return title;
    };
}
