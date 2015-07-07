[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENSE) [![Haxelib Version](https://img.shields.io/badge/haxelib-v0.1.5-blue.svg)](http://lib.haxe.org/p/pathfinder)

# Pathfinder
Pathfinder is an A* (A Star) pathfinding and graph traversal library designed primarily for use with [awe6](http://awe6.org) (optional).

This [Haxe](http://haxe.org) library extends [statm's haxe-astar algorithm](https://github.com/statm/haxe-astar) to generate optimised paths on a boolean grid / map using [A* heuristics](https://en.wikipedia.org/wiki/A*_search_algorithm).  Great for NPC navigation in RTS games!

See some [examples](http://hypersurge.github.io/pathfinder/).

## Usage

First set up the map:
```
class Map implements IMap
{	
	public var rows( default, null ):Int;
	public var cols( default, null ):Int;

	public function new( p_cols:Int, p_rows:Int )
	{
		cols = p_cols;
		rows = p_rows;
		// create an array of tiles, and determine if they are walkable or obstructed
	}
	
	public function isWalkable( p_x:Int, p_y:Int ):Bool
	{
		// return true if the corresponding tile is walkable, and false if it obstructed
	}
}
```
Next set up the pathfinder:
```
var l_map = new Map( 30, 30 ); // Create a 30x30 map
var l_pathfinder = new Pathfinder( l_map ); // Create a Pathfinder engine configured for our map
var l_startNode = new Coordinate( 10, 10 ); // 	The starting node
var l_destinationNode = new Coordinate( 20, 20 ); // The destination node
var l_heuristicType = EHeuristic.PRODUCT; // The method of A Star used
var l_isDiagonalEnabled = false; // Set to true to ensure only up, left, down, right movements are allowed

var l_path = l_pathfinder.createPath( l_startNode, l_destinationNode, l_heuristicType, l_isDiagonalEnabled );
for ( i in l_path )
{
	// handle the path - e.g. have an NPC add each coodinate as a waypoint to process
}
```

Please note, for real-world implementations local variables need not be used, they are shown here for ease of explanation.

## Features

The following A Star Heuristics are included:
	
 * Diagonal: pretty & accurate (the allrounder)
 * Product: fast and pretty but might not be shortest (the beauty) - *the default*
 * Euclidian: shortest path but slow (the brainiac)
 * Manhattan: fastest, ugliest, least accurate (the athlete)

A demo suite, to visually illustrate the various heuristics, is available in the [demo folder](https://github.com/hypersurge/pathfinder/tree/master/demo).  The demo uses the awe6 and createjs libraries available on haxelib and can be [seen online here](http://hypersurge.github.io/pathfinder/).

