import cloud from "d3-cloud"
Component({
  properties: {
    data: Array,
    width: Number,
    height: Number
  },

  data: {
    opts: null
  },

  attached() {
    this.setData({
      opts: {
        onInit: this.initChart()
      }
    })
  },

  methods: {
    initChart() {
      return (canvas, width, height, F2) => {
        const data = this.properties.data;
        this.tagCloud(canvas, width, height, F2, data);
      }
    },

    tagCloud(canvas, width, height, F2, data) {
      var words = ["Hello", "world", "normally", "you", "want", "more", "words", "than", "this"]
        .map(function(d) {
          return { text: d, size: 10 + Math.random() * 90 };
        });

      cloud().size([960, 500])
        .canvas(function() { 
          return wx.createCanvasContext('cloud-canvas');
        })
        .words(words)
        .padding(5)
        .rotate(function() { return ~~(Math.random() * 2) * 90; })
        .font("Impact")
        .fontSize(function(d) { return d.size; })
        .on("end", end)
        .start();

      // 需要使用 @antv/data-set 对数据进行布局处理
      var Util = F2.Util;

      function end(words) { console.log(JSON.stringify(words)); } 

      // 获取 text 文本的图形属性
      function getTextAttrs(cfg) {
        return Util.mix({}, {
          fillOpacity: cfg.opacity,
          fontSize: cfg.origin._origin.size,
          rotate: cfg.origin._origin.rotate * Math.PI / 180,
          text: cfg.origin._origin.text,
          textAlign: 'center',
          fontFamily: cfg.origin._origin.font,
          fill: cfg.color,
          textBaseline: 'Alphabetic'
        }, cfg.style);
      }

      // 给point注册一个词云的shape
      F2.Shape.registerShape('point', 'cloud', {
        draw: function draw(cfg, container) {
          var attrs = getTextAttrs(cfg);
          var x = cfg.x;
          var y = this._coord.y.start - cfg.y;
          return container.addShape('text', {
            attrs: Util.mix(attrs, {
              x: x,
              y: y
            })
          });
        }
      });

      // var range = dv.range('value');
      var min = range[0];
      var max = range[1];
      var MAX_FONTSIZE = 36; // 最大的字体
      var MIN_FONTSIZE = 12; // 最小的字体
      var canvasWidth = width; // 获取画布宽度
      var canvasHeight = height; // 获取画布高度

      // 生成词云的布局
      // dv.transform({
      //   type: 'tag-cloud',
      //   fields: ['x', 'value'],
      //   size: [canvasWidth, canvasHeight], // 同 canvas 画布保持一致
      //   font: 'Verdana',
      //   padding: 0,
      //   timeInterval: 5000, // max execute time
      //   rotate: function rotate() {
      //     var random = ~~(Math.random() * 4) % 4;
      //     if (random == 2) {
      //       random = 0;
      //     }
      //     return random * 90; // 0, 90, 270
      //   },
      //   fontSize: function fontSize(d) {
      //     if (d.value) {
      //       return (d.value - min) / (max - min) * (MAX_FONTSIZE - MIN_FONTSIZE) + MIN_FONTSIZE;
      //     }
      //     return 0;
      //   }
      // });

      var chart = new F2.Chart({
        el: canvas,
        width,
        height,
        padding: 0
        // pixelRatio: window.devicePixelRatio
      });


      chart.source([], {
        x: {
          nice: false
        },
        y: {
          nice: false
        }
      });
      chart.legend(false);
      chart.axis(false);
      chart.tooltip(false);

      chart.point().position('x*y').color('category').shape('cloud');
      chart.render();
      return chart
    }
  }
})