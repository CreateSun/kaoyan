<template>
  <a-calendar v-model:value="value">
    <template v-slot:dateCellRender="{ current: value }">
      <ul class="events">
        <li v-for="item in getListData(value)" :key="item.content">
          <a-badge :status="item.type" :text="item.content" />
        </li>
      </ul>
    </template>
    <template v-slot:monthCellRender="{ current: value }">
      <div v-if="getMonthData(value)" class="notes-month">
        <section>{{ getMonthData(value) }}</section>
        <span>Backlog number</span>
      </div>
    </template>
  </a-calendar>
</template>
<script>
    export default {
        data() {
            return {
                value: '',
            };
        },
        methods: {
            getListData(value) {
                let listData;
                switch (value.date()) {
                    case 8:
                        listData = [
                            { type: 'warning', content: 'This is warning event.' },
                            { type: 'success', content: 'This is usual event.' },
                        ];
                        break;
                    case 10:
                        listData = [
                            { type: 'warning', content: 'This is warning event.' },
                            { type: 'success', content: 'This is usual event.' },
                            { type: 'error', content: 'This is error event.' },
                        ];
                        break;
                    case 15:
                        listData = [
                            { type: 'warning', content: 'This is warning event' },
                            { type: 'success', content: 'This is very long usual event。。....' },
                            { type: 'error', content: 'This is error event 1.' },
                            { type: 'error', content: 'This is error event 2.' },
                            { type: 'error', content: 'This is error event 3.' },
                            { type: 'error', content: 'This is error event 4.' },
                        ];
                        break;
                    default:
                }
                return listData || [];
            },

            getMonthData(value) {
                if (value.month() === 8) {
                    return 1394;
                }
            },
        },
    };
</script>
<style scoped>
  .events {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .events .ant-badge-status {
    overflow: hidden;
    white-space: nowrap;
    width: 100%;
    text-overflow: ellipsis;
    font-size: 12px;
  }
  .notes-month {
    text-align: center;
    font-size: 28px;
  }
  .notes-month section {
    font-size: 28px;
  }
</style>
