document.getElementById('wm-preview-img').onload = function(){
		var ra = 480/1280,
			rh = 270/720,
			vm = this.offsetWidth,
			vh = this.offsetHeight;  console.log('vm'+vm);
	
		document.getElementById('wm-btnImg').style.width = ra*vm +'px';
		document.getElementById('wm-btnImg').style.height = ra*vh +'px';


	};
			
	window.onload = function(){	
		new scale('wm-btnImg','wm-preview','positionX','positionY','ox','oy');
	}
	scale = function (btn,bar,posx,posy,ox,oy) {
		this.btn = document.getElementById(btn);
		this.bar = document.getElementById(bar);
		this.posx = document.getElementById(posx);
		this.posy = document.getElementById(posy);
		this.ox = document.getElementById(ox).style;
		this.oy = document.getElementById(oy).style;
		this.init();
	};
	scale.prototype = {
		init: function () {
			var f = this, g = document, b = window, m = Math,
			    btnW = f.btn.offsetWidth,  
			    btnH = f.btn.offsetHeight,
			    parX = 480 - parseInt(btnW),
			    parY = 270 - parseInt(btnH),
			 	normalColor = '#000', /*黑色*/
			 	downColor = '#5acdee',/*蓝色*/
	   			upColor = '#2c2c2c', /*灰色*/    
	   			boxshadow = '0 0 4px 2px #5cadee';

			/*var max = f.bar.offsetWidth - btnW; console.log('max'+max);
			var may = f.bar.offsetHeight - btnH; console.log('may'+may);*/
			var max = f.bar.offsetWidth; console.log('max'+max);
			var may = f.bar.offsetHeight; console.log('may'+may);


			this.onshowx(this.posx.value,max,btnW); /*初始化横轴位置*/
			this.onshowy(this.posy.value,may,btnH);
			
			f.btn.onmousedown = function (e) {
				f.posx.blur();
				f.posy.blur();
				console.log("开始拖动");
				var x = (e || b.event).clientX;  
				var y = (e || b.event).clientY;
				
				var l = this.offsetLeft; 
				var t = this.offsetTop;  
				
				f.ox.backgroundColor = downColor;
				f.oy.backgroundColor = downColor;
				f.posx.style.color = downColor;
				f.posy.style.color = downColor;
				f.btn.style.boxShadow = boxshadow;
				f.btn.style.webkitBoxShadow = boxshadow;
				f.btn.style.mozBoxShadow =boxshadow;
				
				f.btn.onmousemove = function (e) {
					var thisX = (e || b.event).clientX; console.log('thisX'+thisX);
					var thisY = (e || b.event).clientY; console.log('thisX'+thisY);
					
					var tox = m.min(max, m.max(0, l + (thisX - x)));/*左下到右下的最大水平距离，移动left*/
					var toy = m.min(may, m.max(0, t + (thisY - y)));/*左下到左上的最大垂直距离，移动top*/
					if(tox>parX || toy>parY ){
						return false;
					}
					f.btn.style.left = tox + 'px';
					f.btn.style.top = toy + 'px';
					
					f.oy.left = tox + btnW/2 + 'px';
					f.ox.top = toy + btnH/2 + 'px';
					
					f.ondrag(m.round(m.max(0, tox / max) * 100),m.round(m.max(0, toy / may) * 100));		
				};			
			};
			f.btn.onmouseup =function(){
				this.onmousemove=null;
				f.ox.backgroundColor = upColor;
				f.oy.backgroundColor = upColor;
				f.posx.style.color = normalColor;
				f.posy.style.color = normalColor;
				f.btn.style.boxShadow = '';
				f.btn.style.webkitBoxShadow = '';
				f.btn.style.mozBoxShadow ='';
				console.log("停止拖动");
			};
			f.posx.onfocus = function(){
				this.onmouseout=null;
				f.posx.style.color = downColor;
				f.posy.style.color = downColor;
				f.ox.backgroundColor = downColor;
				f.oy.backgroundColor = downColor;
				f.btn.style.boxShadow = boxshadow;
				f.btn.style.webkitBoxShadow = boxshadow;
				f.btn.style.mozBoxShadow =boxshadow;
			};
			f.posy.onfocus = function(){
				f.posx.style.color = downColor;
				f.posy.style.color = downColor;
				f.ox.backgroundColor = downColor;
				f.oy.backgroundColor = downColor;
				f.btn.style.boxShadow = boxshadow;
				f.btn.style.webkitBoxShadow = boxshadow;
				f.btn.style.mozBoxShadow = boxshadow;
			};
			f.posx.onkeydown =function(){
				var current = this.value;
				f.posx.onkeyup = function(){
					this.value=this.value.replace(/[^\d]/g,'');
					var perX=m.round((480 - parseInt(btnW))/480*100);
					if(this.value>perX){
						this.value = current;
						alert('已超出边界，请输入正确的取值');
					}else{
						f.onshowx(this.value,max,btnW);
					}
				};
			};
			f.posy.onkeydown =function(){
				var current = this.value;
				f.posy.onkeyup = function(){
					this.value=this.value.replace(/[^\d]/g,'');
					var perY=m.round((270 - parseInt(btnH))/270*100);
					if(this.value>perY){
						this.value = current;
						alert('已超出边界，请输入正确的取值');
					}else{
						f.onshowy(this.value,may,btnH);
					}
				};
			};	
			
		},
		ondrag: function (pos1,pos2) {
			this.posx.value = pos1 ;
			this.posy.value = pos2 ;
		},
		onshowx:function(x,max,w){	
			var tox= x/100*max;	
			this.btn.style.left = tox + 'px';	
			this.oy.left = tox + w/2 + 'px'; 
		},
		onshowy:function(y,may,h){
			var toy = y/100*may;
			this.btn.style.top = toy + 'px';
			this.ox.top = toy + h/2 + 'px';
		},
	}