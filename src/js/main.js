var pixelarte;
var Contenedor;
var main=this;

window.onload = init;

function init()
{	
	console.log("followMe @PixelarteCl");

	pixelarte=new pixelarteGame({
		idCanvas:'canvas',// id canvas
		stats:true, // mode debug
		width:960, 
		height:500,
		loop:main.loop,
		assets:[
                {src:"assets/images/pixel.png", id:"pixel"}
            ]
	});

	pixelarte.addEventlistener( "assetsLoaderProgress", assetsLoaderProgress );
	pixelarte.addEventlistener( "assetsLoaderComplete", assetsLoaderComplete );
}
	function assetsLoaderProgress(){
		//console.log(pixelarte.progressLoader);
	}

	function assetsLoaderComplete(){

	}
	function loop(){
		
	}

