export class Semester {
    // 字段
    year: 2023; //所要查看的月的所在年，界面
    month: 3; //所要查看的月，界面
    semesterTiltle: [];
    //theDay: ""; //记录当前日期，比如20230123
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
