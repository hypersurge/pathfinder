package demo;
import awe6.core.Context;
import awe6.core.Entity;
import awe6.interfaces.IKernel;
import pathfinder.IMap;

/**
 * ...
 * @author 
 */
	
class MapData extends Entity implements IMap
{	
	public var rows( default, null ):Int;
	public var cols( default, null ):Int;

	private inline static var _THRESHOLD:Float = 0.1;
	
	private var _context:Context;
	private var _mapData:Array<Bool>;
	
	public function new( p_kernel:IKernel, p_cols:Int, p_rows:Int )
	{
		cols = p_cols;
		rows = p_rows;
		_context = new Context();
		super( p_kernel, _context );
	}
	
	override private function _init():Void 
	{
		super._init();
		_shuffle();
	}
	
	public function isWalkable( p_x:Int, p_y:Int ):Bool
	{
		return _mapData[ ( p_y * cols ) + p_x];
	}
	
	private function _shuffle():Void
	{
		_mapData = new Array<Bool>();
		var l_t:Int = rows * cols;
		for ( i in 0...l_t )
		{
			_mapData.push( ( Math.random() > _THRESHOLD ) );
		}
	}
	
}