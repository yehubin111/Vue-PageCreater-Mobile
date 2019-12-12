import { Info } from '@/pagecreater/type';

// 一些需要补充单位的属性 key: unit
// export const unitKey: UnitKey = {
//   padding: "px"
// };
// 全局配置
export const globalInfo: Info = {
  title: { name: "标题", default: "", type: "input" },
  subhead: { name: '副标题', default: "", type: "input" },
  share: {
    name: '开启分享',
    default: false,
    type: "switch"
  },
  styles: {
    name: "样式",
    child: {
      padding: { name: "内边距", default: "0px", type: "input" },
      "background-color": { name: "背景色", default: "", type: "color" }
    }
  }
};
/**
 * {
 *  title: '',
 *  style: {
 *      padding: '',
 *      background-color: ''
 * }
 * }
 */
// 单选项
export const radioSelect: RadioSelect = {
  count: [
    { key: 1, value: "1列" },
    { key: 2, value: "2列" },
    { key: 3, value: "3列" },
    { key: 4, value: "4列" }
  ],
  clickEvent: [
    { key: "alert", value: "弹出框" },
    { key: "topic", value: "跳专题页" },
    { key: "goodsdetail", value: "跳商品详情页" },
    { key: "h5link", value: "跳h5链接" },
    { key: "couponid", value: "优惠券" },
    { key: "weex", value: "跳weex页面" }
  ],
  weexpage: [
    { key: 'taskcenter', value: "任务中心" },
    { key: 'secklist', value: "秒杀列表" }
  ],
  // navcount: [
  //   { key: 1, value: "1项" },
  //   { key: 2, value: "2项" },
  //   { key: 3, value: "3项" },
  //   { key: 4, value: "4项" },
  //   { key: 5, value: "5项" }
  // ],
  columnCount: [
    { key: "three", value: "一行三列" },
    { key: "double", value: "一行两列" },
    { key: "single", value: "一行一列" }
  ],
  tagPosition: [
    {
      key: "left",
      value: "左侧"
    },
    {
      key: "right",
      value: "右侧"
    }
  ],
  memberPriceStyle: [{ key: "1", value: "1" }, { key: "2", value: "2" }],
  pattern: [{ key: 'tab', value: 'tab模式' }, { key: 'roll', value: '滚动模式' }],
  position: [{ key: 'left', value: '左对齐' }, { key: 'center', value: '居中' }, { key: 'right', value: '右对齐' }],
  local: [{ key: 'top', value: '上方' }, { key: 'bottom', value: '下方' }],
};

interface RadioSelectChild {
  [propName: string]: string | number;
}
interface RadioSelect {
  [propName: string]: RadioSelectChild[];
}
