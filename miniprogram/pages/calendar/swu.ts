import {
    Event
}
from './event';
let event = new Event();
import {
    Semester
}
from './semester';
let semester = new Semester();
import {
    Calendar
}
from './calendar';
let calendar = new Calendar();
Page({
    /*页面的初始数据*/
    data: {
        /* 页面数据*/
        semesterTitle: [], //学期名称 如2022-2023-1，下拉框数据源,界面
        index: 1, //学期选择的索引，界面
        year: 2023, //所要查看的月的所在年，界面
        month: 3, //所要查看的月，界面
        weekArr: ['周', '日', '一', '二', '三', '四', '五', '六'], //界面
        dateArr: [], //某月历的日期数组，程序中填充     界面
        theDay: "", //记录当前日期，比如2023123
    },

    /* 界面事件*/
    bindPickerChange: function (e) {
        //选择学期
        this.setData({
            index: e.detail.value,
            year: semester.yearOfFirstMonth(e.detail.value),
            month: semester.monthOfFirstMonth(e.detail.value),
        })
        this.refresh();
    },
    lastMonthClick: function () {
        //上月按钮
        let m = this.data.month;
        let y = this.data.year;
        if (m - 1 <= 0) {
            m = 12;
            y = y - 1;
        } else {
            m = m - 1;
        }
        this.toCertainDay(y, m);
    },
    nextMonthClick: function () {
        //下月按钮
        let m = this.data.month;
        let y = this.data.year;
        if (m + 1 > 12) {
            m = 1;
            y = y + 1;
        } else {
            m = m + 1;
        }
        this.toCertainDay(y, m);
    },
    todayClick: function () {
        //今日按钮
        this.toCertainDay();
    },
    setPicker: function () {
        //根据学期设置picker的index
        for (let i = 0; i < this.data.semesterTitle.length; i++)
            if (semester.semester == this.data.semesterTitle[i]) {
                this.setData({
                    index: i,
                });
                break;
            };
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {},

    refresh: function () {
        //根据year和month获取所在学期数据、填充月份数据、添加事件
        semester.setSemester(this.data.year, this.data.month);
        this.setData({
            dateArr: calendar.dateInit(this.data.year, this.data.month, semester.firstday, semester.lowerbound, semester.upperbound)
        })
        this.setData({
            dateArr: event.addEvents(this.data.dateArr)
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function (options) {
        //同步方式获取云数据库的事件
        await semester.loadSemester(); //读学期数据
        await event.getevent(); //读日历事件数据
        this.setData({
            eventsBase: event.eventsBase
        });
        this.setData({
            semesterTitle: semester.setSemesterTiltle()
        });
        let now = new Date(); //记录今日
        //semester.theDay = calendar.getYearStr(now.getFullYear(), now.getMonth() + 1, now.getDate());
        this.setData({
            theDay: calendar.theDay
        });
        this.toCertainDay();

    },

    bind_publish: function (e) { //点击某个具体的元素，获取到他在数组中的下标，根据下标，将该元素_id值传递给下一个页面
        console.log(e.currentTarget.dataset.id);
        if (e.currentTarget.dataset.id.length > 0)
            wx.showModal({
                title: '提示',
                content: e.currentTarget.dataset.id,
                success: function (res) {
                    if (res.confirm) { //这里是点击了确定以后
                        console.log('用户点击确定')
                    } else { //这里是点击了取消以后
                        console.log('用户点击取消')
                    }
                }
            });
    },

    toCertainDay: function (y, m) {
        if (typeof(y) == 'undefined') {
            let now = new Date();
            m = now.getMonth() + 1;
            y = now.getFullYear();
        };
        this.setData({
            month: m,
            year: y,
        })
        this.refresh();
        this.setPicker();
    },

    /* 业务代码*/

})

//todo
// 封装步骤关系
// 云开发
// 增加、修改、删除事件
// 模态窗口
