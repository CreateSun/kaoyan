<!--Author: CreateSun -->
<!--Date: 2020/10/4 -->

<template>
  <div class="transition container">
    <a-row class="header" type="flex">
      <a-col style="margin-right: 1rem">
        <a-select
          size="small"
          :dropdown-match-select-width="false"
          class="my-year-select"
          :value="String(current.year)"
          @change="newYear => onChange(value.clone().year(newYear), 'year')"
        >
          <a-select-option
            v-for="val in getYears(value)"
            :key="String(val)"
            class="year-item"
          >
            {{ val }}
          </a-select-option>
        </a-select>
      </a-col>
      <a-col>
        <a-select
          size="small"
          :dropdown-match-select-width="false"
          :value="String(current.month)"
          @change="selectedMonth => { onChange(value.clone().month(parseInt(selectedMonth, 10)));}
        ">
          <a-select-option
            v-for="(val, index) in getMonths(value)"
            :key="String(index)"
            class="month-item"
          >
            {{ val }}
          </a-select-option>
        </a-select>
      </a-col>
    </a-row>
    <a-row type="flex" justify="space-around">
      <a-col class="header-dots" :span="3" v-for="item in ['日','一','二','三','四','五','六']">
        {{item}}
      </a-col>
    </a-row>
    <a-row class="calendar-body-row" type="flex" justify="space-around" v-for="value in 6">
      <a-col :class="dotsStyle(item, value)" :span="3" v-for="item in getStartDate[value-1]">
        {{item}}
      </a-col>
    </a-row>
  </div>
</template>

<script>
    import moment from 'moment'
    import {calendar} from "../api/user";

    export default {
        name: "calendar",
        // layout: "noWord",
        data() {
            return {
                value: moment(new Date()),
                lists: [],
                start_end: [],
                current: {
                    date: moment(new Date()).date(), // 日
                    month: moment(new Date()).month(), // 月
                    year: moment(new Date()).year() // 年
                }
            };
        },
        computed: {
            dotsStyle() {
                /**
                 * i 对应日期
                 * v 所在行
                 */
                return function (i, v) {
                    // console.log(v)
                    let month = v===1&&i>7?this.current.month:this.current.month+1;
                    let total = `${this.current.year}-${month<10?'0'+month:month}-${i<10?'0'+i:i}`;
                    let result = "default-dots";
                    if (i>7 && v===1) result+=" pre-month";
                    else if(i<7 && v>=5) result+=" next-month";
                    // else if (i)
                    if (this.lists.includes(total)) result+= " sign-dots";
                    return result;
                }
            },
            getStartDate() {
                let result = [[]]; // result为二维数组  总共有7列6行  共42个元素
                let day = moment(`${this.current.year}-${this.current.month+1}-01`).day(); // 当前月份的第一天是星期几
                // console.log('this day is 星期'+day+"当前月份是"+this.current.month)
                let month = this.current.month;
                let preMonthLast;
                let isPre = false, isNext = false; //是否需要填充前一个月及后一个月的标志位
                if (day !== 0) {
                    /**
                     * 填充第一行的上个月的日期
                     */
                    isPre = true;
                    // 如果该月份的第一天不是星期天 则计算上个月的最后一天是 几号
                    preMonthLast = this.getLastDay(this.current.year, month); // 月份从0 开始 而函数接收真实数字 所以当前的9月份刚好等于current中的month（10月）
                    let preMonthArr = [];
                    // 建立上个月多余天数的临时数组
                    for (let temp = day; temp > 0; temp--) preMonthArr.unshift(preMonthLast--);
                    // 将临时数组放入到最终结果的第一行元素中
                    result[0] = [...preMonthArr];
                }

                for (let temp = 0; temp <= 6-day; temp ++) result[0].push(temp+1); // 填充第一行的当月数据

                // console.log(result); // 第一行数据填充完成
                for (let temp = (6-day)+2, count = 1, currentLine = 1; temp <= this.getLastDay(this.current.year, month+1); temp++, count++) {
                    /**
                     * 计算第二行的一个数据应该从第几开始填充
                     * temp 为第一个值
                     * count 填充次数 每填充够七次后 currentLine+1 跳转至下一行
                      */
                    if(result.length < currentLine + 1 ) result.push([]);
                    // console.log(currentLine);
                    // console.log(result);
                    result[currentLine].push(temp);
                    if (count %7 === 0) {
                        // console.group('result');
                        // console.log(result.length);
                        // console.log(count);
                        // console.log(currentLine);
                        count = 0;
                        currentLine+=1;
                    }
                }
                // console.log(result); // 上一个月以及当月日期填充完毕
                for (let temp = result[result.length-1].length, i = 1; temp<7; temp++) {
                    result[result.length-1].push(i++);
                    isNext = true
                }
                let start = `${this.current.year}-${isPre?this.current.month:this.current.month+1}-${result[0][0]}`;
                let end = `${this.current.year}-${isNext?this.current.month+2:this.current.month+1}-${result[result.length-1][6]}`;
                this.start_end= [
                    moment(start).valueOf(),
                    moment(end).valueOf()
                ];
                this.getData(this.start_end[0], this.start_end[1]);

                return result
            }
        },
        mounted() {
            // console.log('mounted');
            this.getData(this.start_end[0], this.start_end[1]);

        },
        methods: {
            getLastDay(year, month) {
                let new_year = year;    //取当前的年份
                let new_month = month++;//取下一个月的第一天，方便计算（最后一天不固定）
                if (month > 12) {
                    new_month -= 12;        //月份减
                    new_year++;            //年份增
                }
                let new_date = new Date(new_year, new_month, 1);                //取当年当月中的第一天
                return (new Date(new_date.getTime() - 1000 * 60 * 60 * 24)).getDate();//获取当月最后一天日期
            },
            onChange(value, mode) {
                if (mode === 'year'){
                    this.current['year'] = value.year()
                } else {
                    this.current['month'] = value.month()
                }
                // this.getData(this.getData(this.start_end[0], this.start_end[1]));
                // 修改当前面板显示的时间
                // console.log(value);
            },
            getMonths(value) {
                const current = value.clone();
                const localeData = value.localeData();
                const months = [];
                for (let i = 0; i < 12; i++) {
                    current.month(i);
                    months.push(localeData.monthsShort(current));
                }
                return months;
            },
            getYears(value) {
                const year = value.year();
                const years = [];
                for (let i = year - 10; i <= year; i += 1) {
                    years.push(i);
                }
                return years;
            },
            getData(start, end) {
                // console.log('getdata');
                // let start = moment("2020-09-08").valueOf();
                // let end = moment("2020-10-08").valueOf();
                calendar(start, end).then(res => {
                    if (res.code === 200) {
                        res.data.forEach((item, index) => {
                            res.data[index] = moment(item).format("YYYY-MM-DD")
                        });
                        this.lists = res.data;
                    }
                })
            }
        },
    }
</script>

<style scoped>

  .header {
    margin: 1rem 0 1rem 0;
  }
  .ant-fullcalendar-value {
    font-size: 1.5rem;
  }

  .ant-fullcalendar-fullscreen .ant-fullcalendar-value {
    font-size: 1.5rem;
  }

  .just_do_it {
    height: 3rem;
    width: 3rem;
  }

  .calendar-body-row {
    margin-top: 1rem;
  }

  .calendar {
    margin-top: 2rem;
    border: 1px solid #d9d9d9;
    border-radius: 4px
  }

  .sign-dots::before {
    content: "";
    background-color: red;
    height: 0.4rem;
    width: 0.4rem;
    border-radius: 50%;
    position: absolute;
    top: 70%;
    left: 50%;
    /*position: absolute;*/
    transform: translate(-50%, 50%);
  }

  .red-dots {
    margin: 0 auto;
    background-color: #ff7978;
    color: #ffffff;
    border-radius: 10%;
    line-height: 2rem;
    font-size: 0.5rem;
    text-align: center;
  }

  .default-dots {
    margin: 0 auto;
    background-color: #38d3ff;
    color: #ffffff;
    border-radius: 10%;
    line-height: 3rem;
    font-size: 1rem;
    text-align: center;
  }

  .pre-month, .next-month {
    opacity: 0.5;
    /*filter: grayscale(70%);*/
  }

  .current-month {

  }

  .header-dots {
    margin: 0 auto;
    background-color: #1890ff;
    color: #ffffff;
    height: 2.5rem;
    width: 2.5rem;
    border-radius: 50%;
    line-height: 2.5rem;
    font-size: 1rem;
    text-align: center;
  }

</style>
