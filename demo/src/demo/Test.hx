package demo;
import awe6.core.drivers.createjs.extras.gui.Image;
import awe6.core.drivers.createjs.extras.gui.Text;
import awe6.core.Scene;
import awe6.extras.Trigger;
import awe6.interfaces.EScene;
import awe6.interfaces.IKernel;

/**
 * A simple test scene with an Grid Map
 * @author	Robert Fell
 */

class Test extends Scene 
{
	private var _map:MapInteractive;
	private var _text:Text;
	
	public function new( p_kernel:IKernel, p_type:EScene, p_isPauseable:Bool = false, p_isMuteable:Bool = true, p_isSessionSavedOnNext:Bool = false ) 
	{
		super( p_kernel, p_type, p_isPauseable, p_isMuteable, p_isSessionSavedOnNext );
	}
	
	override function _init():Void 
	{
		super._init();
		_map = new MapInteractive( _kernel, Math.floor( _kernel.factory.width / MapDisplay.GRID_SIZE ), Math.floor( ( _kernel.factory.height - 40 ) / MapDisplay.GRID_SIZE ) );
		addEntity( _map, true, 5 );
		_text = new Text( _kernel, _kernel.factory.width, 30, "Test", _kernel.factory.createTextStyle() );
		_text.setPosition( 0, _kernel.factory.height - _text.height );
		addEntity( _text, true, 10 );
	}
	
	override function _updater( p_deltaTime:Int = 0 ):Void 
	{
		super._updater( p_deltaTime );
		_text.text = _map.message;
	}
	
}
