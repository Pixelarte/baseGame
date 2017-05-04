# PixelartebaseGame


## 1. npm install -g grunt-cli

## 2. trabajar con "grunt backend", se especifica en las tareas del Gruntfile.js

## 3. Main.js se encuentra toda la base para comenzar a dibujar en el canvas

```
	var _assets=[
					{src:"assets/images/pixel.png", id:"pixel"},   
					{src:"assets/images/fondo.jpg", id:"fondo"} 
                ];
    //tamaño principal del canvas, luego automaicamente se ajusta al view del browser
	maxHeight=500;
	maxWidth=960;

	pixelarte=new pixelarteGame({
		idCanvas:'canvas',// id canvas el html
		debug:true, // mode debug, se activa el stats para rendimiento y los botones pixel se puden vizualizar
		width:maxWidth, 
		height:maxHeight,
		loop:main.loop, //nombre de la funcion que tendra el render del canvas
		fps:30, 
		assets:_assets,
		assetsPathSound:"assets/sound/",
		assetsSound:[{src:"loop.mp3", id:"loop"}] 
	        
		});

	// eventos que se gatillan cuando esta todo ok.
	pixelarte.addEventlistener( "assetsLoaderProgress", assetsLoaderProgress );
	pixelarte.addEventlistener( "assetsLoaderComplete", assetsLoaderComplete );
	pixelarte.addEventlistener( "assetsSoundLoaderComplete", assetsSoundLoaderComplete );

	// render del canvas.
	function loop(){
		
	}

```

## 4. utilsPixelarteGame.min.js "conjunto de librerias /src/js/libs"

* Dictionary.js (nos permite asignar id a nuestros assets al momento de cargarlos para luego solicitarlos de forma rapida)
* Dispatcher.js (creamos con prototype eventos dispatcher)
* ndgmr.Collision.js (eventos de colision rectangular o a nivel de pixel)
* stats.js (mide el rendimiento)
* pixelarteGame.js (utilidades para dibujar, sonido, input, calculos)


## 5. La capa entre createJs y tu canvas sera /src/js/libs/pixelarteGame.js

## 6. Cuando hagas cualquier cambio en las librerias /src/js/libs ejecuta "grunt produccion" con esto concatenaras y minificaras las librerias en /dis/assets/js/libs/utilsPixelarteGame.min.js

## 7. Suerte.






