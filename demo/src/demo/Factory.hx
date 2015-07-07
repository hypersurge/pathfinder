package demo;
import awe6.core.AFactory;
import awe6.core.TextStyle;
import awe6.interfaces.EScene;
import awe6.interfaces.ETextAlign;
import awe6.interfaces.ETextStyle;
import awe6.interfaces.IScene;
import awe6.interfaces.ITextStyle;

/**
 * ...
 * @author 
 */

class Factory extends AFactory 
{
	
	override private function _configurer( p_isPreconfig:Bool = false ):Void 
	{
		if ( p_isPreconfig ) 
		{
			id = "Pathfinder";
			version = "0.1.0";
			author = "Robert Fell";
			isDecached = true;
			width = 1200;
			height = 600;
			bgColor = 0xFF0080FF;
			startingSceneType = TEST;
			targetFramerate = 60;
			isFixedUpdates = false;
		}
	}
	
	override public function createScene( p_type:EScene ):IScene 
	{
		return new Test( _kernel, p_type, true, true );
	}
	
	override public function createTextStyle( ?p_type:ETextStyle ):ITextStyle 
	{
		return new TextStyle( _kernel.getConfig( Config.settings_font_name ), 14, 0xFFFFFF, ETextAlign.CENTER );
	}
	
}
