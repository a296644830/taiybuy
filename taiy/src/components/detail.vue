<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/goods.html">购物商城</a> &gt;
                <a href="/goods/42/1.html">商品详情</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <div class="left-925">
                        <div class="goods-box clearfix">
                           <div class="pic-box" v-if="images.normal_size.length!=0">
                                <ProductZoomer :base-images="images" :base-zoomer-options="zoomerOptions" />
                            </div>

                            <!-- 购物车 -->
                            <div class="goods-spec">
                                <h1>{{goodsinfo.title}}</h1>
                                <p class="subtitle">{{goodsinfo.sub_title}}</p>
                                <div class="spec-box">
                                    <dl>
                                        <dt>货号</dt>
                                        <dd id="commodityGoodsNo">{{goodsinfo.goods_no}}</dd>
                                    </dl>
                                    <dl>
                                        <dt>市场价</dt>
                                        <dd>
                                            <s id="commodityMarketPrice">¥{{goodsinfo.market_price}}</s>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>销售价</dt>
                                        <dd>
                                            <em id="commoditySellPrice" class="price">¥{{goodsinfo.sell_price}}</em>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="spec-box">
                                    <dl>
                                        <dt>购买数量</dt>
                                        <dd>
                                            <div class="stock-box">
                                                
                                                <el-input-number v-model="num1" @change="handleChange" :min="1" :max="goodsinfo.stock_quantity" label="描述文字"></el-input-number>
                                            </div>
                                            <span class="stock-txt">
                                                库存
                                                <em id="commodityStockNum">{{goodsinfo.stock_quantity}}</em>件
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dd>
                                            <div id="buyButton" class="btn-buy">
                                                <button onclick="cartAdd(this,'/',1,'/shopping.html');" class="buy">立即购买</button>
                                                <button @click='addCart' onclick="cartAdd(this,'/',0,'/cart.html');" class="add">加入购物车</button>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>

                        <!-- 商品评论区域 -->
                        <div id="goodsTabs" class="goods-tab bg-wrap">
                            <Affix>
                            <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
                                <ul>
                                    <li>
                                        <a @click="selectIndex=0"  href="javascript:;" :class="{selected:selectIndex==0}" >商品介绍</a>
                                    </li>
                                    <li>
                                        <a @click="selectIndex=1"  href="javascript:;" :class="{selected:selectIndex==1}">商品评论</a>
                                    </li>
                                    

                                    
                                </ul>
                            </div>
                            </Affix>
                            <div class="tab-content entry" v-html="goodsinfo.content"  v-show="selectIndex==0">
                                
                            </div>
                            <!-- <div class="tab-content entry" v-show="selectIndex==0" v-html="goodsinfo.content">
                            </div> -->


                            <div  class="tab-content" v-show="selectIndex==1">
                                <div class="comment-box">
                                    <div id="commentForm" name="commentForm" class="form-box">
                                        <div class="avatar-box">
                                            <i class="iconfont icon-user-full"></i>
                                        </div>
                                        <div class="conn-box">
                                            <div class="editor">
                                                <textarea id="txtContent" name="txtContent" v-model="meagess" sucmsg=" " datatype="*10-1000" nullmsg="meagess"></textarea>
                                                <span class="Validform_checktip"></span>
                                            </div>
                                            <div class="subcon">
                                                <input id="btnSubmit" name="submit" type="submit"  value="提交评论" class="submit">
                                                <span class="Validform_checktip"></span>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- 评论内容 -->
                                    <ul id="commentList" class="list-box">
                                        <p style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);">暂无评论，快来抢沙发吧！</p>
                                        <li v-for="(item, index) in contents" :key="index">
                                            <div class="avatar-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </div>
                                            <div class="inner-box">
                                                <div class="info">
                                                    <span>{{item.user_name}}</span>
                                                    <span>{{item.add_time|beautifyTimePro}}</span>
                                                </div>
                                                <p>{{item.content}}</p>
                                            </div>
                                        </li>
                                  
                                    </ul>
                                    <!-- 翻页 -->
                                    <div class="page-box" style="margin: 5px 0px 0px 62px;">
                                            <Page :current='pageIndex'  @on-page-size-change=" sizeChange" @on-change="pageChange" :total="totalcount" placement='top' :page-size-opts='[6,16,26,36]' :page-size=6 show-elevator show-sizer />

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="left-220">
                        <div class="bg-wrap nobg">
                            <div class="sidebar-box">
                                <h4>推荐商品</h4>
                                <ul class="side-img-list">
                                    <li v-for="(item, index) in hotgoodslist" :key="index">
                                        <div class="img-box">
                                          <router-link :to="'/detail/'+item.id">
                                                <img :src="item.img_url">
                                            </router-link>
                                        </div>
                                        <div class="txt-box">
                                            <!-- <a href="#/site/goodsinfo/90" class="">{{item.title}}</a> -->
                                             <router-link :to="'/detail/'+item.id">
                                                {{item.title}}
                                               
                                            </router-link>
                                            <span>{{item.add_time|beautifyTime('🐣','🈷','🌤')}}</span>
                                        </div>
                                    </li>
                                
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: "Detail",
  data: function() {
    return {
      goodId: "",
      // 商品信息
      goodsinfo: {},
      // 热卖列表
      hotgoodslist: [],
      // 图片列表
      imglist: [],
      num1: 1,
      selectIndex: 0,

      //评论内容
      contents: [],

      //评论信息
      meagess: "",
      sex: 0,

      pageIndex: 1,
      pageSize: 10,
      totalcount: 0,
      images: {
        normal_size: [
          {
            id: 1,
            url:
              "http://pic1.win4000.com/wallpaper/d/57b42fea85112.jpg"
          },
          {
            id: 2,
            url:
              "http://pic1.win4000.com/wallpaper/d/57b42fea85112.jpg"
          }
        ]
      },
      //   zoomer的选项
      zoomerOptions: {
        //   放大倍数
        zoomFactor: 8,
        // 放大样式
        pane: "container-round",
        // 多久出来
        hoverDelay: 300,
        // 类前缀
        namespace: "inline-zoomer-hahaha",
        // 点击移动
        move_by_click: true,
        // 滚动的图片张数
        scroll_items: 5,
        // 选中的缩略图边框颜色
        choosed_thumb_border_color: "#FF327A"
      }

    };
  },
  // created中获取id 因为一会就要去调用接口
  created() {
    // console.log(this.$route.params);
    this.goodId = this.$route.params.goodId;
    // 调用接口获取数据
    // console.log(this.$axios);
    // 基地址已抽取main.js中
    this.getGoodInfo();
    this.getComments();
  },
  methods: {
    handleChange(value) {
      console.log(value);
    },
    getGoodInfo() {

      this.pageIndex=1;
      this.images.normal_size = [];
        
      this.$axios
        .get("/site/goods/getgoodsinfo/" + this.goodId)
        .then(response => {
        //   console.log(response);
          // 商品信息
          this.goodsinfo = response.data.message.goodsinfo;
          // 热卖列表
          this.hotgoodslist = response.data.message.hotgoodslist;
          //   console.log(this.hotgoodslist)
          // 图片列表
          this.imglist = response.data.message.imglist;

          let tem_normal_size = [];
          this.imglist.forEach(v => {
            tem_normal_size.push({
              id: v.id,
              url: v.thumb_path
            });
          });
          // 数据处理完毕
          this.images.normal_size = tem_normal_size;
          // 强制让 组件重新生成一次
        });
    },
    getComments() {
      this.$axios
        .get(
          `site/comment/getbypage/goods/${this.goodId}?pageIndex=${
            this.pageIndex
          }&pageSize=${this.pageSize}`
        )
        .then(response => {
          // console.log(response);
          this.contents = response.data.message;
          this.pageIndex = response.data.pageIndex;
          this.pageSize = response.data.pageSize;
        //   console.log(this.pageSize);
          this.totalcount = response.data.totalcount;
        //   console.log(response);
        });
    },
     pageChange(pageNum) {
      // console.log('页码改变');
      // console.log(pageNum);
      // 修改页码
      console.log(pageNum);
      this.pageIndex = pageNum;
      // 重新发请求
      this.getComments();
    },
    sizeChange(pageSize) {
      // console.log(pageSize);
      // 修改变量
      // 重新获取数据
      this.pageSize = pageSize;
      this.pageIndex = 1;
      this.getComments();
    },
    addCart() {
      // 调用Vuex中的数据修改方法 提交载荷
      this.$store.commit("addCart", {
        id: this.goodId,
        buyCount: this.num1
      });
    }

  },
  watch: {
    $route(to, form) {
      this.goodId = to.params.goodId;
      this.getGoodInfo();

      this.getComments();
      this.num1 = 1;
    }
  }
};
</script>
<style>
.tab-content img {
  /* 变块 */
  display: block;
}
.pic-box {
  width: 395px;
  /* height: 320px; */
}
.inline-zoomer-hahaha-zoomer-box {
  width: 300px;

  height: 300px;
}
.preview-box img {
  height: 250px;
}
.control-box {
  height: 50px;
}
.control {
  margin: 0 auto;
}
.control-box > div {
  float: left;
  height: 50px;
}
.control-box .thumb-list img {
  width: 50px;
  height: 50px;
  float: left;
}
</style>


