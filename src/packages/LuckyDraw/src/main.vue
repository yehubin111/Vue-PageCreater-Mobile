<template>
  <div class="luckydraw">
    <div class="luckybox" :style="{'padding': $px2vw(padding)}">
      <div class="lucky" v-for="(lk, index) in list" :key="index">
        <div
          class="lucksel"
          :style="{'background-image': `url(${background})`}"
          v-if="index != buttonIndex"
        >
          <div
            class="lucksel column-flex ac jc"
            :style="{'background-image': present == index ? `url(${backgroundOn})` : 'none'}"
          >
            <!-- <div class="lucky-default" v-if="!lk">
              <img src="http://p7.highstreet.top/FpzTudN9Ol95xpDFVAYoF6N6Qw3O" alt />
            </div> -->
            <div class="lucky-goods column-flex ac jc" v-if="lk">
              <p class="lucky-icon row-flex ac jc">
                <img :src="lk.pic" alt />
              </p>
              <p class="lucky-font">{{lk.name}}</p>
            </div>
          </div>
        </div>
        <div class="luckbutton" v-else @click="prepareAward">
          <img v-if="buttonUrl" :src="buttonUrl" alt />
          <p class="button column-flex ac jc" v-else>
            <span>马上抽奖</span>
          </p>
        </div>
      </div>
    </div>
    <p class="counttotal" :class="countClass" :style="countStyle">{{countmsg}}</p>

    <van-dialog v-model="errordialog" :showConfirmButton="false">
      <div class="toastdialog column-flex ac">
        <p class="toast-info ff-l">{{errmsg}}</p>
        <div class="toast-button row-flex jc ac">
          <p class="toast-button-cancel ff-l" @click="errordialog = false" v-show="errtype == 1">取消</p>
          <p class="toast-button-go ff-l" @click="getAward" v-show="errtype == 1">立即抽奖</p>
          <p class="toast-button-ok ff-l" @click="errordialog = false" v-show="errtype != 1">我知道了</p>
        </div>
      </div>
    </van-dialog>
    <van-dialog class="resultdialog" v-model="resultdialog" :showConfirmButton="false">
      <div class="column-flex ac">
        <div
          class="dialog-head"
          :class="{'dialog-head-success': resulttype == 1, 'dialog-head-fail': resulttype != 1}"
        ></div>
        <p class="dialog-close" @click="resultdialog = false"></p>
        <div class="dialog-goods column-flex ac" v-if="resulttype == 1">
          <div class="dialog-award row-flex ac jc">
            <img :src="award.pic" alt />
          </div>
          <p class="dialog-goods-info">
            恭喜你，中得{{award.name}}
            <br />
            {{award.rewardinfo}}
          </p>
          <p class="dialog-button" v-show="award.rewardtype != 4" @click="toLookOver">立即查看</p>
        </div>
        <div class="dialog-cloud column-flex ac" v-else-if="resulttype == 2">
          <p class="dialog-button" @click="getCloud">立即赚云朵</p>
        </div>
        <div class="dialog-nogoods column-flex ac" v-else>
          <p class="dialog-button" @click="resultdialog = false">我知道了</p>
        </div>
      </div>
    </van-dialog>
  </div>
</template>

<script>
import axios from "@/packages/axiosPack";
import _axios from "axios";
import Toast from 'vant/lib/toast';
import { URL } from "@/assets/url";
import { getUserToken, toScheme, toMyCoupon, toMyCloud, toMyCard } from "@/packages/phonePlugins";

export default {
  name: "HsLuckyDraw",
  props: {
    padding: {
      type: String,
      default: "0 0 0"
    },
    luckId: {
      type: String,
      default: ""
    },
    buttonIndex: {
      type: String,
      default: "4"
    },
    background: {
      type: String,
      default: "http://p7.highstreet.top/FqHfPzByFSCk0kJnd0ORX1TSryqF"
    },
    backgroundOn: {
      type: String,
      default: "http://p7.highstreet.top/FkenwUzPp7JPjDVxr2FIr9GmsUrE"
    },
    buttonUrl: {
      type: String,
      default: "http://p7.highstreet.top/FkhnT4Vg1gB8V7ZO4oNStN1_fdcT"
    },
    font: {
      type: Object,
      default: () => {
        return {
          color: "red",
          local: "bottom",
          distance: "0"
        };
      }
    }
  },
  data() {
    return {
      errordialog: false,
      resultdialog: false,
      resulttype: 0, // 1 中奖 2 用云朵未中奖 3 不用云朵未中奖
      errmsg: "",
      errtype: 1, // 1 云朵花费提醒 2 次数提醒
      expandFee: 0, // 抽一次奖消耗的云朵数
      // errorMsg: "",
      // dialog_1: 0, // 0错误消息 1抽奖扣减云朵
      // dialogType: 1, // 3已中奖, 4未中奖, 5使用云朵未中奖
      // expandFee: 0, // 抽一次奖消耗的云朵数
      award: {
        id: "",
        name: "",
        pic: "",
        rewardType: "", // 1 优惠券  2云朵 3会员卡  4实物
        rewardinfo: ""
      }, // 抽中的奖品
      countuse: 0,
      countleft: 0,
      counttype: "day", // day 当日次数 total 总次数

      list: [],
      listindex: [0, 1, 2, 5, 8, 7, 6, 3],
      listlength: 9,
      present: -1,
      presentindex: 0,
      speedorigin: 300,
      speed: 0, // 转动速度，越小越快
      accelerated: 20, // 加速度
      awardindex: -1, // 拿到的奖品下标
      starttime: 0, // 开始时间 时间戳
      runtime: 4000, // 滚动最大时间 ms
      runlock: true, // 滚动按钮锁
      keyOption: {
        padding: { name: "边距（上 左右 下）", type: "padding" },
        background: { name: "奖牌框背景", type: "fileupload" },
        backgroundOn: { name: "奖牌框高亮背景", type: "fileupload" },
        luckId: { name: "抽奖场次id", type: "input" },
        buttonUrl: { name: "按钮图片", type: "fileupload" },
        font: {
          name: "文字信息",
          child: {
            color: { name: "文字", type: "color", default: "red" },
            local: { name: "位置", type: "radio", default: "bottom" },
            distance: { name: "到抽奖区距离", type: "input", default: "0" }
          }
        }
      },
      timeout: null,
      luckystart: null,
      header: {
        headers: {
          Authorization: "0db0242aad6b5266fa7b61857ba34b22"
        }
      }
    };
  },
  mounted() {
    while (this.list.length < this.listlength) {
      this.list.push(null);
    }
    // 初始化获取数据
    if (this.luckId) {
      await this.infoInit();
    }
    // 获取token 
    this.getUserToken();
  },
  computed: {
    countStyle() {
      return {
        color: this.font.color,
        ["margin-" +
        (this.font.local == "top" ? "bottom" : "top")]: this.$px2vw(
          this.font.distance
        )
      };
    },
    countClass() {
      return this.font.local == "top" ? "localtop" : "localbottom";
    },
    countmsg() {
      let info = {
        day: "今天您还有{count}次抽奖机会",
        total: "您有{count}次抽奖机会"
      };
      return info[this.counttype].replace(
        "{count}",
        this.countleft - this.countuse
      );
    }
  },
  methods: {
    toLookOver() {
      // 跳转  我的优惠券, 会员卡...
      // 1 优惠券  2云朵 3会员卡  4实物
      if (this.award.rewardType == 1) {
        toMyCoupon();
      }
      if (this.award.rewardType == 2) {
        toMyCloud();
      }
      if (this.award.rewardType == 3) {
        toMyCard();
      }
    },
    getCloud() {
      toScheme(URL.taskcenter);
    },
    getUserToken() {
      getUserToken();
      window.jsGetAppToken = usertoken => {
        Toast(usertoken);
        this.header.headers.Authorization = usertoken;
      };
    },
    infoInit() {
      let params = {
        id: this.luckId
      };
      return axios.post(URL.luckydraw, params).then(res => {
        let r = res.data;
        this.list = r.lotteryRewardVos;
        this.list.splice(this.buttonIndex, 0, null);
        this.expandFee = r.lottery.expandFee;
        this.counttype = r.lottery.timeInDay > 0 ? "day" : "total";
        this.countleft =
          r.lottery.timeInDay > 0
            ? r.lottery.timeInDay - r.todayTimes
            : r.lottery.timeInSum - r.sumTimes;

        return res;
      });
    },
    validCheck() {
      let params = {
        id: this.luckId
      };
      Toast(JSON.stringify(this.header));
      return _axios.post(URL.luckycheck, params, this.header).then(res => {
        let r = res.data;
        // 弹窗
        if (r.code == 1002) {
          if (r.data == 2) {
            this.errmsg = r.msg;
            this.errordialog = true;
            this.errtype = 2;
          } else {
            Toast(r.msg);
          }
          return false;
        } else if (r.code == 0)
          // 云朵次数判断
          return this.luckyCheck();
        else {
          Toast(r.msg);
          return false;
        }
          
      });
    },
    luckyCheck() {
      switch (true) {
        case this.expandFee > 0:
          this.errtype = 1;
          this.errordialog = true;
          this.errmsg = `本次抽奖需要扣减${this.expandFee}云朵`;
          return false;
          break;
        case this.countleft == 0:
          this.errtype = 2;
          this.errordialog = true;
          let info = {
            day: "今天抽奖机会已用完，明天再来！",
            total: "您的抽奖机会已用完"
          };
          this.errmsg = info[this.counttype];
          return false;
          break;
      }
      return true;
    },
    async prepareAward() {
      // 抽奖检查
      if (!(await this.validCheck())) return;
      // 去抽奖
      this.getAward();
    },
    getAward() {
      this.errordialog = false;

      let params = {
        id: this.luckId
      };
      axios.post(URL.getaward, params).then(res => {
        let r = res.data;
        let idx = this.list.find((v, i) => {
          if (v && v.id == r.id) {
            this.awardindex = i;
            return true;
          } else return false;
        });
        let awardinfo = {
          1: "可在我的优惠券中查看",
          2: "可在我的云朵中查看",
          3: "可在我的会员卡中查看",
          4: "请联系在线客服领取哦"
        };
        //奖品
        this.award = {
          id: r.id,
          name: r.name,
          pic: r.pic,
          rewardType: r.rewardType, // 1 优惠券  2云朵 3会员卡  4实物
          rewardinfo: awardinfo[r.rewardType]
        };

        this.starttime = Date.now();

        if (!this.runlock) return;
        // 动画参数初始化
        this.runInit();
        // 开始动画
        this.runStart();
      });
    },
    awardResult() {
      this.runlock = true;
      this.resultdialog = true;
      // 抽奖失败
      if (this.award.rewardType == 5) {
        this.resulttype = this.expandFee > 0 ? 2 : 3;
      } else {
        this.resulttype = 1;
      }
    },
    runInit() {
      this.runlock = false;
      this.speed = this.speedorigin;
      // this.present = -1;
      // this.presentindex = 0;
    },
    runStart() {
      setTimeout(() => {
        this.present = this.listindex[this.presentindex++];
        if (this.presentindex == this.listlength - 1) {
          this.presentindex = 0;
        }
        /**
         * @case 如果减速2s以后到达奖品位置，停止动画
         * @case 如果超过最大滚动时间，开始减速
         * @case 重复动画
         */
        if (Date.now() > this.starttime + this.runtime + 2000) {
          if (this.present != this.awardindex) {
            this.runStart();
          } else {
            // 本地使用次数计数
            this.countuse++;
            // 抽奖正常结束结果处理
            this.awardResult();
          }
        } else if (Date.now() > this.starttime + this.runtime) {
          this.speed += this.accelerated;
          this.runStart();
        } else {
          if (this.speed > 50) this.speed -= this.accelerated;
          this.runStart();
        }
      }, this.speed);
    },
    debounceFunc() {
      if (this.timeout) {
        clearTimeout(this.timeout);
      }
      this.timeout = setTimeout(() => {
        this.infoInit();
      }, 300);
    }
  },
  watch: {
    luckId(n, o) {
      if (n) {
        this.debounceFunc();
      } else {
        this.list = [];
        this.list.length = this.listlength;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.resultdialog {
  background-color: transparent;
  width: 285px;
  .dialog-head {
    width: 200px;
    height: 150px;
    position: absolute;
    &.dialog-head-success {
      background: url(http://p7.highstreet.top/FjlMyxYASwm3EQvNhxDQCJIWWWnS)
        center center no-repeat;
      background-size: 200px auto;
      top: -93px;
    }
    &.dialog-head-fail {
      background: url(http://p7.highstreet.top/Fk1aBZHZU0oJzW6bG-R9yzoKF646)
        center center no-repeat;
      background-size: 90px auto;
      top: 0;
      transform: translate(0, -50%);
    }
  }
  .dialog-award {
    width: 120px;
    height: 120px;
    img {
      max-width: 100%;
      max-height: 100%;
    }
  }
  .dialog-goods {
    padding-top: 56px;
    padding-bottom: 15px;
    background-color: #fff;
    width: 100%;
    border-radius: 4px;
    .dialog-goods-info {
      font-size: 16px;
      color: #796149;
      line-height: 26px;
      width: 245px;
      text-align: center;
    }
  }
  .dialog-button {
    width: 130px;
    height: 35px;
    background: linear-gradient(to right, #fc6b51, #f0733e);
    border-radius: 2px;
    color: #fff;
    line-height: 35px;
    font-size: 15px;
    text-align: center;
    margin-top: 16px;
  }
  .dialog-cloud {
    width: 100%;
    height: 285px;
    box-sizing: border-box;
    padding-top: 221px;
    background: url(http://p7.highstreet.top/Frmeiuldf-nuobYD5dOZMDTb0f1D) 0 0
      no-repeat;
    background-size: 285px auto;
  }
  .dialog-nogoods {
    width: 100%;
    height: 285px;
    box-sizing: border-box;
    padding-top: 214px;
    background: url(http://p7.highstreet.top/FrcqCciJVl0h_t_qjE7oeqLDcame) 0 0
      no-repeat;
    background-size: 285px auto;
  }

  .dialog-close {
    position: absolute;
    top: 11px;
    right: 14px;
    width: 26px;
    height: 26px;
    background-image: url("http://p7.highstreet.top/FjFY-v1Fa0FPxEuzg-MmTURfFN9O");
    background-position: left 0;
    background-repeat: no-repeat;
    background-size: 26px;
  }
}
.toastdialog {
  padding-top: 30px;
  padding-bottom: 20px;
  .toast-info {
    font-size: 15px;
    line-height: 21px;
    width: 210px;
    margin-bottom: 35px;
    text-align: center;
  }
  .toast-button {
    width: 100%;
    p {
      width: 110px;
      height: 35px;
      box-sizing: border-box;
      line-height: 35px;
      border-radius: 2px;
      font-size: 15px;
      text-align: center;
      &.toast-button-cancel {
        margin-right: 10px;
        background-color: #fff;
        border: 0.5px solid #9b9b9b;
      }
      &.toast-button-go {
        background: linear-gradient(to right, #fc6b51, #f0733e);
        color: #fff;
      }
      &.toast-button-ok {
        width: 130px;
        background: linear-gradient(to right, #fc6b51, #f0733e);
        color: #fff;
      }
    }
  }
}

.luckydraw {
  /deep/ .van-dialog {
    overflow: inherit;
  }
  .luckybox {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    gap: 5px;
    .lucky {
      height: 77px;
      .lucksel {
        height: 100%;
        // background-color: #fcf5d0;
        background-origin: 0 0;
        background-size: 100% 100%;
        border-radius: 5px;
        .lucky-default {
          img {
            width: 40px;
          }
        }
        .lucky-goods {
          height: 100%;
          .lucky-icon {
            width: 40px;
            height: 40px;
            margin-bottom: 6px;
            img {
              max-height: 100%;
              max-width: 100%;
            }
          }
          .lucky-font {
            font-size: 11px;
            color: #3b3b3b;
            line-height: 11px;
          }
        }
        .luckyon {
          background-origin: 0 0;
          background-size: 100% 100%;
        }
      }
      .luckbutton {
        height: 100%;
        border-radius: 5px;
        overflow: hidden;
        cursor: pointer;
        img {
          width: 100%;
          height: 100%;
        }
        .button {
          background-color: #f7f7f7;
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  .counttotal {
    color: red;
    text-align: center;
    font-size: 12px;
    position: absolute;
    width: 100%;
    &.localtop {
      bottom: 100%;
    }
    &.localbottom {
      top: 100%;
    }
  }
}
</style>