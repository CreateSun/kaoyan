<!--Author: CreateSun -->
<!--Date: 2020/10/4 -->

<template>
  <a-row class="transition calendar" type="flex" justify="center">
    <a-timeline style="margin-top: 2rem">
      <a-timeline-item v-for="item in lists" :color="convertColor(item.timeStamp)">
        <!--        <template v-slot:dot></template>-->
        <a-tag :color="convertColor(item.timeStamp)" class="date">
          {{convertDate(item.timeStamp)}}
        </a-tag>
        <a-card :loading="loading">
          <a-tag :color="convertColor(plain)" class="item" v-for="plain in item.lists">
            {{plain}}
          </a-tag>
          <div class="comment">
            <h2>ᴄʀᴇᴀᴛᴇsᴜɴ：</h2>
            {{item.comment}}
          </div>
        </a-card>
      </a-timeline-item>
    </a-timeline>
  </a-row>
</template>

<script>
    import {journal} from "../../api/user";
    import moment from "moment";

    export default {
        name: "journal",
        layout: "noWord",
        data() {
            return {
                lists: [],
                loading: true,
            };
        },
        computed: {
            convertDate() {
                return function (n) {
                    return moment(n).format("YYYY-MM-DD")
                }
            },
            convertColor() {
                return function (n) {
                    console.log(n);
                    let arr = [
                        '#f5222d',
                        '#fa541c',
                        '#fa8c16',
                        '#faad14',
                        '#d4b106',
                        '#a0d911',
                        '#52c41a',
                        '#13c2c2',
                        '#1890ff',
                        '#2f54eb',
                        '#722ed1',
                        '#eb2f96'
                    ];
                    let random = Math.floor(Math.random() * 13);
                    console.log('random color:' + random);
                    return arr[random];
                }
            }
        },
        mounted() {
            this.getJournal();
        },
        methods: {
            getJournal() {
                journal().then(res => {
                    if (res.code === 200) {
                        this.loading = false;
                        this.lists = res.data;
                    }
                })
            }
        }
    }
</script>

<style scoped>
  .item {
    font-size: 0.8rem;
    display: block;
    margin: 0.5rem 0 1rem 0;
  }

  .date {
    margin-bottom: 0.5rem;
  }
  .comment, .ant-card, .ant-card-bordered > div {
    padding: 0;
  }
  .ant-card-body {
    padding: 0;
  }
  .comment {
    border-radius: 5px;
    background-color: #c5c5c5;
    padding: 0.5rem;
    color: #ffffff;
    font-size: 1rem;
  }
</style>
