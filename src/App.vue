<template>
  <div id="body">
    <div id="head">
      <div id="companyName">
        <span style="color: white">国能榆林化工有限公司</span>
      </div>
      <div id="center">
        <span style="color: white; font-size: 24px">格式化监控系统</span>
      </div>
      <div id="dateAndTime">
        <span class="timeSpan">日期：</span>
        <span class="timeSpan" id="date"></span><br />
        <span class="timeSpan">时间：</span>
        <span class="timeSpan" id="time"></span>
      </div>
      <div id="logo">
        <img
          src="./assets/logo.png"
          alt=""
          style="width: 192px; height: 70px"
        />
      </div>
    </div>
    <div id="content">
      <div id="contentLeft">
        <div id="leftTop">
          <div class="tab">
            <span>【预警分析】</span>
          </div>
          <div id="zhutu1"></div>
          <div>
            <div id="yibiao">
              <div id="yibiao1"></div>
              <div id="yibiao2"></div>
            </div>
          </div>
        </div>
        <div id="leftBottom">
          <div class="tab">
            <span>【工况分析变量】</span>
          </div>
          <div
            style="
              width: 600px;
              height: 200px;
              text-align: center;
              color: white;
            "
          >
            <el-table
              :data="tableData"
              height="200"
              size="mini"
              style="width: 90%;margin: 0 auto;margin-top:-20px"
              :cell-style="{ color: '#ff6600' }"
              :header-row-style="{ height: '15px' }"
              highlight-current-row
            >
              <el-table-column
                prop="col1"
                label="贡献度"
                width="150"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="col2"
                label="当前值"
                width="150"
                align="center"
              >
              </el-table-column>
              <el-table-column prop="col3" label="描述" align="center">
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
      <div id="contentCenter">
        <div id="name">
          <span style="color: white; font-size: 18px" id="zzname"
            ><i>闪蒸塔V1504</i></span
          >
        </div>
        <div id="cont">
          <span style="text-align: center; line-height: 40px; color: white"
            >【运行模态】</span
          >
        </div>
        <div id="cont1">
          <span style="color: white">黑水温度c:##.##</span>
        </div>

        <div id="xx1">
          <img
            src="./assets/wjx.png"
            alt=""
            style="margin-right: 40%"
            id="wjx1"
          />
          <img
            src="./assets/wjx.png"
            alt=""
            style="margin-left: 40%"
            id="wjx2"
          />
        </div>
        <div id="myChart"></div>
        <div id="xx2">
          <img
            src="./assets/wjx.png"
            alt=""
            style="margin-right: 40%"
            id="wjx3"
          />
          <img
            src="./assets/wjx.png"
            alt=""
            style="margin-left: 40%"
            id="wjx4"
          />
        </div>
        <el-date-picker
          v-model="value1"
          size="mini"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="timestamp"
        >
        </el-date-picker
        ><br />
        <el-button @click="findCurData()" size="small" round
          >切换实时</el-button
        >
        <el-button @click="findHisData()" size="small" round
          >查询历史</el-button
        >
        <el-button
          type="primary"
          icon="el-icon-s-tools"
          size="small"
          round
          @click="dialogVisible = true"
        ></el-button>
        <el-dialog
          title="设置"
          :visible.sync="dialogVisible"
          width="30%"
          :close="handleClose"
          modal
        >
          <el-form label-width="120px">
            <el-form-item label="最多显示个数">
              <el-input-number
                v-model="numMax"
                :step="50"
                size="mini"
                controls-position="right"
                :min="50"
              ></el-input-number>
            </el-form-item>
            <el-form-item label="标记点大小">
              <el-input-number
                v-model="size"
                size="mini"
                controls-position="right"
                :min="5"
              ></el-input-number>
            </el-form-item>
            <el-form-item label="最近数据的个数">
              <el-input-number
                v-model="num"
                size="mini"
                controls-position="right"
                :min="1"
              ></el-input-number>
            </el-form-item>
            <el-tooltip
              class="item"
              effect="dark"
              content="从最远点开始设置3-2-1"
              placement="top-start"
            >
              <el-form-item label="最近数据的颜色">
                <el-color-picker
                  v-model="color[item]"
                  size="mini"
                  v-for="item of num"
                  :key="item"
                  show-alpha
                ></el-color-picker>
              </el-form-item>
            </el-tooltip>
            <el-form-item label="剩余数据的颜色">
              <el-color-picker
                v-model="color[0]"
                size="mini"
                show-alpha
              ></el-color-picker>
            </el-form-item>
          </el-form>

          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false"
              >保存</el-button
            >
          </span>
        </el-dialog>
        {{ this.tableData }}
      </div>
      <div id="contentRight">
        <div id="rightTop">
          <div class="tab">
            <span>【稳态分析】</span>
          </div>
          <div id="zhutu2"></div>
          <div>
            <div id="yibiao_1">
              <div id="yibiao3"></div>
            </div>
          </div>
        </div>
        <div id="rightBottom">
          <div class="tab">
            <span>【稳定变量】</span>
          </div>
          <div
            style="
              width: 600px;
              height: 200px;
              text-align: center;
              color: white;
            "
          >
            <el-table
              :data="tableData"
              height="200"
              size="mini"
              style="width: 90%;margin: 0 auto;margin-top:-20px"
              :cell-style="{ color: '#ff6600' }"
              :header-row-style="{ height: '15px' }"
              highlight-current-row
            >
              <el-table-column
                prop="date"
                label="贡献度"
                width="150"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="name"
                label="当前值"
                width="150"
                align="center"
              >
              </el-table-column>
              <el-table-column prop="address" label="描述" align="center">
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import axios from "axios";

export default {
  data() {
    return {
      data1: [100, 20, 101, 74, -3, 23, 20],
      data2: [-1, 6, 11, 4, 9, 3, 0],
      //data1 data2为折线图存储数据
      dataArr: [],
      //散点图存储数据
      gkmszs: 0, //工况模式指数
      yjsj: 0, //预警指数
      wdzs: 0, //稳定指数
      gaugeName: "稳定指数", //仪表盘名称
      tableData: [],
      value1: [new Date().getTime(), new Date().getTime()],
      // value1: [1635149533545, 1635149566545],
      action: 1, //存放历史还是实时的数据的标记，0历史1实时
      id: 0,
      id1: 0,
      id2: 0,
      id3: 0, //存放定时器的id
      dialogVisible: false, //dialog的开闭状态
      numMax: 50, //散点图展示点的个数
      size: 10, //散点图转世点的大小
      color: [
        "rgba(128, 128, 128, 0.7)",
        "rgba(255, 0, 0, 1)",
        "rgba(255, 242, 0, 1)",
        "rgba(25, 5, 247, 1)",
      ], //散点图展示点的默认颜色
      num: 3, //最近数据点个数
    };
  },
  methods: {
    scatterHis() {
      let t = this.value1; //获取到timepicker的值
      if (this.id !== 0) {
        clearInterval(this.id); //如果定时器存在则清除定时器
      }
      axios({
        method: "post",
        url: "http://10.22.104.89:49823/api/DbComm/GetHisData",
        data: {
          tags: ["data\\tag1", "data\\tag2"],
          stime: t[0],
          etime: t[1],
          count: this.numMax,
        },
        contentType: "application/x-www-form-urlencoded",
      }).then((res) => {
        this.dataArr = this.scatterDataFormat(res.data);
        this.drawScatter();
      });
    }, //获取散点图历史数据并进行绘制

    lineHis() {
      let t = this.value1; //获取到timepicker的值
      if (this.id1 !== 0) {
        clearInterval(this.id1); //如果定时器存在则清除定时器
      }
      axios({
        method: "post",
        url: "http://10.22.104.89:49823/api/DbComm/GetHisData",
        data: {
          tags: ["data\\tag1", "data\\tag2"],
          stime: t[0],
          etime: t[1],
          count: 7,
        },
        contentType: "application/x-www-form-urlencoded",
      }).then((res) => {
        this.data1 = res.data[0];
        this.data2 = res.data[1];
        this.drawLine1();
        this.drawLine2();
      });
    }, //获取折线图历史数据并进行绘制

    scatterCur() {
      this.dataArr = [];
      this.id = setInterval(() => {
        axios
          .post("http://10.22.104.89:49823/api/DbComm/GetData", [
            "data\\tag1",
            "data\\tag2",
          ])
          .then((res) => {
            if (this.dataArr.length < this.numMax) {
              this.dataArr.push(res.data); //最新数据放到最前面
            } else if (this.dataArr.length === this.numMax) {
              this.dataArr.shift();
              this.dataArr.push(res.data);
            }

            this.drawScatter();
          });
      }, 1000);
    }, //获取散点图实时数据并进行绘制

    lineCur() {
      this.data1 = [];
      this.data2 = [];
      this.id1 = setInterval(() => {
        axios
          .post("http://10.22.104.89:49823/api/DbComm/GetData", [
            "data\\tag1",
            "data\\tag2",
          ])
          .then((res) => {
            if (this.data1.length < 7) {
              this.data1.push(res.data[0]);
              this.data2.push(res.data[1]);
            }
            if (this.data1.length == 7) {
              this.data1.shift();
              this.data1.push(res.data[0]);
              this.data2.shift();
              this.data2.push(res.data[1]);
            }
            this.drawLine1();
            this.drawLine2();
          });
      }, 1000);
    }, //获取折线图实时数据并进行绘制
    gaugeHis() {
      let t = this.value1; //获取到timepicker的值
      if (this.id2 !== 0) {
        clearInterval(this.id2); //如果定时器存在则清除定时器
      }
      axios({
        method: "post",
        url: "http://10.22.104.89:49823/api/DbComm/GetHisData",
        data: {
          tags: ["data\\tag1", "data\\tag2", "data\\tag3"],
          stime: t[1],
          etime: t[1],
          count: 1,
        },
        contentType: "application/x-www-form-urlencoded",
      }).then((res) => {
        this.gkmszs = res.data[0];
        this.yjsj = res.data[1];
        this.wdzs = res.data[2];
        this.drawGauge1();
        this.drawGauge2();
        this.drawGauge3();
      });
    }, //获取仪表盘的历史数据并进行绘制
    gaugeCur() {
      this.id2 = setInterval(() => {
        axios
          .post("http://10.22.104.89:49823/api/DbComm/GetData", [
            "data\\tag1",
            "data\\tag2",
            "data\\tag3",
          ])
          .then((res) => {
            // console.log(res);
            this.gkmszs = res.data[0];
            this.yjsj = res.data[1];
            this.wdzs = res.data[2];
            this.drawGauge1();
            this.drawGauge2();
            this.drawGauge3();
          });
      }, 1000);
      axios;
    }, //获取仪表盘的实时数据并进行绘制
    tableCur() {
      this.id3 = setInterval(() => {
        axios
          .post("http://10.22.104.89:49823/api/DbComm/GetData", [
            "data\\tag1.Name",
            "data\\tag1.PV",
            "data\\tag1.DESC",
            "data\\tag2.Name",
            "data\\tag2.PV",
            "data\\tag2.DESC",
            "data\\tag3.Name",
            "data\\tag3.PV",
            "data\\tag3.DESC",
          ])
          .then((res) => {
            this.tableData = this.tableDataFormat(res.data, 0);
          });
      }, 1000);
    }, //获取表格数据

    tableHis() {
      let t = this.value1; //获取到timepicker的值
      if (this.id3 !== 0) {
        clearInterval(this.id3); //如果定时器存在则清除定时器
      }
      axios({
        method: "post",
        url: "http://10.22.104.89:49823/api/DbComm/GetHisData",
        data: {
          tags: [
            "data\\tag1.Name",
            "data\\tag1.PV",
            "data\\tag1.DESC",
            "data\\tag2.Name",
            "data\\tag2.PV",
            "data\\tag2.DESC",
            "data\\tag3.Name",
            "data\\tag3.PV",
            "data\\tag3.DESC",
          ],
          stime: t[0],
          etime: t[1],
          count: 10,
        },
        contentType: "application/x-www-form-urlencoded",
      }).then((res) => {
        this.tableData = this.tableDataFormat(res.data, 1);
      });
    }, //获取表格历史数据
    findHisData() {
      //查询页面中的所有历史数据
      this.lineHis();
      this.scatterHis();
      this.gaugeHis();
      this.tableHis();
    },
    findCurData() {
      //查询页面中所有的实时数据
      this.scatterCur();
      this.lineCur();
      this.gaugeCur();
      this.tableCur();
    },
    scatterDataFormat(arr) {
      //将后台取到的数据进行处理
      let x = arr[0];
      let y = arr[1];
      let newArr = [];
      let length = x.length;
      for (let index = 0; index < length; index++) {
        let i = [x[index], y[index]];
        newArr.push(i);
      }
      return newArr;
    },
    calMax(arr) {
      let max = Math.max(...arr);
      let maxint = Math.ceil(max / 9.5); // 不让最高的值超过最上面的刻度
      let maxval = maxint * 10; // 让显示的刻度是整数

      // 为了防止数据为0时，Y轴不显示，给个最大值
      if (maxval == 0) {
        maxval = 1;
      }
      return maxval;
    }, //计算y轴最大值，用于多条y轴
    calMin(arr) {
      let min = Math.min(...arr);
      let minint = Math.floor(min / 10);
      let minval = minint * 10; //让显示的刻度是整数
      return minval;
    }, //计算y轴最小值，用于多条y轴
    tableDataFormat(arr, t) {
      if (t === 0) {
        this.tableData = [];
        for (let o = 0; o <= arr.length; o += 3) {
          let obj = {
            col1: arr[o],
            col2: arr[o + 1],
            col3: arr[o + 2],
          };
          this.tableData.push(obj);
        }
      } else {
        this.tableData = [];
        let arr1 = arr[0];
        for (let index = 0; index < arr.length; index += 3) {
          for (let i = 0; i < arr1.length; i++) {
            let x = {
              col1: arr[index][i],
              col2: arr[index + 1][i],
              col3: arr[index + 2][i],
            };
            console.log(x)
            this.tableData.push(x)
          }
        }
      }

      return this.tableData;
    },
    init() {
      var myChart = echarts.init(document.getElementById("myChart"));
      var myChart1 = echarts.init(document.getElementById("zhutu1"));
      var myChart2 = echarts.init(document.getElementById("yibiao1"));
      var myChart3 = echarts.init(document.getElementById("yibiao2"));
      var myChart5 = echarts.init(document.getElementById("yibiao3"));
      var myChart4 = echarts.init(document.getElementById("zhutu2"));
      //初始化所有echarts
      let Max1 = this.calMax(this.data1);
      let Min1 = this.calMin(this.data1);
      let Max2 = this.calMax(this.data2);
      let Min2 = this.calMin(this.data2);
      //计算折线图的最大值和最小值，用于对齐y轴
      var option1 = {
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["工况模式指数", "预警时间"],
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },

        yAxis: [
          {
            type: "value",
            name: "工况模式指数",
            min: Min1,
            max: Max1,
            interval: (Max1 - Min1) / 5,
            splitNumber: 5,
            nameTextStyle: {
              color: "yellow",
            },
          },
          {
            type: "value",
            name: "预警时间",
            min: Min2,
            max: Max2,
            interval: (Max2 - Min2) / 5,
            splitNumber: 5,
            nameTextStyle: {
              color: "red",
            },
          },
        ],

        series: [
          {
            name: "工况模式指数",
            type: "line",

            data: this.data1,
          },
          {
            name: "预警时间",
            type: "line",

            yAxisIndex: 1,

            data: this.data2,
          },
        ],
      };

      var option = {
        xAxis: {
          min: 0,
          max: 100,
          show: false,
        },
        yAxis: {
          min: 0,
          max: 100,
          show: false,
        },
        series: [
          {
            color: "red",
            symbolSize: 5,
            data: this.dataArr,
            type: "scatter",
          },
        ],
      };
      var option2 = {
        series: [
          {
            type: "gauge",
            axisLine: {
              lineStyle: {
                width: 10,
                color: [
                  [0.3, "#67e0e3"],
                  [0.7, "#37a2da"],
                  [1, "#fd666d"],
                ],
              },
            },
            pointer: {
              itemStyle: {
                color: "inherit",
              },
            },
            splitLine: {
              show: false,
              distance: -30,
              length: 3,
              lineStyle: {
                color: "#fff",
                width: 2,
              },
            },
            axisLabel: {
              color: "inherit",
              distance: 10,
              fontSize: 10,
            },
            detail: {
              valueAnimation: true,
              formatter: "{value} ",
              color: "inherit",
              fontSize: 20,
            },
            data: [{ value: this.gkmszs }],
          },
        ],
      };

      //option为图表配置项

      myChart.setOption(option, true);
      myChart1.setOption(option1);
      myChart4.setOption(option1);
      myChart2.setOption(option2);
      myChart3.setOption(option2);
      myChart5.setOption(option2);
    }, //初始化图表

    drawScatter() {
      //对散点图进行重新绘制
      let myChart = echarts.getInstanceByDom(
        document.getElementById("myChart")
      );
      if (myChart == null) {
        myChart = echarts.init(document.getElementById("myChart"));
      }
      var that = this;

      var option = {
        xAxis: {
          min: 0,
          max: 100,
          show: false,
        },
        yAxis: {
          min: 0,
          max: 100,
          show: false,
        },
        series: [
          {
            symbolSize: this.size,
            data: this.dataArr,
            type: "scatter",
            itemStyle: {
              normal: {
                color: function(params) {
                  let colorList = that.color;
                  // console.log(params.dataIndex, "index");
                  // console.log(colorList.length=== that.color.length)
                  if (
                    params.dataIndex >
                    that.dataArr.length - colorList.length
                  ) {
                    // console.log(that.dataArr.lengt-params.dataIndex,'ddd')
                    return colorList[that.dataArr.length - params.dataIndex];
                  }
                  return colorList[0];
                  // if (colorList.length <= params.dataIndex + 1) {
                  //   return colorList[length];
                  // }
                  // return colorList[params.dataIndex + 1];
                },
              },
            },
          },
        ],
      };
      myChart.setOption(option, true);
    },
    drawLine1() {
      let myChart = echarts.getInstanceByDom(document.getElementById("zhutu1"));
      if (myChart == null) {
        myChart = echarts.init(document.getElementById("zhutu1"));
      }
      let Max1 = this.calMax(this.data1);
      let Min1 = this.calMin(this.data1);
      let Max2 = this.calMax(this.data2);
      let Min2 = this.calMin(this.data2); //用于对齐双y轴
      var option = {
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["工况模式指数", "预警时间"],
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },

        yAxis: [
          {
            type: "value",
            name: "工况模式指数",
            min: Min1,
            max: Max1,
            interval: (Max1 - Min1) / 5,
            splitNumber: 5,
            nameTextStyle: {
              color: "yellow",
            },
          },
          {
            type: "value",
            name: "预警时间",
            min: Min2,
            max: Max2,
            interval: (Max2 - Min2) / 5,
            splitNumber: 5,
            nameTextStyle: {
              color: "red",
            },
          },
        ],

        series: [
          {
            name: "工况模式指数",
            type: "line",

            data: this.data1,
          },
          {
            name: "预警时间",
            type: "line",

            yAxisIndex: 1,

            data: this.data2,
          },
        ],
      };
      myChart.setOption(option, true);
    },
    drawLine2() {
      let myChart = echarts.getInstanceByDom(document.getElementById("zhutu2"));
      if (myChart == null) {
        myChart = echarts.init(document.getElementById("zhutu2"));
      }
      let Max1 = this.calMax(this.data1);
      let Min1 = this.calMin(this.data1);
      let Max2 = this.calMax(this.data2);
      let Min2 = this.calMin(this.data2); //用于对齐双y轴
      var option = {
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["工况模式指数", "预警时间"],
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },

        yAxis: [
          {
            type: "value",
            name: "工况模式指数",
            min: Min1,
            max: Max1,
            interval: (Max1 - Min1) / 5,
            splitNumber: 5,
            nameTextStyle: {
              color: "yellow",
            },
          },
          {
            type: "value",
            name: "预警时间",
            min: Min2,
            max: Max2,
            interval: (Max2 - Min2) / 5,
            splitNumber: 5,
            nameTextStyle: {
              color: "red",
            },
          },
        ],

        series: [
          {
            name: "工况模式指数",
            type: "line",

            data: this.data1,
          },
          {
            name: "预警时间",
            type: "line",

            yAxisIndex: 1,

            data: this.data2,
          },
        ],
      };
      myChart.setOption(option, true);
    },
    drawGauge1() {
      let myChart = echarts.getInstanceByDom(
        document.getElementById("yibiao1")
      );
      if (myChart == null) {
        myChart = echarts.init(document.getElementById("yibiao1"));
      }
      var option = {
        series: [
          {
            type: "gauge",
            axisLine: {
              lineStyle: {
                width: 10,
                color: [
                  [0.3, "#67e0e3"],
                  [0.7, "#37a2da"],
                  [1, "#fd666d"],
                ],
              },
            },
            pointer: {
              itemStyle: {
                color: "inherit",
              },
            },
            splitLine: {
              show: false,
              distance: -30,
              length: 3,
              lineStyle: {
                color: "#fff",
                width: 2,
              },
            },
            axisLabel: {
              color: "inherit",
              distance: 10,
              fontSize: 10,
            },
            detail: {
              valueAnimation: true,
              formatter: "{value}\n工况模式指数",
              color: "inherit",
              fontSize: 10,
            },
            data: [{ value: this.gkmszs }],
          },
        ],
      };
      myChart.setOption(option, true);
    },
    drawGauge2() {
      let myChart = echarts.getInstanceByDom(
        document.getElementById("yibiao2")
      );
      if (myChart == null) {
        myChart = echarts.init(document.getElementById("yibiao2"));
      }
      var option = {
        series: [
          {
            type: "gauge",
            axisLine: {
              lineStyle: {
                width: 10,
                color: [
                  [0.3, "#67e0e3"],
                  [0.7, "#37a2da"],
                  [1, "#fd666d"],
                ],
              },
            },
            pointer: {
              itemStyle: {
                color: "inherit",
              },
            },
            splitLine: {
              show: false,
              distance: -30,
              length: 3,
              lineStyle: {
                color: "#fff",
                width: 2,
              },
            },
            axisLabel: {
              color: "inherit",
              distance: 10,
              fontSize: 10,
            },
            detail: {
              valueAnimation: true,
              formatter: "{value}\n稳定指数",
              color: "inherit",
              fontSize: 10,
            },
            data: [{ value: this.wdzs }],
          },
        ],
      };
      myChart.setOption(option, true);
    },
    drawGauge3() {
      let myChart = echarts.getInstanceByDom(
        document.getElementById("yibiao3")
      );
      if (myChart == null) {
        myChart = echarts.init(document.getElementById("yibiao3"));
      }
      var option = {
        series: [
          {
            type: "gauge",
            axisLine: {
              lineStyle: {
                width: 10,
                color: [
                  [0.3, "#67e0e3"],
                  [0.7, "#37a2da"],
                  [1, "#fd666d"],
                ],
              },
            },
            pointer: {
              itemStyle: {
                color: "inherit",
              },
            },
            splitLine: {
              show: false,
              distance: -30,
              length: 3,
              lineStyle: {
                color: "#fff",
                width: 2,
              },
            },
            axisLabel: {
              color: "inherit",
              distance: 10,
              fontSize: 10,
            },
            detail: {
              valueAnimation: true,
              formatter: "{value}\n预警指数",
              color: "inherit",
              fontSize: 10,
            },
            data: [{ value: this.yjsj }],
          },
        ],
      };
      myChart.setOption(option, true);
    },
    handleClose(done) {
      //执行修改操作
      done(); //关闭
    },
  },

  created() {
    //页面执行完毕进行----
    // this.date = new Date()
  },
  mounted() {
    //图像初始化
    this.init();
  },
};
</script>

<style scoped>
/deep/ .el-table,
/deep/ .el-table__expanded-cell {
  background-color: transparent;
}
/* 表格内背景颜色 */
/deep/ .el-table th,
/deep/ .el-table thead,
/deep/ .el-table tr,
/deep/ .el-table td {
  background-color: transparent;
}
/deep/ .el-table th.el-table__cell {
  background-color: transparent;
}
#body {
  background-image: url(./assets/Bg3.png);
  /* background-repeat: 'no-repeat'; */
  width: 1920px;
}
#head {
  height: 117px;
  display: flex;
  background-image: url(./assets/title.png);
}
#companyName {
  width: 400px;
  text-align: left;
  line-height: 50px;
}

#center {
  flex: 1;
  text-align: center;
  line-height: 90px;
  margin-left: -3%;
}

#dateAndTime {
  width: 200px;
  line-height: 30px;
}

#logo {
  width: 200px;
  text-align: right;
  line-height: 50px;
}

.timeSpan {
  color: white;
  font-size: 16px;
}
#content {
  height: 900px;
  widows: 100%;
  display: flex;
}

#contentLeft {
  width: 600px;
  height: 500px;
  text-align: left;
  line-height: 50px;
}

#contentRight {
  width: 600px;
  height: 500px;
  text-align: left;
  line-height: 50px;
}

#contentCenter {
  flex: 1;
  text-align: center;
}

#myChart {
  width: 495px;
  height: 495px;
  margin: 0 auto;
  background-image: url(./assets/DL_15T.png);
  margin-top: 5px;
}

#leftTop {
  width: 600px;
  height: 500px;
  text-align: left;
  line-height: 50px;
  background-image: url(./assets/border.png);
}

#leftBottom {
  width: 600px;
  height: 250px;
  text-align: left;
  line-height: 50px;
  background-image: url(./assets/border1.png);
}

#rightTop {
  width: 600px;
  height: 500px;
  text-align: left;
  line-height: 50px;
  background-image: url(./assets/border.png);
}

#rightBottom {
  width: 600px;
  height: 250px;
  text-align: left;
  line-height: 50px;
  background-image: url(./assets/border1.png);
}

#cont {
  width: 300px;
  height: 40px;
  background-image: url(./assets/XBT.png);
  margin: 0 auto;
  margin-top: 5px;
}

#cont1 {
  margin-top: 5px;
  width: 600px;
  height: 60px;
  margin: 0 auto;
  border-radius: 10px;
  text-align: left;
  border: solid 1px darkblue;
}

#xx1 {
  height: auto;
  text-align: center;
  margin-top: 5px;
}

#xx2 {
  height: auto;
  text-align: center;
  margin-top: 5px;
}

.tab {
  width: 300px;
  height: 40px;
  background-image: url(./assets/XBT.png);
  text-align: center;
  margin: 0 auto;
  line-height: 40px;
  color: white;
}

#zhutu1 {
  height: 300px;
}

#zhutu2 {
  height: 300px;
}

#yibiao {
  display: flex;
  align-content: center;
}

#yibiao1 {
  width: 300px;
  height: 250px;
  margin-top: -10%;
}

#yibiao2 {
  height: 250px;
  width: 300px;
  margin-top: -10%;
}

#yibiao_1 {
  display: flex;
  align-content: center;
}

#yibiao3 {
  width: 300px;
  height: 250px;
  margin-top: -10%;
  margin-left: 25%;
}
</style>
