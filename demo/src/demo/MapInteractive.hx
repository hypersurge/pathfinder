package demo;
import awe6.interfaces.EKey;
import pathfinder.Coordinate;
import pathfinder.EHeuristic;
import pathfinder.Pathfinder;

/**
 * ...
 * @author 
 */

class MapInteractive extends MapDisplay
{
	public var message( default, null ):String;
	
	private var _pathfinder:Pathfinder;
	private var _heuristicType:EHeuristic;
	private var _start:Coordinate;
	private var _isStartSet:Bool;
	
	override function _init():Void 
	{
		super._init();
		_heuristicType = EHeuristic.PRODUCT;
		message = "Click any two map nodes.  Change Heuristic with keys 1-4.  Hold SHIFT to disable diagonals.  Hold CTRL to alter map.";
	}
	
	override private function _updater( p_deltaTime:Int = 0 ):Void 
	{
		super._updater( p_deltaTime );
		if ( _kernel.inputs.mouse.getIsButtonRelease() )
		{
			_onMouseRelease();
		}
		_handleKeyboard();
	}
	
	override function _shuffle():Void 
	{
		super._shuffle();
		_pathfinder = new Pathfinder( this );
	}
	
	private function _handleKeyboard():Void
	{
		var l_prevHeuristicType = _heuristicType;
		if ( _kernel.inputs.keyboard.getIsKeyRelease( EKey.NUMBER_1 ) )
		{
			_heuristicType = EHeuristic.DIAGONAL;
		}
		if ( _kernel.inputs.keyboard.getIsKeyRelease( EKey.NUMBER_2 ) )
		{
			_heuristicType = EHeuristic.PRODUCT;
		}
		if ( _kernel.inputs.keyboard.getIsKeyRelease( EKey.NUMBER_3 ) )
		{
			_heuristicType = EHeuristic.EUCLIDIAN;
		}
		if ( _kernel.inputs.keyboard.getIsKeyRelease( EKey.NUMBER_4 ) )
		{
			_heuristicType = EHeuristic.MANHATTAN;
		}
		if ( l_prevHeuristicType != _heuristicType )
		{
			message = "Heuristic changed to: " + _heuristicType;
		}
	}
	
	private function _onMouseRelease():Void
	{
		var l_coordinate:Coordinate = _getGridCoordinate( _kernel.inputs.mouse.x, _kernel.inputs.mouse.y );
		if ( _kernel.inputs.keyboard.getIsKeyDown( EKey.CONTROL ) )
		{
			_mapData[ ( l_coordinate.y * cols ) + l_coordinate.x] = !_mapData[ ( l_coordinate.y * cols ) + l_coordinate.x];
			_drawMap();
			_pathfinder.configure( this );
			return;
		}
		if ( !isWalkable( l_coordinate.x, l_coordinate.y ) )
		{
			return;
		}
		if ( _isStartSet )
		{
			_drawGrid( l_coordinate.x, l_coordinate.y, MapDisplay._COLOR_END );
			var l_path = _pathfinder.createPath( _start, l_coordinate, _heuristicType, !_kernel.inputs.keyboard.getIsKeyDown( EKey.SHIFT ) ); // this is it, everything else is decoration
			message = _pathfinder.getInfo();
			if ( l_path != null )
			{
				_drawPath( l_path );
			}
		}
		else
		{
			_drawMap();
			_drawGrid( l_coordinate.x, l_coordinate.y, MapDisplay._COLOR_START );
			_start = l_coordinate;
			message = "Start node selected ... click to select destination node (hold shift to disable diagonals) ...";
		}
		_isStartSet = !_isStartSet;
	}
	
}