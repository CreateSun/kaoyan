<template>
  <div class="transition container" style="margin-top: 1rem">
    <a-collapse v-model:activeKey="activeKey" accordion >
      <a-collapse-panel key="1" header="每日打卡">
        <a-input :class="addSign" v-model:value="signName" placeholder="输入名称"/>
        <a-button type="link" @click="add">Add</a-button>
        <a-col class="sign-item" v-for="(item, index) in lists">
          <span class="order-number">{{index+1}}.</span>
          <a-switch size="small" v-model:checked="item.status" @change="handleSwitch(item.status, index)"/>
          <span class="description">{{item.title}}</span>
          <a-button style="float: right" type="link" @click="del(item._id, index)">delete</a-button>
        </a-col>
        <a-textarea style="width: 100%; margin-top: 5px; padding: 5px" :rows="2" v-model:value="comment" placeholder="发表感想"/>
        <a-button type="primary" style="margin-top: 5px" block @click="signin">今日打卡</a-button>
      </a-collapse-panel>
      <a-collapse-panel key="2" header="数据统计">

        <a-row :span="24" class="statistic-title" type="flex" justify="start">
          <a-col class="avatar">
            {{avatarName}}
          </a-col>
          <a-col style="margin-left: 2rem; margin-top: 1rem">
            <a-statistic-countdown title="距离2021年研究生考试还有" :value-style="numberStyle" :value="deadline"
                                   format="D 天 H 时 m 分 s 秒"/>
          </a-col>
        </a-row>
        <a-row :span="24" type="flex" justify="space-around" style="margin-top: 2rem">
          <a-statistic class="statistic-title" title="最长连续打卡次数" :value="statistic.continue" :value-style="numberStyle"
                       style="margin-right: 50px"/>

          <a-statistic class="statistic-title" title="打卡总次数" :value="statistic.total" :value-style="numberStyle"/>
        </a-row>

        <calendar></calendar>
      </a-collapse-panel>
    </a-collapse>
  </div>
</template>

<script>
    import {addSign, delSign, getSignList, Signin, statistic} from "../api/user";
    import Calendar from "../components/calendar";
    import moment from 'moment';
    export default {
        components: {Calendar},
        data: function () {
            return {
                activeKey: 1,
                text: 'Hello',
                lists: [],
                avatarName: 'CreateSun',
                comment: '',
                signName: '',
                isAdd: false,
                statistic: {
                    total: 0,
                    continue: 0
                }
            }
        },
        computed: {
            numberStyle() {
                return {'font-size': '2rem', 'color': '#141414', textAlign: 'center'}
            },
            deadline: function () {
                return Date.parse('Dec, 26, 2021');
            },
            addSign: function () {
                if (Boolean(this.isAdd)) return 'add-name-active';
                else return 'add-name';
            }
        },
        mounted() {
          this.getSign();
          this.getStatistic();
        },
        methods: {
            handleSwitch(v, i) {
                console.log(i);
                this.lists[i].status = v;
            },
            add() {
                if (this.signName.length > 0) {
                    let req = {title: this.signName, status: true};
                    addSign(req).then(res => {
                        if (res['code'] === 200) {
                            this.isAdd = !this.isAdd;
                            this.lists.push(res.data);
                            this.$message.success(res.msg);
                        } else this.$message.warning(res.msg);
                    })
                } else {
                    this.isAdd = !this.isAdd;
                }
                this.signName = '';
            },
            del(id, index) {
                delSign(id).then(res => {
                    if (res['code'] === 200) {
                        this.lists.splice(index, 1);
                        this.$message.success(res.msg);
                    } else {
                        this.$message.warning(res.msg);
                    }
                })
            },
            getSign() {
                getSignList().then(res => {
                    if (res) {
                        let data = res;
                        data.forEach(item => {
                            return item.status = false;
                        });
                        this.lists = data;
                    }
                })
            },
            getStatistic() {
                statistic().then(res => {
                    if (res.code === 200) {
                        this.statistic = res.data;
                    }
                })
            },
            async signin() {
                let data = [];
                await this.lists.forEach(item => {
                    if (item.status) data.push(item.title)
                });
                let req = {
                    comment: this.comment,
                    lists: data,
                    timeStamp: Date.parse(new Date()),
                    // timeStamp: Date.parse(new Date()),
                };
                Signin(req).then(res => {
                    if (res['code'] === 200) this.$message.success("打卡成功");
                    else this.$message.warning(res.msg);
                    // console.log(moment(res.time).valueOf())
                    this.comment = ''
                })
            }
        }
    }
</script>

<style scoped>
  .demo-loadmore-list {
    min-height: 350px;
  }

  .description {
    margin-left: 1.5rem;
  }

  .sign-item {
    padding: 0.5rem;
    border-radius: 3px;
    background-color: #bae7ff;
    margin-top: 5px;
  }

  .order-number {
    font-weight: bolder;
    margin-right: 0.5rem;
  }

  .statistic-title {
    margin-top: 1rem;
    color: #8c8c8c;
    font-weight: lighter;
  }

  .avatar {
    display: block;
    height: 5rem;
    width: 5rem;
    border-radius: 5px;
    background: #1890ff;
    color: #F5F5F5;
    line-height: 5rem;
    overflow: hidden;
    vertical-align: middle;
    text-align: center;
  }

  .add-name-active {
    height: 40px;
    padding: 5px;
    width: 80%;
    transition: 0.5s ease width;
  }

  .add-name {
    width: 0;
    transition: 0.5s ease width;
    overflow: hidden;
    border: transparent;
  }

</style>

