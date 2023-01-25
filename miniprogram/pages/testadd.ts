var util = require('../utils/util.js');
Page({      
      data: {
        num1:"",//被加数
        num2:"",//加数
        result:"" //结果
      },
      bindAdd:function(e) {
          var height=this.data.num1*1;
          var weight=this.data.num2*1;
          var r =weight/(height*height);
          console.log(r);
          var time = util.formatTime(new Date());
          this.setData({
            result: r
            //result: time
          });
        },
       
        bindInput1:function(e) {
          var n = e.detail.value;
          console.log(n);
          if (!isNaN(n)) {
            this.setData({
              num1: n
            });
          };
        },
       
        bindInput2:function(e) {
          var n = e.detail.value;
          console.log(n);
          if (!isNaN(n)) {
            this.setData({
              num2: n
            });
          };
        }
      })