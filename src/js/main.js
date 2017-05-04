var pixelarte;
var main=this;
var maxWidth,maxHeight;

var contenedorBg

window.onload = init;

function init()
{	
	console.log("followMe @PixelarteCl");

	var _assets=[
					{src:"assets/images/pixel.png", id:"pixel"},   
					{src:"assets/images/fondo.jpg", id:"fondo"} 
                ];
	maxHeight=500;
	maxWidth=960;

	pixelarte=new pixelarteGame({
		idCanvas:'canvas',// id canvas
		debug:true, // mode debug
		width:maxWidth, 
		height:maxHeight,
		loop:main.loop,
		fps:30,
		assets:_assets,
		assetsPathSound:"assets/sound/",
		assetsSound:[{src:"loop.mp3", id:"loop"}] 
	        
		});

	pixelarte.addEventlistener( "assetsLoaderProgress", assetsLoaderProgress );
	pixelarte.addEventlistener( "assetsLoaderComplete", assetsLoaderComplete );
	pixelarte.addEventlistener( "assetsSoundLoaderComplete", assetsSoundLoaderComplete );
}
	function assetsLoaderProgress(){
		console.log(pixelarte.progressLoader);
	}

	function assetsLoaderComplete(){
		var imgFondo=pixelarte.bitmap("fondo",false);
		pixelarte.Contenedor.addChild(imgFondo);
	}

	function assetsSoundLoaderComplete(){
		pixelarte.soundLoop("loop",1);
	}

	function loop(){
		
	}

