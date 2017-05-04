;function pixelarteGame(data){
	
	var _root=this;

	this.stats ;
	this.Ventana={Width:null, Height:null};
	this.Canvas;
	this.stage;	
	this.maxHeight=data.height;
	this.maxWidth=data.width;
	this.mitadX;
	this.mitadY;
	this.loader;
	this.disctionary;
	this.Contenedor;
	this.progressLoader;
	this.SoundManager=[];

	this.init=function(){

		/*VALIDAR CANVAS*/
		if (Modernizr.canvas) {
			Canvas = document.getElementById(data.idCanvas);
			if(Canvas && Canvas.getContext){
					Canvas.getContext("2d");
					_root.mitadX=_root.maxWidth/2;
					_root.mitadY=_root.maxHeight/2;
					CrearStage();
			}
		}

		/*STAGE*/
		function CrearStage()
		{
			_root.stage = new createjs.Stage(Canvas);
			_root.stage.mouseMoveOutside = true;
			_root.stage.snapToPixelEnabled =true;
			createjs.Touch.enable(_root.stage);
			createjs.Ticker.setFPS(data.fps);
			createjs.Ticker.addEventListener("tick", update);

			_root.Contenedor=new createjs.Container();
			_root.stage.addChild(_root.Contenedor);
			
			window.addEventListener('resize', _root.reSize, false );
			
			if(data.debug){
				initStats();
			}
			_root.reSize();
			initAssets();
			initAssetsSound();
		
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

		function initAssetsSound(){
				var _root=this;	

			    var assetsPath = data.assetsPathSound;
			    var manifest = data.assetsSound;
				
				if(manifest.length>0)
				{
					createjs.Sound.initializeDefaultPlugins();
					createjs.Sound.alternateExtensions = ["mp3"];	// add other extensions to try loading if the src file extension is not supported
			   		createjs.Sound.addEventListener("fileload", createjs.proxy(soundLoaded, this)); // add an event listener for when load is completed
			   		createjs.Sound.registerManifest(manifest, assetsPath);
				}

			    function soundLoaded(event) {
					_root.assetsSoundLoaderComplete();
			    }
		}


	}

	this.reSize=function()
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

				_root.resizePixelarte(_root.Ventana);
		}

	this.getSound=function(_target){
		var temp;
		try{
			this.SoundManager.forEach(function(index){
			
				if(index.target==_target)
				{	
					temp=index;
				}
			}); 
		}catch(e){}
		return temp;
	}

	this.soundPlay=function(_target,_volumen){

		try{
			var sound=createjs.Sound.play(_target, {interrupt:createjs.Sound.INTERRUPT_NONE, loop:0, volume:_volumen});
			sound.target=_target;

			this.SoundManager.forEach(function(index){
				if(index.target==_target)
				{	
					this.SoundManager.splice(this.SoundManager.indexOf(index),1);
				}
			});

			this.SoundManager.push(sound);
		}catch(e){}
					
			//var instance = createjs.Sound.play(target, createjs.Sound.INTERRUPT_NONE, 0, 0, false, 1);
		       // if (instance == null || instance.playState == createjs.Sound.PLAY_FAILED) { return; }	
		     //createjs.Sound.play("music", {interrupt:createjs.Sound.INTERRUPT_NONE, loop:-1, volume:0.4});
	}
				
	this.soundLoop=function(_target,_volumen){

		try{
			var sound=createjs.Sound.play(_target, {interrupt:createjs.Sound.INTERRUPT_NONE, loop:-1, volume:_volumen});
			sound.target=_target;
			this.SoundManager.forEach(function(index){
				if(index.target==_target)
				{	
					this.SoundManager.splice(this.SoundManager.indexOf(index),1);
				}
			});
			
			this.SoundManager.push(sound);
		}catch(e){}
			//var instance = createjs.Sound.play(target, createjs.Sound.INTERRUPT_NONE, 0, 0, false, 1);
		      // if (instance == null || instance.playState == createjs.Sound.PLAY_FAILED) { return; }	
		    //createjs.Sound.play("music", {interrupt:createjs.Sound.INTERRUPT_NONE, loop:-1, volume:0.4});
	}

	this.soundStopAll=function(_target){
		this.SoundManager.forEach(function(index){
			index.stop();
		});
	}
						
	this.soundStop=function(_target){
		this.SoundManager.forEach(function(index){
			
			if(index.target==_target)
			{	
				index.stop();
			}
		});
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

	// retorna spritesheet animado
	this.sprite=function(_data,_animation,_reg){
		var spriteSheet= new createjs.SpriteSheet(_data);
		var sprite = new createjs.Sprite(spriteSheet,_animation);
		if(_reg){
			sprite.regX=sprite.getBounds().width/2;
			sprite.regY=sprite.getBounds().height/2;
		}
		return sprite;
	}

	// CREA TEXTO SIMPLES
	//http://www.createjs.com/docs/easeljs/classes/Text.html
	this.text=function(_text,_font,_color,_aling){
		var txt = new createjs.Text();
		txt.font = _font;
		txt.color = _color;
		txt.text = _text;
		txt.textAlign= _aling;
		return txt;
	}

	//RANDOM
	this.random=function(_min,_max){
		return Math.floor(Math.random()*(_max-_min+1)+_min);
	}

	//radianes y distacia
	this.radian=function(_obj){
		var yDistance = _obj.initY-_obj.endY;
		var xDistance = _obj.initX-_obj.endX;
		var radian = Math.atan2(yDistance, xDistance);
		return radian;
	}


	//POOL
	this.poolInit=function(type,len){
		var _root=this;
		this.pool=[];
		this.counter=len;
				
		var i = len;
		while (--i > -1)
		{
			_root.pool[i] = new type();
		}
		
		this.getSprite=function(){
			if (_root.counter > 0)
					return _root.pool[--_root.counter];
				else return null;
		}
		
		this.returnSprite=function(s){
			_root.pool[_root.counter++] = s;
		}
		
		this.destroy=function(s){
			_root.pool = null;
		}
	}


	/* INPUT ENGINE */

	this.inputEngine=function()
	{
		var _root=this;
		this.pressKey = {
	        direccion: "ninguna",
	        isPress: false
	    };
	    // TECLADO
		document.onkeydown = keyDown;
		document.onkeyup = keyUp;

		function setKey(_direccion,_ispress){
			_root.pressKey = {
		        direccion: _direccion,
		        isPress: _ispress
	   		};
		}

		function keyUp(e) {
			setKey("ninguna",false);
		}

		function keyDown(e) {

			var currKey = e.keyCode;
			//console.log(currKey);

		    switch (currKey) {
		    	
		    	////////letras asdw
		    	case 65:
		    		setKey("izquierda",true);
		        break;
		        case 87:
		        	setKey("arriba",true);
		        break;
		        case 68:
		             setKey("derecha",true);
		        break;
		        case 83:
					setKey("abajo",true);
		        break;
		        /////////////flechas
		        case 37:
		            setKey("izquierda",true);
		        break;
		        case 38:
		            setKey("arriba",true);
		        break;
		        case 39:
		            setKey("derecha",true);
		        break;
		        case 40:
					setKey("abajo",true);
		        break;
		 
		    }
		}
	}

	// SWIPE ESCRITORIO Y MOVIL

	this.swipe=function(){
		var _rootThis=this;
		this.swipe={
			oldPosition:{x:null,y:null},
			newPosition:{x:null,y:null},
			press:false,
			direccion:null
		}

		_root.stage.on("mousedown",function(e){
		
			_rootThis.swipe.oldPosition.x=e.stageX;
			_rootThis.swipe.oldPosition.y=e.stageY;
			_rootThis.swipe.press=false;
			_rootThis.swipe.direccion=null;
		});

		_root.stage.on("pressmove",function(e){
			
			_rootThis.swipe.newPosition.x=e.stageX;
			_rootThis.swipe.newPosition.y=e.stageY;
			_rootThis.swipe.press=true;
		});	

		_root.stage.on("pressup", function(e) { 
			
			if(_rootThis.swipe.press)
			{
				if(Math.abs(_rootThis.swipe.oldPosition.x-_rootThis.swipe.newPosition.x)>100)
				{
					if(_rootThis.swipe.oldPosition.x<_rootThis.swipe.newPosition.x)
					{
						_rootThis.swipe.direccion="derecha";
						_root.swipeAction("derecha");
					}else if(_rootThis.swipe.oldPosition.x>_rootThis.swipe.newPosition.x)
					{
						_rootThis.swipe.direccion="izquierda";
						_root.swipeAction("izquierda");
					}
					_rootThis.swipe.press=false;
				}else{
				}
			}
		 })	;	
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


/* DISPATCHER */
function DispatcherPixelarte(){
	this.events=[];
}
DispatcherPixelarte.prototype.addEventlistener=function(event,callback){
	this.events[event] = this.events[event] || [];
	if ( this.events[event] ) {
		this.events[event].push(callback);
	}
}
DispatcherPixelarte.prototype.removeEventlistener=function(event,callback){
	if ( this.events[event] ) {
		var listeners = this.events[event];
		for ( var i = listeners.length-1; i>=0; --i ){
			if ( listeners[i] === callback ) {
				listeners.splice( i, 1 );
				return true;
			}
		}
	}
	return false;
}
DispatcherPixelarte.prototype.dispatch=function(event,response){
	if ( this.events[event] ) {
		var listeners = this.events[event], len = listeners.length;
		while ( len-- ) {
			typeof response !== 'undefined' ?  listeners[len](response) : listeners[len](this); // 
			//listeners[len](response);	//callback with self
		}		
	}
}




pixelarteGame.prototype = new DispatcherPixelarte();
 
pixelarteGame.prototype.assetsLoaderComplete=function(){
	this.dispatch("assetsLoaderComplete");
}
pixelarteGame.prototype.assetsLoaderProgressss=function(){
	this.dispatch("assetsLoaderProgress");
}

pixelarteGame.prototype.assetsSoundLoaderComplete=function(){
	this.dispatch("assetsSoundLoaderComplete");
}

pixelarteGame.prototype.swipeAction=function(data){
	this.dispatch("swipeAction",data);
}

pixelarteGame.prototype.resizePixelarte=function(data){
	this.dispatch("resizePixelarte",data);
}



