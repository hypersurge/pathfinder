/*                  __  __    _____           __
 *     ____  ____ _/ /_/ /_  / __(_)___  ____/ /__  _____
 *    / __ \/ __ `/ __/ __ \/ /_/ / __ \/ __  / _ \/ ___/
 *   / /_/ / /_/ / /_/ / / / __/ / / / / /_/ /  __/ /
 *  / .___/\__,_/\__/_/ /_/_/ /_/_/ /_/\__,_/\___/_/
 * /_/
 *
 * Copyright (c) 2013, Robert Fell
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

package pathfinder;
import haxe.Timer;

/**
 * A class to find an optimized A Star path across an IMap boolean grid.
 * @author Statm	https://github.com/statm/haxe-astar
 * @author Robert Fell
 */

class Pathfinder
{
	private inline static var _COST_ADJACENT:Int = 10;
	private inline static var _COST_DIAGIONAL:Int = 14;

	private var _map:IMap;
	private var _timeOutDuration:Int;
	private var _openList:Array<Node>;
	private var _closedList:Array<Node>;
	private var _isCompleted:Bool;
	private var _nodes:Array<Array<Node>>;
	private var _startNode:Node;
	private var _destNode:Node;
	private var _cols:Int;
	private var _rows:Int;
	private var _info:{ heuristic:EHeuristic, timeElapsed:Int, pathLength:Int, isDiagonalEnabled:Bool };

	/**
	 * Creates a new pathfinder class
	 * @param	p_map	The boolean coordinate map
	 * @param	p_timeOutDuration	The maximum time spent to find a path
	 */
	public function new( p_map:IMap, p_timeOutDuration:Int = 10000 )
	{
		configure( p_map, p_timeOutDuration );
	}

	/**
	 * Reconfigures an existing pathfinder class
	 * @param	p_map	The boolean coordinate map
	 * @param	p_timeOutDuration	The maximum time spent to find a path
	 */
	public function configure( p_map:IMap, p_timeOutDuration:Int = 10000 )
	{
		_map = p_map;
		_timeOutDuration = p_timeOutDuration;
		_nodes = new Array<Array<Node>>();
		_cols = _map.cols;
		_rows = _map.rows;
		for ( l_ix in 0..._map.cols )
		{
			var l_line = _nodes[l_ix] = new Array<Node>();
			for ( l_iy in 0..._map.rows )
			{
				l_line[l_iy] = new Node( l_ix, l_iy, _map.isWalkable( l_ix, l_iy ) );
			}
		}
	}

	private inline function _getCost( p_node1:Node, p_node2:Node, p_heuristic:EHeuristic ):Float
	{
		return switch( p_heuristic )
		{
			case DIAGONAL : _getCostDiagonal( p_node1, p_node2 );
			case PRODUCT : _getCostProduct( p_node1, p_node2 );
			case EUCLIDIAN : _getCostEuclidian( p_node1, p_node2 );
			case MANHATTAN : _getCostManhattan( p_node1, p_node2 );
		}
	}

	private inline function _getCostDiagonal( p_node1:Node, p_node2:Node ):Float
	{
		var l_dx:Int = _intAbs( p_node1.x - p_node2.x );
		var l_dy:Int = _intAbs( p_node1.y - p_node2.y );
		var l_diag:Int = _intMin( l_dx, l_dy );
		var l_straight:Int = l_dx + l_dy;
		return ( _COST_ADJACENT * ( l_straight - ( 2 * l_diag ) ) ) + ( _COST_DIAGIONAL * l_diag );
	}

	private inline function _getCostProduct( p_node1:Node, p_node2:Node ):Float
	{
		var l_dx1:Int = _intAbs( p_node1.x - _destNode.x );
		var l_dy1:Int = _intAbs( p_node1.y - _destNode.y );
		var l_dx2:Int = _intAbs( _startNode.x - _destNode.x );
		var l_dy2:Int = _intAbs( _startNode.y - _destNode.y );
		var l_cross:Float = _intAbs( ( l_dx1 * l_dy2 ) - ( l_dx2 * l_dy1 ) ) * .01;
		return _getCostDiagonal( p_node1, p_node2 ) + l_cross;
	}

	private inline function _getCostEuclidian( p_node1:Node, p_node2:Node ):Float
	{
		var l_dx:Int = _intAbs( p_node1.x - p_node2.x );
		var l_dy:Int = _intAbs( p_node1.y - p_node2.y );
		return Math.sqrt( ( l_dx * l_dx ) + ( l_dy * l_dy ) ) * _COST_ADJACENT;
	}

	private inline function _getCostManhattan( p_node1:Node, p_node2:Node ):Float
	{
		var l_dx:Int = p_node1.x - p_node2.x;
		var l_dy:Int = p_node1.y - p_node2.y;
		return ( ( l_dx > 0 ? l_dx : -l_dx ) + ( l_dy > 0 ? l_dy : -l_dy ) ) * _COST_ADJACENT;
	}

	/**
	 * Calculates an A Star path between two nodes on a boolean map
	 * @param	p_start	The starting node
	 * @param	p_dest	The destination node
	 * @param	p_heuristic	The method of A Star used
	 * @param	p_isDiagonalEnabled	Set to false to ensure only up, left, down, right movements are allowed
	 * @param	p_isMapDynamic	Set to true to force fresh lookups from IMap.isWalkable() for each node's isWalkable property (e.g. for a dynamically changing map)
	 * @return	An array of coordinates from start to destination, or null if no path was found within the time limit
	 */
	public function createPath( p_start:Coordinate, p_dest:Coordinate, ?p_heuristic:EHeuristic, p_isDiagonalEnabled:Bool = true, p_isMapDynamic:Bool = false ):Array<Coordinate>
	{
		if ( p_heuristic == null )
		{
			p_heuristic = EHeuristic.PRODUCT;
		}
		_info =
		{
			heuristic:p_heuristic,
			timeElapsed:0,
			pathLength:0,
			isDiagonalEnabled:p_isDiagonalEnabled
		};
		if ( !_map.isWalkable( p_start.x, p_start.y ) || !_map.isWalkable( p_dest.x, p_dest.y ) || p_start.isEqualTo( p_dest ) )
		{
			return null;
		}
		_openList = new Array<Node>();
		_closedList = new Array<Node>();
		_startNode = _nodes[p_start.x][p_start.y];
		_destNode = _nodes[p_dest.x][p_dest.y];
		_startNode.g = 0;
		_startNode.f = _getCost( _startNode, _destNode, p_heuristic );
		_openList.push( _startNode );
		return _searchPath( p_heuristic, p_isDiagonalEnabled, p_isMapDynamic );
	}

	private inline function _getPath():Array<Coordinate>
	{
		var l_path:Array<Coordinate> = new Array<Coordinate>();
		var l_node:Node = _destNode;
		l_path[0] = l_node.clone();
		do
		{
			l_node = l_node.parent;
			l_path.unshift( l_node.clone() );
			if ( l_node == _startNode )
			{
				break;
			}
		}
		while ( true );
		return l_path;
	}

	private function _searchPath( p_heuristic:EHeuristic, p_isDiagonalEnabled:Bool = true, p_isMapDynamic:Bool = false ):Array<Coordinate>
	{
		var l_minX:Int, l_maxX:Int, l_minY:Int, l_maxY:Int;
		var l_isWalkable:Bool;
		var l_g:Float, l_f:Float, l_cost:Float;
		var l_nextNode:Node = null;
		var l_currentNode:Node = _startNode;
		var l_startTime = Timer.stamp();
		_isCompleted = false;
		while ( !_isCompleted )
		{
			l_minX = l_currentNode.x - 1 < 0 ? 0 : l_currentNode.x - 1;
			l_maxX = l_currentNode.x + 1 >= _cols ? _cols - 1 : l_currentNode.x + 1;
			l_minY = l_currentNode.y - 1 < 0 ? 0 : l_currentNode.y - 1;
			l_maxY = l_currentNode.y + 1 >= _rows ? _rows - 1 : l_currentNode.y + 1;
			for ( l_iy in l_minY...( l_maxY + 1 ) )
			{
				for ( l_ix in l_minX...( l_maxX + 1 ) )
				{
					l_nextNode = _nodes[l_ix][l_iy];
					l_isWalkable = ( !p_isMapDynamic && l_nextNode.isWalkable ) || ( p_isMapDynamic && _map.isWalkable( l_ix, l_iy ) );
					if ( ( l_nextNode == l_currentNode ) || !l_isWalkable )
					{
						continue;
					}
					l_cost = _COST_ADJACENT;
					if ( !( ( l_currentNode.x == l_nextNode.x ) || ( l_currentNode.y == l_nextNode.y ) ) )
					{
						if ( !p_isDiagonalEnabled  )
						{
							continue;
						}
						l_cost = _COST_DIAGIONAL;
					}
					l_g = l_currentNode.g + l_cost;
					l_f = l_g + _getCost( l_nextNode, _destNode, p_heuristic );
					if ( ( _openList.indexOf( l_nextNode ) != -1 ) || ( _closedList.indexOf( l_nextNode ) != -1 ) )
					{
						if ( l_nextNode.f > l_f )
						{
							l_nextNode.f = l_f;
							l_nextNode.g = l_g;
							l_nextNode.parent = l_currentNode;
						}
					}
					else
					{
						l_nextNode.f = l_f;
						l_nextNode.g = l_g;
						l_nextNode.parent = l_currentNode;
						_openList.push( l_nextNode );
					}
				}
				_info.timeElapsed = Std.int( ( Timer.stamp() - l_startTime ) * 1000 );
				if ( _info.timeElapsed > _timeOutDuration )
				{
					return null;
				}
			}
			_closedList.push( l_currentNode );
			if ( _openList.length == 0 )
			{
				return null;
			}
			_openList.sort( _sort );
			l_currentNode = _openList.shift();
			if ( l_currentNode == _destNode )
			{
				_isCompleted = true;
			}
		}
		_info.timeElapsed = Std.int( ( Timer.stamp() - l_startTime ) * 1000 );
		var l_path = _getPath();
		_info.pathLength = l_path.length;
		return l_path;
	}
	
	private function _sort( p_x:Node, p_y:Node ):Int
	{
		return ( p_x.f > p_y.f ) ? 1 : ( p_x.f < p_y.f ) ? -1 : 0;
	}
	
	private inline function _intAbs( p_value:Int ):Int
	{
		return ( p_value < 0 ) ? -p_value : p_value;
	}

	private inline function _intMin( p_v1:Int, p_v2:Int ):Int
	{
		return ( p_v1 < p_v2 ) ? p_v1 : p_v2;
	}

	/**
	 * A string to interpret the success of the latest path created
	 * @return	Information string
	 */
	public function getInfo():String
	{
		return _isCompleted ? "Success using " + _info.heuristic + ( !_info.isDiagonalEnabled ? " (and diagonals disabled )" : "" ) + " with a path length of " + _info.pathLength + " taking " + _info.timeElapsed + "ms" : "Fail";
	}
}
