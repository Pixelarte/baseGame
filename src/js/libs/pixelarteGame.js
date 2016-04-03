function pixelarteGame(data){
	var _root=this;

	this.stats ;
	this.Ventana={Width:null, Height:null};
	this.Canvas;
	this.stage;	
	this.maxHeight=data.height;
	this.maxWidth=data.width;
	this.loader;
	this.disctionary;
	this.Contenedor;
	this.progressLoader;

	this.init=function(){
		/*VALIDAR CANVAS*/
		if (Modernizr.canvas) {
			Canvas = document.getElementById(data.idCanvas);
			if(Canvas && Canvas.getContext){
					Canvas.getContext("2d");
					CrearStage();
			}
		}

		/*STAGE*/
		function CrearStage()
		{
			_root.stage = new createjs.Stage(Canvas);
			_root.stage.mouseMoveOutside = true;
			createjs.Touch.enable(_root.stage);
			createjs.Ticker.setFPS(60);
			createjs.Ticker.addEventListener("tick", update);

			_root.Contenedor=new createjs.Container();
			_root.stage.addChild(_root.Contenedor);
			
			window.addEventListener('resize', reSize, false );
			
			if(data.debug){
				initStats();
			}
			reSize();
			initAssets();
		}	
		/*STATS*/
		function initStats()
		{
		  _root.stats = new Stats();
		  _root.stats.domElement.style.position = 'absolute';
		  _root.stats.domElement.style.left = '0px';
		  _root.stats.domElement.style.top = '0px';
		  document.body.appendChild( _root.stats.domElement );
		} 
		/*RESIZE*/
		function reSize()
		{
			if( typeof( window.innerWidth ) == 'number' ) { 
					//No-IE 
					_root.Ventana.Width = window.innerWidth; 
					_root.Ventana.Height = window.innerHeight; 
				} else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
					//IE 6+ 
					_root.Ventana.Width = document.documentElement.clientWidth; 
					_root.Ventana.Height = document.documentElement.clientHeight; 
				} else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
					//IE 4 compatible 
					_root.Ventana.Width = document.body.clientWidth; 
					_root.Ventana.Height = document.body.clientHeight; 
				} 
					
				var canvasAspectRatio = _root.maxWidth / _root.maxHeight;
				var browserAspectRatio = _root.Ventana.Width / _root.Ventana.Height; //si le divido el alto manda el ancho
				var ancho, alto;

			
				if(_root.Ventana.Width < _root.maxWidth || _root.Ventana.Height < _root.maxHeight)
					 {
						if (browserAspectRatio < canvasAspectRatio) {
							ancho = _root.Ventana.Width;
							alto = _root.Ventana.Width / canvasAspectRatio;
						} else if(browserAspectRatio > canvasAspectRatio){
							alto = _root.Ventana.Height;
							ancho = _root.Ventana.Height * canvasAspectRatio;
						}
					}else{
						alto = _root.maxHeight;
						ancho = _root.maxWidth;
					}
				
				try
				{
					var scaleFactor= Math.min(ancho/_root.maxWidth, alto/_root.maxHeight);
					
					_root.stage.scaleX=scaleFactor; 
					_root.stage.scaleY=scaleFactor; 
						
					_root.stage.canvas.width=_root.maxWidth*scaleFactor;
					_root.stage.canvas.height=_root.maxHeight*scaleFactor;
				}
				catch(err){	}
		}
		function initAssets(){
			_root.disctionary=new Dictionary();
			_root.loader = new createjs.LoadQueue();
			_root.loader.addEventListener("fileload", handleFileLoad);
			_root.loader.addEventListener("progress", handleProgress);
			_root.loader.addEventListener("complete", handleComplete);
	        _root.loader.loadManifest(data.assets);
				
			function handleFileLoad(event) {
				_root.disctionary.add(event.item.id,event);
	        }
			
			function handleProgress(event) {
				_root.progressLoader=Math.round((event.loaded*100)/1);// 100 es 1 por eso se divide por 1
				_root.assetsLoaderProgressss();
			}
			
			function handleComplete(event) {
				_root.assetsLoaderComplete();
			}
		}
	}

	//crea un bitmap desde un pixel.png y lo escala, lo uso para botones o zonas de hit
	this.makePixel=function(_scaleX,_scaleY,_x,_y,_reg){
		var _reg = typeof _reg !== 'undefined' ?  _reg : true; // si no trae datos en reg deja el bitmpa con el registro centrado
		var p= new createjs.Bitmap(_root.disctionary.get("pixel").result);
		p.scaleX=_scaleX;
		p.scaleY=_scaleY;
		p.x=_x;
		p.y=_y;
		if(data.debug){
			p.alpha=.2;
		}else{p.alpha=0.01;}
		if(_reg){
			p.regX=p.getBounds().width/2;
			p.regY=p.getBounds().height/2;
		}
		return p;
	}

	// restonra el bitmp segun los guardado en el diccionario
	this.bitmap=function(_data,_reg){
		var _reg = typeof _reg !== 'undefined' ?  _reg : true; // si no trae datos en reg deja el bitmpa con el registro centrado
		var temp=new createjs.Bitmap(_root.disctionary.get(_data).result);
		if(_reg){
			temp.regX=temp.getBounds().width/2;
			temp.regY=temp.getBounds().height/2;
		}
		return temp;
	}

	// CREA TEXTO SIMPLES
	this.text=function(_text,_font,_color){
		var txt = new createjs.Text();
		txt.font = _font;
		txt.color = _color;
		txt.text = _text;
		return txt;
	}

	//RANDOM
	this.random=function(_min,_max){
		return Math.floor(Math.random()*(_max-_min+1)+_min);
	}

	/*RENDER*/
	function update() 
	{
		if(data.debug){
			_root.stats.begin();
		}
		
		try{
			data.loop();
		}catch(e){}

		_root.stage.update();

		if(data.debug){
			_root.stats.end();
		}
	}

	this.init();
}

pixelarteGame.prototype = new Dispatcher();
 
pixelarteGame.prototype.assetsLoaderComplete=function(){
	this.dispatch("assetsLoaderComplete");
}
pixelarteGame.prototype.assetsLoaderProgressss=function(){
	this.dispatch("assetsLoaderProgress");
}
