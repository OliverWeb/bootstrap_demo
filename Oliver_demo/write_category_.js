/**
 * React Writer_category_info插件
 	@author --  张乐
 	@props data（必选属性前面带＊，非必选项目请备注默认值）
 		－*url : String,//eg
		-closeMyself : false(默认) //eg
	@example
	<Writer_category_info data={{url:"",closeMyself:true}}/>

 */
require('./writer_category_info.scss');
var Img = require("plugin/img"); // 图片加载组件
var Pagger = require('plugin/pagger'); // 加载组件
var Writer_category_info = React.createClass({
  getInitialState: function() {
    return {
      hasMore: true, writeListFirst: [], //首屏加载
      writeList: [], //右侧的列表
      contentShow: 'block', //右侧显示和隐藏
      classInfos: this.props.data.classInfos,
      height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
      loadBol: true, //当点击时，加载，出现加载动画，如果加载失败，则提示eror动画
      loadCurrent: 'none', // 默认加载隐藏状态的
      loadError: 'none',
      thisloadUrl: []
    };
  },
  componentDidMount: function() { //事件绑定和判断
    var _this = this;
    var element = document.querySelector(".swiper-wrapper>li:last-child");
    var topli = parseInt($(element).offset().top - this.state.height + $(element).height()); //第一个li 与屏幕上边缘的距离
    $(document).ready(function() {
      var oneData = $(".swiper-slide").eq(0).find(".urlkey").val(); //开始加载首页数据
      _this.asyAjax(oneData);
      //_this.setState({thisloadUrl:oneData});

    });
    $(".swiper-slide").eq(0).addClass("onType");
    $(".swiper-slide").on("click", function() { //点击事件绑定
      $(this).addClass("onType").siblings().removeClass("onType");
      var ajaxUrl = $(this).find(".urlkey").val();
      $(window).scrollTop(0);
      $(".authorOne").css("scrollTop" : "0");
      _this.asyAjax(ajaxUrl);
      _this.setState({hasMore: true});
      //点击重置
      //_loadAjax(self)
    });

    var drag = this.refs.DragInit,
      oH;
    drag.addEventListener("touchstart", function(e) {
      var ev = window.event || e;
      var touches = ev.touches[0];
      oH = touches.clientY - drag.offsetTop;
      //阻止页面的滑动默认事件
      document.addEventListener("touchmove", defaultEvent, false);
    }, false);
    drag.addEventListener("touchmove", function(e) {
      var ev = window.event || e;
      var touches = ev.touches[0];
      var oTop = touches.clientY - oH;
      if ($(".swiper-slide").length * $(".swiper-slide").height() > _this.state.height) {
        drag.style.top = oTop + "px";
      } else {
        drag.style.webkitTransform = 'translate3D(0,' + oTop + 'px' + ',0)'; //给一个指定的回弹的距离
      }
    }, false);
    drag.addEventListener("touchend", function() {
      document.removeEventListener("touchmove", defaultEvent, false);
      var inner = document.getElementById("inner");
      if (parseInt(inner.style.top) > 0) {
        animate(inner, {
          top: 0
        }, 8, 0.01);
      }
      var element = document.querySelector(".swiper-wrapper>li:last-child");
      var topfanhui = $(".swiper-slide").eq(0).offset().top;

      if ($(".swiper-slide").length * $(".swiper-slide").height() > _this.state.height) {
        if ($(element).offset().top - _this.state.height + $(element).height() < 0) {
          animate(inner, {
            top: -topli
          }, 8, 0.01);
        }
      } else {
        drag.style.webkitTransform = 'translate3D(0,0,0)'; // 此两段代码是恢复到初始位置的动画
        drag.style.webkitTransition = "all 0.3s ease-out";
      }

    }, false);
    function defaultEvent(e) {
      var ev = window.event || e;
      ev.preventDefault && ev.preventDefault();
      ev.returnValue = false;
      ev.stopPropagation && ev.stopPropagation();
      return false;
    }
    //动画函数 start
    function animate(obj, json, interval, sp, fn) {
      clearInterval(obj.timer);
      function getStyle(obj, arr) {
        if (obj.currentStyle) {
          return obj.currentStyle[arr]; //针对ie
        } else {
          return document.defaultView.getComputedStyle(obj, null)[arr];
        }
      }
      obj.timer = setInterval(function() {
        //j ++;
        var flag = true;
        for (var arr in json) {
          var icur = 0;
          //k++;
          if (arr == "opacity") {
            icur = Math.round(parseFloat(getStyle(obj, arr)) * 100);
          } else {
            icur = parseInt(getStyle(obj, arr));
          }
          var speed = (json[arr] - icur) * sp;
          speed = speed > 0
            ? Math.ceil(speed)
            : Math.floor(speed);
          if (icur != json[arr]) {
            flag = false;
          }
          if (arr == "opacity") {
            obj.style.filter = "alpha(opacity : '+(icur + speed)+' )";
            obj.style.opacity = (icur + speed) / 100;
          } else {
            obj.style[arr] = icur + speed + "px";
          }
        }

        if (flag) {
          clearInterval(obj.timer);
          if (fn) {
            fn();
          }
        }
      }, interval);
    };
    // 动画函数结束
  },
  writer_list: function() {
    var _this = this;
    return (_this.state.writeList.map(function(value, key) {
      return (
        <a href={value.authorUrl} key={key}>
          <li className="authorContain">
            <div className="author_head">
              <Img data={{
                url: value.authorPicUrl
              }}/>
            </div>
            <div className="authorInfo">
              <span className="authorName">{value.penName}</span>
              <p className="author_detail">{value.authorDesc}</p>
            </div>
          </li>
        </a>
      )
    }));
  },
  classlist: function() {
    return this.state.classInfos.map(function(value, key) {
      return (
        <li className="swiper-slide" key={key}>
          <input type="hidden" name={key} value={value.classInfoUrl} className="urlkey"/> {value.classInfoName.substring(0, 4)}
        </li>
      );
    });
  },
  _fixLoading: function() { //_fixLoading | 修复首屏时窗口
    var _this = this;
    setTimeout(function() {
      var liHeigth = $(".authorContain").height();
      if (_this.state.height > $(".authorContain").length * liHeigth) {
        $(window).scrollTop(5).scrollTop(0);
      } else {}
    }, 500)
  },
  asyAjax: function(asyAjax) { //点击异步数据
    var _this = this;
    _this.setState({writeList: [], contentShow: "none", loadBol: true, loadCurrent: "block", loadError: 'none'});
        _this._fixLoading();
     setTimeout(function() {
      E.ajaxGet(asyAjax, _this, {}, function(res, data) {

        if (res === 'success' && data.status == 200) {
          _this.setState({thisloadUrl: data.data.nextPageUrl, contentShow: "block", writeList: data.data.classInfos, loadCurrent: "none", loadError: 'none'});
        } else {
          _this.setState({loadBol: false, loadCurrent: "none", loadError: 'block'});
        };
      });
    }, 300);
  },
  loadAjax: function(self) { //右侧请求下拉加载的内容
    var _this = this;
    _this._fixLoading();
    setTimeout(function() {
      E.ajaxGet(_this.state.thisloadUrl, _this,{}, function(res, data) {
        console.log("请求正确");
        var resdata=data.data;
        console.log(data);
        if(res=="error"){
          console.log("错误");
          // self.setState({hasMore:false});
          
        }else{
          if(data!="abort" && data.status == 200){
            if(!resdata.nextPageUrl ||resdata.classInfos.length==0 ||$.isEmptyObject(resdata.classInfos[0])){
              console.log("进了判断01");
               self.setState({hasMore:true});
    					 self.finish();
            }
          }
          //成功请求
          if(res ==='success'&& data.status != 200){
             console.log("不是200");
              self.setState({paggerEnable: true});
              self.finish();
          }
          if (res === 'success' && data.status == 200 && (!$.isEmptyObject(resdata.classInfos[0]))&&resdata.classInfos.length!=0) {
             console.log("进了判断");
            _this.state.writeList = _this.state.writeList.concat(data.data.classInfos);
            _this.setState({
              thisloadUrl: data.data.nextPageUrl,
              writeList: _this.state.writeList,
              hasMore: true
            }, function() {
              self.setState({paggerEnable: true});
            });
          }
        }
      },function(){     //请求失败
        console.log("请求错误");
        self.setState({paggerEnable: true});
      });
    }, 500);
  },
  pageLoad: function() {
    return (
      <div style={{
        display: this.state.hasMore
          ? "block"
          : "none"
      }}>
        <Pagger data={{
          callback: this.loadAjax,
          hasMore: this.state.hasMore
        }}/>

      </div>
    );
  },
  // 首次加载时出现的加载动画
  loadingImg: function() {
    //var top = (this.state.height/30-2) + 'rem';
    if (this.state.loadBol) {
      return (
        <div className="cmr-rank_tab-load" style={{
          display: this.state.loadCurrent
        }} ref='removeLoad'>
          <div className='co-font-normal cmr-rank_tab-word'>
            <p>拼命加载中...</p>
          </div>
        </div>
      )
    } else {
      return (
        <div className="cmr-rank_tab-error" style={{
          display: this.state.loadError
        }} ref='removeLoad'>
          <div className='co-font-normal cmr-rank_tab-word'>
            <p>加载失败...</p>
          </div>
        </div>
      )
    }
  },
  render: function() {
    var _this = this;
    return (

      <div className="cmr-writer_category_info">
        <div className="typeClass co-font-large">
          <div className="swiper-container" id="outer">
            <ul className="swiper-wrapper" id="inner" ref='DragInit'>
              {this.classlist()}
            </ul>
          </div>
        </div>
        <div className="authorlist">
          <ul className="authorOne" style={{
            display: this.state.contentShow
          }}>
            {this.writer_list()}
            {this.pageLoad()}
          </ul>
          {_this.loadingImg()}
        </div>

      </div>

    );
  }
});

module.exports = Writer_category_info;
