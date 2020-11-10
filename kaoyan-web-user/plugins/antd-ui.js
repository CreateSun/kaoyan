/**
 * Author: CreateSun
 * Date: 2020/7/21
 * Antd按需加载组件，减少不必要样式的加载造成的资源包过大
 */
import Vue from 'vue';
import Antd from 'ant-design-vue';
import Button  from "ant-design-vue/lib/button";
import Icon  from "ant-design-vue/lib/icon";
import message  from "ant-design-vue/lib/message";
import notification  from "ant-design-vue/lib/notification";
import Row from "ant-design-vue/lib/grid/Row";
import Col from "ant-design-vue/lib/grid/Col";
import Card from "ant-design-vue/lib/card";
import Switch from "ant-design-vue/lib/vc-switch/Switch";
import Collapse from "ant-design-vue/lib/collapse/Collapse";

import moment from "moment";
import 'moment/locale/zh-cn'

moment.locale('zn-cn');
Vue.use(Antd);
Vue.use(Button);
Vue.use(Icon);
Vue.use(message);
Vue.use(notification);
Vue.use(Col);
Vue.use(Row);
Vue.use(Collapse);
Vue.use(Switch);
Vue.use(Card);
