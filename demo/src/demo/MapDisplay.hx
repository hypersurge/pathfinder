package demo;
import createjs.easeljs.Graphics;
import createjs.easeljs.Shape;
import pathfinder.Coordinate;

/**
 * ...
 * @author 
 */
	
class MapDisplay extends MapData
{	
	public inline static var GRID_SIZE:Int = 10;
	
	private inline static var _COLOR_START:String = "#FF0000";
	private inline static var _COLOR_END:String = "#00FF00";
	private inline static var _COLOR_BACKGROUND:String = "#80DDFF";
	private inline static var _COLOR_LINE:String = "#FFFFFF";
	private inline static var _COLOR_BLOCK:String = "#000000";
	private inline static var _COLOR_PATH:String = "#EEEEEE";

	private var _graphics:Graphics;
	
	override private function _init():Void 
	{
		super._init();
		var l_shape = new Shape();
		_graphics = l_shape.graphics;
		_context.addChild( l_shape );
		_drawMap();
	}
	
	private function _getGridCoordinate( p_x:Float, p_y:Float ):Coordinate
	{
		var l_col:Int = Std.int( p_x / GRID_SIZE );
		var l_row:Int = Std.int( p_y / GRID_SIZE );
		if ( l_col < 0 ) l_col = 0;
		if ( l_col >= cols ) l_col = cols - 1;
		if ( l_row < 0 ) l_row = 0;
		if ( l_row >= rows ) l_row = rows - 1;
		return new Coordinate( l_col, l_row );
	}
	
	private function _drawMap():Void
	{
		_graphics.clear();
		_graphics.beginFill( _COLOR_BACKGROUND );
		_graphics.drawRect( 0, 0, cols * GRID_SIZE, rows * GRID_SIZE );
		_graphics.endFill();
		var l_t:Int = rows * cols;
		for ( i in 0...l_t )
		{
			var l_r:Int = Math.floor( i / cols );
			var l_c:Int = i % cols;
			if ( !_mapData[i] )
			{
				_drawGrid( l_c, l_r, _COLOR_BLOCK );
			}
		}
		_graphics.setStrokeStyle( 1 );
		_graphics.beginStroke( _COLOR_LINE );
		_graphics.moveTo( 0, 0 );
		_graphics.lineTo( 0, rows * GRID_SIZE );
		_graphics.lineTo( cols * GRID_SIZE, rows * GRID_SIZE );
		_graphics.lineTo( cols * GRID_SIZE, 0 );
		_graphics.lineTo( 0, 0 );
		_graphics.beginStroke( _COLOR_LINE );
		for ( i in 1...rows )
		{
			_graphics.moveTo( 0, i * GRID_SIZE );
			_graphics.lineTo( cols * GRID_SIZE, i * GRID_SIZE );
		}
		for ( i in 1...cols )
		{
			_graphics.moveTo( i * GRID_SIZE, 0 );
			_graphics.lineTo( i * GRID_SIZE, rows * GRID_SIZE );
		}
	}
	
	private function _drawGrid( p_x:Int, p_y:Int, p_color:String ):Void
	{
		_graphics.beginFill( p_color );
		_graphics.drawRect( p_x * GRID_SIZE, p_y * GRID_SIZE, GRID_SIZE, GRID_SIZE );
		_graphics.endFill();
	}
	
	private function _drawPath( p_path:Array<Coordinate> ):Void
	{
		for ( i in 1...( p_path.length - 1 ) )
		{
			var l_grid:Coordinate = p_path[i];
			_drawGrid( l_grid.x, l_grid.y, _COLOR_PATH );
		}
	}	
}