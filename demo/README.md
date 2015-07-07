# Demo Suite for Pathfinder #

To build load "pathfinder.hxproj" & compile in [FlashDevelop](http://flashdevelop.org) or run the following at a command prompt:

```
haxe -main Main -cp src -cp ..\lib -lib createjs -D awe6DriverRemap --macro awe6.core.Macros.setDriverRemap('awe6.core.drivers.createjs') -resource bin/assets/__config.xml@config -dce full -js bin/game.js
```
