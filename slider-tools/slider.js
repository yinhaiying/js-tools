(function(){
    var util = {
      setClassName(selector,className){
        selector.className = className;
      },
      addClass(selector, className) {
        selector.classList.add(className);
      },
      setInlineStyle(selector,attr,content){
        let length = selector.length;
        for(let i = 0;i < length;i++){
          selector[i].style[attr] = content;
        }
      }
    }
    function SliderTools(options){
      var defaultOptions = {
        el: document.body
      };
      this.options = Object.assign({},defaultOptions,options);
      this.init();
      this.diffX = 0;
      this.flag = false;   // 是否推动到最右侧
    }
    SliderTools.prototype.init = function(){
      this.createSlider();
      this.bindEvents();
    }
    // 添加元素
    SliderTools.prototype.createSlider = function(){
        console.log('options');
        console.log(this.options);
    }
    // 绑定事件
    SliderTools.prototype.bindEvents = function(){
      this.slider = document.querySelector('#slider');
      this.drag_bg = document.querySelector('.drag_bg');
      this.handler = document.querySelector('.handler');     // 滑块
      var self = this;
      this.handler.onmousedown = function(e){
        self.diffX = e.clientX - self.handler.offsetLeft;
        util.addClass(self.slider,'unselect');
        document.onmousemove = function(e){
          let deltaX = e.clientX - self.diffX;
          if(deltaX >= self.slider.offsetWidth - self.handler.offsetWidth){
            deltaX = self.slider.offsetWidth - self.handler.offsetWidth;
            self.flag = true;
          }else if(deltaX <= 0){
            deltaX = 0;
            self.flag = false;
          }else{
            self.flag = false;
          }
          util.setInlineStyle([self.handler], 'left', deltaX + 'px');
          util.setInlineStyle([self.drag_bg], 'width', deltaX + 'px');
        }
        document.onmouseup = function(e){
          util.setClassName(self.slider,'');
          console.log('flag:'+self.flag);
          if(self.flag){
            // 滑动到底部了
            util.setClassName(self.slider,'slider_ok');
            util.addClass(self.handler, 'handler_ok_bg');
            self.handler.onmousedown = null;
            self.complete();
          }else{
            // 如果没有滑动到底部
            util.setInlineStyle([self.handler], 'left', 0 + 'px');
            util.setInlineStyle([self.drag_bg], 'width', 0 + 'px');
          }
          document.onmousemove = null;
          document.onmouseup = null;
        }
        
      }
    }
    SliderTools.prototype.complete = function(){
      alert('验证成功');
    }
    // 判断浏览器环境，然后进行导出。
    var root = (typeof self == 'object' && self.self == self && self) ||
    (typeof global == 'object' && global.global == global && global) ||
    this || {};
    if (typeof exports != 'undefined' && !exports.nodeType) {
        if (typeof module != 'undefined' && !module.nodeType && module.exports) {
            exports = module.exports = SliderTools;
        }
        exports.SliderTools = SliderTools;
    } else {
        root.SliderTools = SliderTools;
    }
}());