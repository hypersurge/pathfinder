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

/**
 * @author Statm	https://github.com/statm/haxe-astar
 * @author Robert Fell
 */

class Node extends Coordinate
{
	public var parent:Node;
	public var isWalkable:Bool;
	public var f:Float;
	public var g:Float;

	public function new( p_x:Int, p_y:Int, p_isWalkable:Bool = true )
	{
		isWalkable = p_isWalkable;
		super( p_x, p_y );
	}

	override public function toString():String
	{
		var l_result:String;
		l_result = "[Node(" + x + "," + y + ")";
		if ( parent != null )
		{
			l_result += ", parent=(" + parent.x + "," + parent.y + ")";
		}
		l_result += ", " + ( isWalkable ? "W" : "X" );
		l_result += ", f=" + f;
		l_result += ", g=" + g;
		l_result += "]";
		return l_result;
	}
}
