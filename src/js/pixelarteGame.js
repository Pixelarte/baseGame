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
			
			if(data.stats){
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
				// console.log(event.loaded);
			}
			
			function handleComplete(event) {
				assetsLoaderComplete();
			}
		}
	}

	/*RENDER*/
	function update() 
	{
		if(data.stats){
			_root.stats.begin();
		}

		_root.stage.update();
		
		if(data.stats){
			_root.stats.end();
		}
	}

	this.init();
}

pixelarteGame.prototype = new Dispatcher();
 
pixelarteGame.prototype.assetsLoaderComplete=function(){
	this.dispatch("assetsLoaderComplete");
}
