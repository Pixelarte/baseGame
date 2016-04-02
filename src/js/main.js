var pixelarte;
var Contenedor;

window.onload = init;

function init()
{	
	console.log("followMe @PixelarteCl");

	pixelarte=new pixelarteGame({
		idCanvas:'canvas',// id canvas
		stats:true, // mode debug
		width:900, 
		height:600,
		assets:[
                {src:"assets/images/bg.jpg", id:"bg"}
            ]
	});

	pixelarte.addEventlistener( "assetsLoaderComplete", assetsLoaderComplete );

}

function assetsLoaderComplete(){
	//CARGAR FONDO
	Bg=new createjs.Bitmap(pixelarte.disctionary.get("bg").result);
	pixelarte.Contenedor.addChild(Bg);
}