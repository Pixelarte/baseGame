var pixelarte;
var main=this;
var maxWidth,maxHeight;

window.onload = init;

function init()
{	
	console.log("followMe @PixelarteCl");

	var _assets=[
					{src:"assets/images/pixel.png", id:"pixel"}   
                ];
	maxHeight=500;
	maxWidth=960;

	pixelarte=new pixelarteGame({
		idCanvas:'canvas',// id canvas
		debug:false, // mode debug
		width:maxWidth, 
		height:maxHeight,
		loop:main.loop,
		fps:30,
		assets:_assets,
		assetsPathSound:"assets/sound/",
		assetsSound:[] 
	        
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

