(function (console) { "use strict";
var $hxClasses = {},$estr = function() { return js_Boot.__string_rec(this,''); };
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var EReg = function(r,opt) {
	opt = opt.split("u").join("");
	this.r = new RegExp(r,opt);
};
$hxClasses["EReg"] = EReg;
EReg.__name__ = true;
EReg.prototype = {
	match: function(s) {
		if(this.r.global) this.r.lastIndex = 0;
		this.r.m = this.r.exec(s);
		this.r.s = s;
		return this.r.m != null;
	}
	,matched: function(n) {
		if(this.r.m != null && n >= 0 && n < this.r.m.length) return this.r.m[n]; else throw new js__$Boot_HaxeError("EReg::matched");
	}
	,replace: function(s,by) {
		return s.replace(this.r,by);
	}
	,__class__: EReg
};
var HxOverrides = function() { };
$hxClasses["HxOverrides"] = HxOverrides;
HxOverrides.__name__ = true;
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) return undefined;
	return x;
};
HxOverrides.substr = function(s,pos,len) {
	if(pos != null && pos != 0 && len != null && len < 0) return "";
	if(len == null) len = s.length;
	if(pos < 0) {
		pos = s.length + pos;
		if(pos < 0) pos = 0;
	} else if(len < 0) len = s.length + len - pos;
	return s.substr(pos,len);
};
HxOverrides.indexOf = function(a,obj,i) {
	var len = a.length;
	if(i < 0) {
		i += len;
		if(i < 0) i = 0;
	}
	while(i < len) {
		if(a[i] === obj) return i;
		i++;
	}
	return -1;
};
HxOverrides.remove = function(a,obj) {
	var i = HxOverrides.indexOf(a,obj,0);
	if(i == -1) return false;
	a.splice(i,1);
	return true;
};
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
};
var Lambda = function() { };
$hxClasses["Lambda"] = Lambda;
Lambda.__name__ = true;
Lambda.has = function(it,elt) {
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(x == elt) return true;
	}
	return false;
};
Lambda.exists = function(it,f) {
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(f(x)) return true;
	}
	return false;
};
Lambda.indexOf = function(it,v) {
	var i = 0;
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var v2 = $it0.next();
		if(v == v2) return i;
		i++;
	}
	return -1;
};
var List = function() {
	this.length = 0;
};
$hxClasses["List"] = List;
List.__name__ = true;
List.prototype = {
	add: function(item) {
		var x = [item];
		if(this.h == null) this.h = x; else this.q[1] = x;
		this.q = x;
		this.length++;
	}
	,push: function(item) {
		var x = [item,this.h];
		this.h = x;
		if(this.q == null) this.q = x;
		this.length++;
	}
	,remove: function(v) {
		var prev = null;
		var l = this.h;
		while(l != null) {
			if(l[0] == v) {
				if(prev == null) this.h = l[1]; else prev[1] = l[1];
				if(this.q == l) this.q = prev;
				this.length--;
				return true;
			}
			prev = l;
			l = l[1];
		}
		return false;
	}
	,iterator: function() {
		return new _$List_ListIterator(this.h);
	}
	,__class__: List
};
var _$List_ListIterator = function(head) {
	this.head = head;
	this.val = null;
};
$hxClasses["_List.ListIterator"] = _$List_ListIterator;
_$List_ListIterator.__name__ = true;
_$List_ListIterator.prototype = {
	hasNext: function() {
		return this.head != null;
	}
	,next: function() {
		this.val = this.head[0];
		this.head = this.head[1];
		return this.val;
	}
	,__class__: _$List_ListIterator
};
var Main = function() { };
$hxClasses["Main"] = Main;
Main.__name__ = true;
Main.main = function() {
	var l_isDebug = false;
	var l_stage = new createjs.Stage(window.document.getElementById("gameCanvas"));
	var l_context = new createjs.Container();
	l_stage.addChild(l_context);
	var l_factory = new demo_Factory(l_context,l_isDebug,haxe_Resource.getString("config"));
};
Math.__name__ = true;
var Reflect = function() { };
$hxClasses["Reflect"] = Reflect;
Reflect.__name__ = true;
Reflect.hasField = function(o,field) {
	return Object.prototype.hasOwnProperty.call(o,field);
};
Reflect.field = function(o,field) {
	try {
		return o[field];
	} catch( e ) {
		if (e instanceof js__$Boot_HaxeError) e = e.val;
		return null;
	}
};
Reflect.callMethod = function(o,func,args) {
	return func.apply(o,args);
};
Reflect.isFunction = function(f) {
	return typeof(f) == "function" && !(f.__name__ || f.__ename__);
};
Reflect.compareMethods = function(f1,f2) {
	if(f1 == f2) return true;
	if(!Reflect.isFunction(f1) || !Reflect.isFunction(f2)) return false;
	return f1.scope == f2.scope && f1.method == f2.method && f1.method != null;
};
var Std = function() { };
$hxClasses["Std"] = Std;
Std.__name__ = true;
Std["is"] = function(v,t) {
	return js_Boot.__instanceof(v,t);
};
Std.string = function(s) {
	return js_Boot.__string_rec(s,"");
};
Std["int"] = function(x) {
	return x | 0;
};
Std.parseInt = function(x) {
	var v = parseInt(x,10);
	if(v == 0 && (HxOverrides.cca(x,1) == 120 || HxOverrides.cca(x,1) == 88)) v = parseInt(x);
	if(isNaN(v)) return null;
	return v;
};
Std.parseFloat = function(x) {
	return parseFloat(x);
};
Std.random = function(x) {
	if(x <= 0) return 0; else return Math.floor(Math.random() * x);
};
var StringBuf = function() {
	this.b = "";
};
$hxClasses["StringBuf"] = StringBuf;
StringBuf.__name__ = true;
StringBuf.prototype = {
	add: function(x) {
		this.b += Std.string(x);
	}
	,addSub: function(s,pos,len) {
		if(len == null) this.b += HxOverrides.substr(s,pos,null); else this.b += HxOverrides.substr(s,pos,len);
	}
	,__class__: StringBuf
};
var StringTools = function() { };
$hxClasses["StringTools"] = StringTools;
StringTools.__name__ = true;
StringTools.htmlEscape = function(s,quotes) {
	s = s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
	if(quotes) return s.split("\"").join("&quot;").split("'").join("&#039;"); else return s;
};
StringTools.isSpace = function(s,pos) {
	var c = HxOverrides.cca(s,pos);
	return c > 8 && c < 14 || c == 32;
};
StringTools.ltrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,r)) r++;
	if(r > 0) return HxOverrides.substr(s,r,l - r); else return s;
};
StringTools.rtrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,l - r - 1)) r++;
	if(r > 0) return HxOverrides.substr(s,0,l - r); else return s;
};
StringTools.trim = function(s) {
	return StringTools.ltrim(StringTools.rtrim(s));
};
StringTools.replace = function(s,sub,by) {
	return s.split(sub).join(by);
};
StringTools.hex = function(n,digits) {
	var s = "";
	var hexChars = "0123456789ABCDEF";
	do {
		s = hexChars.charAt(n & 15) + s;
		n >>>= 4;
	} while(n > 0);
	if(digits != null) while(s.length < digits) s = "0" + s;
	return s;
};
StringTools.fastCodeAt = function(s,index) {
	return s.charCodeAt(index);
};
var ValueType = $hxClasses["ValueType"] = { __ename__ : true, __constructs__ : ["TNull","TInt","TFloat","TBool","TObject","TFunction","TClass","TEnum","TUnknown"] };
ValueType.TNull = ["TNull",0];
ValueType.TNull.toString = $estr;
ValueType.TNull.__enum__ = ValueType;
ValueType.TInt = ["TInt",1];
ValueType.TInt.toString = $estr;
ValueType.TInt.__enum__ = ValueType;
ValueType.TFloat = ["TFloat",2];
ValueType.TFloat.toString = $estr;
ValueType.TFloat.__enum__ = ValueType;
ValueType.TBool = ["TBool",3];
ValueType.TBool.toString = $estr;
ValueType.TBool.__enum__ = ValueType;
ValueType.TObject = ["TObject",4];
ValueType.TObject.toString = $estr;
ValueType.TObject.__enum__ = ValueType;
ValueType.TFunction = ["TFunction",5];
ValueType.TFunction.toString = $estr;
ValueType.TFunction.__enum__ = ValueType;
ValueType.TClass = function(c) { var $x = ["TClass",6,c]; $x.__enum__ = ValueType; $x.toString = $estr; return $x; };
ValueType.TEnum = function(e) { var $x = ["TEnum",7,e]; $x.__enum__ = ValueType; $x.toString = $estr; return $x; };
ValueType.TUnknown = ["TUnknown",8];
ValueType.TUnknown.toString = $estr;
ValueType.TUnknown.__enum__ = ValueType;
var Type = function() { };
$hxClasses["Type"] = Type;
Type.__name__ = true;
Type.getEnum = function(o) {
	if(o == null) return null;
	return o.__enum__;
};
Type.resolveClass = function(name) {
	var cl = $hxClasses[name];
	if(cl == null || !cl.__name__) return null;
	return cl;
};
Type.resolveEnum = function(name) {
	var e = $hxClasses[name];
	if(e == null || !e.__ename__) return null;
	return e;
};
Type.createEnum = function(e,constr,params) {
	var f = Reflect.field(e,constr);
	if(f == null) throw new js__$Boot_HaxeError("No such constructor " + constr);
	if(Reflect.isFunction(f)) {
		if(params == null) throw new js__$Boot_HaxeError("Constructor " + constr + " need parameters");
		return Reflect.callMethod(e,f,params);
	}
	if(params != null && params.length != 0) throw new js__$Boot_HaxeError("Constructor " + constr + " does not need parameters");
	return f;
};
Type.getEnumConstructs = function(e) {
	var a = e.__constructs__;
	return a.slice();
};
Type["typeof"] = function(v) {
	var _g = typeof(v);
	switch(_g) {
	case "boolean":
		return ValueType.TBool;
	case "string":
		return ValueType.TClass(String);
	case "number":
		if(Math.ceil(v) == v % 2147483648.0) return ValueType.TInt;
		return ValueType.TFloat;
	case "object":
		if(v == null) return ValueType.TNull;
		var e = v.__enum__;
		if(e != null) return ValueType.TEnum(e);
		var c = js_Boot.getClass(v);
		if(c != null) return ValueType.TClass(c);
		return ValueType.TObject;
	case "function":
		if(v.__name__ || v.__ename__) return ValueType.TObject;
		return ValueType.TFunction;
	case "undefined":
		return ValueType.TNull;
	default:
		return ValueType.TUnknown;
	}
};
Type.enumEq = function(a,b) {
	if(a == b) return true;
	try {
		if(a[0] != b[0]) return false;
		var _g1 = 2;
		var _g = a.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(!Type.enumEq(a[i],b[i])) return false;
		}
		var e = a.__enum__;
		if(e != b.__enum__ || e == null) return false;
	} catch( e1 ) {
		if (e1 instanceof js__$Boot_HaxeError) e1 = e1.val;
		return false;
	}
	return true;
};
Type.enumConstructor = function(e) {
	return e[0];
};
var Xml = function(nodeType) {
	this.nodeType = nodeType;
	this.children = [];
	this.attributeMap = new haxe_ds_StringMap();
};
$hxClasses["Xml"] = Xml;
Xml.__name__ = true;
Xml.parse = function(str) {
	return haxe_xml_Parser.parse(str);
};
Xml.createElement = function(name) {
	var xml = new Xml(Xml.Element);
	if(xml.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element but found " + xml.nodeType);
	xml.nodeName = name;
	return xml;
};
Xml.createPCData = function(data) {
	var xml = new Xml(Xml.PCData);
	if(xml.nodeType == Xml.Document || xml.nodeType == Xml.Element) throw new js__$Boot_HaxeError("Bad node type, unexpected " + xml.nodeType);
	xml.nodeValue = data;
	return xml;
};
Xml.createCData = function(data) {
	var xml = new Xml(Xml.CData);
	if(xml.nodeType == Xml.Document || xml.nodeType == Xml.Element) throw new js__$Boot_HaxeError("Bad node type, unexpected " + xml.nodeType);
	xml.nodeValue = data;
	return xml;
};
Xml.createComment = function(data) {
	var xml = new Xml(Xml.Comment);
	if(xml.nodeType == Xml.Document || xml.nodeType == Xml.Element) throw new js__$Boot_HaxeError("Bad node type, unexpected " + xml.nodeType);
	xml.nodeValue = data;
	return xml;
};
Xml.createDocType = function(data) {
	var xml = new Xml(Xml.DocType);
	if(xml.nodeType == Xml.Document || xml.nodeType == Xml.Element) throw new js__$Boot_HaxeError("Bad node type, unexpected " + xml.nodeType);
	xml.nodeValue = data;
	return xml;
};
Xml.createProcessingInstruction = function(data) {
	var xml = new Xml(Xml.ProcessingInstruction);
	if(xml.nodeType == Xml.Document || xml.nodeType == Xml.Element) throw new js__$Boot_HaxeError("Bad node type, unexpected " + xml.nodeType);
	xml.nodeValue = data;
	return xml;
};
Xml.createDocument = function() {
	return new Xml(Xml.Document);
};
Xml.prototype = {
	get_nodeValue: function() {
		if(this.nodeType == Xml.Document || this.nodeType == Xml.Element) throw new js__$Boot_HaxeError("Bad node type, unexpected " + this.nodeType);
		return this.nodeValue;
	}
	,set_nodeValue: function(v) {
		if(this.nodeType == Xml.Document || this.nodeType == Xml.Element) throw new js__$Boot_HaxeError("Bad node type, unexpected " + this.nodeType);
		return this.nodeValue = v;
	}
	,get: function(att) {
		if(this.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element but found " + this.nodeType);
		return this.attributeMap.get(att);
	}
	,set: function(att,value) {
		if(this.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element but found " + this.nodeType);
		this.attributeMap.set(att,value);
	}
	,exists: function(att) {
		if(this.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element but found " + this.nodeType);
		return this.attributeMap.exists(att);
	}
	,attributes: function() {
		if(this.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element but found " + this.nodeType);
		return this.attributeMap.keys();
	}
	,elements: function() {
		if(this.nodeType != Xml.Document && this.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element or Document but found " + this.nodeType);
		var ret;
		var _g = [];
		var _g1 = 0;
		var _g2 = this.children;
		while(_g1 < _g2.length) {
			var child = _g2[_g1];
			++_g1;
			if(child.nodeType == Xml.Element) _g.push(child);
		}
		ret = _g;
		return HxOverrides.iter(ret);
	}
	,firstElement: function() {
		if(this.nodeType != Xml.Document && this.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element or Document but found " + this.nodeType);
		var _g = 0;
		var _g1 = this.children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			if(child.nodeType == Xml.Element) return child;
		}
		return null;
	}
	,addChild: function(x) {
		if(this.nodeType != Xml.Document && this.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element or Document but found " + this.nodeType);
		if(x.parent != null) x.parent.removeChild(x);
		this.children.push(x);
		x.parent = this;
	}
	,removeChild: function(x) {
		if(this.nodeType != Xml.Document && this.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element or Document but found " + this.nodeType);
		if(HxOverrides.remove(this.children,x)) {
			x.parent = null;
			return true;
		}
		return false;
	}
	,toString: function() {
		return haxe_xml_Printer.print(this);
	}
	,__class__: Xml
};
var awe6_interfaces_IPauseable = function() { };
$hxClasses["awe6.interfaces.IPauseable"] = awe6_interfaces_IPauseable;
awe6_interfaces_IPauseable.__name__ = true;
awe6_interfaces_IPauseable.prototype = {
	__class__: awe6_interfaces_IPauseable
};
var awe6_interfaces_IDisposable = function() { };
$hxClasses["awe6.interfaces.IDisposable"] = awe6_interfaces_IDisposable;
awe6_interfaces_IDisposable.__name__ = true;
awe6_interfaces_IDisposable.prototype = {
	__class__: awe6_interfaces_IDisposable
};
var awe6_interfaces_IUpdateable = function() { };
$hxClasses["awe6.interfaces.IUpdateable"] = awe6_interfaces_IUpdateable;
awe6_interfaces_IUpdateable.__name__ = true;
awe6_interfaces_IUpdateable.prototype = {
	__class__: awe6_interfaces_IUpdateable
};
var awe6_interfaces_IProcess = function() { };
$hxClasses["awe6.interfaces.IProcess"] = awe6_interfaces_IProcess;
awe6_interfaces_IProcess.__name__ = true;
awe6_interfaces_IProcess.__interfaces__ = [awe6_interfaces_IPauseable,awe6_interfaces_IDisposable,awe6_interfaces_IUpdateable];
var awe6_core_Process = function(p_kernel) {
	this._kernel = p_kernel;
	this._tools = this._kernel.tools;
	this._isEntity = js_Boot.__instanceof(this,awe6_interfaces_IEntity);
	this._init();
};
$hxClasses["awe6.core.Process"] = awe6_core_Process;
awe6_core_Process.__name__ = true;
awe6_core_Process.__interfaces__ = [awe6_interfaces_IProcess];
awe6_core_Process.prototype = {
	_init: function() {
		this._isIsActiveSetterBypassed = true;
		this.set_isActive(true);
		this.isDisposed = false;
		this._age = 0;
		this._updates = 0;
	}
	,dispose: function() {
		if(this.isDisposed) return; else {
			this.isDisposed = true;
			this.set_isActive(false);
			this._disposer();
			return;
		}
	}
	,_disposer: function() {
	}
	,update: function(p_deltaTime) {
		if(p_deltaTime == null) p_deltaTime = 0;
		if(!this.isActive || this.isDisposed) return; else {
			this._age += p_deltaTime;
			this._updates++;
			this._updater(p_deltaTime);
			return;
		}
	}
	,_updater: function(p_deltaTime) {
		if(p_deltaTime == null) p_deltaTime = 0;
	}
	,set_isActive: function(p_value) {
		if(this.isDisposed) {
			this.isActive = false;
			return false;
		}
		if(p_value != this.isActive) {
			if(this._isIsActiveSetterBypassed) this.isActive = p_value; else if(p_value) {
				if(this.isActive || this.isDisposed) null; else {
					this._resumer();
					this._isIsActiveSetterBypassed = true;
					this.set_isActive(true);
					if(this._isEntity) this._kernel.messenger.sendMessage(awe6_interfaces_EMessage.RESUME,this,true,true,true);
					null;
				}
			} else if(!this.isActive || this.isDisposed) null; else {
				this._pauser();
				this._isIsActiveSetterBypassed = true;
				this.set_isActive(false);
				if(this._isEntity) this._kernel.messenger.sendMessage(awe6_interfaces_EMessage.PAUSE,this,true,true,true);
			}
		}
		this._isIsActiveSetterBypassed = false;
		return this.isActive;
	}
	,pause: function() {
		if(!this.isActive || this.isDisposed) return; else {
			this._pauser();
			this._isIsActiveSetterBypassed = true;
			this.set_isActive(false);
			if(this._isEntity) this._kernel.messenger.sendMessage(awe6_interfaces_EMessage.PAUSE,this,true,true,true);
		}
	}
	,_pauser: function() {
	}
	,resume: function() {
		if(this.isActive || this.isDisposed) return; else {
			this._resumer();
			this._isIsActiveSetterBypassed = true;
			this.set_isActive(true);
			if(this._isEntity) this._kernel.messenger.sendMessage(awe6_interfaces_EMessage.RESUME,this,true,true,true);
			return;
		}
	}
	,_resumer: function() {
	}
	,__class__: awe6_core_Process
};
var awe6_interfaces_IAssetManager = function() { };
$hxClasses["awe6.interfaces.IAssetManager"] = awe6_interfaces_IAssetManager;
awe6_interfaces_IAssetManager.__name__ = true;
var awe6_interfaces_IAssetManagerProcess = function() { };
$hxClasses["awe6.interfaces.IAssetManagerProcess"] = awe6_interfaces_IAssetManagerProcess;
awe6_interfaces_IAssetManagerProcess.__name__ = true;
awe6_interfaces_IAssetManagerProcess.__interfaces__ = [awe6_interfaces_IProcess,awe6_interfaces_IAssetManager];
var awe6_core_AAssetManager = function(p_kernel) {
	awe6_core_Process.call(this,p_kernel);
};
$hxClasses["awe6.core.AAssetManager"] = awe6_core_AAssetManager;
awe6_core_AAssetManager.__name__ = true;
awe6_core_AAssetManager.__interfaces__ = [awe6_interfaces_IAssetManagerProcess];
awe6_core_AAssetManager.__super__ = awe6_core_Process;
awe6_core_AAssetManager.prototype = $extend(awe6_core_Process.prototype,{
	_init: function() {
		this._PACKAGE_ID = "assets";
		awe6_core_Process.prototype._init.call(this);
	}
	,__class__: awe6_core_AAssetManager
});
var awe6_interfaces_IAgendaManager = function() { };
$hxClasses["awe6.interfaces.IAgendaManager"] = awe6_interfaces_IAgendaManager;
awe6_interfaces_IAgendaManager.__name__ = true;
var awe6_interfaces_IEntityCollection = function() { };
$hxClasses["awe6.interfaces.IEntityCollection"] = awe6_interfaces_IEntityCollection;
awe6_interfaces_IEntityCollection.__name__ = true;
awe6_interfaces_IEntityCollection.__interfaces__ = [awe6_interfaces_IAgendaManager];
awe6_interfaces_IEntityCollection.prototype = {
	__class__: awe6_interfaces_IEntityCollection
};
var awe6_interfaces_IViewable = function() { };
$hxClasses["awe6.interfaces.IViewable"] = awe6_interfaces_IViewable;
awe6_interfaces_IViewable.__name__ = true;
awe6_interfaces_IViewable.prototype = {
	__class__: awe6_interfaces_IViewable
};
var awe6_interfaces_IEntity = function() { };
$hxClasses["awe6.interfaces.IEntity"] = awe6_interfaces_IEntity;
awe6_interfaces_IEntity.__name__ = true;
awe6_interfaces_IEntity.__interfaces__ = [awe6_interfaces_IEntityCollection,awe6_interfaces_IViewable,awe6_interfaces_IProcess];
awe6_interfaces_IEntity.prototype = {
	__class__: awe6_interfaces_IEntity
};
var awe6_core_Entity = function(p_kernel,p_id,p_context) {
	if(this.get_view() == null) this.view = new awe6_core_drivers_createjs_View(p_kernel,p_context,0,this);
	this.set_id(p_id == null?p_kernel.tools.createGuid():p_id);
	awe6_core_Process.call(this,p_kernel);
};
$hxClasses["awe6.core.Entity"] = awe6_core_Entity;
awe6_core_Entity.__name__ = true;
awe6_core_Entity.__interfaces__ = [awe6_interfaces_IEntity];
awe6_core_Entity.__super__ = awe6_core_Process;
awe6_core_Entity.prototype = $extend(awe6_core_Process.prototype,{
	_init: function() {
		awe6_core_Process.prototype._init.call(this);
		this.agenda = awe6_interfaces_EAgenda.ALWAYS;
		this._entityAgendaPairs = new haxe_ds_GenericStack();
		this._isAgendaDirty = true;
		this._cachedEntities = [];
	}
	,_updater: function(p_deltaTime) {
		if(p_deltaTime == null) p_deltaTime = 0;
		awe6_core_Process.prototype._updater.call(this,p_deltaTime);
		if(this._isAgendaDirty) {
			this._cachedEntities = this._getEntities(this.get_agenda());
			if(!Type.enumEq(this.get_agenda(),awe6_interfaces_EAgenda.ALWAYS)) this._cachedEntities = this._cachedEntities.concat(this._getEntities(awe6_interfaces_EAgenda.ALWAYS));
			this._isAgendaDirty = false;
		}
		var _g = 0;
		var _g1 = this._cachedEntities;
		while(_g < _g1.length) {
			var i = _g1[_g];
			++_g;
			i.update(p_deltaTime);
		}
	}
	,_disposer: function() {
		this.remove();
		this._kernel.messenger.removeSubscribers(this);
		this._kernel.messenger.removeSubscribers(null,null,null,this,null);
		var l_entities = this._getEntities();
		l_entities.reverse();
		var _g = 0;
		while(_g < l_entities.length) {
			var i = l_entities[_g];
			++_g;
			i.dispose();
		}
		var $it0 = this._entityAgendaPairs.iterator();
		while( $it0.hasNext() ) {
			var i1 = $it0.next();
			this._entityAgendaPairs.remove(i1);
		}
		this.get_view().dispose();
		awe6_core_Process.prototype._disposer.call(this);
	}
	,addEntity: function(p_entity,p_agenda,p_isAddedToView,p_viewPriority) {
		if(p_viewPriority == null) p_viewPriority = 0;
		if(p_isAddedToView == null) p_isAddedToView = false;
		if(this.isDisposed || p_entity == null) return null;
		if(p_agenda == null) p_agenda = awe6_interfaces_EAgenda.ALWAYS;
		var $it0 = this._entityAgendaPairs.iterator();
		while( $it0.hasNext() ) {
			var i = $it0.next();
			if(i.entity == p_entity && Type.enumEq(i.agenda,p_agenda)) return p_entity;
		}
		this._isAgendaDirty = true;
		if(p_entity.get_parent() != this) {
			p_entity.remove(p_isAddedToView);
			if(js_Boot.__instanceof(p_entity,awe6_core_Entity)) {
				var l_child = p_entity;
				l_child._setParent(this);
			}
		}
		var l_helperEntityAgendaPair = new awe6_core__$Entity__$HelperEntityAgendaPair(p_entity,p_agenda);
		this._entityAgendaPairs.add(l_helperEntityAgendaPair);
		if(p_isAddedToView) {
			if(Type.enumEq(p_agenda,this.get_agenda()) || p_agenda == awe6_interfaces_EAgenda.ALWAYS) this.get_view().addChild(p_entity.get_view(),p_viewPriority); else {
				p_entity.get_view().set_priority(p_viewPriority);
				l_helperEntityAgendaPair.isAddedToView = true;
			}
		}
		return p_entity;
	}
	,removeEntity: function(p_entity,p_agenda,p_isRemovedFromView) {
		if(p_isRemovedFromView == null) p_isRemovedFromView = false;
		if(this.isDisposed || p_entity == null) return;
		var l_isRemoved = false;
		var $it0 = this._entityAgendaPairs.iterator();
		while( $it0.hasNext() ) {
			var i = $it0.next();
			if(i.entity == p_entity && (p_agenda == null || Type.enumEq(i.agenda,p_agenda))) {
				this._entityAgendaPairs.remove(i);
				l_isRemoved = true;
			}
		}
		if(l_isRemoved) {
			this._isAgendaDirty = true;
			if(js_Boot.__instanceof(p_entity,awe6_core_Entity)) {
				var l_child = p_entity;
				l_child._setParent(null);
			}
			if(p_isRemovedFromView) p_entity.get_view().remove();
		}
	}
	,remove: function(p_isRemovedFromView) {
		if(p_isRemovedFromView == null) p_isRemovedFromView = false;
		if(this.get_parent() != null) this.get_parent().removeEntity(this,null,p_isRemovedFromView);
	}
	,getEntities: function(p_agenda) {
		return this._getEntities(p_agenda);
	}
	,_getEntities: function(p_agenda) {
		if(!this._isAgendaDirty && (p_agenda == null || Type.enumEq(p_agenda,this.get_agenda()))) return this._cachedEntities;
		var l_result = [];
		var $it0 = this._entityAgendaPairs.iterator();
		while( $it0.hasNext() ) {
			var i = $it0.next();
			if(p_agenda == null || Type.enumEq(p_agenda,i.agenda)) l_result.push(i.entity);
		}
		l_result.reverse();
		return l_result;
	}
	,setAgenda: function(p_type) {
		if(p_type == null) p_type = awe6_interfaces_EAgenda.ALWAYS;
		if(Type.enumEq(this.get_agenda(),p_type)) return false;
		this._isAgendaDirty = true;
		var $it0 = this._entityAgendaPairs.iterator();
		while( $it0.hasNext() ) {
			var i = $it0.next();
			var l_isAddedToView = Type.enumEq(this.get_agenda(),i.agenda) && i.entity.get_view().get_parent() == this.get_view();
			if(l_isAddedToView) i.entity.get_view().remove();
			i.isAddedToView = i.isAddedToView || l_isAddedToView;
		}
		this.agenda = p_type;
		var $it1 = this._entityAgendaPairs.iterator();
		while( $it1.hasNext() ) {
			var i1 = $it1.next();
			if(i1.isAddedToView && (Type.enumEq(awe6_interfaces_EAgenda.ALWAYS,i1.agenda) || Type.enumEq(this.get_agenda(),i1.agenda))) this.get_view().addChild(i1.entity.get_view());
		}
		return true;
	}
	,_setParent: function(p_parent) {
		this.parent = p_parent;
	}
	,set_id: function(p_value) {
		this.id = p_value;
		return this.id;
	}
	,get_agenda: function() {
		return this.agenda;
	}
	,get_parent: function() {
		return this.parent;
	}
	,get_view: function() {
		return this.view;
	}
	,__class__: awe6_core_Entity
});
var awe6_interfaces_IPositionable = function() { };
$hxClasses["awe6.interfaces.IPositionable"] = awe6_interfaces_IPositionable;
awe6_interfaces_IPositionable.__name__ = true;
awe6_interfaces_IPositionable.prototype = {
	__class__: awe6_interfaces_IPositionable
};
var awe6_core_BasicButton = function(p_kernel,p_up,p_over,p_width,p_height,p_x,p_y,p_keyType,p_onClickCallback,p_onRollOverCallback,p_onRollOutCallback) {
	if(p_y == null) p_y = 0;
	if(p_x == null) p_x = 0;
	if(p_height == null) p_height = 20;
	if(p_width == null) p_width = 100;
	this._stateUp = new awe6_core__$BasicButton__$HelperState(p_kernel,p_up);
	this._stateOver = new awe6_core__$BasicButton__$HelperState(p_kernel,p_over);
	this.x = p_x;
	this.y = p_y;
	this.set_width(p_width);
	this.set_height(p_height);
	this._keyType = p_keyType;
	this.onClickCallback = p_onClickCallback;
	this.onRollOverCallback = p_onRollOverCallback;
	this.onRollOutCallback = p_onRollOutCallback;
	awe6_core_Entity.call(this,p_kernel);
};
$hxClasses["awe6.core.BasicButton"] = awe6_core_BasicButton;
awe6_core_BasicButton.__name__ = true;
awe6_core_BasicButton.__interfaces__ = [awe6_interfaces_IPositionable];
awe6_core_BasicButton.__super__ = awe6_core_Entity;
awe6_core_BasicButton.prototype = $extend(awe6_core_Entity.prototype,{
	_init: function() {
		awe6_core_Entity.prototype._init.call(this);
		this.get_view().set_x(this.x);
		this.get_view().set_y(this.y);
		this.isOver = false;
		this.addEntity(this._stateUp,awe6_interfaces_EAgenda.SUB_TYPE(awe6_core__$BasicButton__$HelperEState.UP),true);
		this.addEntity(this._stateOver,awe6_interfaces_EAgenda.SUB_TYPE(awe6_core__$BasicButton__$HelperEState.OVER),true);
		this.setAgenda(awe6_interfaces_EAgenda.SUB_TYPE(awe6_core__$BasicButton__$HelperEState.UP));
	}
	,_updater: function(p_deltaTime) {
		if(p_deltaTime == null) p_deltaTime = 0;
		awe6_core_Entity.prototype._updater.call(this,p_deltaTime);
		var l_inputMouse = this._kernel.inputs.mouse;
		var l_isOver = this._isPointInsideRectangle(l_inputMouse.x + this.get_view().x - this.get_view().globalX,l_inputMouse.y + this.get_view().y - this.get_view().globalY,this.x,this.y,this.width,this.height);
		if(l_isOver) l_inputMouse.set_cursorType(awe6_interfaces_EMouseCursor.BUTTON);
		if(l_isOver && !this.isOver) this.onRollOver();
		if(!l_isOver && this.isOver) {
			l_inputMouse.set_cursorType(awe6_interfaces_EMouseCursor.AUTO);
			this.onRollOut();
		}
		this.isOver = l_isOver;
		if(this.isOver && l_inputMouse.getIsButtonDown()) this.setAgenda(awe6_interfaces_EAgenda.SUB_TYPE(awe6_core__$BasicButton__$HelperEState.OVER));
		if(this.isOver && l_inputMouse.getIsButtonRelease()) this.onClick();
		if(this._keyType != null && this._kernel.inputs.keyboard.getIsKeyRelease(this._keyType)) this.onClick();
	}
	,_isPointInsideRectangle: function(p_pointX,p_pointY,p_rectX,p_rectY,p_rectWidth,p_rectHeight) {
		if(p_pointX < p_rectX) return false;
		if(p_pointY < p_rectY) return false;
		if(p_pointX > p_rectX + p_rectWidth) return false;
		if(p_pointY > p_rectY + p_rectHeight) return false;
		return true;
	}
	,onClick: function() {
		this.setAgenda(awe6_interfaces_EAgenda.SUB_TYPE(awe6_core__$BasicButton__$HelperEState.UP));
		if(this.onClickCallback == null) return;
		this.onClickCallback.apply(this,[]);
	}
	,onRollOver: function() {
		this.setAgenda(awe6_interfaces_EAgenda.SUB_TYPE(awe6_core__$BasicButton__$HelperEState.OVER));
		if(this.onRollOverCallback == null) return;
		this.onRollOverCallback.apply(this,[]);
	}
	,onRollOut: function() {
		this.setAgenda(awe6_interfaces_EAgenda.SUB_TYPE(awe6_core__$BasicButton__$HelperEState.UP));
		if(this.onRollOutCallback == null) return;
		this.onRollOutCallback.apply(this,[]);
	}
	,set_x: function(p_value) {
		this.x = p_value;
		if(this.get_view() != null) this.get_view().set_x(this.x);
		return this.x;
	}
	,set_y: function(p_value) {
		this.y = p_value;
		if(this.get_view() != null) this.get_view().set_y(this.y);
		return this.y;
	}
	,set_width: function(p_value) {
		this.width = p_value;
		return this.width;
	}
	,set_height: function(p_value) {
		this.height = p_value;
		return this.height;
	}
	,__class__: awe6_core_BasicButton
});
var awe6_core__$BasicButton__$HelperState = function(p_kernel,p_view) {
	awe6_core_Entity.call(this,p_kernel);
	this.view = p_view;
};
$hxClasses["awe6.core._BasicButton._HelperState"] = awe6_core__$BasicButton__$HelperState;
awe6_core__$BasicButton__$HelperState.__name__ = true;
awe6_core__$BasicButton__$HelperState.__super__ = awe6_core_Entity;
awe6_core__$BasicButton__$HelperState.prototype = $extend(awe6_core_Entity.prototype,{
	__class__: awe6_core__$BasicButton__$HelperState
});
var awe6_core__$BasicButton__$HelperEState = $hxClasses["awe6.core._BasicButton._HelperEState"] = { __ename__ : true, __constructs__ : ["UP","OVER"] };
awe6_core__$BasicButton__$HelperEState.UP = ["UP",0];
awe6_core__$BasicButton__$HelperEState.UP.toString = $estr;
awe6_core__$BasicButton__$HelperEState.UP.__enum__ = awe6_core__$BasicButton__$HelperEState;
awe6_core__$BasicButton__$HelperEState.OVER = ["OVER",1];
awe6_core__$BasicButton__$HelperEState.OVER.toString = $estr;
awe6_core__$BasicButton__$HelperEState.OVER.__enum__ = awe6_core__$BasicButton__$HelperEState;
var awe6_interfaces_IEncrypter = function() { };
$hxClasses["awe6.interfaces.IEncrypter"] = awe6_interfaces_IEncrypter;
awe6_interfaces_IEncrypter.__name__ = true;
awe6_interfaces_IEncrypter.prototype = {
	__class__: awe6_interfaces_IEncrypter
};
var awe6_core_Encrypter = function(p_defaultSecret) {
	this._defaultSecret = p_defaultSecret;
};
$hxClasses["awe6.core.Encrypter"] = awe6_core_Encrypter;
awe6_core_Encrypter.__name__ = true;
awe6_core_Encrypter.__interfaces__ = [awe6_interfaces_IEncrypter];
awe6_core_Encrypter.prototype = {
	decrypt: function(p_value,p_secret) {
		if(p_secret == null) p_secret = "";
		var l_secret;
		if(p_secret != "") l_secret = p_secret; else l_secret = this._defaultSecret;
		return this._xor(p_value,l_secret);
	}
	,_xor: function(p_value,p_secret) {
		var l_result = haxe_io_Bytes.alloc(p_value.length);
		var l_secretIndex = 0;
		var _g1 = 0;
		var _g = l_result.length;
		while(_g1 < _g) {
			var i = _g1++;
			l_result.set(i,p_value.b[i] ^ HxOverrides.cca(p_secret,l_secretIndex));
			l_secretIndex++;
			if(l_secretIndex >= p_secret.length) l_secretIndex = 0;
		}
		return l_result;
	}
	,__class__: awe6_core_Encrypter
};
var awe6_core__$Entity__$HelperEntityAgendaPair = function(p_entity,p_agenda) {
	this.entity = p_entity;
	this.agenda = p_agenda;
	this.isAddedToView = false;
};
$hxClasses["awe6.core._Entity._HelperEntityAgendaPair"] = awe6_core__$Entity__$HelperEntityAgendaPair;
awe6_core__$Entity__$HelperEntityAgendaPair.__name__ = true;
awe6_core__$Entity__$HelperEntityAgendaPair.prototype = {
	__class__: awe6_core__$Entity__$HelperEntityAgendaPair
};
var awe6_interfaces_IInputJoypad = function() { };
$hxClasses["awe6.interfaces.IInputJoypad"] = awe6_interfaces_IInputJoypad;
awe6_interfaces_IInputJoypad.__name__ = true;
var awe6_core_InputJoypad = function(p_kernel,p_up,p_right,p_down,p_left,p_primary,p_secondary,p_upAlt,p_rightAlt,p_downAlt,p_leftAlt,p_primaryAlt,p_secondaryAlt,p_joypadTouchType) {
	this._kernel = p_kernel;
	if(p_up != null) this._keyUp = p_up; else this._keyUp = awe6_interfaces_EKey.UP;
	if(p_right != null) this._keyRight = p_right; else this._keyRight = awe6_interfaces_EKey.RIGHT;
	if(p_down != null) this._keyDown = p_down; else this._keyDown = awe6_interfaces_EKey.DOWN;
	if(p_left != null) this._keyLeft = p_left; else this._keyLeft = awe6_interfaces_EKey.LEFT;
	if(p_primary != null) this._keyPrimary = p_primary; else this._keyPrimary = awe6_interfaces_EKey.SPACE;
	if(p_secondary != null) this._keySecondary = p_secondary; else this._keySecondary = awe6_interfaces_EKey.Z;
	if(p_upAlt != null) this._keyUpAlt = p_upAlt; else this._keyUpAlt = awe6_interfaces_EKey.W;
	if(p_rightAlt != null) this._keyRightAlt = p_rightAlt; else this._keyRightAlt = awe6_interfaces_EKey.D;
	if(p_downAlt != null) this._keyDownAlt = p_downAlt; else this._keyDownAlt = awe6_interfaces_EKey.S;
	if(p_leftAlt != null) this._keyLeftAlt = p_leftAlt; else this._keyLeftAlt = awe6_interfaces_EKey.A;
	if(p_primaryAlt != null) this._keyPrimaryAlt = p_primaryAlt; else this._keyPrimaryAlt = awe6_interfaces_EKey.Q;
	if(p_secondaryAlt != null) this._keySecondaryAlt = p_secondaryAlt; else this._keySecondaryAlt = awe6_interfaces_EKey.E;
	if(p_joypadTouchType != null) this._joypadTouchType = p_joypadTouchType; else this._joypadTouchType = this._kernel.factory.joypadTouchType;
	this._isTouchEnabled = this._kernel.factory.joypadTouchType != awe6_interfaces_EJoypadTouch.DISABLED;
	this._joypadStateCache = { age : 0, isFire : false, isUp : false, isRight : false, isDown : false, isLeft : false, isPrevFire : false, isPrevUp : false, isPrevRight : false, isPrevDown : false, isPrevLeft : false};
};
$hxClasses["awe6.core.InputJoypad"] = awe6_core_InputJoypad;
awe6_core_InputJoypad.__name__ = true;
awe6_core_InputJoypad.__interfaces__ = [awe6_interfaces_IInputJoypad];
awe6_core_InputJoypad.prototype = {
	__class__: awe6_core_InputJoypad
};
var awe6_interfaces_IResettable = function() { };
$hxClasses["awe6.interfaces.IResettable"] = awe6_interfaces_IResettable;
awe6_interfaces_IResettable.__name__ = true;
awe6_interfaces_IResettable.prototype = {
	__class__: awe6_interfaces_IResettable
};
var awe6_interfaces_IInputManager = function() { };
$hxClasses["awe6.interfaces.IInputManager"] = awe6_interfaces_IInputManager;
awe6_interfaces_IInputManager.__name__ = true;
awe6_interfaces_IInputManager.__interfaces__ = [awe6_interfaces_IResettable];
awe6_interfaces_IInputManager.prototype = {
	__class__: awe6_interfaces_IInputManager
};
var awe6_core_InputManager = function(p_kernel) {
	awe6_core_Process.call(this,p_kernel);
};
$hxClasses["awe6.core.InputManager"] = awe6_core_InputManager;
awe6_core_InputManager.__name__ = true;
awe6_core_InputManager.__interfaces__ = [awe6_interfaces_IInputManager];
awe6_core_InputManager.__super__ = awe6_core_Process;
awe6_core_InputManager.prototype = $extend(awe6_core_Process.prototype,{
	_init: function() {
		awe6_core_Process.prototype._init.call(this);
		this.joypad = this.createJoypad();
		this.keyboard = this._inputKeyboard = new awe6_core_drivers_createjs_InputKeyboard(this._kernel);
		this.mouse = this._inputMouse = new awe6_core_drivers_createjs_InputMouse(this._kernel);
	}
	,_updater: function(p_deltaTime) {
		if(p_deltaTime == null) p_deltaTime = 0;
		awe6_core_Process.prototype._updater.call(this,p_deltaTime);
		this._inputKeyboard.update(p_deltaTime);
		this._inputMouse.update(p_deltaTime);
	}
	,_disposer: function() {
		this._inputKeyboard.dispose();
		this._inputMouse.dispose();
		awe6_core_Process.prototype._disposer.call(this);
	}
	,createJoypad: function(p_up,p_right,p_down,p_left,p_primary,p_secondary,p_upAlt,p_rightAlt,p_downAlt,p_leftAlt,p_primaryAlt,p_secondaryAlt,p_joypadTouchType) {
		return new awe6_core_InputJoypad(this._kernel,p_up,p_right,p_down,p_left,p_primary,p_secondary,p_upAlt,p_rightAlt,p_downAlt,p_leftAlt,p_primaryAlt,p_secondaryAlt,p_joypadTouchType);
	}
	,reset: function() {
		this._inputKeyboard.dispose();
		this._inputMouse.dispose();
		this._init();
		return true;
	}
	,__class__: awe6_core_InputManager
});
var awe6_interfaces_IMessageManager = function() { };
$hxClasses["awe6.interfaces.IMessageManager"] = awe6_interfaces_IMessageManager;
awe6_interfaces_IMessageManager.__name__ = true;
awe6_interfaces_IMessageManager.__interfaces__ = [awe6_interfaces_IResettable];
awe6_interfaces_IMessageManager.prototype = {
	__class__: awe6_interfaces_IMessageManager
};
var awe6_core_MessageManager = function(p_kernel) {
	awe6_core_Process.call(this,p_kernel);
};
$hxClasses["awe6.core.MessageManager"] = awe6_core_MessageManager;
awe6_core_MessageManager.__name__ = true;
awe6_core_MessageManager.__interfaces__ = [awe6_interfaces_IMessageManager];
awe6_core_MessageManager.__super__ = awe6_core_Process;
awe6_core_MessageManager.prototype = $extend(awe6_core_Process.prototype,{
	_init: function() {
		awe6_core_Process.prototype._init.call(this);
		this._isVerbose = false;
		this._subscriptions = new haxe_ds_GenericStack();
		this._messageQueue = new List();
	}
	,removeSubscribers: function(p_subscriber,p_message,p_handler,p_sender,p_senderClassType) {
		var l_subscriptions = this._getSubscriptions(p_subscriber,p_message,p_handler,p_sender,p_senderClassType,true);
		var $it0 = l_subscriptions.iterator();
		while( $it0.hasNext() ) {
			var i = $it0.next();
			this._subscriptions.remove(i);
			if(this._isVerbose) haxe_Log.trace("Removing " + Std.string(i.sender) + ":" + Std.string(i.message),{ fileName : "MessageManager.hx", lineNumber : 80, className : "awe6.core.MessageManager", methodName : "removeSubscribers"});
		}
	}
	,sendMessage: function(p_message,p_sender,p_isBubbleDown,p_isBubbleUp,p_isBubbleEverywhere) {
		if(p_isBubbleEverywhere == null) p_isBubbleEverywhere = false;
		if(p_isBubbleUp == null) p_isBubbleUp = false;
		if(p_isBubbleDown == null) p_isBubbleDown = false;
		this._sendMessage(p_message,p_sender,p_sender,p_isBubbleDown,p_isBubbleUp,p_isBubbleEverywhere);
	}
	,reset: function() {
		this.removeSubscribers();
		this._messageQueue = new List();
		return true;
	}
	,_updater: function(p_deltaTime) {
		if(p_deltaTime == null) p_deltaTime = 0;
		awe6_core_Process.prototype._updater.call(this,p_deltaTime);
		if(this._isOkToSendMessage()) {
			var _g_head = this._messageQueue.h;
			var _g_val = null;
			while(_g_head != null) {
				var i;
				i = (function($this) {
					var $r;
					_g_val = _g_head[0];
					_g_head = _g_head[1];
					$r = _g_val;
					return $r;
				}(this));
				this._sendMessage(i.message,i.sender,i.target,i.isBubbleDown,i.isBubbleUp,i.isBubbleEverywhere);
				this._messageQueue.remove(i);
			}
		}
	}
	,_isOkToSendMessage: function() {
		return this._kernel.scenes.get_scene() != null;
	}
	,_sendMessage: function(p_message,p_sender,p_target,p_isBubbleDown,p_isBubbleUp,p_isBubbleEverywhere) {
		if(p_isBubbleEverywhere == null) p_isBubbleEverywhere = false;
		if(p_isBubbleUp == null) p_isBubbleUp = false;
		if(p_isBubbleDown == null) p_isBubbleDown = false;
		if(this._isVerbose) haxe_Log.trace("Sending message: " + Std.string(p_message) + " from " + p_sender.id + "(" + Std.string(p_sender == null?null:js_Boot.getClass(p_sender)) + ") via " + p_target.id + " (" + Std.string(p_target == null?null:js_Boot.getClass(p_target)) + ")",{ fileName : "MessageManager.hx", lineNumber : 119, className : "awe6.core.MessageManager", methodName : "_sendMessage"});
		if(!this._isOkToSendMessage()) {
			this._messageQueue.push(new awe6_core__$MessageManager__$HelperMessage(p_message,p_sender,p_target,p_isBubbleDown,p_isBubbleUp,p_isBubbleEverywhere));
			return;
		}
		if(p_isBubbleEverywhere) {
			var l_entityFromScene = this._kernel.scenes.get_scene().getEntities()[0];
			if(l_entityFromScene != null && l_entityFromScene.get_parent() != null) return this._sendMessage(p_message,p_sender,this._kernel.scenes.get_scene().getEntities()[0].get_parent(),true);
		}
		var l_subscriptions = this._getSubscriptions(p_target,p_message,null,p_sender);
		var l_isContinue = true;
		var $it0 = l_subscriptions.iterator();
		while( $it0.hasNext() ) {
			var i = $it0.next();
			l_isContinue = this._send(i,p_message,p_sender);
			if(!l_isContinue) return;
		}
		if(p_isBubbleDown) {
			var l_children = p_target.getEntities();
			var _g = 0;
			while(_g < l_children.length) {
				var j = l_children[_g];
				++_g;
				this._sendMessage(p_message,p_sender,j,true);
			}
		}
		if(p_isBubbleUp && p_target.get_parent() != null && Std["is"](p_target.get_parent(),awe6_interfaces_IEntity)) this._sendMessage(p_message,p_sender,p_target.get_parent(),false,true);
		return;
	}
	,_send: function(p_subscription,p_message,p_sender) {
		var l_isContinue = p_subscription.handler.apply(p_subscription.subscriber,[p_message,p_sender]);
		if(p_subscription.isRemovedAfterFirstSend) this._subscriptions.remove(p_subscription);
		return l_isContinue;
	}
	,_getSubscriptions: function(p_subscriber,p_message,p_handler,p_sender,p_senderClassType,p_isRemove) {
		if(p_isRemove == null) p_isRemove = false;
		var l_result = new haxe_ds_GenericStack();
		var $it0 = this._subscriptions.iterator();
		while( $it0.hasNext() ) {
			var i = $it0.next();
			if(p_subscriber != null && p_subscriber != i.subscriber && p_subscriber != i.sender) continue;
			if(p_message != null && !js_Boot.__instanceof(p_message,i.messageClass)) {
				var _g = Type["typeof"](p_message);
				switch(_g[1]) {
				case 7:
					var e = _g[2];
					if(Type.getEnum(p_message) != Type.getEnum(i.message) || p_message[0] != Type.enumConstructor(i.message)) {
						e;
						continue;
					}
					break;
				default:
					if(p_message != i.message) continue;
				}
			}
			if(p_handler != null && !Reflect.compareMethods(i.handler,p_handler)) continue;
			if(p_sender != null) {
				if(p_isRemove) {
					if(i.senderClassType != null) continue;
					if(i.sender == null) continue;
				}
				if(i.senderClassType != null && !js_Boot.__instanceof(p_sender,i.senderClassType)) continue;
				if(i.sender != null && i.sender != p_sender) continue;
			}
			l_result.head = new haxe_ds_GenericCell(i,l_result.head);
		}
		return l_result;
	}
	,__class__: awe6_core_MessageManager
});
var awe6_core__$MessageManager__$HelperSubscription = function() { };
$hxClasses["awe6.core._MessageManager._HelperSubscription"] = awe6_core__$MessageManager__$HelperSubscription;
awe6_core__$MessageManager__$HelperSubscription.__name__ = true;
awe6_core__$MessageManager__$HelperSubscription.prototype = {
	__class__: awe6_core__$MessageManager__$HelperSubscription
};
var awe6_core__$MessageManager__$HelperMessage = function(p_message,p_sender,p_target,p_isBubbleDown,p_isBubbleUp,p_isBubbleEverywhere) {
	if(p_isBubbleEverywhere == null) p_isBubbleEverywhere = false;
	if(p_isBubbleUp == null) p_isBubbleUp = false;
	if(p_isBubbleDown == null) p_isBubbleDown = false;
	this.message = p_message;
	this.sender = p_sender;
	this.target = p_target;
	this.isBubbleDown = p_isBubbleDown;
	this.isBubbleUp = p_isBubbleUp;
	this.isBubbleEverywhere = p_isBubbleEverywhere;
};
$hxClasses["awe6.core._MessageManager._HelperMessage"] = awe6_core__$MessageManager__$HelperMessage;
awe6_core__$MessageManager__$HelperMessage.__name__ = true;
awe6_core__$MessageManager__$HelperMessage.prototype = {
	__class__: awe6_core__$MessageManager__$HelperMessage
};
var awe6_interfaces_IScene = function() { };
$hxClasses["awe6.interfaces.IScene"] = awe6_interfaces_IScene;
awe6_interfaces_IScene.__name__ = true;
awe6_interfaces_IScene.__interfaces__ = [awe6_interfaces_IViewable,awe6_interfaces_IEntityCollection,awe6_interfaces_IProcess];
awe6_interfaces_IScene.prototype = {
	__class__: awe6_interfaces_IScene
};
var awe6_core_Scene = function(p_kernel,p_type,p_isPauseable,p_isMuteable,p_isSessionSavedOnNext) {
	if(p_isSessionSavedOnNext == null) p_isSessionSavedOnNext = false;
	if(p_isMuteable == null) p_isMuteable = true;
	if(p_isPauseable == null) p_isPauseable = false;
	this.type = p_type;
	this.isPauseable = p_isPauseable;
	this.isMuteable = p_isMuteable;
	this.isSessionSavedOnNext = p_isSessionSavedOnNext;
	awe6_core_Process.call(this,p_kernel);
};
$hxClasses["awe6.core.Scene"] = awe6_core_Scene;
awe6_core_Scene.__name__ = true;
awe6_core_Scene.__interfaces__ = [awe6_interfaces_IScene];
awe6_core_Scene.__super__ = awe6_core_Process;
awe6_core_Scene.prototype = $extend(awe6_core_Process.prototype,{
	_init: function() {
		awe6_core_Process.prototype._init.call(this);
		this.isDisposable = true;
		this._entity = new awe6_core_Entity(this._kernel);
		this.view = this._entity.get_view();
	}
	,_updater: function(p_deltaTime) {
		if(p_deltaTime == null) p_deltaTime = 0;
		awe6_core_Process.prototype._updater.call(this,p_deltaTime);
		this._entity.update(p_deltaTime);
	}
	,_disposer: function() {
		this._entity.dispose();
		this.get_view().dispose();
		awe6_core_Process.prototype._disposer.call(this);
	}
	,addEntity: function(p_entity,p_agenda,p_isAddedToView,p_viewPriority) {
		if(p_viewPriority == null) p_viewPriority = 0;
		if(p_isAddedToView == null) p_isAddedToView = false;
		return this._entity.addEntity(p_entity,p_agenda,p_isAddedToView,p_viewPriority);
	}
	,removeEntity: function(p_entity,p_agenda,p_isRemovedFromView) {
		if(p_isRemovedFromView == null) p_isRemovedFromView = false;
		this._entity.removeEntity(p_entity,p_agenda,p_isRemovedFromView);
	}
	,getEntities: function(p_agenda) {
		return this._entity.getEntities(p_agenda);
	}
	,get_view: function() {
		return this.view;
	}
	,__class__: awe6_core_Scene
});
var awe6_interfaces_ISceneManager = function() { };
$hxClasses["awe6.interfaces.ISceneManager"] = awe6_interfaces_ISceneManager;
awe6_interfaces_ISceneManager.__name__ = true;
awe6_interfaces_ISceneManager.prototype = {
	__class__: awe6_interfaces_ISceneManager
};
var awe6_core_SceneManager = function(p_kernel) {
	awe6_core_Process.call(this,p_kernel);
};
$hxClasses["awe6.core.SceneManager"] = awe6_core_SceneManager;
awe6_core_SceneManager.__name__ = true;
awe6_core_SceneManager.__interfaces__ = [awe6_interfaces_ISceneManager];
awe6_core_SceneManager.__super__ = awe6_core_Process;
awe6_core_SceneManager.prototype = $extend(awe6_core_Process.prototype,{
	_init: function() {
		awe6_core_Process.prototype._init.call(this);
		this.view = new awe6_core_drivers_createjs_View(this._kernel);
	}
	,_updater: function(p_deltaTime) {
		if(p_deltaTime == null) p_deltaTime = 0;
		awe6_core_Process.prototype._updater.call(this,p_deltaTime);
		if(this.get_scene() != null) this.get_scene().update(p_deltaTime);
		if(this._sceneTransition != null) this._sceneTransition.update(p_deltaTime);
	}
	,_disposer: function() {
		if(this.get_scene() != null) this.get_scene().dispose();
		if(this._sceneTransition != null) this._sceneTransition.dispose();
		this.view.dispose();
		awe6_core_Process.prototype._disposer.call(this);
	}
	,setScene: function(p_type) {
		var l_previousType = null;
		if(this.get_scene() != null) {
			l_previousType = this.get_scene().type;
			var l_newSceneTransition = this._kernel.factory.createSceneTransition(p_type,l_previousType);
			if(this._sceneTransition != null) this._sceneTransition.dispose();
			this._sceneTransition = l_newSceneTransition;
			this._kernel.inputs.reset();
			if(this.get_scene().isDisposable) {
				this.get_scene().dispose();
				this._kernel.messenger.reset();
			}
			this.scene = null;
		}
		this._kernel.overlay.hideButtons();
		this.scene = this._kernel.factory.createScene(p_type);
		this._kernel.overlay.showButton(awe6_interfaces_EOverlayButton.BACK,this._kernel.factory.getBackSceneType(this.get_scene().type) != null);
		this._kernel.overlay.showButton(awe6_interfaces_EOverlayButton.MUTE,this.get_scene().isMuteable && !this._kernel.audio.isMute);
		this._kernel.overlay.showButton(awe6_interfaces_EOverlayButton.UNMUTE,this.get_scene().isMuteable && this._kernel.audio.isMute);
		this._kernel.overlay.showButton(awe6_interfaces_EOverlayButton.PAUSE,this.get_scene().isPauseable && this._kernel.isActive);
		this._kernel.overlay.showButton(awe6_interfaces_EOverlayButton.UNPAUSE,this.get_scene().isPauseable && !this._kernel.isActive);
		this.view.addChild(this.get_scene().get_view());
		if(this._sceneTransition != null) this.get_scene().get_view().addChild(this._sceneTransition.get_view(),this._tools.BIG_NUMBER + 1);
	}
	,back: function() {
		var l_sceneType = this._kernel.factory.getBackSceneType(this.get_scene().type);
		if(l_sceneType != null) this.setScene(l_sceneType);
	}
	,get_scene: function() {
		return this.scene;
	}
	,__class__: awe6_core_SceneManager
});
var awe6_interfaces_ITextStyle = function() { };
$hxClasses["awe6.interfaces.ITextStyle"] = awe6_interfaces_ITextStyle;
awe6_interfaces_ITextStyle.__name__ = true;
awe6_interfaces_ITextStyle.prototype = {
	__class__: awe6_interfaces_ITextStyle
};
var awe6_core_TextStyle = function(p_font,p_size,p_color,p_isBold,p_isItalic,p_align,p_spacingHorizontal,p_spacingVertical,p_thickness,p_filters) {
	if(p_thickness == null) p_thickness = 0;
	if(p_isItalic == null) p_isItalic = false;
	if(p_isBold == null) p_isBold = false;
	if(p_font != null) this.font = p_font; else this.font = "_sans";
	if(p_size != null) this.size = p_size; else this.size = 12;
	if(p_color != null) this.color = p_color; else this.color = 0;
	this.isBold = p_isBold;
	this.isItalic = p_isItalic;
	if(p_align != null) this.align = p_align; else this.align = awe6_interfaces_ETextAlign.LEFT;
	if(p_spacingHorizontal != null) this.spacingHorizontal = p_spacingHorizontal; else this.spacingHorizontal = 0;
	if(p_spacingVertical != null) this.spacingVertical = p_spacingVertical; else this.spacingVertical = 0;
	this.thickness = p_thickness;
	this.filters = p_filters;
};
$hxClasses["awe6.core.TextStyle"] = awe6_core_TextStyle;
awe6_core_TextStyle.__name__ = true;
awe6_core_TextStyle.__interfaces__ = [awe6_interfaces_ITextStyle];
awe6_core_TextStyle.prototype = {
	toString: function() {
		return Std.string(this.font + "," + this.size + "," + this.color + "," + Std.string(this.isBold) + "," + Std.string(this.isItalic) + "," + Std.string(this.align) + "," + this.spacingHorizontal + "," + this.spacingVertical + "," + this.thickness + "," + Std.string(this.filters));
	}
	,__class__: awe6_core_TextStyle
};
var awe6_interfaces_ITools = function() { };
$hxClasses["awe6.interfaces.ITools"] = awe6_interfaces_ITools;
awe6_interfaces_ITools.__name__ = true;
awe6_interfaces_ITools.__interfaces__ = [awe6_interfaces_IEncrypter];
awe6_interfaces_ITools.prototype = {
	__class__: awe6_interfaces_ITools
};
var awe6_core_Tools = function(p_kernel) {
	this._kernel = p_kernel;
	this.BIG_NUMBER = 9999998;
	this._encrypter = this._kernel.factory.createEncrypter();
};
$hxClasses["awe6.core.Tools"] = awe6_core_Tools;
awe6_core_Tools.__name__ = true;
awe6_core_Tools.__interfaces__ = [awe6_interfaces_ITools];
awe6_core_Tools.prototype = {
	createGuid: function(p_isSmall,p_prefix) {
		if(p_prefix == null) p_prefix = "";
		if(p_isSmall == null) p_isSmall = false;
		if(p_isSmall) return p_prefix + (function($this) {
			var $r;
			var _this = $this._randomCharacter() + $this._randomCharacter() + $this._randomCharacter();
			$r = HxOverrides.substr(_this,0,10);
			return $r;
		}(this)); else return p_prefix + (this._randomCharacter() + this._randomCharacter() + "-" + this._randomCharacter() + "-" + this._randomCharacter() + "-" + this._randomCharacter() + "-" + this._randomCharacter() + this._randomCharacter() + this._randomCharacter());
	}
	,_randomCharacter: function() {
		var _this = StringTools.hex(Std["int"]((1 + Math.random()) * 65536) | 0,1);
		return HxOverrides.substr(_this,1,null);
	}
	,sortByPriority: function(p_a,p_b) {
		var l_ap = p_a.get_priority();
		var l_bp = p_b.get_priority();
		if(l_ap < l_bp) return -1;
		if(l_ap > l_bp) return 1;
		return 0;
	}
	,_isCamelCase: function(p_value) {
		if(p_value.toUpperCase() == p_value) return false;
		if(p_value.indexOf(" ") > -1) return false;
		if(p_value.indexOf("_") > -1) return false;
		return true;
	}
	,_isConstCase: function(p_value) {
		if(p_value.toUpperCase() != p_value) return false;
		if(p_value.indexOf(" ") > -1) return false;
		return true;
	}
	,fromCamelCase: function(p_value) {
		if(p_value == null || p_value == "") return "";
		var l_result = "";
		var l_chars = p_value.split("");
		var l_space = "";
		var _g = 0;
		while(_g < l_chars.length) {
			var i = l_chars[_g];
			++_g;
			if(i.toLowerCase() != i) l_result += l_space;
			l_result += i;
			l_space = " ";
		}
		return l_result;
	}
	,toConstCase: function(p_value) {
		if(p_value == null || p_value == "") return "";
		if(this._isConstCase(p_value)) return p_value;
		if(this._isCamelCase(p_value)) p_value = this.fromCamelCase(p_value);
		var l_result = "";
		p_value = StringTools.replace(p_value,"     "," ");
		p_value = StringTools.replace(p_value,"    "," ");
		p_value = StringTools.replace(p_value,"   "," ");
		p_value = StringTools.replace(p_value,"  "," ");
		p_value = StringTools.replace(p_value," ","_");
		l_result = p_value.toUpperCase();
		return l_result;
	}
	,limit: function(p_value,p_min,p_max) {
		if(p_value > p_max) return p_max; else if(p_value < p_min) return p_min; else return p_value;
	}
	,shuffle: function(p_array) {
		var l_result = p_array.slice();
		var l_n = l_result.length;
		while(l_n > 1) {
			var l_k = Std.random(l_n);
			l_n--;
			var l_temp = l_result[l_n];
			l_result[l_n] = l_result[l_k];
			l_result[l_k] = l_temp;
		}
		return l_result;
	}
	,decrypt: function(p_value,p_secret) {
		if(p_secret == null) p_secret = "";
		return this._encrypter.decrypt(p_value,p_secret);
	}
	,__class__: awe6_core_Tools
};
var awe6_interfaces_IAudioManager = function() { };
$hxClasses["awe6.interfaces.IAudioManager"] = awe6_interfaces_IAudioManager;
awe6_interfaces_IAudioManager.__name__ = true;
awe6_interfaces_IAudioManager.prototype = {
	__class__: awe6_interfaces_IAudioManager
};
var awe6_core_drivers_AAudioManager = function(p_kernel) {
	awe6_core_Process.call(this,p_kernel);
};
$hxClasses["awe6.core.drivers.AAudioManager"] = awe6_core_drivers_AAudioManager;
awe6_core_drivers_AAudioManager.__name__ = true;
awe6_core_drivers_AAudioManager.__interfaces__ = [awe6_interfaces_IAudioManager];
awe6_core_drivers_AAudioManager.__super__ = awe6_core_Process;
awe6_core_drivers_AAudioManager.prototype = $extend(awe6_core_Process.prototype,{
	_init: function() {
		awe6_core_Process.prototype._init.call(this);
		this._sounds = [];
		this._packageId = this._kernel.getConfig("settings.assets.packages.audio");
		if(this._packageId == null) this._packageId = this._kernel.getConfig("settings.assets.packages.default");
		if(this._packageId == null) this._packageId = "assets.audio";
		this.set_isMute(false);
	}
	,_updater: function(p_deltaTime) {
		if(p_deltaTime == null) p_deltaTime = 0;
		awe6_core_Process.prototype._updater.call(this,p_deltaTime);
		var _g = 0;
		var _g1 = this._sounds;
		while(_g < _g1.length) {
			var i = _g1[_g];
			++_g;
			if(i.isDisposed) HxOverrides.remove(this._sounds,i);
		}
	}
	,_disposer: function() {
		var _g = 0;
		var _g1 = this._sounds;
		while(_g < _g1.length) {
			var i = _g1[_g];
			++_g;
			i.dispose();
		}
		this.set_isMute(false);
		awe6_core_Process.prototype._disposer.call(this);
	}
	,start: function(p_id,p_audioChannelType,p_loops,p_startTime,p_volume,p_pan,p_isIgnoredIfPlaying,p_onCompleteCallback) {
		if(p_isIgnoredIfPlaying == null) p_isIgnoredIfPlaying = false;
		if(p_pan == null) p_pan = 0;
		if(p_volume == null) p_volume = 1;
		if(p_startTime == null) p_startTime = 0;
		if(p_loops == null) p_loops = 1;
		if(p_audioChannelType == null) p_audioChannelType = awe6_interfaces_EAudioChannel.DEFAULT;
		if(p_isIgnoredIfPlaying) {
			var l_existingSound = this._getSounds(p_id,p_audioChannelType);
			if(l_existingSound.length != 0) return;
		}
		this._sounds.push(this._driverSoundFactory(p_id,p_audioChannelType,p_loops,p_startTime,p_volume,p_pan,p_onCompleteCallback));
	}
	,_driverSoundFactory: function(p_id,p_audioChannelType,p_loops,p_startTime,p_volume,p_pan,p_onCompleteCallback) {
		if(p_pan == null) p_pan = 0;
		if(p_volume == null) p_volume = 1;
		if(p_startTime == null) p_startTime = 0;
		if(p_loops == null) p_loops = 1;
		return new awe6_core_drivers__$AHelperSound(this._kernel,p_id,this._packageId,p_audioChannelType,p_loops,p_startTime,p_volume,p_pan,p_onCompleteCallback);
	}
	,set_isMute: function(p_value) {
		this.isMute = p_value;
		this._driverSetIsMute(p_value);
		return this.isMute;
	}
	,_driverSetIsMute: function(p_value) {
	}
	,_getSounds: function(p_id,p_audioChannelType) {
		var l_result = [];
		if(p_id == null && p_audioChannelType == null) l_result = this._sounds.slice(); else if(p_audioChannelType == null) {
			var _g = 0;
			var _g1 = this._sounds;
			while(_g < _g1.length) {
				var i = _g1[_g];
				++_g;
				if(i.id == p_id) l_result.push(i);
			}
		} else if(p_id == null) {
			var _g2 = 0;
			var _g11 = this._sounds;
			while(_g2 < _g11.length) {
				var i1 = _g11[_g2];
				++_g2;
				if(Type.enumEq(i1.audioChannelType,p_audioChannelType)) l_result.push(i1);
			}
		} else {
			var _g3 = 0;
			var _g12 = this._sounds;
			while(_g3 < _g12.length) {
				var i2 = _g12[_g3];
				++_g3;
				if(i2.id == p_id && Type.enumEq(i2.audioChannelType,p_audioChannelType)) l_result.push(i2);
			}
		}
		return l_result;
	}
	,__class__: awe6_core_drivers_AAudioManager
});
var awe6_core_drivers__$AHelperSound = function(p_kernel,p_id,p_packageId,p_audioChannelType,p_loops,p_startTime,p_volume,p_pan,p_onCompleteCallback) {
	if(p_pan == null) p_pan = 0;
	if(p_volume == null) p_volume = 1;
	if(p_startTime == null) p_startTime = 0;
	if(p_loops == null) p_loops = 1;
	this._kernel = p_kernel;
	this.isDisposed = false;
	this.id = p_id;
	this._packageId = p_packageId;
	if(p_audioChannelType != null) this.audioChannelType = p_audioChannelType; else this.audioChannelType = awe6_interfaces_EAudioChannel.DEFAULT;
	if(p_loops == -1) p_loops = this._kernel.tools.BIG_NUMBER;
	this._loops = p_loops;
	this._startTime = p_startTime;
	this._volume = p_volume;
	this._pan = p_pan;
	this._onCompleteCallback = p_onCompleteCallback;
	this._init();
};
$hxClasses["awe6.core.drivers._AHelperSound"] = awe6_core_drivers__$AHelperSound;
awe6_core_drivers__$AHelperSound.__name__ = true;
awe6_core_drivers__$AHelperSound.__interfaces__ = [awe6_interfaces_IDisposable];
awe6_core_drivers__$AHelperSound.prototype = {
	_init: function() {
		this._driverInit();
	}
	,_driverInit: function() {
	}
	,_driverStop: function() {
	}
	,dispose: function() {
		if(this.isDisposed) return;
		this.isDisposed = true;
		this._driverStop();
	}
	,__class__: awe6_core_drivers__$AHelperSound
};
var awe6_interfaces_IFactory = function() { };
$hxClasses["awe6.interfaces.IFactory"] = awe6_interfaces_IFactory;
awe6_interfaces_IFactory.__name__ = true;
awe6_interfaces_IFactory.prototype = {
	__class__: awe6_interfaces_IFactory
};
var awe6_core_drivers_AFactory = function(p_context,p_isDebug,p_config) {
	if(p_isDebug == null) p_isDebug = false;
	this._context = p_context;
	this.isDebug = p_isDebug;
	this._config = p_config;
	this.config = new haxe_ds_StringMap();
	this.id = "awe6";
	this.version = "0.0.1";
	this.author = "unknown";
	this.isDecached = false;
	this.isEyeCandyOptionEnabled = true;
	this.isFullScreenOptionEnabled = true;
	this.isResetSessionsOptionEnabled = true;
	this.width = 600;
	this.height = 400;
	this.bgColor = 16711680;
	this.fullScreenType = awe6_interfaces_EFullScreen.SCALE_ASPECT_RATIO_PRESERVE;
	this.joypadTouchType = awe6_interfaces_EJoypadTouch.DISABLED;
	this.secret = "YouMustOverrideThis";
	this.targetFramerate = 25;
	this.isFixedUpdates = true;
	this.startingSceneType = awe6_interfaces_EScene.GAME;
	this.keyPause = awe6_interfaces_EKey.P;
	this.keyMute = awe6_interfaces_EKey.M;
	this.keyNext = awe6_interfaces_EKey.SPACE;
	this.keyBack = awe6_interfaces_EKey.ESCAPE;
	this.keySpecial = awe6_interfaces_EKey.CONTROL;
	this._configurer(true);
	this._driverInit();
};
$hxClasses["awe6.core.drivers.AFactory"] = awe6_core_drivers_AFactory;
awe6_core_drivers_AFactory.__name__ = true;
awe6_core_drivers_AFactory.__interfaces__ = [awe6_interfaces_IDisposable,awe6_interfaces_IFactory];
awe6_core_drivers_AFactory.prototype = {
	_driverInit: function() {
		if(this._config != null && HxOverrides.substr(this._config,0,5) == "<?xml") this._traverseElements(Xml.parse(this._config).firstElement().elements(),"");
		this._launchKernel();
	}
	,_traverseElements: function(p_elements,p_prefix) {
		if(p_prefix.length != 0) p_prefix += ".";
		while( p_elements.hasNext() ) {
			var i = p_elements.next();
			var l_name;
			l_name = p_prefix + (function($this) {
				var $r;
				if(i.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element but found " + i.nodeType);
				$r = i.nodeName;
				return $r;
			}(this));
			if(i.elements().hasNext()) this._traverseElements(i.elements(),l_name);
			if((function($this) {
				var $r;
				if(i.nodeType != Xml.Document && i.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element or Document but found " + i.nodeType);
				$r = i.children[0];
				return $r;
			}(this)) != null && (function($this) {
				var $r;
				var _this = ((function($this) {
					var $r;
					if(i.nodeType != Xml.Document && i.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element or Document but found " + i.nodeType);
					$r = i.children[0];
					return $r;
				}($this))).toString();
				$r = HxOverrides.substr(_this,0,9);
				return $r;
			}(this)) == "<![CDATA[") ((function($this) {
				var $r;
				if(i.nodeType != Xml.Document && i.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element or Document but found " + i.nodeType);
				$r = i.children[0];
				return $r;
			}(this))).set_nodeValue(((function($this) {
				var $r;
				if(i.nodeType != Xml.Document && i.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element or Document but found " + i.nodeType);
				$r = i.children[0];
				return $r;
			}(this))).toString().split("<![CDATA[").join("").split("]]>").join(""));
			if((function($this) {
				var $r;
				if(i.nodeType != Xml.Document && i.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element or Document but found " + i.nodeType);
				$r = i.children[0];
				return $r;
			}(this)) == null) this.config.set(l_name,""); else {
				var l_nodeType;
				l_nodeType = ((function($this) {
					var $r;
					if(i.nodeType != Xml.Document && i.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element or Document but found " + i.nodeType);
					$r = i.children[0];
					return $r;
				}(this))).nodeType;
				if(l_nodeType != Xml.Element && l_nodeType != Xml.Document) {
					var value;
					if((function($this) {
						var $r;
						if(i.nodeType != Xml.Document && i.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element or Document but found " + i.nodeType);
						$r = i.children[0];
						return $r;
					}(this)) == null) value = ""; else value = ((function($this) {
						var $r;
						if(i.nodeType != Xml.Document && i.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element or Document but found " + i.nodeType);
						$r = i.children[0];
						return $r;
					}(this))).get_nodeValue();
					this.config.set(l_name,value);
				} else this.config.set(l_name,"");
			}
			var $it0 = i.attributes();
			while( $it0.hasNext() ) {
				var j = $it0.next();
				var l_aName = l_name + "." + j;
				var value1 = i.get(j);
				this.config.set(l_aName,value1);
			}
		}
	}
	,_configurer: function(p_isPreconfig) {
		if(p_isPreconfig == null) p_isPreconfig = false;
	}
	,_launchKernel: function() {
		if(this._concreteKernel != null) return;
		this._configurer(false);
		this._concreteKernel = new awe6_core_drivers_createjs_Kernel(this,this._context);
	}
	,_getAssetUrls: function() {
		var l_result = [];
		var _g = 0;
		while(_g < 1000) {
			var i = _g++;
			var l_nodeName = "settings.assets.url" + i;
			if(this.config.exists(l_nodeName)) l_result.push(Std.string(this.config.get(l_nodeName)));
		}
		return l_result;
	}
	,onInitComplete: function(p_kernel) {
		if(this._kernel != null || p_kernel == null) return;
		this._kernel = p_kernel;
		this._tools = this._kernel.tools;
		var _this = this._tools.toConstCase(StringTools.trim(this.id));
		this.id = HxOverrides.substr(_this,0,16);
		var _this1 = StringTools.trim(this.version);
		this.version = HxOverrides.substr(_this1,0,10);
		var _this2 = StringTools.trim(this.author);
		this.author = HxOverrides.substr(_this2,0,16);
	}
	,createAssetManager: function() {
		if(js_Boot.__instanceof(this._kernel.assets,awe6_interfaces_IAssetManagerProcess)) return js_Boot.__cast(this._kernel.assets , awe6_interfaces_IAssetManagerProcess); else return new awe6_core_AAssetManager(this._kernel);
	}
	,createEncrypter: function() {
		return new awe6_core_Encrypter(this.secret);
	}
	,createLogger: function() {
		return null;
	}
	,createOverlay: function() {
		return new awe6_core_drivers_createjs_Overlay(this._kernel);
	}
	,createPreloader: function() {
		return new awe6_core_drivers_createjs_Preloader(this._kernel,this._getAssetUrls(),this.isDecached);
	}
	,createScene: function(p_type) {
		if(p_type == null) p_type = this.startingSceneType;
		return new awe6_core_Scene(this._kernel,p_type);
	}
	,createSceneTransition: function(p_typeIncoming,p_typeOutgoing) {
		return new awe6_core_drivers_createjs_SceneTransition(this._kernel);
	}
	,createSession: function(p_id) {
		return new awe6_core_drivers_ASession(this._kernel,p_id);
	}
	,createTextStyle: function(p_type) {
		return new awe6_core_TextStyle();
	}
	,getBackSceneType: function(p_type) {
		return null;
	}
	,dispose: function() {
		if(this.isDisposed || this._concreteKernel == null) return;
		this.isDisposed = true;
		this._driverDisposer();
		this._concreteKernel.dispose();
		this._concreteKernel = null;
		this._kernel = null;
		this.config = null;
	}
	,_driverDisposer: function() {
	}
	,__class__: awe6_core_drivers_AFactory
};
var awe6_interfaces_IInputKeyboard = function() { };
$hxClasses["awe6.interfaces.IInputKeyboard"] = awe6_interfaces_IInputKeyboard;
awe6_interfaces_IInputKeyboard.__name__ = true;
awe6_interfaces_IInputKeyboard.prototype = {
	__class__: awe6_interfaces_IInputKeyboard
};
var awe6_core_drivers_AInputKeyboard = function(p_kernel) {
	awe6_core_Process.call(this,p_kernel);
};
$hxClasses["awe6.core.drivers.AInputKeyboard"] = awe6_core_drivers_AInputKeyboard;
awe6_core_drivers_AInputKeyboard.__name__ = true;
awe6_core_drivers_AInputKeyboard.__interfaces__ = [awe6_interfaces_IInputKeyboard];
awe6_core_drivers_AInputKeyboard.__super__ = awe6_core_Process;
awe6_core_drivers_AInputKeyboard.prototype = $extend(awe6_core_Process.prototype,{
	_init: function() {
		awe6_core_Process.prototype._init.call(this);
		this._driverInit();
		this._reset();
	}
	,_driverInit: function() {
	}
	,_updater: function(p_deltaTime) {
		if(p_deltaTime == null) p_deltaTime = 0;
		awe6_core_Process.prototype._updater.call(this,p_deltaTime);
		var l_encounteredKeyCodes = new haxe_ds_StringMap();
		var l_nextBuffer = [];
		var _g = 0;
		var _g1 = this._buffer;
		while(_g < _g1.length) {
			var i = _g1[_g];
			++_g;
			var l_key;
			if(i.keyCode == null) l_key = "null"; else l_key = "" + i.keyCode;
			if(__map_reserved[l_key] != null?l_encounteredKeyCodes.existsReserved(l_key):l_encounteredKeyCodes.h.hasOwnProperty(l_key)) {
				l_nextBuffer.push(i);
				continue;
			}
			if(i.isDown) {
				if(!this._keys[i.keyCode].isDown) {
					this._onDown(i.keyCode);
					if(__map_reserved[l_key] != null) l_encounteredKeyCodes.setReserved(l_key,true); else l_encounteredKeyCodes.h[l_key] = true;
				}
			} else if(this._keys[i.keyCode].isDown) {
				this._onUp(i.keyCode);
				if(__map_reserved[l_key] != null) l_encounteredKeyCodes.setReserved(l_key,true); else l_encounteredKeyCodes.h[l_key] = true;
			}
		}
		this._buffer = l_nextBuffer.slice();
		var _g2 = 0;
		var _g11 = this._keys;
		while(_g2 < _g11.length) {
			var i1 = _g11[_g2];
			++_g2;
			if(i1.isDown) i1.updatesDown++; else i1.updatesUp++;
			if(i1.isDown) i1.timeDown += p_deltaTime; else i1.timeUp += p_deltaTime;
		}
	}
	,_disposer: function() {
		this._keys = null;
		awe6_core_Process.prototype._disposer.call(this);
	}
	,_addEvent: function(p_keyCodeValue,p_isDown) {
		this._buffer.push(new awe6_core_drivers__$AInputKeyboard__$HelperKeyEvent(p_keyCodeValue,p_isDown));
	}
	,_onDown: function(p_keyCode) {
		var l_current = this._keys[p_keyCode];
		l_current.isUsed = true;
		l_current.isDown = true;
		l_current.timeUpPrevious = l_current.timeUp;
		l_current.updatesUpPrevious = l_current.updatesUp;
		l_current.updatesUp = 0;
		l_current.timeUp = 0;
	}
	,_onUp: function(p_keyCode) {
		var l_current = this._keys[p_keyCode];
		l_current.isDown = false;
		l_current.timeDownPrevious = l_current.timeDown;
		l_current.updatesDownPrevious = l_current.updatesDown;
		l_current.updatesDown = 0;
		l_current.timeDown = 0;
	}
	,_reset: function(p_event) {
		this._buffer = [];
		this._keys = [];
		var _g = 0;
		while(_g < 512) {
			var i = _g++;
			this._keys[i] = new awe6_core_drivers__$AInputKeyboard__$HelperKey(this._kernel);
		}
	}
	,getIsKeyDown: function(p_type) {
		if(p_type == null) return false;
		var l_keyCode = this.getKeyCode(p_type);
		return this._keys[l_keyCode].isDown;
	}
	,getIsKeyPress: function(p_type) {
		if(p_type == null) return false;
		var l_keyCode = this.getKeyCode(p_type);
		return this._keys[l_keyCode].updatesDown == 1;
	}
	,getIsKeyRelease: function(p_type) {
		if(p_type == null) return false;
		var l_keyCode = this.getKeyCode(p_type);
		return this._keys[l_keyCode].isUsed && this._keys[l_keyCode].updatesUp == 1;
	}
	,getKeyCode: function(p_type) {
		switch(p_type[1]) {
		case 0:
			return 144;
		case 1:
			return 12;
		case 2:
			return 47;
		case 3:
			return 18;
		case 4:
			return 8;
		case 5:
			return 20;
		case 6:
			return 17;
		case 7:
			return 46;
		case 8:
			return 40;
		case 9:
			return 35;
		case 10:
			return 13;
		case 11:
			return 27;
		case 12:
			return 112;
		case 13:
			return 121;
		case 14:
			return 122;
		case 15:
			return 123;
		case 16:
			return 124;
		case 17:
			return 125;
		case 18:
			return 126;
		case 19:
			return 113;
		case 20:
			return 114;
		case 21:
			return 115;
		case 22:
			return 116;
		case 23:
			return 117;
		case 24:
			return 118;
		case 25:
			return 119;
		case 26:
			return 120;
		case 27:
			return 36;
		case 28:
			return 45;
		case 29:
			return 37;
		case 30:
			return 96;
		case 31:
			return 97;
		case 32:
			return 98;
		case 33:
			return 99;
		case 34:
			return 100;
		case 35:
			return 101;
		case 36:
			return 102;
		case 37:
			return 103;
		case 38:
			return 104;
		case 39:
			return 105;
		case 40:
			return 107;
		case 41:
			return 110;
		case 42:
			return 111;
		case 43:
			return 108;
		case 44:
			return 106;
		case 45:
			return 109;
		case 46:
			return 34;
		case 47:
			return 33;
		case 48:
			return 39;
		case 49:
			return 16;
		case 50:
			return 32;
		case 51:
			return 9;
		case 52:
			return 38;
		case 53:
			return 65;
		case 54:
			return 66;
		case 55:
			return 67;
		case 56:
			return 68;
		case 57:
			return 69;
		case 58:
			return 70;
		case 59:
			return 71;
		case 60:
			return 72;
		case 61:
			return 73;
		case 62:
			return 74;
		case 63:
			return 75;
		case 64:
			return 76;
		case 65:
			return 77;
		case 66:
			return 78;
		case 67:
			return 79;
		case 68:
			return 80;
		case 69:
			return 81;
		case 70:
			return 82;
		case 71:
			return 83;
		case 72:
			return 84;
		case 73:
			return 85;
		case 74:
			return 86;
		case 75:
			return 87;
		case 76:
			return 88;
		case 77:
			return 89;
		case 78:
			return 90;
		case 79:
			return 48;
		case 80:
			return 49;
		case 81:
			return 50;
		case 82:
			return 51;
		case 83:
			return 52;
		case 84:
			return 53;
		case 85:
			return 54;
		case 86:
			return 55;
		case 87:
			return 56;
		case 88:
			return 57;
		case 89:
			return 186;
		case 90:
			return 187;
		case 91:
			return 189;
		case 92:
			return 191;
		case 93:
			return 222;
		case 94:
			return 219;
		case 95:
			return 221;
		case 96:
			return 220;
		case 97:
			return 192;
		case 98:
			return 223;
		case 99:
			var p_value = p_type[2];
			return Std["int"](p_value);
		}
	}
	,getKey: function(p_keyCode) {
		var l_constructors = Type.getEnumConstructs(awe6_interfaces_EKey);
		l_constructors.pop();
		var _g = 0;
		while(_g < l_constructors.length) {
			var i = l_constructors[_g];
			++_g;
			var l_key = Type.createEnum(awe6_interfaces_EKey,i);
			if(this.getKeyCode(l_key) == p_keyCode) return l_key;
		}
		return awe6_interfaces_EKey.SUB_TYPE(p_keyCode);
	}
	,__class__: awe6_core_drivers_AInputKeyboard
});
var awe6_core_drivers__$AInputKeyboard__$HelperKey = function(p_kernel) {
	this.isDown = false;
	this.updatesDown = 0;
	this.updatesUp = p_kernel.tools.BIG_NUMBER;
	this.timeDown = 0;
	this.timeUp = p_kernel.tools.BIG_NUMBER;
	this.updatesDownPrevious = 0;
	this.updatesUpPrevious = p_kernel.tools.BIG_NUMBER;
	this.timeDownPrevious = 0;
	this.timeUpPrevious = p_kernel.tools.BIG_NUMBER;
};
$hxClasses["awe6.core.drivers._AInputKeyboard._HelperKey"] = awe6_core_drivers__$AInputKeyboard__$HelperKey;
awe6_core_drivers__$AInputKeyboard__$HelperKey.__name__ = true;
awe6_core_drivers__$AInputKeyboard__$HelperKey.prototype = {
	__class__: awe6_core_drivers__$AInputKeyboard__$HelperKey
};
var awe6_core_drivers__$AInputKeyboard__$HelperKeyEvent = function(p_keyCode,p_isDown) {
	this.keyCode = p_keyCode;
	this.isDown = p_isDown;
};
$hxClasses["awe6.core.drivers._AInputKeyboard._HelperKeyEvent"] = awe6_core_drivers__$AInputKeyboard__$HelperKeyEvent;
awe6_core_drivers__$AInputKeyboard__$HelperKeyEvent.__name__ = true;
awe6_core_drivers__$AInputKeyboard__$HelperKeyEvent.prototype = {
	__class__: awe6_core_drivers__$AInputKeyboard__$HelperKeyEvent
};
var awe6_interfaces_IInputMouse = function() { };
$hxClasses["awe6.interfaces.IInputMouse"] = awe6_interfaces_IInputMouse;
awe6_interfaces_IInputMouse.__name__ = true;
awe6_interfaces_IInputMouse.prototype = {
	__class__: awe6_interfaces_IInputMouse
};
var awe6_core_drivers_AInputMouse = function(p_kernel) {
	awe6_core_Process.call(this,p_kernel);
};
$hxClasses["awe6.core.drivers.AInputMouse"] = awe6_core_drivers_AInputMouse;
awe6_core_drivers_AInputMouse.__name__ = true;
awe6_core_drivers_AInputMouse.__interfaces__ = [awe6_interfaces_IInputMouse];
awe6_core_drivers_AInputMouse.__super__ = awe6_core_Process;
awe6_core_drivers_AInputMouse.prototype = $extend(awe6_core_Process.prototype,{
	_init: function() {
		awe6_core_Process.prototype._init.call(this);
		this._driverInit();
		this.x = this.y = this._xPrev = this._yPrev = this._deltaX = this._deltaY = this.scroll = this._deltaScroll = 0;
		this.relativeX = this.relativeY = this.relativeCentralisedX = this.relativeCentralisedY = 0;
		this.isMoving = false;
		this._buffer = [];
		this._getPosition();
		this.isMoving = false;
		this.set_isVisible(true);
		this.scroll = 0;
		this.set_cursorType(awe6_interfaces_EMouseCursor.AUTO);
		this._scrollPrev = 0;
		this._stillUpdates = 0;
		this._stillDuration = 0;
		this._reset();
	}
	,_driverInit: function() {
	}
	,_updater: function(p_deltaTime) {
		if(p_deltaTime == null) p_deltaTime = 0;
		this._deltaTimePrev = p_deltaTime;
		awe6_core_Process.prototype._updater.call(this,p_deltaTime);
		this._handleButton(awe6_interfaces_EMouseButton.LEFT,this._buffer.length > 0?this._buffer.shift():this._buttonLeft.isDown,p_deltaTime);
		this._handleButton(awe6_interfaces_EMouseButton.MIDDLE,this._isMiddleDown(),p_deltaTime);
		this._handleButton(awe6_interfaces_EMouseButton.RIGHT,this._isRightDown(),p_deltaTime);
		this._deltaScroll = this.scroll - this._scrollPrev;
		this._scrollPrev = this.scroll;
		this._xPrev = this.x;
		this._yPrev = this.y;
		this._getPosition();
		this._deltaX = this.x - this._xPrev;
		this._deltaY = this.y - this._yPrev;
		this.isMoving = this.x != this._xPrev || this.y != this._yPrev;
		if(this.isMoving) this._stillUpdates = this._stillDuration = 0; else {
			this._stillUpdates++;
			this._stillDuration += p_deltaTime;
		}
		this.relativeX = this.x / this._kernel.factory.width;
		this.relativeY = this.y / this._kernel.factory.height;
		this.relativeCentralisedX = (this.relativeX - .5) * 2;
		this.relativeCentralisedY = (this.relativeY - .5) * 2;
		this.isWithinBounds = this._isWithinBounds();
	}
	,_isMiddleDown: function() {
		return false;
	}
	,_isRightDown: function() {
		return false;
	}
	,_isWithinBounds: function() {
		return true;
	}
	,_getPosition: function() {
		this.x = 0;
		this.y = 0;
	}
	,_handleButton: function(p_type,p_isDown,p_deltaTime) {
		if(p_deltaTime == null) p_deltaTime = 0;
		var l_button = this._getButton(p_type);
		if(p_isDown) {
			if(!l_button.isDown) {
				l_button.timeUpPrevious = l_button.timeUp;
				l_button.updatesUpPrevious = l_button.updatesUp;
				l_button.timeUp = l_button.updatesUp = 0;
				l_button.clickX = this.x;
				l_button.clickY = this.y;
			}
			l_button.timeDown += p_deltaTime;
			l_button.updatesDown++;
			l_button.isDown = true;
		} else {
			if(l_button.isDown) {
				l_button.timeDownPrevious = l_button.timeDown;
				l_button.updatesDownPrevious = l_button.updatesDown;
				l_button.timeDown = l_button.updatesDown = 0;
			}
			l_button.timeUp += p_deltaTime;
			l_button.updatesUp++;
			l_button.isDown = false;
		}
	}
	,_disposer: function() {
		awe6_core_Process.prototype._disposer.call(this);
	}
	,_reset: function(p_event) {
		this._buffer = [];
		this._buttonLeft = new awe6_core_drivers__$AInputMouse__$HelperButton(this._kernel);
		this._buttonMiddle = new awe6_core_drivers__$AInputMouse__$HelperButton(this._kernel);
		this._buttonRight = new awe6_core_drivers__$AInputMouse__$HelperButton(this._kernel);
	}
	,_getButton: function(p_type) {
		if(p_type == null) p_type = awe6_interfaces_EMouseButton.LEFT;
		switch(p_type[1]) {
		case 0:
			return this._buttonLeft;
		case 1:
			return this._buttonMiddle;
		case 2:
			return this._buttonRight;
		}
	}
	,getIsButtonDown: function(p_type) {
		var l_button = this._getButton(p_type);
		return l_button.isDown;
	}
	,getIsButtonRelease: function(p_type) {
		var l_button = this._getButton(p_type);
		return l_button.updatesUp == 1;
	}
	,set_isVisible: function(p_value) {
		this.isVisible = p_value;
		return this.isVisible;
	}
	,set_cursorType: function(p_value) {
		this.cursorType = p_value;
		return this.cursorType;
	}
	,__class__: awe6_core_drivers_AInputMouse
});
var awe6_core_drivers__$AInputMouse__$HelperButton = function(p_kernel) {
	this.isDown = false;
	this.updatesDown = 0;
	this.updatesUp = p_kernel.tools.BIG_NUMBER;
	this.timeDown = 0;
	this.timeUp = p_kernel.tools.BIG_NUMBER;
	this.updatesDownPrevious = 0;
	this.updatesUpPrevious = p_kernel.tools.BIG_NUMBER;
	this.timeDownPrevious = 0;
	this.timeUpPrevious = p_kernel.tools.BIG_NUMBER;
};
$hxClasses["awe6.core.drivers._AInputMouse._HelperButton"] = awe6_core_drivers__$AInputMouse__$HelperButton;
awe6_core_drivers__$AInputMouse__$HelperButton.__name__ = true;
awe6_core_drivers__$AInputMouse__$HelperButton.prototype = {
	__class__: awe6_core_drivers__$AInputMouse__$HelperButton
};
var awe6_interfaces_ILogger = function() { };
$hxClasses["awe6.interfaces.ILogger"] = awe6_interfaces_ILogger;
awe6_interfaces_ILogger.__name__ = true;
var awe6_interfaces_IKernel = function() { };
$hxClasses["awe6.interfaces.IKernel"] = awe6_interfaces_IKernel;
awe6_interfaces_IKernel.__name__ = true;
awe6_interfaces_IKernel.__interfaces__ = [awe6_interfaces_ILogger,awe6_interfaces_IPauseable];
awe6_interfaces_IKernel.prototype = {
	__class__: awe6_interfaces_IKernel
};
var awe6_core_drivers_AKernel = function(p_factory,p_context) {
	this.factory = p_factory;
	this._context = p_context;
	this.tools = this._tools = new awe6_core_Tools(this);
	awe6_core_Process.call(this,this);
};
$hxClasses["awe6.core.drivers.AKernel"] = awe6_core_drivers_AKernel;
awe6_core_drivers_AKernel.__name__ = true;
awe6_core_drivers_AKernel.__interfaces__ = [awe6_interfaces_IKernel];
awe6_core_drivers_AKernel.__super__ = awe6_core_Process;
awe6_core_drivers_AKernel.prototype = $extend(awe6_core_Process.prototype,{
	_init: function() {
		awe6_core_Process.prototype._init.call(this);
		this._view = new awe6_core_drivers_createjs_View(this,this._context,0,this);
		this._processes = new List();
		this._helperFramerate = new awe6_core_drivers__$AKernel__$HelperFramerate(this.factory.targetFramerate);
		this._isPreloaded = false;
		this.isDebug = this.factory.isDebug;
		this.isLocal = this._driverGetIsLocal();
		this._driverInit();
		this.assets = this._assetManagerProcess = new awe6_core_AAssetManager(this._kernel);
		this.audio = this._audioManager = new awe6_core_drivers_createjs_AudioManager(this._kernel);
		this.inputs = this._inputManager = new awe6_core_InputManager(this._kernel);
		this.scenes = this._sceneManager = new awe6_core_SceneManager(this._kernel);
		this.messenger = this._messageManager = new awe6_core_MessageManager(this._kernel);
		this._view.addChild(this._sceneManager.view,1);
		this._addProcess(this._assetManagerProcess);
		this._addProcess(this._inputManager);
		this._addProcess(this._sceneManager);
		this._addProcess(this._messageManager);
		this._addProcess(this._audioManager);
		this.set_isEyeCandy(true);
		this.set_isFullScreen(false);
		this.factory.onInitComplete(this);
		this.set_session(this.factory.createSession());
		this.get_session().reset();
		this._preloader = this.factory.createPreloader();
		this._addProcess(this._preloader);
		this._view.addChild(this._preloader.get_view(),2);
	}
	,_driverGetIsLocal: function() {
		return false;
	}
	,_driverInit: function() {
	}
	,_driverDisposer: function() {
	}
	,onPreloaderComplete: function(p_preloader) {
		this._isPreloaded = true;
		this._removeProcess(this._preloader);
		this._preloader = null;
		this._logger = this.factory.createLogger();
		var l_assetManagerProcess = this.factory.createAssetManager();
		if(l_assetManagerProcess != this._assetManagerProcess) {
			this._removeProcess(this._assetManagerProcess);
			this.assets = this._assetManagerProcess = l_assetManagerProcess;
			this._addProcess(this._assetManagerProcess,false);
		}
		this.overlay = this._overlayProcess = this.factory.createOverlay();
		this._addProcess(this._overlayProcess,true);
		this._view.addChild(this._overlayProcess.get_view(),3);
		if(this.isDebug) {
			this._addProcess(this._profiler = new awe6_core_drivers_createjs_Profiler(this));
			this._view.addChild(this._profiler.get_view(),this._tools.BIG_NUMBER);
		}
		this.scenes.setScene(this.factory.startingSceneType);
		this.overlay.flash();
	}
	,_updater: function(p_deltaTime) {
		if(p_deltaTime == null) p_deltaTime = 0;
		this._helperFramerate.update();
		var l_deltaTime;
		if(this.factory.isFixedUpdates) l_deltaTime = 1000 / this.factory.targetFramerate | 0; else l_deltaTime = this._helperFramerate.timeInterval;
		awe6_core_Process.prototype._updater.call(this,l_deltaTime);
		var _g_head = this._processes.h;
		var _g_val = null;
		while(_g_head != null) {
			var i;
			i = (function($this) {
				var $r;
				_g_val = _g_head[0];
				_g_head = _g_head[1];
				$r = _g_val;
				return $r;
			}(this));
			i.update(l_deltaTime);
		}
		this._view.update(l_deltaTime);
	}
	,_disposer: function() {
		var _g_head = this._processes.h;
		var _g_val = null;
		while(_g_head != null) {
			var i;
			i = (function($this) {
				var $r;
				_g_val = _g_head[0];
				_g_head = _g_head[1];
				$r = _g_val;
				return $r;
			}(this));
			this._removeProcess(i);
		}
		if(js_Boot.__instanceof(this.factory,awe6_interfaces_IDisposable)) (js_Boot.__cast(this.factory , awe6_interfaces_IDisposable)).dispose();
		this.factory = null;
		this._view.dispose();
		this._view = null;
		this._driverDisposer();
		this.assets = this._assetManagerProcess = null;
		this.audio = this._audioManager = null;
		this.inputs = this._inputManager = null;
		this.scenes = this._sceneManager = null;
		this.messenger = this._messageManager = null;
		this.overlay = this._overlayProcess = null;
		this.tools = this._tools = null;
		this._logger = null;
		this._preloader = null;
		this.set_session(null);
		awe6_core_Process.prototype._disposer.call(this);
	}
	,getConfig: function(p_id) {
		if(this.factory.config.exists(p_id)) return this.factory.config.get(p_id); else return null;
	}
	,getFramerate: function(p_asActual) {
		if(p_asActual == null) p_asActual = true;
		if(p_asActual) return this._helperFramerate.framerate; else return this.factory.targetFramerate;
	}
	,_addProcess: function(p_process,p_isLast) {
		if(p_isLast == null) p_isLast = true;
		if(p_process == null) return;
		if(p_isLast) this._processes.add(p_process); else this._processes.push(p_process);
	}
	,_removeProcess: function(p_process) {
		if(p_process == null) return false;
		p_process.dispose();
		return this._processes.remove(p_process);
	}
	,set_isEyeCandy: function(p_value) {
		if(!this.factory.isEyeCandyOptionEnabled) {
			this.isEyeCandy = true;
			return this.isEyeCandy;
		}
		this.isEyeCandy = p_value;
		this._driverSetIsEyeCandy(p_value);
		return this.isEyeCandy;
	}
	,_driverSetIsEyeCandy: function(p_value) {
	}
	,set_isFullScreen: function(p_value) {
		if(!this.factory.isFullScreenOptionEnabled || Type.enumEq(this.factory.fullScreenType,awe6_interfaces_EFullScreen.DISABLED)) {
			this.isFullScreen = false;
			return this.isFullScreen;
		}
		this.isFullScreen = p_value;
		this._driverSetIsFullScreen(p_value);
		return this.isFullScreen;
	}
	,_driverSetIsFullScreen: function(p_value) {
	}
	,_pauser: function() {
		awe6_core_Process.prototype._pauser.call(this);
		if(this.scenes.get_scene() != null) this.scenes.get_scene().pause();
	}
	,_resumer: function() {
		awe6_core_Process.prototype._resumer.call(this);
		if(this.scenes.get_scene() != null) this.scenes.get_scene().resume();
	}
	,get_session: function() {
		return this.session;
	}
	,set_session: function(p_value) {
		this.session = p_value;
		return this.get_session();
	}
	,__class__: awe6_core_drivers_AKernel
});
var awe6_core_drivers__$AKernel__$HelperFramerate = function(p_framerate) {
	this.framerate = p_framerate;
	this._timeAtLastUpdate = Std["int"](haxe_Timer.stamp() * 1000);
};
$hxClasses["awe6.core.drivers._AKernel._HelperFramerate"] = awe6_core_drivers__$AKernel__$HelperFramerate;
awe6_core_drivers__$AKernel__$HelperFramerate.__name__ = true;
awe6_core_drivers__$AKernel__$HelperFramerate.prototype = {
	update: function() {
		this.timeInterval = Std["int"](haxe_Timer.stamp() * 1000) - this._timeAtLastUpdate;
		this.framerate = 1000 / this.timeInterval;
		this._timeAtLastUpdate = Std["int"](haxe_Timer.stamp() * 1000);
	}
	,__class__: awe6_core_drivers__$AKernel__$HelperFramerate
};
var awe6_interfaces_IOverlay = function() { };
$hxClasses["awe6.interfaces.IOverlay"] = awe6_interfaces_IOverlay;
awe6_interfaces_IOverlay.__name__ = true;
awe6_interfaces_IOverlay.prototype = {
	__class__: awe6_interfaces_IOverlay
};
var awe6_interfaces_IOverlayProcess = function() { };
$hxClasses["awe6.interfaces.IOverlayProcess"] = awe6_interfaces_IOverlayProcess;
awe6_interfaces_IOverlayProcess.__name__ = true;
awe6_interfaces_IOverlayProcess.__interfaces__ = [awe6_interfaces_IViewable,awe6_interfaces_IProcess,awe6_interfaces_IOverlay];
var awe6_core_drivers_AOverlay = function(p_kernel,p_buttonWidth,p_buttonHeight,p_border,p_backUp,p_backOver,p_muteUp,p_muteOver,p_unmuteUp,p_unmuteOver,p_pauseUp,p_pauseOver,p_unpauseUp,p_unpauseOver,p_pauseBlur,p_pauseColor,p_pauseAlpha) {
	if(p_pauseAlpha == null) p_pauseAlpha = .35;
	if(p_pauseColor == null) p_pauseColor = 0;
	if(p_pauseBlur == null) p_pauseBlur = 8;
	if(p_buttonHeight == null) p_buttonHeight = 30.0;
	if(p_buttonWidth == null) p_buttonWidth = 30.0;
	if(p_border == null) p_border = new awe6_core_drivers_createjs_View(p_kernel);
	if(p_backUp == null) p_backUp = new awe6_core_drivers_createjs_View(p_kernel);
	if(p_backOver == null) p_backOver = new awe6_core_drivers_createjs_View(p_kernel);
	if(p_muteUp == null) p_muteUp = new awe6_core_drivers_createjs_View(p_kernel);
	if(p_muteOver == null) p_muteOver = new awe6_core_drivers_createjs_View(p_kernel);
	if(p_unmuteUp == null) p_unmuteUp = new awe6_core_drivers_createjs_View(p_kernel);
	if(p_unmuteOver == null) p_unmuteOver = new awe6_core_drivers_createjs_View(p_kernel);
	if(p_pauseUp == null) p_pauseUp = new awe6_core_drivers_createjs_View(p_kernel);
	if(p_pauseOver == null) p_pauseOver = new awe6_core_drivers_createjs_View(p_kernel);
	if(p_unpauseUp == null) p_unpauseUp = new awe6_core_drivers_createjs_View(p_kernel);
	if(p_unpauseOver == null) p_unpauseOver = new awe6_core_drivers_createjs_View(p_kernel);
	this._borderView = p_border;
	this._buttonBack = new awe6_core_BasicButton(p_kernel,p_backUp,p_backOver,p_buttonWidth,p_buttonHeight);
	this._buttonMute = new awe6_core_BasicButton(p_kernel,p_muteUp,p_muteOver,p_buttonWidth,p_buttonHeight);
	this._buttonUnmute = new awe6_core_BasicButton(p_kernel,p_unmuteUp,p_unmuteOver,p_buttonWidth,p_buttonHeight);
	this._buttonPause = new awe6_core_BasicButton(p_kernel,p_pauseUp,p_pauseOver,p_buttonWidth,p_buttonHeight);
	this._buttonUnpause = new awe6_core_BasicButton(p_kernel,p_unpauseUp,p_unpauseOver,p_buttonWidth,p_buttonHeight);
	this._pauseBlur = p_pauseBlur;
	this._pauseColor = p_pauseColor;
	this._pauseAlpha = p_pauseAlpha;
	this._context = new createjs.Container();
	awe6_core_Entity.call(this,p_kernel,null,this._context);
};
$hxClasses["awe6.core.drivers.AOverlay"] = awe6_core_drivers_AOverlay;
awe6_core_drivers_AOverlay.__name__ = true;
awe6_core_drivers_AOverlay.__interfaces__ = [awe6_interfaces_IOverlayProcess];
awe6_core_drivers_AOverlay.__super__ = awe6_core_Entity;
awe6_core_drivers_AOverlay.prototype = $extend(awe6_core_Entity.prototype,{
	_init: function() {
		awe6_core_Entity.prototype._init.call(this);
		this.get_view().addChild(this._borderView,4);
		this._wasMute = this._kernel.audio.isMute;
		this._driverInit();
		this._progressView = new awe6_core_drivers_createjs_View(this._kernel,this._progressContext);
		this._progressView.set_isVisible(false);
		this._pauseView = new awe6_core_drivers_createjs_View(this._kernel,this._pauseContext);
		this._pauseView.set_isVisible(false);
		this._flashView = new awe6_core_drivers_createjs_View(this._kernel,this._flashContext);
		this._flashView.set_isVisible(false);
		this._flashStartingAlpha = 1;
		this._flashAsTime = true;
		this._flashDuration = this._flashStartingDuration = 100;
		this._buttonBack.onClickCallback = (function(f,a1) {
			return function() {
				f(a1);
			};
		})($bind(this,this.activateButton),awe6_interfaces_EOverlayButton.BACK);
		this._buttonMute.onClickCallback = (function(f1,a11) {
			return function() {
				f1(a11);
			};
		})($bind(this,this.activateButton),awe6_interfaces_EOverlayButton.MUTE);
		this._buttonPause.onClickCallback = (function(f2,a12) {
			return function() {
				f2(a12);
			};
		})($bind(this,this.activateButton),awe6_interfaces_EOverlayButton.PAUSE);
		this._buttonUnmute.onClickCallback = (function(f3,a13) {
			return function() {
				f3(a13);
			};
		})($bind(this,this.activateButton),awe6_interfaces_EOverlayButton.UNMUTE);
		this._buttonUnpause.onClickCallback = (function(f4,a14) {
			return function() {
				f4(a14);
			};
		})($bind(this,this.activateButton),awe6_interfaces_EOverlayButton.UNPAUSE);
		this.get_view().addChild(this._flashView,1);
		this.get_view().addChild(this._pauseView,2);
		this.get_view().addChild(this._progressView,3);
		this.addEntity(this._buttonBack,null,true,21);
		this.addEntity(this._buttonUnmute,null,true,22);
		this.addEntity(this._buttonMute,null,true,23);
		this.addEntity(this._buttonUnpause,null,true,24);
		this.addEntity(this._buttonPause,null,true,25);
		var l_height = this._buttonBack.height;
		var l_width = this._buttonBack.width;
		var l_x = this._kernel.factory.width - l_width * 4;
		var l_y = l_height;
		this.positionButton(awe6_interfaces_EOverlayButton.BACK,l_x,l_y);
		this.positionButton(awe6_interfaces_EOverlayButton.MUTE,l_x += l_width,l_y);
		this.positionButton(awe6_interfaces_EOverlayButton.UNMUTE,l_x,l_y);
		this.positionButton(awe6_interfaces_EOverlayButton.PAUSE,l_x += l_width,l_y);
		this.positionButton(awe6_interfaces_EOverlayButton.UNPAUSE,l_x,l_y);
	}
	,_driverInit: function() {
		this._progressContext = new createjs.Container();
		this._pauseContext = new createjs.Container();
		this._flashContext = new createjs.Container();
	}
	,_updater: function(p_deltaTime) {
		if(p_deltaTime == null) p_deltaTime = 0;
		awe6_core_Entity.prototype._updater.call(this,p_deltaTime);
		if(this._flashDuration > 0) {
			if(this._flashAsTime) this._flashDuration -= p_deltaTime; else this._flashDuration -= 1;
			this._flashAlpha = this._tools.limit(this._flashStartingAlpha * (this._flashDuration / this._flashStartingDuration),0,1);
		}
		this._flashView.set_isVisible(this._flashAlpha > 0);
		if(this._kernel.factory.keyBack != null && this._kernel.inputs.keyboard.getIsKeyPress(this._kernel.factory.keyBack)) this.activateButton(this._kernel.isActive?awe6_interfaces_EOverlayButton.BACK:awe6_interfaces_EOverlayButton.UNPAUSE);
		if(this._kernel.factory.keyPause != null && this._kernel.inputs.keyboard.getIsKeyPress(this._kernel.factory.keyPause)) this.activateButton(this._kernel.isActive?awe6_interfaces_EOverlayButton.PAUSE:awe6_interfaces_EOverlayButton.UNPAUSE);
		if(this._kernel.factory.keyMute != null && this._kernel.inputs.keyboard.getIsKeyPress(this._kernel.factory.keyMute)) this.activateButton(this._kernel.audio.isMute?awe6_interfaces_EOverlayButton.UNMUTE:awe6_interfaces_EOverlayButton.MUTE);
		if(this.get_pauseEntity() != null && !this._kernel.isActive) {
			this.get_pauseEntity().update(p_deltaTime);
			this._pauseView.update(p_deltaTime);
		}
	}
	,_disposer: function() {
		if(this.get_pauseEntity() != null) this.get_pauseEntity().dispose();
		this.get_view().dispose();
		awe6_core_Entity.prototype._disposer.call(this);
	}
	,_getButton: function(p_type) {
		switch(p_type[1]) {
		case 0:
			return this._buttonBack;
		case 1:
			return this._buttonMute;
		case 2:
			return this._buttonUnmute;
		case 3:
			return this._buttonPause;
		case 4:
			return this._buttonUnpause;
		case 5:
			var p_value = p_type[2];
			p_value;
			return null;
		}
	}
	,showButton: function(p_type,p_isVisible) {
		if(p_isVisible == null) p_isVisible = true;
		var l_button = this._getButton(p_type);
		if(l_button == null) return;
		if(p_isVisible) this.addEntity(l_button,null,true); else this.removeEntity(l_button,null,true);
	}
	,positionButton: function(p_type,p_x,p_y,p_width,p_height) {
		var l_button = this._getButton(p_type);
		if(l_button == null) return;
		l_button.set_x(p_x);
		l_button.set_y(p_y);
		if(p_width != null) l_button.set_width(p_width);
		if(p_height != null) l_button.set_height(p_height);
	}
	,hideButtons: function() {
		this.showButton(awe6_interfaces_EOverlayButton.BACK,false);
		this.showButton(awe6_interfaces_EOverlayButton.MUTE,false);
		this.showButton(awe6_interfaces_EOverlayButton.UNMUTE,false);
		this.showButton(awe6_interfaces_EOverlayButton.PAUSE,false);
		this.showButton(awe6_interfaces_EOverlayButton.UNPAUSE,false);
	}
	,flash: function(p_duration,p_asTime,p_startingAlpha,p_color) {
		if(p_color == null) p_color = 16777215;
		if(p_startingAlpha == null) p_startingAlpha = 1;
		if(p_asTime == null) p_asTime = true;
		if(p_duration != null) p_duration = p_duration; else if(p_asTime) p_duration = 500; else p_duration = this._kernel.factory.targetFramerate * .5;
		this._flashDuration = this._flashStartingDuration = p_duration;
		this._flashAsTime = p_asTime;
		this._flashAlpha = p_startingAlpha > 1?this._flashStartingAlpha = 1:p_startingAlpha < 0?this._flashStartingAlpha = 0:this._flashStartingAlpha = p_startingAlpha;
	}
	,activateButton: function(p_type) {
		switch(p_type[1]) {
		case 0:
			if(this._buttonBack.get_view().get_isInViewStack()) {
				if(!this._kernel.isActive) this.activateButton(awe6_interfaces_EOverlayButton.UNPAUSE);
				this._drawPause(false);
				this._kernel.resume();
				this._kernel.scenes.back();
			}
			break;
		case 1:
			if(this._buttonMute.get_view().get_isInViewStack()) {
				this.showButton(awe6_interfaces_EOverlayButton.MUTE,false);
				this.showButton(awe6_interfaces_EOverlayButton.UNMUTE,true);
				this._kernel.audio.set_isMute(true);
			}
			break;
		case 2:
			if(this._buttonUnmute.get_view().get_isInViewStack() && !this._buttonUnpause.get_view().get_isInViewStack()) {
				this.showButton(awe6_interfaces_EOverlayButton.MUTE,true);
				this.showButton(awe6_interfaces_EOverlayButton.UNMUTE,false);
				this._kernel.audio.set_isMute(false);
			}
			break;
		case 3:
			if(this._buttonPause.get_view().get_isInViewStack()) {
				this._kernel.pause();
				this._drawPause(true);
				this._wasMute = this._kernel.audio.isMute;
				this.showButton(awe6_interfaces_EOverlayButton.PAUSE,false);
				this.showButton(awe6_interfaces_EOverlayButton.UNPAUSE,true);
				this.activateButton(awe6_interfaces_EOverlayButton.MUTE);
			}
			break;
		case 4:
			if(this._buttonUnpause.get_view().get_isInViewStack()) {
				this.showButton(awe6_interfaces_EOverlayButton.PAUSE,true);
				this.showButton(awe6_interfaces_EOverlayButton.UNPAUSE,false);
				this.activateButton(this._wasMute?awe6_interfaces_EOverlayButton.MUTE:awe6_interfaces_EOverlayButton.UNMUTE);
				this._kernel.resume();
				this._drawPause(false);
			}
			break;
		case 5:
			var p_value = p_type[2];
			p_value;
			null;
			break;
		}
	}
	,_drawPause: function(p_isVisible) {
		if(p_isVisible == null) p_isVisible = true;
		this._pauseView.set_isVisible(p_isVisible);
	}
	,get_pauseEntity: function() {
		return this.pauseEntity;
	}
	,__class__: awe6_core_drivers_AOverlay
});
var awe6_interfaces_IProgress = function() { };
$hxClasses["awe6.interfaces.IProgress"] = awe6_interfaces_IProgress;
awe6_interfaces_IProgress.__name__ = true;
var awe6_interfaces_IPreloader = function() { };
$hxClasses["awe6.interfaces.IPreloader"] = awe6_interfaces_IPreloader;
awe6_interfaces_IPreloader.__name__ = true;
awe6_interfaces_IPreloader.__interfaces__ = [awe6_interfaces_IProgress,awe6_interfaces_IViewable,awe6_interfaces_IProcess];
var awe6_core_drivers_APreloader = function(p_kernel,p_assets,p_isDecached) {
	if(p_isDecached == null) p_isDecached = false;
	this._assets = p_assets;
	this._isDecached = p_isDecached;
	awe6_core_Process.call(this,p_kernel);
};
$hxClasses["awe6.core.drivers.APreloader"] = awe6_core_drivers_APreloader;
awe6_core_drivers_APreloader.__name__ = true;
awe6_core_drivers_APreloader.__interfaces__ = [awe6_interfaces_IPreloader];
awe6_core_drivers_APreloader.__super__ = awe6_core_Process;
awe6_core_drivers_APreloader.prototype = $extend(awe6_core_Process.prototype,{
	_init: function() {
		awe6_core_Process.prototype._init.call(this);
		this.progress = 0;
		if(this.get_view() == null) this.view = new awe6_core_drivers_createjs_View(this._kernel);
		this._encrypter = this._tools;
		this._currentProgress = 0;
		this._currentAsset = 0;
		this._isComplete = false;
		if(this._assets.length > 0) this._next();
	}
	,_next: function() {
		this._currentAsset++;
		if(this._currentAsset > this._assets.length) {
			if(!this._isComplete) {
				try {
					haxe_Timer.delay((function(f,a1) {
						return function() {
							f(a1);
						};
					})(($_=this._kernel,$bind($_,$_.onPreloaderComplete)),this),100);
				} catch( p_error ) {
					if (p_error instanceof js__$Boot_HaxeError) p_error = p_error.val;
				}
				this._isComplete = true;
			}
			return;
		} else this._driverLoad(this._assets[this._currentAsset - 1]);
		this._currentProgress = 0;
	}
	,_driverLoad: function(p_url) {
	}
	,_updater: function(p_deltaTime) {
		if(p_deltaTime == null) p_deltaTime = 0;
		awe6_core_Process.prototype._updater.call(this,p_deltaTime);
		if(this._assets.length == 0) this._kernel.onPreloaderComplete(this);
		this.get_view().set_isVisible(this._age > 100);
	}
	,_disposer: function() {
		this.get_view().dispose();
		this._driverDisposer();
		awe6_core_Process.prototype._disposer.call(this);
	}
	,_driverDisposer: function() {
	}
	,get_view: function() {
		return this.view;
	}
	,__class__: awe6_core_drivers_APreloader
});
var awe6_core_drivers_AProfiler = function(p_kernel) {
	this._context = new createjs.Container();
	awe6_core_Entity.call(this,p_kernel,null,this._context);
};
$hxClasses["awe6.core.drivers.AProfiler"] = awe6_core_drivers_AProfiler;
awe6_core_drivers_AProfiler.__name__ = true;
awe6_core_drivers_AProfiler.__super__ = awe6_core_Entity;
awe6_core_drivers_AProfiler.prototype = $extend(awe6_core_Entity.prototype,{
	_init: function() {
		awe6_core_Entity.prototype._init.call(this);
		this._marginHeight = 25;
		this._marginColor = 128;
		this._backgroundColor = -2147483520;
		this._fpsColor = 16777215;
		this._memoryColor = 16744448;
		this._fpsLabel = "FPS";
		this._memoryLabel = "MBs";
		this._width = 60;
		this._height = 50;
		this._agePrev = 0;
	}
	,_updater: function(p_deltaTime) {
		if(p_deltaTime == null) p_deltaTime = 0;
		awe6_core_Entity.prototype._updater.call(this,p_deltaTime);
		if(this._age < this._agePrev + 250) return;
		this._agePrev = this._age;
		this._driverUpdate();
	}
	,_driverUpdate: function() {
	}
	,__class__: awe6_core_drivers_AProfiler
});
var awe6_interfaces_ISceneTransition = function() { };
$hxClasses["awe6.interfaces.ISceneTransition"] = awe6_interfaces_ISceneTransition;
awe6_interfaces_ISceneTransition.__name__ = true;
awe6_interfaces_ISceneTransition.__interfaces__ = [awe6_interfaces_IViewable,awe6_interfaces_IProgress,awe6_interfaces_IProcess];
var awe6_core_drivers_ASceneTransition = function(p_kernel,p_duration) {
	if(p_duration == null) p_duration = 500;
	this._duration = p_duration;
	this._context = new createjs.Container();
	awe6_core_Entity.call(this,p_kernel,null,this._context);
};
$hxClasses["awe6.core.drivers.ASceneTransition"] = awe6_core_drivers_ASceneTransition;
awe6_core_drivers_ASceneTransition.__name__ = true;
awe6_core_drivers_ASceneTransition.__interfaces__ = [awe6_interfaces_ISceneTransition];
awe6_core_drivers_ASceneTransition.__super__ = awe6_core_Entity;
awe6_core_drivers_ASceneTransition.prototype = $extend(awe6_core_Entity.prototype,{
	_init: function() {
		awe6_core_Entity.prototype._init.call(this);
	}
	,_updater: function(p_deltaTime) {
		if(p_deltaTime == null) p_deltaTime = 0;
		awe6_core_Entity.prototype._updater.call(this,p_deltaTime);
		if(this._age > this._duration) {
			if(this.isDisposed) null; else {
				this.isDisposed = true;
				this.set_isActive(false);
				this._disposer();
				null;
			}
		}
	}
	,get_progress: function() {
		return this._tools.limit(this._age / this._duration,0,1);
	}
	,__class__: awe6_core_drivers_ASceneTransition
});
var awe6_interfaces_ISession = function() { };
$hxClasses["awe6.interfaces.ISession"] = awe6_interfaces_ISession;
awe6_interfaces_ISession.__name__ = true;
awe6_interfaces_ISession.prototype = {
	__class__: awe6_interfaces_ISession
};
var awe6_core_drivers_ASession = function(p_kernel,p_id) {
	if(p_id == null) p_id = "";
	this._kernel = p_kernel;
	if(p_id == "") p_id = "DEBUG_AWE6";
	this.id = p_id;
	this._tools = this._kernel.tools;
	this._version = 1;
	this._init();
};
$hxClasses["awe6.core.drivers.ASession"] = awe6_core_drivers_ASession;
awe6_core_drivers_ASession.__name__ = true;
awe6_core_drivers_ASession.__interfaces__ = [awe6_interfaces_ISession];
awe6_core_drivers_ASession.prototype = {
	_init: function() {
		this._driverLoad();
		var l_version = Reflect.field(this._savedData,"_____VERSION");
		if(l_version != this._version) this._driverReset();
		var l_isExistingSession = Reflect.field(this._savedData,this.id) != null;
		this._data = { };
		this._resetter();
		this._setter();
		if(l_isExistingSession) {
			this._data = Reflect.field(this._savedData,this.id);
			this._getter();
			this.loadCount++;
		}
	}
	,_driverLoad: function() {
		this._savedData = { };
	}
	,_driverSave: function() {
	}
	,_driverReset: function() {
		this._savedData = { };
	}
	,_getter: function() {
		this.loadCount = this._data.loadCount;
		this.saveCount = this._data.saveCount;
	}
	,_setter: function() {
		this._data.loadCount = this.loadCount;
		this._data.saveCount = this.saveCount;
	}
	,_resetter: function() {
		this.loadCount = 0;
		this.saveCount = 0;
	}
	,reset: function(p_isSaved) {
		if(p_isSaved == null) p_isSaved = false;
		this._data = { };
		this._resetter();
		this._setter();
		if(p_isSaved) {
			this.saveCount++;
			this._setter();
			this._savedData._____VERSION = this._version;
			this._savedData[this.id] = this._data;
			this._driverSave();
		}
	}
	,save: function() {
		this.saveCount++;
		this._setter();
		this._savedData._____VERSION = this._version;
		this._savedData[this.id] = this._data;
		this._driverSave();
	}
	,__class__: awe6_core_drivers_ASession
};
var awe6_interfaces_IPriority = function() { };
$hxClasses["awe6.interfaces.IPriority"] = awe6_interfaces_IPriority;
awe6_interfaces_IPriority.__name__ = true;
awe6_interfaces_IPriority.prototype = {
	__class__: awe6_interfaces_IPriority
};
var awe6_interfaces_IView = function() { };
$hxClasses["awe6.interfaces.IView"] = awe6_interfaces_IView;
awe6_interfaces_IView.__name__ = true;
awe6_interfaces_IView.__interfaces__ = [awe6_interfaces_IUpdateable,awe6_interfaces_IDisposable,awe6_interfaces_IPositionable,awe6_interfaces_IPriority];
awe6_interfaces_IView.prototype = {
	__class__: awe6_interfaces_IView
};
var awe6_core_drivers_AView = function(p_kernel,p_context,p_priority,p_owner) {
	if(p_priority == null) p_priority = 0;
	this.context = p_context;
	this.set_priority(p_priority);
	this.owner = p_owner;
	awe6_core_Process.call(this,p_kernel);
};
$hxClasses["awe6.core.drivers.AView"] = awe6_core_drivers_AView;
awe6_core_drivers_AView.__name__ = true;
awe6_core_drivers_AView.__interfaces__ = [awe6_interfaces_IView];
awe6_core_drivers_AView.__super__ = awe6_core_Process;
awe6_core_drivers_AView.prototype = $extend(awe6_core_Process.prototype,{
	_init: function() {
		awe6_core_Process.prototype._init.call(this);
		this.globalX = 0;
		this.globalY = 0;
		this.set_x(0);
		this.set_y(0);
		this.set_isVisible(true);
		this._isDirty = true;
		this._children = [];
	}
	,addChild: function(p_child,p_priority) {
		if(p_priority == null) p_priority = 0;
		if(this.isDisposed || p_child == null) return null;
		if(p_child.get_parent() != this) {
			p_child.remove();
			if(js_Boot.__instanceof(p_child,awe6_core_drivers_AView)) {
				var l_child = p_child;
				this._children.push(l_child);
				l_child._setParent(this);
			}
		}
		if(p_priority != 0) p_child.set_priority(p_priority);
		this._isDirty = true;
		return p_child;
	}
	,removeChild: function(p_child) {
		if(this.isDisposed || p_child == null) return;
		if(js_Boot.__instanceof(p_child,awe6_core_drivers_AView)) {
			var l_child = p_child;
			if(l_child.get_parent() != this) return;
			HxOverrides.remove(this._children,l_child);
			l_child._setParent(null);
		}
		this._isDirty = true;
	}
	,remove: function() {
		if(this.get_parent() != null) this.get_parent().removeChild(this);
	}
	,clear: function() {
		var _g = 0;
		var _g1 = this._children;
		while(_g < _g1.length) {
			var i = _g1[_g];
			++_g;
			this.removeChild(i);
		}
	}
	,_updater: function(p_deltaTime) {
		if(p_deltaTime == null) p_deltaTime = 0;
		awe6_core_Process.prototype._updater.call(this,p_deltaTime);
		var _g = 0;
		var _g1 = this._children;
		while(_g < _g1.length) {
			var i = _g1[_g];
			++_g;
			if(!i.isActive || i.isDisposed) null; else {
				i._age += p_deltaTime;
				i._updates++;
				i._updater(p_deltaTime);
				null;
			}
		}
		if(this._isDirty) this._draw();
		if(this.get_parent() == null) this.globalX = this.x; else this.globalX = this.x + this.get_parent().globalX;
		if(this.get_parent() == null) this.globalY = this.y; else this.globalY = this.y + this.get_parent().globalY;
	}
	,_disposer: function() {
		this.remove();
		this._driverDisposer();
		this.clear();
		awe6_core_Process.prototype._disposer.call(this);
	}
	,_driverDisposer: function() {
	}
	,_draw: function() {
		if(this.isDisposed) return;
		this._children.sort(($_=this._tools,$bind($_,$_.sortByPriority)));
		this._driverDraw();
		this._isDirty = false;
	}
	,_driverDraw: function() {
	}
	,_setParent: function(p_parent) {
		this.parent = p_parent;
	}
	,get_priority: function() {
		return this.priority;
	}
	,set_priority: function(p_value) {
		if(p_value == this.get_priority()) return this.get_priority();
		this.priority = p_value;
		if(Std["is"](this.get_parent(),awe6_core_drivers_AView)) {
			var l_parent = this.get_parent();
			if(l_parent != null) l_parent._isDirty = true;
		}
		return this.get_priority();
	}
	,set_isVisible: function(p_value) {
		if(p_value == this.isVisible) return this.isVisible;
		this.isVisible = p_value;
		if(Std["is"](this.get_parent(),awe6_core_drivers_AView)) {
			var l_parent = this.get_parent();
			if(l_parent != null) l_parent._draw();
		}
		return this.isVisible;
	}
	,get_parent: function() {
		return this.parent;
	}
	,get_isInViewStack: function() {
		if(!this.isVisible) return false;
		if(this.owner == this._kernel) return true;
		if(this.get_parent() == null) return false;
		return this.get_parent().get_isInViewStack();
	}
	,set_x: function(p_value) {
		this.x = p_value;
		if(this.get_parent() == null) this.globalX = this.x; else this.globalX = this.x + this.get_parent().globalX;
		return this.x;
	}
	,set_y: function(p_value) {
		this.y = p_value;
		if(this.get_parent() == null) this.globalY = this.y; else this.globalY = this.y + this.get_parent().globalY;
		return this.y;
	}
	,__class__: awe6_core_drivers_AView
});
var awe6_core_drivers_createjs_AudioManager = function(p_kernel) {
	awe6_core_drivers_AAudioManager.call(this,p_kernel);
};
$hxClasses["awe6.core.drivers.createjs.AudioManager"] = awe6_core_drivers_createjs_AudioManager;
awe6_core_drivers_createjs_AudioManager.__name__ = true;
awe6_core_drivers_createjs_AudioManager.__super__ = awe6_core_drivers_AAudioManager;
awe6_core_drivers_createjs_AudioManager.prototype = $extend(awe6_core_drivers_AAudioManager.prototype,{
	_init: function() {
		awe6_core_drivers_AAudioManager.prototype._init.call(this);
		this._visibilityWasMute = this.isMute;
		window.document.addEventListener("visibilitychange",$bind(this,this._onVisibilityChange));
	}
	,_disposer: function() {
		window.document.removeEventListener("visibilitychange",$bind(this,this._onVisibilityChange));
		awe6_core_drivers_AAudioManager.prototype._disposer.call(this);
	}
	,_driverSoundFactory: function(p_id,p_audioChannelType,p_loops,p_startTime,p_volume,p_pan,p_onCompleteCallback) {
		if(p_pan == null) p_pan = 0;
		if(p_volume == null) p_volume = 1;
		if(p_startTime == null) p_startTime = 0;
		if(p_loops == null) p_loops = 1;
		return new awe6_core_drivers_createjs__$HelperSound(this._kernel,p_id,this._packageId,p_audioChannelType,p_loops,p_startTime,p_volume,p_pan,p_onCompleteCallback);
	}
	,_driverSetIsMute: function(p_value) {
		createjs.Sound.setMute(p_value);
	}
	,_onVisibilityChange: function(p_event) {
		var l_isHidden = this._getVisibilityPropery();
		if(l_isHidden) {
			this._visibilityWasMute = this.isMute;
			this.set_isMute(true);
		} else this.set_isMute(this._visibilityWasMute);
	}
	,_getVisibilityPropery: function() {
		var l_vendorPrefixes = ["hidden","mozHidden","msHidden","oHidden","webkitHidden"];
		var _g = 0;
		while(_g < l_vendorPrefixes.length) {
			var i = l_vendorPrefixes[_g];
			++_g;
			if(Reflect.hasField(window.document,i)) return Reflect.field(window.document,i);
		}
		return window.document.hidden;
	}
	,__class__: awe6_core_drivers_createjs_AudioManager
});
var awe6_core_drivers_createjs__$HelperSound = function(p_kernel,p_id,p_packageId,p_audioChannelType,p_loops,p_startTime,p_volume,p_pan,p_onCompleteCallback) {
	if(p_pan == null) p_pan = 0;
	if(p_volume == null) p_volume = 1;
	if(p_startTime == null) p_startTime = 0;
	if(p_loops == null) p_loops = 1;
	awe6_core_drivers__$AHelperSound.call(this,p_kernel,p_id,p_packageId,p_audioChannelType,p_loops == 1?0:p_loops,p_startTime,p_volume,p_pan,p_onCompleteCallback);
};
$hxClasses["awe6.core.drivers.createjs._HelperSound"] = awe6_core_drivers_createjs__$HelperSound;
awe6_core_drivers_createjs__$HelperSound.__name__ = true;
awe6_core_drivers_createjs__$HelperSound.__super__ = awe6_core_drivers__$AHelperSound;
awe6_core_drivers_createjs__$HelperSound.prototype = $extend(awe6_core_drivers__$AHelperSound.prototype,{
	_driverInit: function() {
		try {
			this._sound = createjs.Sound.play("assets.audio." + this.id,null,0,this._startTime,this._loops,this._volume,this._pan);
		} catch( p_error ) {
			if (p_error instanceof js__$Boot_HaxeError) p_error = p_error.val;
		}
		if(this._sound == null) return this.dispose();
		this._sound.setMute(this._kernel.audio.isMute);
		this._sound.addEventListener("complete",$bind(this,this._onSoundComplete));
		this._driverTransform();
		return;
	}
	,_driverTransform: function(p_asRelative) {
		if(p_asRelative == null) p_asRelative = false;
		if(this._sound == null) return;
		if(p_asRelative) {
			this._volume *= this._sound.volume;
			this._pan *= this._sound.pan;
		}
		this._sound.volume = this._volume;
		this._sound.pan = this._pan;
	}
	,_driverStop: function() {
		if(this._sound == null) return;
		try {
			this._sound.stop();
		} catch( p_error ) {
			if (p_error instanceof js__$Boot_HaxeError) p_error = p_error.val;
		}
	}
	,_onSoundComplete: function(p_event) {
		if(this._onCompleteCallback != null) this._onCompleteCallback.apply(this,[]);
		this.dispose();
	}
	,__class__: awe6_core_drivers_createjs__$HelperSound
});
var awe6_core_drivers_createjs_Factory = function(p_context,p_isDebug,p_config) {
	awe6_core_drivers_AFactory.call(this,p_context,p_isDebug,p_config);
};
$hxClasses["awe6.core.drivers.createjs.Factory"] = awe6_core_drivers_createjs_Factory;
awe6_core_drivers_createjs_Factory.__name__ = true;
awe6_core_drivers_createjs_Factory.__super__ = awe6_core_drivers_AFactory;
awe6_core_drivers_createjs_Factory.prototype = $extend(awe6_core_drivers_AFactory.prototype,{
	_driverInit: function() {
		if(!this.isDebug) haxe_Log.trace = function(p_value,p_infos) {
			js_Boot.__trace(p_value,null);
		};
		var l_context = new createjs.Container();
		this._context.addChild(l_context);
		this._context = l_context;
		this._countConfigsLoaded = 0;
		this._countConfigsToLoad = 0;
		if(this._config != "") {
			var l_config;
			if(this._config != null) l_config = this._config; else l_config = "assets/__config.xml";
			var l_configAttribute = this._context.getStage().canvas.getAttribute("config");
			if(l_configAttribute != null && l_configAttribute != "") l_config = l_configAttribute;
			this._loadConfig(l_config);
		} else this._launchKernel();
	}
	,_launchKernel: function() {
		this._displayCredits();
		var l_isNativeExperienceValue = true;
		if(this.config.exists("settings.nativeExperience")) l_isNativeExperienceValue = this.config.get("settings.nativeExperience") == "true";
		var l_nativeExperienceAttribute = this._context.getStage().canvas.getAttribute("nativeExperience");
		if(l_nativeExperienceAttribute != null && l_nativeExperienceAttribute != "") l_isNativeExperienceValue = l_nativeExperienceAttribute == "true";
		this.isNativeExperience = l_isNativeExperienceValue;
		awe6_core_drivers_AFactory.prototype._launchKernel.call(this);
		var l_isDesktop = this._concreteKernel.system.isDesktop;
		var l_fullScreenValue = "default";
		if(this.config.exists("settings.fullScreen")) l_fullScreenValue = this.config.get("settings.fullScreen");
		var l_fullScreenAttribute = this._context.getStage().canvas.getAttribute("fullScreen");
		if(l_fullScreenAttribute != null && l_fullScreenAttribute != "") l_fullScreenValue = l_fullScreenAttribute;
		this._kernel.set_isFullScreen(l_isDesktop && (l_fullScreenValue == "desktop" || l_fullScreenValue == "all") || !l_isDesktop && (l_fullScreenValue == "mobile" || l_fullScreenValue == "all" || l_fullScreenValue == "default"));
		if(this._kernel.isFullScreen && this.isNativeExperience && !l_isDesktop) {
			this._concreteKernel.system.requestFullScreen();
			this._concreteKernel.system.requestLockScreen();
		}
	}
	,_displayCredits: function() {
		haxe_Log.trace(this.config.exists("settings.asciiArt")?this.config.get("settings.asciiArt"):"",{ fileName : "Factory.hx", lineNumber : 126, className : "awe6.core.drivers.createjs.Factory", methodName : "_displayCredits"});
		haxe_Log.trace(this.id + " v" + this.version + " by " + this.author,{ fileName : "Factory.hx", lineNumber : 127, className : "awe6.core.drivers.createjs.Factory", methodName : "_displayCredits"});
		haxe_Log.trace("Powered by awe6 (http://awe6.org)",{ fileName : "Factory.hx", lineNumber : 128, className : "awe6.core.drivers.createjs.Factory", methodName : "_displayCredits"});
		haxe_Log.trace("",{ fileName : "Factory.hx", lineNumber : 129, className : "awe6.core.drivers.createjs.Factory", methodName : "_displayCredits"});
	}
	,_loadConfig: function(p_config) {
		if(HxOverrides.substr(p_config,0,5) == "<?xml") this._parseXml(p_config); else {
			if(this.isDecached) p_config += "?dc=" + Std.random(99999);
			var l_loader = new haxe_Http(p_config);
			try {
				l_loader.onError = $bind(this,this._onIOError);
				l_loader.onData = $bind(this,this._onComplete);
				l_loader.request();
			} catch( p_error ) {
				if (p_error instanceof js__$Boot_HaxeError) p_error = p_error.val;
				this._onIOError(Std.string(p_error));
				return;
			}
			this._countConfigsToLoad++;
		}
	}
	,_parseXml: function(p_data) {
		this._traverseElements(Xml.parse(p_data).firstElement().elements(),"");
		if(this.config.exists("settings.joinXml") && this._countConfigsLoaded < 100) {
			var l_url = this.config.get("settings.joinXml");
			this.config.remove("settings.joinXml");
			var l_urls = l_url.split(",");
			var _g = 0;
			while(_g < l_urls.length) {
				var i = l_urls[_g];
				++_g;
				this._loadConfig(i);
			}
		}
		if(this._countConfigsLoaded == this._countConfigsToLoad) this._launchKernel();
	}
	,_onIOError: function(p_event) {
		haxe_Log.trace("IO Errors Occurred During Config Loading:" + p_event,{ fileName : "Factory.hx", lineNumber : 182, className : "awe6.core.drivers.createjs.Factory", methodName : "_onIOError"});
		haxe_Log.trace("Double check your Config path.  Cross domain (or local) file loading of Config is a security risk and is, therefore, disabled on this browser.",{ fileName : "Factory.hx", lineNumber : 183, className : "awe6.core.drivers.createjs.Factory", methodName : "_onIOError"});
		if(this._config != null && HxOverrides.substr(this._config,0,5) == "<?xml") {
			haxe_Log.trace("Embedded Config detected, using that to continue ...",{ fileName : "Factory.hx", lineNumber : 186, className : "awe6.core.drivers.createjs.Factory", methodName : "_onIOError"});
			this._countConfigsLoaded = this._countConfigsToLoad;
			this._parseXml(this._config);
		} else {
			haxe_Log.trace("Use a web server (or local server) to run over http and serve all files from the same domain.  Or embed the Config directlty in the code (e.g. as a Resource).",{ fileName : "Factory.hx", lineNumber : 192, className : "awe6.core.drivers.createjs.Factory", methodName : "_onIOError"});
			haxe_Log.trace("Unable to continue without Config.",{ fileName : "Factory.hx", lineNumber : 193, className : "awe6.core.drivers.createjs.Factory", methodName : "_onIOError"});
		}
	}
	,_onComplete: function(p_event) {
		this._countConfigsLoaded++;
		var l_string = p_event;
		if(HxOverrides.substr(l_string,0,5) != "<?xml") l_string = this.createEncrypter().decrypt(haxe_io_Bytes.ofString(l_string)).toString();
		this._parseXml(l_string);
	}
	,_getAssetUrls: function() {
		var l_result = ["bin/assets/Blank.png","bin/assets/fonts/__Orbitron.eot","bin/assets/fonts/__Orbitron.svg","bin/assets/fonts/__orbitron.ttf","bin/assets/fonts/__Orbitron.woff","bin/assets/__Config.xml","bin/assets/__Icon128.png","bin/assets/__Icon196.png","bin/assets/__Icon256.png"];
		var l_toRemove = [];
		var _g1 = 0;
		var _g = l_result.length;
		while(_g1 < _g) {
			var i = _g1++;
			l_result[i] = HxOverrides.substr(l_result[i],4,null);
			if(HxOverrides.substr(l_result[i],0,2) == "__" || l_result[i].indexOf("/__") > -1) l_toRemove.push(l_result[i]);
		}
		var _g2 = 0;
		while(_g2 < l_toRemove.length) {
			var i1 = l_toRemove[_g2];
			++_g2;
			HxOverrides.remove(l_result,i1);
		}
		return l_result;
	}
	,_driverDisposer: function() {
		if(this._context.parent != null) this._context.parent.removeChild(this._context);
	}
	,__class__: awe6_core_drivers_createjs_Factory
});
var awe6_core_drivers_createjs_InputKeyboard = function(p_kernel) {
	awe6_core_drivers_AInputKeyboard.call(this,p_kernel);
};
$hxClasses["awe6.core.drivers.createjs.InputKeyboard"] = awe6_core_drivers_createjs_InputKeyboard;
awe6_core_drivers_createjs_InputKeyboard.__name__ = true;
awe6_core_drivers_createjs_InputKeyboard.__super__ = awe6_core_drivers_AInputKeyboard;
awe6_core_drivers_createjs_InputKeyboard.prototype = $extend(awe6_core_drivers_AInputKeyboard.prototype,{
	_driverInit: function() {
		this._document = window.document;
		this._preventDefaultKeyCodes = [];
		this._document.addEventListener("keydown",$bind(this,this._onKeyDown));
		this._document.addEventListener("keyup",$bind(this,this._onKeyUp));
	}
	,_disposer: function() {
		this._document.removeEventListener("keydown",$bind(this,this._onKeyDown));
		this._document.removeEventListener("keyup",$bind(this,this._onKeyUp));
		awe6_core_drivers_AInputKeyboard.prototype._disposer.call(this);
	}
	,_onKeyDown: function(p_event) {
		if(!this.isActive) return;
		if(Lambda.has(this._preventDefaultKeyCodes,p_event.keyCode)) p_event.preventDefault();
		this._addEvent(p_event.keyCode,true);
	}
	,_onKeyUp: function(p_event) {
		if(!this.isActive) return;
		if(Lambda.has(this._preventDefaultKeyCodes,p_event.keyCode)) p_event.preventDefault();
		this._addEvent(p_event.keyCode,false);
	}
	,preventDefaultForKeys: function(p_keyTypes) {
		if(p_keyTypes == null) return;
		var _g = 0;
		while(_g < p_keyTypes.length) {
			var i = p_keyTypes[_g];
			++_g;
			var l_keyCode = this.getKeyCode(i);
			if(!Lambda.has(this._preventDefaultKeyCodes,l_keyCode)) this._preventDefaultKeyCodes.push(l_keyCode);
		}
	}
	,allowDefaultForKeys: function(p_keyTypes) {
		if(p_keyTypes == null) return;
		var i = 0;
		while(i < this._preventDefaultKeyCodes.length) {
			var l_keyType = this.getKey(this._preventDefaultKeyCodes[i]);
			if(Lambda.has(p_keyTypes,l_keyType)) this._preventDefaultKeyCodes.splice(i,1); else i++;
		}
	}
	,__class__: awe6_core_drivers_createjs_InputKeyboard
});
var awe6_core_drivers_createjs_InputMouse = function(p_kernel) {
	awe6_core_drivers_AInputMouse.call(this,p_kernel);
};
$hxClasses["awe6.core.drivers.createjs.InputMouse"] = awe6_core_drivers_createjs_InputMouse;
awe6_core_drivers_createjs_InputMouse.__name__ = true;
awe6_core_drivers_createjs_InputMouse.__super__ = awe6_core_drivers_AInputMouse;
awe6_core_drivers_createjs_InputMouse.prototype = $extend(awe6_core_drivers_AInputMouse.prototype,{
	_driverInit: function() {
		this._stage = this._kernel._stage;
		this._isTouch = createjs.Touch.isSupported() && !this._kernel.system.isDesktop;
		if(this._isTouch) {
			createjs.Touch.enable(this._stage,true);
			this._touchX = this._touchY = 0;
			this._stage.canvas.addEventListener("touchstart",$bind(this,this._onTouchStart));
			this._stage.canvas.addEventListener("touchmove",$bind(this,this._onTouch));
			this._stage.canvas.addEventListener("touchend",$bind(this,this._onTouchEnd));
		} else {
			this._stage.addEventListener("stagemousedown",$bind(this,this._onMouseDown));
			this._stage.addEventListener("stagemouseup",$bind(this,this._onMouseUp));
		}
	}
	,_disposer: function() {
		if(this._isTouch) {
			createjs.Touch.disable(this._stage);
			this._stage.canvas.removeEventListener("touchstart",$bind(this,this._onTouchStart));
			this._stage.canvas.removeEventListener("touchmove",$bind(this,this._onTouch));
			this._stage.canvas.removeEventListener("touchend",$bind(this,this._onTouchEnd));
		}
		this._stage.removeEventListener("stagemousedown",$bind(this,this._onMouseDown));
		this._stage.removeEventListener("stagemouseup",$bind(this,this._onMouseUp));
		awe6_core_drivers_AInputMouse.prototype._disposer.call(this);
	}
	,_isWithinBounds: function() {
		return this._stage.mouseInBounds;
	}
	,_getPosition: function() {
		if(!this._isTouch) {
			this.x = Std["int"](this._tools.limit(this._stage.mouseX / this._stage.scaleX,0,this._kernel.factory.width));
			this.y = Std["int"](this._tools.limit(this._stage.mouseY / this._stage.scaleY,0,this._kernel.factory.height));
		} else {
			this.x = this._touchX;
			this.y = this._touchY;
		}
		if(this.x == this._kernel.factory.width) this.x = this._xPrev; else this.x = this.x;
		if(this.y == this._kernel.factory.height) this.y = this._yPrev; else this.y = this.y;
	}
	,_onTouchStart: function(p_event) {
		this._onMouseDown(p_event);
		this._onTouch(p_event);
		this.x = this._touchX;
		this.y = this._touchY;
	}
	,_onTouchEnd: function(p_event) {
		this._onMouseUp(p_event);
		this._onTouch(p_event);
	}
	,_onTouch: function(p_event) {
		try {
			this._touchX = Std["int"](this._tools.limit((p_event.targetTouches[0].pageX - Std["int"](this._stage.canvas.offsetLeft)) / this._kernel._scaleX,0,this._kernel.factory.width));
			this._touchY = Std["int"](this._tools.limit((p_event.targetTouches[0].pageY - Std["int"](this._stage.canvas.offsetTop)) / this._kernel._scaleY,0,this._kernel.factory.height));
		} catch( p_error ) {
			if (p_error instanceof js__$Boot_HaxeError) p_error = p_error.val;
		}
		if(this._stage.mouseInBounds) p_event.preventDefault();
		if(awe6_core_drivers_createjs_InputMouse._isSoundTriggered) return;
		this._kernel.audio.start("Silence");
		awe6_core_drivers_createjs_InputMouse._isSoundTriggered = true;
		if(this._kernel.isFullScreen && this._kernel.factory.isNativeExperience) {
			this._kernel.system.requestFullScreen();
			this._kernel.system.requestLockScreen();
		}
	}
	,_onMouseDown: function(p_event) {
		if(!this.isActive) return;
		if(!this._isTouch && p_event.nativeEvent.button == 2) return;
		this._buffer.push(true);
	}
	,_onMouseUp: function(p_event) {
		if(!this.isActive) return;
		if(!this._isTouch && p_event.nativeEvent.button == 2) return;
		this._buffer.push(false);
	}
	,set_isVisible: function(p_value) {
		if(p_value) this._stage.cursor = "none"; else this._stage.cursor = "auto";
		return awe6_core_drivers_AInputMouse.prototype.set_isVisible.call(this,p_value);
	}
	,set_cursorType: function(p_value) {
		switch(p_value[1]) {
		case 0:
			this._stage.cursor = "crosshair";
			break;
		case 1:
			this._stage.cursor = "auto";
			break;
		case 2:
			this._stage.cursor = "pointer";
			break;
		case 3:
			this._stage.cursor = "pointer";
			break;
		case 4:
			this._stage.cursor = "text";
			break;
		case 5:
			var p_value1 = p_value[2];
			this._stage.cursor = p_value1;
			break;
		}
		return awe6_core_drivers_AInputMouse.prototype.set_cursorType.call(this,p_value);
	}
	,__class__: awe6_core_drivers_createjs_InputMouse
});
var awe6_core_drivers_createjs_Kernel = function(p_factory,p_context) {
	awe6_core_drivers_AKernel.call(this,p_factory,p_context);
};
$hxClasses["awe6.core.drivers.createjs.Kernel"] = awe6_core_drivers_createjs_Kernel;
awe6_core_drivers_createjs_Kernel.__name__ = true;
awe6_core_drivers_createjs_Kernel.__super__ = awe6_core_drivers_AKernel;
awe6_core_drivers_createjs_Kernel.prototype = $extend(awe6_core_drivers_AKernel.prototype,{
	_driverGetIsLocal: function() {
		var l_result;
		var _g = window.location.protocol;
		switch(_g) {
		case "http:":case "https:":
			l_result = false;
			break;
		default:
			l_result = true;
		}
		return l_result;
	}
	,_driverInit: function() {
		this.system = new awe6_core_drivers_createjs_System(this);
		this._scaleX = this._scaleY = 1;
		this._stage = this._stageDynamic = this._context.getStage();
		this._stage.canvas.style.setProperty("-webkit-tap-highlight-color","rgba( 255, 255, 255, 0 )","");
		this._stage.canvas.style.setProperty("-webkit-tap-highlight-color","transparent","");
		this._stage.tickOnUpdate = false;
		this._stage.mouseEnabled = false;
		this._stage.canvas.width = this.factory.width;
		this._stage.canvas.height = this.factory.height;
		var l_shape = new createjs.Shape();
		l_shape.graphics.beginFill("#" + (function($this) {
			var $r;
			var _this = StringTools.hex($this.factory.bgColor,8);
			$r = HxOverrides.substr(_this,2,6);
			return $r;
		}(this)));
		l_shape.graphics.drawRect(0,0,this.factory.width,this.factory.height);
		l_shape.graphics.endFill();
		l_shape.cache(0,0,this.factory.width,this.factory.height);
		this._stage.addChildAt(l_shape,0);
		createjs.Ticker.setFPS(this.factory.targetFramerate);
		createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCHED;
		createjs.Ticker.addEventListener("tick",$bind(this,this._onEnterFrame));
		this._stage.canvas.addEventListener("contextmenu",$bind(this,this._onContextMenu),false);
		window.addEventListener("unload",$bind(this,this._onUnload));
	}
	,_onUnload: function(p_event) {
		window.removeEventListener("unload",$bind(this,this._onUnload));
		this.get_session().save();
	}
	,_onContextMenu: function(p_event) {
		p_event.preventDefault();
		p_event.stopImmediatePropagation();
		if(this.overlay != null) haxe_Timer.delay((function(f,a1) {
			return function() {
				f(a1);
			};
		})(($_=this.overlay,$bind($_,$_.activateButton)),awe6_interfaces_EOverlayButton.PAUSE),100);
	}
	,_driverDisposer: function() {
		this._stage.canvas.removeEventListener("contextmenu",$bind(this,this._onContextMenu));
	}
	,_onEnterFrame: function(p_event) {
		if(p_event.paused != null && p_event.paused == true) this._stage.tickOnUpdate = false; else {
			this._updates++;
			this._updater(0);
			this._stage.tickOnUpdate = this.isActive;
			this._stageDynamic.update(p_event);
		}
		var l_windowSize = window.innerWidth + ":" + window.innerHeight;
		if(this._prevWindowSize != l_windowSize) this._driverSetIsFullScreen(this.isFullScreen);
	}
	,_driverSetIsEyeCandy: function(p_value) {
	}
	,_driverSetIsFullScreen: function(p_value) {
		this._prevWindowSize = window.innerWidth + ":" + window.innerHeight;
		this._scaleX = this._scaleY = 1;
		var l_factoryWidth = this.factory.width;
		var l_factoryHeight = this.factory.height;
		var l_windowWidth = window.innerWidth;
		var l_windowHeight = window.innerHeight;
		var l_isFactoryPortait = l_factoryWidth < l_factoryHeight;
		var l_isDevicePortrait = l_windowWidth < l_windowHeight;
		this.system.isRotated = !this.system.isDesktop && l_isFactoryPortait != l_isDevicePortrait;
		var l_marginX = 0;
		var l_marginY = 0;
		if(p_value) {
			var l_scale = Math.min(l_windowWidth / l_factoryWidth,l_windowHeight / l_factoryHeight);
			{
				var _g = this.factory.fullScreenType;
				switch(_g[1]) {
				case 0:case 1:
					null;
					break;
				case 2:
					this._scaleX = l_windowWidth / l_factoryWidth;
					this._scaleY = l_windowHeight / l_factoryHeight;
					break;
				case 3:
					this._scaleX = this._scaleY = l_scale;
					break;
				case 4:
					if(l_scale < .5) l_scale = .25; else if(l_scale < 1) l_scale = .5; else l_scale = Math.floor(l_scale);
					this._scaleX = this._scaleY = l_scale;
					break;
				case 5:
					var p_type = _g[2];
					if(p_type.bleedWidth != null && p_type.bleedHeight != null) {
						var l_preserveWidth = l_factoryWidth - Std.parseInt(p_type.bleedWidth) * 2;
						var l_preserveHeight = l_factoryHeight - Std.parseInt(p_type.bleedHeight) * 2;
						if(l_factoryHeight / l_factoryWidth > l_windowHeight / l_windowWidth) {
							if(l_preserveHeight / l_factoryWidth > l_windowHeight / l_windowWidth) this._scaleX = this._scaleY = l_windowHeight / l_preserveHeight; else this._scaleY = this._scaleX = l_windowWidth / l_factoryWidth;
						} else if(l_factoryHeight / l_preserveWidth > l_windowHeight / l_windowWidth) this._scaleY = this._scaleX = l_windowHeight / l_factoryHeight; else this._scaleY = this._scaleX = l_windowWidth / l_preserveWidth;
					}
					break;
				}
			}
			l_marginX = Math.round((l_windowWidth - l_factoryWidth * this._scaleX) / 2);
			l_marginY = Math.round((l_windowHeight - l_factoryHeight * this._scaleY) / 2);
		}
		this._stage.canvas.style.setProperty("width",Math.round(l_factoryWidth * this._scaleX) + "px","");
		this._stage.canvas.style.setProperty("height",Math.round(l_factoryHeight * this._scaleY) + "px","");
		this._stage.canvas.style.setProperty("margin-left",l_marginX + "px","");
		this._stage.canvas.style.setProperty("margin-top",l_marginY + "px","");
	}
	,__class__: awe6_core_drivers_createjs_Kernel
});
var awe6_core_drivers_createjs_Overlay = function(p_kernel,p_buttonWidth,p_buttonHeight,p_border,p_backUp,p_backOver,p_muteUp,p_muteOver,p_unmuteUp,p_unmuteOver,p_pauseUp,p_pauseOver,p_unpauseUp,p_unpauseOver,p_pauseBlur,p_pauseColor,p_pauseAlpha) {
	awe6_core_drivers_AOverlay.call(this,p_kernel,p_buttonWidth,p_buttonHeight,p_border,p_backUp,p_backOver,p_muteUp,p_muteOver,p_unmuteUp,p_unmuteOver,p_pauseUp,p_pauseOver,p_unpauseUp,p_unpauseOver,p_pauseBlur,p_pauseColor,p_pauseAlpha);
};
$hxClasses["awe6.core.drivers.createjs.Overlay"] = awe6_core_drivers_createjs_Overlay;
awe6_core_drivers_createjs_Overlay.__name__ = true;
awe6_core_drivers_createjs_Overlay.__super__ = awe6_core_drivers_AOverlay;
awe6_core_drivers_createjs_Overlay.prototype = $extend(awe6_core_drivers_AOverlay.prototype,{
	_driverInit: function() {
		(js_Boot.__cast(this._borderView , awe6_core_drivers_createjs_View)).context.mouseEnabled = false;
		this._context.mouseEnabled = false;
		this._pauseContext = new createjs.Container();
		this._pauseContext.mouseEnabled = false;
		var l_shape = new createjs.Shape();
		l_shape.graphics.beginFill("#" + StringTools.hex(this._pauseColor,6));
		l_shape.graphics.drawRect(0,0,this._kernel.factory.width,this._kernel.factory.height);
		l_shape.cache(0,0,this._kernel.factory.width,this._kernel.factory.height);
		l_shape.alpha = this._pauseAlpha;
		this._pauseContext.addChild(l_shape);
		this._flashContext = new createjs.Container();
		this._flashContext.mouseEnabled = false;
	}
	,_updater: function(p_deltaTime) {
		if(p_deltaTime == null) p_deltaTime = 0;
		awe6_core_drivers_AOverlay.prototype._updater.call(this,p_deltaTime);
		this._flashContext.alpha = this._flashAlpha;
		this._flashContext.visible = this._flashAlpha != 0;
	}
	,flash: function(p_duration,p_asTime,p_startingAlpha,p_color) {
		if(p_color == null) p_color = 16777215;
		if(p_startingAlpha == null) p_startingAlpha = 1;
		if(p_asTime == null) p_asTime = true;
		this._flashContext.removeAllChildren();
		var l_shape = new createjs.Shape();
		l_shape.graphics.beginFill("#" + StringTools.hex(p_color,6));
		l_shape.graphics.drawRect(0,0,this._kernel.factory.width,this._kernel.factory.height);
		l_shape.cache(0,0,this._kernel.factory.width,this._kernel.factory.height);
		this._flashContext.addChild(l_shape);
		if(p_duration != null) p_duration = p_duration; else if(p_asTime) p_duration = 500; else p_duration = this._kernel.factory.targetFramerate * .5;
		this._flashDuration = this._flashStartingDuration = p_duration;
		this._flashAsTime = p_asTime;
		this._flashAlpha = p_startingAlpha > 1?this._flashStartingAlpha = 1:p_startingAlpha < 0?this._flashStartingAlpha = 0:this._flashStartingAlpha = p_startingAlpha;
	}
	,__class__: awe6_core_drivers_createjs_Overlay
});
var awe6_core_drivers_createjs_Preloader = function(p_kernel,p_assets,p_isDecached) {
	awe6_core_drivers_APreloader.call(this,p_kernel,p_assets,p_isDecached);
};
$hxClasses["awe6.core.drivers.createjs.Preloader"] = awe6_core_drivers_createjs_Preloader;
awe6_core_drivers_createjs_Preloader.__name__ = true;
awe6_core_drivers_createjs_Preloader.__super__ = awe6_core_drivers_APreloader;
awe6_core_drivers_createjs_Preloader.prototype = $extend(awe6_core_drivers_APreloader.prototype,{
	_init: function() {
		awe6_core_drivers_APreloader.prototype._init.call(this);
		this._system = this._kernel.system;
		var l_audioFormats = ["mp3","ogg","mpeg","wav","m4a","mp4","aiff","wma","mid"];
		if(this._proprietaryAudioFormat == null || this._proprietaryAudioFormat == "" || !Lambda.has(l_audioFormats,this._proprietaryAudioFormat)) this._proprietaryAudioFormat = "mp3";
		this._context = new createjs.Container();
		this._isDesktop = true;
		try {
			this._isDesktop = this._system.isDesktop;
		} catch( p_error ) {
			if (p_error instanceof js__$Boot_HaxeError) p_error = p_error.val;
		}
		this.view = new awe6_core_drivers_createjs_View(this._kernel,this._context);
		var l_soundAssets = [];
		this._manifest = [];
		if(createjs.Sound.initializeDefaultPlugins()) {
			var l_isSoundDisabled = this._isSoundDisabled || this._system.isAndroid && this._getIsStockAndroidBrowser();
			if(createjs.Sound.getCapability("ogg")) this._validSoundFormat = "ogg"; else if(createjs.Sound.getCapability(this._proprietaryAudioFormat)) this._validSoundFormat = this._proprietaryAudioFormat; else this._validSoundFormat = "noValidFormat";
			this._activePlugin = createjs.Sound.activePlugin;
			var _g = 0;
			var _g1 = this._assets;
			while(_g < _g1.length) {
				var i = _g1[_g];
				++_g;
				var l_extension = HxOverrides.substr(i,-3,null);
				if(Lambda.has(l_audioFormats,l_extension)) {
					l_soundAssets.push(i);
					if(!l_isSoundDisabled && l_extension == this._validSoundFormat) {
						var l_id;
						l_id = "assets.audio." + (function($this) {
							var $r;
							var _this = i.split("/").pop();
							$r = HxOverrides.substr(_this,0,-4);
							return $r;
						}(this));
						if(!this._isFastTestMode) this._manifest.push({ src : i, id : l_id});
					}
				}
			}
		}
		var _g2 = 0;
		while(_g2 < l_soundAssets.length) {
			var i1 = l_soundAssets[_g2];
			++_g2;
			HxOverrides.remove(this._assets,i1);
		}
		this._loadQueue = new createjs.LoadQueue(!this._kernel.isLocal && !this._isFastTestMode,"");
		this._loadQueue.setMaxConnections(10);
		this._loadQueue.installPlugin(createjs.Sound);
		var l_assets = this._manifest.concat(this._assets);
		l_assets = this._tools.shuffle(l_assets);
		this._loadQueue.addEventListener("complete",$bind(this,this._onComplete));
		this._loadQueue.addEventListener("fileerror",$bind(this,this._onError));
		this._loadQueue.addEventListener("error",$bind(this,this._onError));
		haxe_Timer.delay((function(f,a1) {
			return function() {
				f(a1);
			};
		})(($_=this._loadQueue,$bind($_,$_.loadManifest)),l_assets),200);
	}
	,_next: function() {
	}
	,_onComplete: function(p_event) {
		if(this._isComplete) return;
		this._loadQueue.removeEventListener("complete",$bind(this,this._onComplete));
		this._loadQueue.removeEventListener("fileerror",$bind(this,this._onError));
		this._loadQueue.removeEventListener("error",$bind(this,this._onError));
		this._continue();
	}
	,_onError: function(p_event) {
		haxe_Log.trace([p_event,p_event.title,p_event.message,p_event.data],{ fileName : "Preloader.hx", lineNumber : 134, className : "awe6.core.drivers.createjs.Preloader", methodName : "_onError"});
	}
	,_continue: function() {
		this._isComplete = true;
		this._assets = [];
	}
	,_getIsStockAndroidBrowser: function() {
		var l_isAndroidMobile = this._system.userAgent.indexOf("Android") > -1 && this._system.userAgent.indexOf("Mozilla/5.0") > -1 && this._system.userAgent.indexOf("AppleWebKit") > -1;
		var l_regExpAppleWebKit = new EReg("AppleWebKit/([\\d.]+)","");
		var l_isAppleWebKit = l_regExpAppleWebKit.match(this._system.userAgent);
		var l_appleWebKitVersion;
		if(!l_isAppleWebKit) l_appleWebKitVersion = 0; else l_appleWebKitVersion = Std.parseFloat(l_regExpAppleWebKit.matched(1));
		var l_regExpChrome = new EReg("Chrome/([\\d.]+)","");
		var l_isChrome = l_regExpChrome.match(this._system.userAgent);
		var l_chromeVersion;
		if(!l_isChrome) l_chromeVersion = 0; else l_chromeVersion = Std.parseFloat(l_regExpChrome.matched(1));
		return l_isAndroidMobile && (l_isAppleWebKit && l_appleWebKitVersion < 537 || l_isChrome && l_chromeVersion < 37);
	}
	,__class__: awe6_core_drivers_createjs_Preloader
});
var awe6_core_drivers_createjs_Profiler = function(p_kernel) {
	awe6_core_drivers_AProfiler.call(this,p_kernel);
};
$hxClasses["awe6.core.drivers.createjs.Profiler"] = awe6_core_drivers_createjs_Profiler;
awe6_core_drivers_createjs_Profiler.__name__ = true;
awe6_core_drivers_createjs_Profiler.__super__ = awe6_core_drivers_AProfiler;
awe6_core_drivers_createjs_Profiler.prototype = $extend(awe6_core_drivers_AProfiler.prototype,{
	_init: function() {
		awe6_core_drivers_AProfiler.prototype._init.call(this);
		this._isMemoryEnabled = window.performance != null && window.performance.memory != null;
		this._width = 75;
		this._height = 24;
		this._marginHeight = 12;
		var l_shape = new createjs.Shape();
		this._context.addChild(l_shape);
		l_shape.alpha = .25;
		if(this._isMemoryEnabled) {
			l_shape.graphics.beginFill("#" + StringTools.hex(this._backgroundColor,6));
			l_shape.graphics.drawRect(0,0,this._width,this._height);
			l_shape.graphics.endFill();
		}
		l_shape.graphics.beginFill("#" + StringTools.hex(this._marginColor,6));
		l_shape.graphics.drawRect(0,0,this._width,this._marginHeight);
		l_shape.graphics.endFill();
		l_shape.cache(0,0,this._width,this._height);
		this._fpsTextField = new createjs.Text("","","#" + StringTools.hex(this._fpsColor,6));
		this._context.addChild(this._fpsTextField);
		if(this._isMemoryEnabled) {
			this._memoryTextField = new createjs.Text("","","#" + StringTools.hex(this._memoryColor,6));
			this._memoryTextField.y = 12;
			this._context.addChild(this._memoryTextField);
		}
	}
	,_driverUpdate: function() {
		var l_fps = Std["int"](this._kernel.getFramerate(true));
		var l_fpsValue = Std["int"](Math.min(this._height,this._height / this._kernel.factory.targetFramerate * l_fps));
		this._fpsTextField.text = this._fpsLabel + ": " + l_fps + " / " + this._kernel.factory.targetFramerate;
		if(this._isMemoryEnabled && this._updates % this._kernel.factory.targetFramerate == 0) {
			var l_memoryUsed = Math.round(window.performance.memory.usedJSHeapSize / 1024 / 1024);
			var l_memoryLimit = Math.round(window.performance.memory.jsHeapSizeLimit / 1024 / 1024);
			this._memoryTextField.text = this._memoryLabel + ": " + l_memoryUsed + " / " + l_memoryLimit;
		}
	}
	,__class__: awe6_core_drivers_createjs_Profiler
});
var awe6_core_drivers_createjs_SceneTransition = function(p_kernel,p_duration) {
	awe6_core_drivers_ASceneTransition.call(this,p_kernel,p_duration);
};
$hxClasses["awe6.core.drivers.createjs.SceneTransition"] = awe6_core_drivers_createjs_SceneTransition;
awe6_core_drivers_createjs_SceneTransition.__name__ = true;
awe6_core_drivers_createjs_SceneTransition.__super__ = awe6_core_drivers_ASceneTransition;
awe6_core_drivers_createjs_SceneTransition.prototype = $extend(awe6_core_drivers_ASceneTransition.prototype,{
	_init: function() {
		awe6_core_drivers_ASceneTransition.prototype._init.call(this);
		this._kernel.scenes.get_scene().get_view().context.cache(0,0,this._kernel.factory.width,this._kernel.factory.height);
		var l_bitmap = new createjs.Bitmap(this._kernel.scenes.get_scene().get_view().context.cacheCanvas);
		this._kernel.scenes.get_scene().get_view().context.uncache();
		this._context.mouseEnabled = false;
		this._context.addChild(l_bitmap);
	}
	,_updater: function(p_deltaTime) {
		if(p_deltaTime == null) p_deltaTime = 0;
		awe6_core_drivers_ASceneTransition.prototype._updater.call(this,p_deltaTime);
		if(!this.isDisposed) this._context.alpha = 1 - this.get_progress();
	}
	,__class__: awe6_core_drivers_createjs_SceneTransition
});
var awe6_core_drivers_createjs_System = function(p_kernel) {
	this._kernel = p_kernel;
	this.isRotated = false;
	this.isAndroid = this.isChromeOs = this.isIos = this.isLinux = this.isMacOs = this.isSilk = this.isWindows = this.isWindowsPhone = this.isDesktop = false;
	this.userAgent = window.navigator.userAgent;
	this.isSilk = new EReg("Silk","").match(this.userAgent);
	this.isCocoonjs = window.navigator.isCocoonJS == true;
	this.isCrosswalk = new EReg("Crosswalk","").match(this.userAgent);
	if(new EReg("Android","").match(this.userAgent)) this.isAndroid = true; else if(new EReg("CrOS","").match(this.userAgent)) this.isChromeOs = true; else if(new EReg("iP[ao]d|iPhone","i").match(this.userAgent)) this.isIos = true; else if(new EReg("Linux","").match(this.userAgent)) this.isLinux = true; else if(new EReg("Mac OS","").match(this.userAgent)) this.isMacOs = true; else if(new EReg("Windows","").match(this.userAgent)) {
		this.isWindows = true;
		if(new EReg("Windows Phone","i").match(this.userAgent)) this.isWindowsPhone = true;
	}
	if(this.isWindows || this.isMacOs || this.isLinux && !this.isSilk) this.isDesktop = true;
	if(this.isWindowsPhone) this.isDesktop = false;
};
$hxClasses["awe6.core.drivers.createjs.System"] = awe6_core_drivers_createjs_System;
awe6_core_drivers_createjs_System.__name__ = true;
awe6_core_drivers_createjs_System.prototype = {
	requestFullScreen: function() {
		try {
			var l_element = window.document.documentElement;
			if($bind(l_element,l_element.requestFullscreen) != null) l_element.requestFullscreen(); else if(l_element.msRequestFullscreen != null) l_element.msRequestFullscreen(); else if(l_element.mozRequestFullScreen != null) l_element.mozRequestFullScreen(); else if(l_element.webkitRequestFullscreen != null) l_element.webkitRequestFullscreen();
		} catch( p_error ) {
			if (p_error instanceof js__$Boot_HaxeError) p_error = p_error.val;
		}
	}
	,requestExitFullScreen: function() {
		try {
			var l_document = window.document;
			if($bind(l_document,l_document.exitFullscreen) != null) l_document.exitFullscreen(); else if(l_document.msExitFullscreen != null) l_document.msExitFullscreen(); else if(l_document.mozCancelFullScreen != null) l_document.mozCancelFullScreen(); else if(l_document.webkitExitFullscreen != null) l_document.webkitExitFullscreen();
		} catch( p_error ) {
			if (p_error instanceof js__$Boot_HaxeError) p_error = p_error.val;
		}
	}
	,requestLockScreen: function() {
		if(this.isDesktop) return;
		try {
			var l_orientation;
			if(this._kernel.factory.width < this._kernel.factory.height) l_orientation = "portrait-primary"; else l_orientation = "landscape-primary";
			var l_screen = window.screen;
			if(l_screen.orientation != null) {
				if(l_screen.orientation.lock != null) l_screen.orientation.lock(l_orientation); else if(l_screen.orientation.lockOrientation != null) l_screen.orientation.lockOrientation(l_orientation);
			} else if(l_screen.mozOrientation != null) l_screen.mozLockOrientation(l_orientation); else if(l_screen.msOrientation != null) l_screen.msLockOrientation(l_orientation);
		} catch( p_error ) {
			if (p_error instanceof js__$Boot_HaxeError) p_error = p_error.val;
		}
	}
	,__class__: awe6_core_drivers_createjs_System
};
var awe6_core_drivers_createjs_View = function(p_kernel,p_context,p_priority,p_owner) {
	awe6_core_drivers_AView.call(this,p_kernel,p_context,p_priority,p_owner);
};
$hxClasses["awe6.core.drivers.createjs.View"] = awe6_core_drivers_createjs_View;
awe6_core_drivers_createjs_View.__name__ = true;
awe6_core_drivers_createjs_View.__super__ = awe6_core_drivers_AView;
awe6_core_drivers_createjs_View.prototype = $extend(awe6_core_drivers_AView.prototype,{
	_init: function() {
		if(this.context == null) this.context = new createjs.Container();
		awe6_core_drivers_AView.prototype._init.call(this);
	}
	,_driverDisposer: function() {
		if(this.context != null && this.context.parent != null) try {
			this.context.parent.removeChild(this.context);
		} catch( l_error ) {
			if (l_error instanceof js__$Boot_HaxeError) l_error = l_error.val;
		}
	}
	,_driverDraw: function() {
		if(this._container != null && this._container.parent != null) this._container.parent.removeChild(this._container);
		this._container = new createjs.Container();
		this._container.mouseEnabled = false;
		this.context.addChild(this._container);
		var l_children = this._children;
		var _g = 0;
		while(_g < l_children.length) {
			var i = l_children[_g];
			++_g;
			if(i.isVisible) this._container.addChild(i.context);
		}
	}
	,set_x: function(p_value) {
		this.context.x = p_value;
		return awe6_core_drivers_AView.prototype.set_x.call(this,p_value);
	}
	,set_y: function(p_value) {
		this.context.y = p_value;
		return awe6_core_drivers_AView.prototype.set_y.call(this,p_value);
	}
	,__class__: awe6_core_drivers_createjs_View
});
var awe6_core_drivers_createjs_extras_gui_GuiEntity = function(p_kernel,p_width,p_height,p_isMasked) {
	if(p_isMasked == null) p_isMasked = true;
	if(p_height == null) p_height = 100;
	if(p_width == null) p_width = 100;
	this.isFlippedX = false;
	this.isFlippedY = false;
	this.width = p_width;
	this.height = p_height;
	this._context = new createjs.Container();
	awe6_core_Entity.call(this,p_kernel,null,this._context);
};
$hxClasses["awe6.core.drivers.createjs.extras.gui.GuiEntity"] = awe6_core_drivers_createjs_extras_gui_GuiEntity;
awe6_core_drivers_createjs_extras_gui_GuiEntity.__name__ = true;
awe6_core_drivers_createjs_extras_gui_GuiEntity.__interfaces__ = [awe6_interfaces_IPositionable];
awe6_core_drivers_createjs_extras_gui_GuiEntity.__super__ = awe6_core_Entity;
awe6_core_drivers_createjs_extras_gui_GuiEntity.prototype = $extend(awe6_core_Entity.prototype,{
	setPosition: function(p_x,p_y) {
		this.set_x(p_x);
		this.set_y(p_y);
	}
	,set_x: function(p_value) {
		this.x = p_value;
		this._context.x = this.x;
		return this.x;
	}
	,set_y: function(p_value) {
		this.y = p_value;
		this._context.y = this.y;
		return this.y;
	}
	,__class__: awe6_core_drivers_createjs_extras_gui_GuiEntity
});
var awe6_core_drivers_createjs_extras_gui_Text = function(p_kernel,p_width,p_height,p_text,p_textStyle,p_isMultiline,p_isCached) {
	if(p_isCached == null) p_isCached = false;
	if(p_isMultiline == null) p_isMultiline = false;
	if(p_text == null) p_text = "";
	this.textStyle = p_textStyle;
	this._isMultiline = p_isMultiline;
	this._isCached = p_isCached;
	awe6_core_drivers_createjs_extras_gui_GuiEntity.call(this,p_kernel,p_width,p_height,false);
	this.set_text(p_text);
};
$hxClasses["awe6.core.drivers.createjs.extras.gui.Text"] = awe6_core_drivers_createjs_extras_gui_Text;
awe6_core_drivers_createjs_extras_gui_Text.__name__ = true;
awe6_core_drivers_createjs_extras_gui_Text.__super__ = awe6_core_drivers_createjs_extras_gui_GuiEntity;
awe6_core_drivers_createjs_extras_gui_Text.prototype = $extend(awe6_core_drivers_createjs_extras_gui_GuiEntity.prototype,{
	_init: function() {
		awe6_core_drivers_createjs_extras_gui_GuiEntity.prototype._init.call(this);
		this._textField = new createjs.Text();
		this._textField.text = this.text;
		var l_isDesktop = true;
		try {
			l_isDesktop = this._kernel.system.isDesktop;
		} catch( p_error ) {
			if (p_error instanceof js__$Boot_HaxeError) p_error = p_error.val;
		}
		this._draw();
		this._context.addChild(this._textField);
		this._isDirty = false;
		this._prevTextStyle = this.textStyle.toString();
	}
	,_updater: function(p_deltaTime) {
		if(p_deltaTime == null) p_deltaTime = 0;
		awe6_core_drivers_createjs_extras_gui_GuiEntity.prototype._updater.call(this,p_deltaTime);
		this._isDirty = this._isDirty || this._prevTextStyle != this.textStyle.toString();
		if(this._isDirty) this._draw();
		this._prevTextStyle = this.textStyle.toString();
	}
	,_draw: function() {
		this._textField.lineWidth = this.width;
		if(this._prevTextStyle != this.textStyle.toString()) {
			var _g = this.textStyle.align;
			switch(_g[1]) {
			case 1:
				this._textField.textAlign = "left";
				break;
			case 2:
				this._textField.textAlign = "center";
				this._textField.x = this.width * .5;
				break;
			case 3:
				this._textField.textAlign = "right";
				this._textField.x = this.width;
				break;
			case 0:
				this._textField.textAlign = "left";
				break;
			}
			this._textField.color = "#" + StringTools.hex(this.textStyle.color,6);
			this._textField.font = (this.textStyle.isBold?"bold ":"") + (this.textStyle.isItalic?"italic ":"") + this.textStyle.size + "px '" + this.textStyle.font + "'";
			if(this.textStyle.filters != null) this._textField.shadow = new createjs.Shadow("#" + StringTools.hex(this.textStyle.filters[0],6),this.textStyle.filters[1],this.textStyle.filters[2],this.textStyle.filters[3]);
		}
		if(this._isCached) this._context.cache(0,0,this.width,this.height);
		this._isDirty = false;
	}
	,set_text: function(p_value) {
		if(p_value == null) p_value = "";
		if(this.text == p_value) return this.text;
		this.text = p_value;
		this._textField.text = this.text;
		this._isDirty = true;
		return this.text;
	}
	,__class__: awe6_core_drivers_createjs_extras_gui_Text
});
var awe6_interfaces_EAgenda = $hxClasses["awe6.interfaces.EAgenda"] = { __ename__ : true, __constructs__ : ["ALWAYS","BIRTH","DEATH","STANDARD","ATTACK","DEFEND","SUB_TYPE"] };
awe6_interfaces_EAgenda.ALWAYS = ["ALWAYS",0];
awe6_interfaces_EAgenda.ALWAYS.toString = $estr;
awe6_interfaces_EAgenda.ALWAYS.__enum__ = awe6_interfaces_EAgenda;
awe6_interfaces_EAgenda.BIRTH = ["BIRTH",1];
awe6_interfaces_EAgenda.BIRTH.toString = $estr;
awe6_interfaces_EAgenda.BIRTH.__enum__ = awe6_interfaces_EAgenda;
awe6_interfaces_EAgenda.DEATH = ["DEATH",2];
awe6_interfaces_EAgenda.DEATH.toString = $estr;
awe6_interfaces_EAgenda.DEATH.__enum__ = awe6_interfaces_EAgenda;
awe6_interfaces_EAgenda.STANDARD = ["STANDARD",3];
awe6_interfaces_EAgenda.STANDARD.toString = $estr;
awe6_interfaces_EAgenda.STANDARD.__enum__ = awe6_interfaces_EAgenda;
awe6_interfaces_EAgenda.ATTACK = ["ATTACK",4];
awe6_interfaces_EAgenda.ATTACK.toString = $estr;
awe6_interfaces_EAgenda.ATTACK.__enum__ = awe6_interfaces_EAgenda;
awe6_interfaces_EAgenda.DEFEND = ["DEFEND",5];
awe6_interfaces_EAgenda.DEFEND.toString = $estr;
awe6_interfaces_EAgenda.DEFEND.__enum__ = awe6_interfaces_EAgenda;
awe6_interfaces_EAgenda.SUB_TYPE = function(value) { var $x = ["SUB_TYPE",6,value]; $x.__enum__ = awe6_interfaces_EAgenda; $x.toString = $estr; return $x; };
var awe6_interfaces_EAudioChannel = $hxClasses["awe6.interfaces.EAudioChannel"] = { __ename__ : true, __constructs__ : ["DEFAULT","EFFECTS","INTERFACE","MUSIC","SUB_TYPE"] };
awe6_interfaces_EAudioChannel.DEFAULT = ["DEFAULT",0];
awe6_interfaces_EAudioChannel.DEFAULT.toString = $estr;
awe6_interfaces_EAudioChannel.DEFAULT.__enum__ = awe6_interfaces_EAudioChannel;
awe6_interfaces_EAudioChannel.EFFECTS = ["EFFECTS",1];
awe6_interfaces_EAudioChannel.EFFECTS.toString = $estr;
awe6_interfaces_EAudioChannel.EFFECTS.__enum__ = awe6_interfaces_EAudioChannel;
awe6_interfaces_EAudioChannel.INTERFACE = ["INTERFACE",2];
awe6_interfaces_EAudioChannel.INTERFACE.toString = $estr;
awe6_interfaces_EAudioChannel.INTERFACE.__enum__ = awe6_interfaces_EAudioChannel;
awe6_interfaces_EAudioChannel.MUSIC = ["MUSIC",3];
awe6_interfaces_EAudioChannel.MUSIC.toString = $estr;
awe6_interfaces_EAudioChannel.MUSIC.__enum__ = awe6_interfaces_EAudioChannel;
awe6_interfaces_EAudioChannel.SUB_TYPE = function(value) { var $x = ["SUB_TYPE",4,value]; $x.__enum__ = awe6_interfaces_EAudioChannel; $x.toString = $estr; return $x; };
var awe6_interfaces_EFullScreen = $hxClasses["awe6.interfaces.EFullScreen"] = { __ename__ : true, __constructs__ : ["DISABLED","NO_SCALE","SCALE_ASPECT_RATIO_IGNORE","SCALE_ASPECT_RATIO_PRESERVE","SCALE_NEAREST_MULTIPLE","SUB_TYPE"] };
awe6_interfaces_EFullScreen.DISABLED = ["DISABLED",0];
awe6_interfaces_EFullScreen.DISABLED.toString = $estr;
awe6_interfaces_EFullScreen.DISABLED.__enum__ = awe6_interfaces_EFullScreen;
awe6_interfaces_EFullScreen.NO_SCALE = ["NO_SCALE",1];
awe6_interfaces_EFullScreen.NO_SCALE.toString = $estr;
awe6_interfaces_EFullScreen.NO_SCALE.__enum__ = awe6_interfaces_EFullScreen;
awe6_interfaces_EFullScreen.SCALE_ASPECT_RATIO_IGNORE = ["SCALE_ASPECT_RATIO_IGNORE",2];
awe6_interfaces_EFullScreen.SCALE_ASPECT_RATIO_IGNORE.toString = $estr;
awe6_interfaces_EFullScreen.SCALE_ASPECT_RATIO_IGNORE.__enum__ = awe6_interfaces_EFullScreen;
awe6_interfaces_EFullScreen.SCALE_ASPECT_RATIO_PRESERVE = ["SCALE_ASPECT_RATIO_PRESERVE",3];
awe6_interfaces_EFullScreen.SCALE_ASPECT_RATIO_PRESERVE.toString = $estr;
awe6_interfaces_EFullScreen.SCALE_ASPECT_RATIO_PRESERVE.__enum__ = awe6_interfaces_EFullScreen;
awe6_interfaces_EFullScreen.SCALE_NEAREST_MULTIPLE = ["SCALE_NEAREST_MULTIPLE",4];
awe6_interfaces_EFullScreen.SCALE_NEAREST_MULTIPLE.toString = $estr;
awe6_interfaces_EFullScreen.SCALE_NEAREST_MULTIPLE.__enum__ = awe6_interfaces_EFullScreen;
awe6_interfaces_EFullScreen.SUB_TYPE = function(value) { var $x = ["SUB_TYPE",5,value]; $x.__enum__ = awe6_interfaces_EFullScreen; $x.toString = $estr; return $x; };
var awe6_interfaces_EJoypadTouch = $hxClasses["awe6.interfaces.EJoypadTouch"] = { __ename__ : true, __constructs__ : ["DISABLED","DPAD","JOYSTICK","SWIPE"] };
awe6_interfaces_EJoypadTouch.DISABLED = ["DISABLED",0];
awe6_interfaces_EJoypadTouch.DISABLED.toString = $estr;
awe6_interfaces_EJoypadTouch.DISABLED.__enum__ = awe6_interfaces_EJoypadTouch;
awe6_interfaces_EJoypadTouch.DPAD = ["DPAD",1];
awe6_interfaces_EJoypadTouch.DPAD.toString = $estr;
awe6_interfaces_EJoypadTouch.DPAD.__enum__ = awe6_interfaces_EJoypadTouch;
awe6_interfaces_EJoypadTouch.JOYSTICK = function(distance) { var $x = ["JOYSTICK",2,distance]; $x.__enum__ = awe6_interfaces_EJoypadTouch; $x.toString = $estr; return $x; };
awe6_interfaces_EJoypadTouch.SWIPE = function(speed) { var $x = ["SWIPE",3,speed]; $x.__enum__ = awe6_interfaces_EJoypadTouch; $x.toString = $estr; return $x; };
var awe6_interfaces_EKey = $hxClasses["awe6.interfaces.EKey"] = { __ename__ : true, __constructs__ : ["NUM_LOCK","CLEAR","HELP","ALT","BACKSPACE","CAPS_LOCK","CONTROL","DELETE","DOWN","END","ENTER","ESCAPE","F1","F10","F11","F12","F13","F14","F15","F2","F3","F4","F5","F6","F7","F8","F9","HOME","INSERT","LEFT","NUMPAD_0","NUMPAD_1","NUMPAD_2","NUMPAD_3","NUMPAD_4","NUMPAD_5","NUMPAD_6","NUMPAD_7","NUMPAD_8","NUMPAD_9","NUMPAD_ADD","NUMPAD_DECIMAL","NUMPAD_DIVIDE","NUMPAD_ENTER","NUMPAD_MULTIPLY","NUMPAD_SUBTRACT","PAGE_DOWN","PAGE_UP","RIGHT","SHIFT","SPACE","TAB","UP","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","NUMBER_0","NUMBER_1","NUMBER_2","NUMBER_3","NUMBER_4","NUMBER_5","NUMBER_6","NUMBER_7","NUMBER_8","NUMBER_9","COLON","EQUALS","HYPHEN","SLASH","TILDE","SQUARELEFT","SQUARERIGHT","BACKSLASH","APOSTROPHE","TOPLEFT","SUB_TYPE"] };
awe6_interfaces_EKey.NUM_LOCK = ["NUM_LOCK",0];
awe6_interfaces_EKey.NUM_LOCK.toString = $estr;
awe6_interfaces_EKey.NUM_LOCK.__enum__ = awe6_interfaces_EKey;
awe6_interfaces_EKey.CLEAR = ["CLEAR",1];
awe6_interfaces_EKey.CLEAR.toString = $estr;
awe6_interfaces_EKey.CLEAR.__enum__ = awe6_interfaces_EKey;
awe6_interfaces_EKey.HELP = ["HELP",2];
awe6_interfaces_EKey.HELP.toString = $estr;
awe6_interfaces_EKey.HELP.__enum__ = awe6_interfaces_EKey;
awe6_interfaces_EKey.ALT = ["ALT",3];
awe6_interfaces_EKey.ALT.toString = $estr;
awe6_interfaces_EKey.ALT.__enum__ = awe6_interfaces_EKey;
awe6_interfaces_EKey.BACKSPACE = ["BACKSPACE",4];
awe6_interfaces_EKey.BACKSPACE.toString = $estr;
awe6_interfaces_EKey.BACKSPACE.__enum__ = awe6_interfaces_EKey;
awe6_interfaces_EKey.CAPS_LOCK = ["CAPS_LOCK",5];
awe6_interfaces_EKey.CAPS_LOCK.toString = $estr;
awe6_interfaces_EKey.CAPS_LOCK.__enum__ = awe6_interfaces_EKey;
awe6_interfaces_EKey.CONTROL = ["CONTROL",6];
awe6_interfaces_EKey.CONTROL.toString = $estr;
awe6_interfaces_EKey.CONTROL.__enum__ = awe6_interfaces_EKey;
awe6_interfaces_EKey.DELETE = ["DELETE",7];
awe6_interfaces_EKey.DELETE.toString = $estr;
awe6_interfaces_EKey.DELETE.__enum__ = awe6_interfaces_EKey;
awe6_interfaces_EKey.DOWN = ["DOWN",8];
awe6_interfaces_EKey.DOWN.toString = $estr;
awe6_interfaces_EKey.DOWN.__enum__ = awe6_interfaces_EKey;
awe6_interfaces_EKey.END = ["END",9];
awe6_interfaces_EKey.END.toString = $estr;
awe6_interfaces_EKey.END.__enum__ = awe6_interfaces_EKey;
awe6_interfaces_EKey.ENTER = ["ENTER",10];
awe6_interfaces_EKey.ENTER.toString = $estr;
awe6_interfaces_EKey.ENTER.__enum__ = awe6_interfaces_EKey;
awe6_interfaces_EKey.ESCAPE = ["ESCAPE",11];
awe6_interfaces_EKey.ESCAPE.toString = $estr;
awe6_interfaces_EKey.ESCAPE.__enum__ = awe6_interfaces_EKey;
awe6_interfaces_EKey.F1 = ["F1",12];
awe6_interfaces_EKey.F1.toString = $estr;
awe6_interfaces_EKey.F1.__enum__ = awe6_interfaces_EKey;
awe6_interfaces_EKey.F10 = ["F10",13];
awe6_interfaces_EKey.F10.toString = $estr;
awe6_interfaces_EKey.F10.__enum__ = awe6_interfaces_EKey;
awe6_interfaces_EKey.F11 = ["F11",14];
awe6_interfaces_EKey.F11.toString = $estr;
awe6_interfaces_EKey.F11.__enum__ = awe6_interfaces_EKey;
awe6_interfaces_EKey.F12 = ["F12",15];
awe6_interfaces_EKey.F12.toString = $estr;
awe6_interfaces_EKey.F12.__enum__ = awe6_interfaces_EKey;
awe6_interfaces_EKey.F13 = ["F13",16];
awe6_interfaces_EKey.F13.toString = $estr;
awe6_interfaces_EKey.F13.__enum__ = awe6_interfaces_EKey;
awe6_interfaces_EKey.F14 = ["F14",17];
awe6_interfaces_EKey.F14.toString = $estr;
awe6_interfaces_EKey.F14.__enum__ = awe6_interfaces_EKey;
awe6_interfaces_EKey.F15 = ["F15",18];
awe6_interfaces_EKey.F15.toString = $estr;
awe6_interfaces_EKey.F15.__enum__ = awe6_interfaces_EKey;
awe6_interfaces_EKey.F2 = ["F2",19];
awe6_interfaces_EKey.F2.toString = $estr;
awe6_interfaces_EKey.F2.__enum__ = awe6_interfaces_EKey;
awe6_interfaces_EKey.F3 = ["F3",20];
awe6_interfaces_EKey.F3.toString = $estr;
awe6_interfaces_EKey.F3.__enum__ = awe6_interfaces_EKey;
awe6_interfaces_EKey.F4 = ["F4",21];
awe6_interfaces_EKey.F4.toString = $estr;
awe6_interfaces_EKey.F4.__enum__ = awe6_interfaces_EKey;
awe6_interfaces_EKey.F5 = ["F5",22];
awe6_interfaces_EKey.F5.toString = $estr;
awe6_interfaces_EKey.F5.__enum__ = awe6_interfaces_EKey;
awe6_interfaces_EKey.F6 = ["F6",23];
awe6_interfaces_EKey.F6.toString = $estr;
awe6_interfaces_EKey.F6.__enum__ = awe6_interfaces_EKey;
awe6_interfaces_EKey.F7 = ["F7",24];
awe6_interfaces_EKey.F7.toString = $estr;
awe6_interfaces_EKey.F7.__enum__ = awe6_interfaces_EKey;
awe6_interfaces_EKey.F8 = ["F8",25];
awe6_interfaces_EKey.F8.toString = $estr;
awe6_interfaces_EKey.F8.__enum__ = awe6_interfaces_EKey;
awe6_interfaces_EKey.F9 = ["F9",26];
awe6_interfaces_EKey.F9.toString = $estr;
awe6_interfaces_EKey.F9.__enum__ = awe6_interfaces_EKey;
awe6_interfaces_EKey.HOME = ["HOME",27];
awe6_interfaces_EKey.HOME.toString = $estr;
awe6_interfaces_EKey.HOME.__enum__ = awe6_interfaces_EKey;
awe6_interfaces_EKey.INSERT = ["INSERT",28];
awe6_interfaces_EKey.INSERT.toString = $estr;
awe6_interfaces_EKey.INSERT.__enum__ = awe6_interfaces_EKey;
awe6_interfaces_EKey.LEFT = ["LEFT",29];
awe6_interfaces_EKey.LEFT.toString = $estr;
awe6_interfaces_EKey.LEFT.__enum__ = awe6_interfaces_EKey;
awe6_interfaces_EKey.NUMPAD_0 = ["NUMPAD_0",30];
awe6_interfaces_EKey.NUMPAD_0.toString = $estr;
awe6_interfaces_EKey.NUMPAD_0.__enum__ = awe6_interfaces_EKey;
awe6_interfaces_EKey.NUMPAD_1 = ["NUMPAD_1",31];
awe6_interfaces_EKey.NUMPAD_1.toString = $estr;
awe6_interfaces_EKey.NUMPAD_1.__enum__ = awe6_interfaces_EKey;
awe6_interfaces_EKey.NUMPAD_2 = ["NUMPAD_2",32];
awe6_interfaces_EKey.NUMPAD_2.toString = $estr;
awe6_interfaces_EKey.NUMPAD_2.__enum__ = awe6_interfaces_EKey;
awe6_interfaces_EKey.NUMPAD_3 = ["NUMPAD_3",33];
awe6_interfaces_EKey.NUMPAD_3.toString = $estr;
awe6_interfaces_EKey.NUMPAD_3.__enum__ = awe6_interfaces_EKey;
awe6_interfaces_EKey.NUMPAD_4 = ["NUMPAD_4",34];
awe6_interfaces_EKey.NUMPAD_4.toString = $estr;
awe6_interfaces_EKey.NUMPAD_4.__enum__ = awe6_interfaces_EKey;
awe6_interfaces_EKey.NUMPAD_5 = ["NUMPAD_5",35];
awe6_interfaces_EKey.NUMPAD_5.toString = $estr;
awe6_interfaces_EKey.NUMPAD_5.__enum__ = awe6_interfaces_EKey;
awe6_interfaces_EKey.NUMPAD_6 = ["NUMPAD_6",36];
awe6_interfaces_EKey.NUMPAD_6.toString = $estr;
awe6_interfaces_EKey.NUMPAD_6.__enum__ = awe6_interfaces_EKey;
awe6_interfaces_EKey.NUMPAD_7 = ["NUMPAD_7",37];
awe6_interfaces_EKey.NUMPAD_7.toString = $estr;
awe6_interfaces_EKey.NUMPAD_7.__enum__ = awe6_interfaces_EKey;
awe6_interfaces_EKey.NUMPAD_8 = ["NUMPAD_8",38];
awe6_interfaces_EKey.NUMPAD_8.toString = $estr;
awe6_interfaces_EKey.NUMPAD_8.__enum__ = awe6_interfaces_EKey;
awe6_interfaces_EKey.NUMPAD_9 = ["NUMPAD_9",39];
awe6_interfaces_EKey.NUMPAD_9.toString = $estr;
awe6_interfaces_EKey.NUMPAD_9.__enum__ = awe6_interfaces_EKey;
awe6_interfaces_EKey.NUMPAD_ADD = ["NUMPAD_ADD",40];
awe6_interfaces_EKey.NUMPAD_ADD.toString = $estr;
awe6_interfaces_EKey.NUMPAD_ADD.__enum__ = awe6_interfaces_EKey;
awe6_interfaces_EKey.NUMPAD_DECIMAL = ["NUMPAD_DECIMAL",41];
awe6_interfaces_EKey.NUMPAD_DECIMAL.toString = $estr;
awe6_interfaces_EKey.NUMPAD_DECIMAL.__enum__ = awe6_interfaces_EKey;
awe6_interfaces_EKey.NUMPAD_DIVIDE = ["NUMPAD_DIVIDE",42];
awe6_interfaces_EKey.NUMPAD_DIVIDE.toString = $estr;
awe6_interfaces_EKey.NUMPAD_DIVIDE.__enum__ = awe6_interfaces_EKey;
awe6_interfaces_EKey.NUMPAD_ENTER = ["NUMPAD_ENTER",43];
awe6_interfaces_EKey.NUMPAD_ENTER.toString = $estr;
awe6_interfaces_EKey.NUMPAD_ENTER.__enum__ = awe6_interfaces_EKey;
awe6_interfaces_EKey.NUMPAD_MULTIPLY = ["NUMPAD_MULTIPLY",44];
awe6_interfaces_EKey.NUMPAD_MULTIPLY.toString = $estr;
awe6_interfaces_EKey.NUMPAD_MULTIPLY.__enum__ = awe6_interfaces_EKey;
awe6_interfaces_EKey.NUMPAD_SUBTRACT = ["NUMPAD_SUBTRACT",45];
awe6_interfaces_EKey.NUMPAD_SUBTRACT.toString = $estr;
awe6_interfaces_EKey.NUMPAD_SUBTRACT.__enum__ = awe6_interfaces_EKey;
awe6_interfaces_EKey.PAGE_DOWN = ["PAGE_DOWN",46];
awe6_interfaces_EKey.PAGE_DOWN.toString = $estr;
awe6_interfaces_EKey.PAGE_DOWN.__enum__ = awe6_interfaces_EKey;
awe6_interfaces_EKey.PAGE_UP = ["PAGE_UP",47];
awe6_interfaces_EKey.PAGE_UP.toString = $estr;
awe6_interfaces_EKey.PAGE_UP.__enum__ = awe6_interfaces_EKey;
awe6_interfaces_EKey.RIGHT = ["RIGHT",48];
awe6_interfaces_EKey.RIGHT.toString = $estr;
awe6_interfaces_EKey.RIGHT.__enum__ = awe6_interfaces_EKey;
awe6_interfaces_EKey.SHIFT = ["SHIFT",49];
awe6_interfaces_EKey.SHIFT.toString = $estr;
awe6_interfaces_EKey.SHIFT.__enum__ = awe6_interfaces_EKey;
awe6_interfaces_EKey.SPACE = ["SPACE",50];
awe6_interfaces_EKey.SPACE.toString = $estr;
awe6_interfaces_EKey.SPACE.__enum__ = awe6_interfaces_EKey;
awe6_interfaces_EKey.TAB = ["TAB",51];
awe6_interfaces_EKey.TAB.toString = $estr;
awe6_interfaces_EKey.TAB.__enum__ = awe6_interfaces_EKey;
awe6_interfaces_EKey.UP = ["UP",52];
awe6_interfaces_EKey.UP.toString = $estr;
awe6_interfaces_EKey.UP.__enum__ = awe6_interfaces_EKey;
awe6_interfaces_EKey.A = ["A",53];
awe6_interfaces_EKey.A.toString = $estr;
awe6_interfaces_EKey.A.__enum__ = awe6_interfaces_EKey;
awe6_interfaces_EKey.B = ["B",54];
awe6_interfaces_EKey.B.toString = $estr;
awe6_interfaces_EKey.B.__enum__ = awe6_interfaces_EKey;
awe6_interfaces_EKey.C = ["C",55];
awe6_interfaces_EKey.C.toString = $estr;
awe6_interfaces_EKey.C.__enum__ = awe6_interfaces_EKey;
awe6_interfaces_EKey.D = ["D",56];
awe6_interfaces_EKey.D.toString = $estr;
awe6_interfaces_EKey.D.__enum__ = awe6_interfaces_EKey;
awe6_interfaces_EKey.E = ["E",57];
awe6_interfaces_EKey.E.toString = $estr;
awe6_interfaces_EKey.E.__enum__ = awe6_interfaces_EKey;
awe6_interfaces_EKey.F = ["F",58];
awe6_interfaces_EKey.F.toString = $estr;
awe6_interfaces_EKey.F.__enum__ = awe6_interfaces_EKey;
awe6_interfaces_EKey.G = ["G",59];
awe6_interfaces_EKey.G.toString = $estr;
awe6_interfaces_EKey.G.__enum__ = awe6_interfaces_EKey;
awe6_interfaces_EKey.H = ["H",60];
awe6_interfaces_EKey.H.toString = $estr;
awe6_interfaces_EKey.H.__enum__ = awe6_interfaces_EKey;
awe6_interfaces_EKey.I = ["I",61];
awe6_interfaces_EKey.I.toString = $estr;
awe6_interfaces_EKey.I.__enum__ = awe6_interfaces_EKey;
awe6_interfaces_EKey.J = ["J",62];
awe6_interfaces_EKey.J.toString = $estr;
awe6_interfaces_EKey.J.__enum__ = awe6_interfaces_EKey;
awe6_interfaces_EKey.K = ["K",63];
awe6_interfaces_EKey.K.toString = $estr;
awe6_interfaces_EKey.K.__enum__ = awe6_interfaces_EKey;
awe6_interfaces_EKey.L = ["L",64];
awe6_interfaces_EKey.L.toString = $estr;
awe6_interfaces_EKey.L.__enum__ = awe6_interfaces_EKey;
awe6_interfaces_EKey.M = ["M",65];
awe6_interfaces_EKey.M.toString = $estr;
awe6_interfaces_EKey.M.__enum__ = awe6_interfaces_EKey;
awe6_interfaces_EKey.N = ["N",66];
awe6_interfaces_EKey.N.toString = $estr;
awe6_interfaces_EKey.N.__enum__ = awe6_interfaces_EKey;
awe6_interfaces_EKey.O = ["O",67];
awe6_interfaces_EKey.O.toString = $estr;
awe6_interfaces_EKey.O.__enum__ = awe6_interfaces_EKey;
awe6_interfaces_EKey.P = ["P",68];
awe6_interfaces_EKey.P.toString = $estr;
awe6_interfaces_EKey.P.__enum__ = awe6_interfaces_EKey;
awe6_interfaces_EKey.Q = ["Q",69];
awe6_interfaces_EKey.Q.toString = $estr;
awe6_interfaces_EKey.Q.__enum__ = awe6_interfaces_EKey;
awe6_interfaces_EKey.R = ["R",70];
awe6_interfaces_EKey.R.toString = $estr;
awe6_interfaces_EKey.R.__enum__ = awe6_interfaces_EKey;
awe6_interfaces_EKey.S = ["S",71];
awe6_interfaces_EKey.S.toString = $estr;
awe6_interfaces_EKey.S.__enum__ = awe6_interfaces_EKey;
awe6_interfaces_EKey.T = ["T",72];
awe6_interfaces_EKey.T.toString = $estr;
awe6_interfaces_EKey.T.__enum__ = awe6_interfaces_EKey;
awe6_interfaces_EKey.U = ["U",73];
awe6_interfaces_EKey.U.toString = $estr;
awe6_interfaces_EKey.U.__enum__ = awe6_interfaces_EKey;
awe6_interfaces_EKey.V = ["V",74];
awe6_interfaces_EKey.V.toString = $estr;
awe6_interfaces_EKey.V.__enum__ = awe6_interfaces_EKey;
awe6_interfaces_EKey.W = ["W",75];
awe6_interfaces_EKey.W.toString = $estr;
awe6_interfaces_EKey.W.__enum__ = awe6_interfaces_EKey;
awe6_interfaces_EKey.X = ["X",76];
awe6_interfaces_EKey.X.toString = $estr;
awe6_interfaces_EKey.X.__enum__ = awe6_interfaces_EKey;
awe6_interfaces_EKey.Y = ["Y",77];
awe6_interfaces_EKey.Y.toString = $estr;
awe6_interfaces_EKey.Y.__enum__ = awe6_interfaces_EKey;
awe6_interfaces_EKey.Z = ["Z",78];
awe6_interfaces_EKey.Z.toString = $estr;
awe6_interfaces_EKey.Z.__enum__ = awe6_interfaces_EKey;
awe6_interfaces_EKey.NUMBER_0 = ["NUMBER_0",79];
awe6_interfaces_EKey.NUMBER_0.toString = $estr;
awe6_interfaces_EKey.NUMBER_0.__enum__ = awe6_interfaces_EKey;
awe6_interfaces_EKey.NUMBER_1 = ["NUMBER_1",80];
awe6_interfaces_EKey.NUMBER_1.toString = $estr;
awe6_interfaces_EKey.NUMBER_1.__enum__ = awe6_interfaces_EKey;
awe6_interfaces_EKey.NUMBER_2 = ["NUMBER_2",81];
awe6_interfaces_EKey.NUMBER_2.toString = $estr;
awe6_interfaces_EKey.NUMBER_2.__enum__ = awe6_interfaces_EKey;
awe6_interfaces_EKey.NUMBER_3 = ["NUMBER_3",82];
awe6_interfaces_EKey.NUMBER_3.toString = $estr;
awe6_interfaces_EKey.NUMBER_3.__enum__ = awe6_interfaces_EKey;
awe6_interfaces_EKey.NUMBER_4 = ["NUMBER_4",83];
awe6_interfaces_EKey.NUMBER_4.toString = $estr;
awe6_interfaces_EKey.NUMBER_4.__enum__ = awe6_interfaces_EKey;
awe6_interfaces_EKey.NUMBER_5 = ["NUMBER_5",84];
awe6_interfaces_EKey.NUMBER_5.toString = $estr;
awe6_interfaces_EKey.NUMBER_5.__enum__ = awe6_interfaces_EKey;
awe6_interfaces_EKey.NUMBER_6 = ["NUMBER_6",85];
awe6_interfaces_EKey.NUMBER_6.toString = $estr;
awe6_interfaces_EKey.NUMBER_6.__enum__ = awe6_interfaces_EKey;
awe6_interfaces_EKey.NUMBER_7 = ["NUMBER_7",86];
awe6_interfaces_EKey.NUMBER_7.toString = $estr;
awe6_interfaces_EKey.NUMBER_7.__enum__ = awe6_interfaces_EKey;
awe6_interfaces_EKey.NUMBER_8 = ["NUMBER_8",87];
awe6_interfaces_EKey.NUMBER_8.toString = $estr;
awe6_interfaces_EKey.NUMBER_8.__enum__ = awe6_interfaces_EKey;
awe6_interfaces_EKey.NUMBER_9 = ["NUMBER_9",88];
awe6_interfaces_EKey.NUMBER_9.toString = $estr;
awe6_interfaces_EKey.NUMBER_9.__enum__ = awe6_interfaces_EKey;
awe6_interfaces_EKey.COLON = ["COLON",89];
awe6_interfaces_EKey.COLON.toString = $estr;
awe6_interfaces_EKey.COLON.__enum__ = awe6_interfaces_EKey;
awe6_interfaces_EKey.EQUALS = ["EQUALS",90];
awe6_interfaces_EKey.EQUALS.toString = $estr;
awe6_interfaces_EKey.EQUALS.__enum__ = awe6_interfaces_EKey;
awe6_interfaces_EKey.HYPHEN = ["HYPHEN",91];
awe6_interfaces_EKey.HYPHEN.toString = $estr;
awe6_interfaces_EKey.HYPHEN.__enum__ = awe6_interfaces_EKey;
awe6_interfaces_EKey.SLASH = ["SLASH",92];
awe6_interfaces_EKey.SLASH.toString = $estr;
awe6_interfaces_EKey.SLASH.__enum__ = awe6_interfaces_EKey;
awe6_interfaces_EKey.TILDE = ["TILDE",93];
awe6_interfaces_EKey.TILDE.toString = $estr;
awe6_interfaces_EKey.TILDE.__enum__ = awe6_interfaces_EKey;
awe6_interfaces_EKey.SQUARELEFT = ["SQUARELEFT",94];
awe6_interfaces_EKey.SQUARELEFT.toString = $estr;
awe6_interfaces_EKey.SQUARELEFT.__enum__ = awe6_interfaces_EKey;
awe6_interfaces_EKey.SQUARERIGHT = ["SQUARERIGHT",95];
awe6_interfaces_EKey.SQUARERIGHT.toString = $estr;
awe6_interfaces_EKey.SQUARERIGHT.__enum__ = awe6_interfaces_EKey;
awe6_interfaces_EKey.BACKSLASH = ["BACKSLASH",96];
awe6_interfaces_EKey.BACKSLASH.toString = $estr;
awe6_interfaces_EKey.BACKSLASH.__enum__ = awe6_interfaces_EKey;
awe6_interfaces_EKey.APOSTROPHE = ["APOSTROPHE",97];
awe6_interfaces_EKey.APOSTROPHE.toString = $estr;
awe6_interfaces_EKey.APOSTROPHE.__enum__ = awe6_interfaces_EKey;
awe6_interfaces_EKey.TOPLEFT = ["TOPLEFT",98];
awe6_interfaces_EKey.TOPLEFT.toString = $estr;
awe6_interfaces_EKey.TOPLEFT.__enum__ = awe6_interfaces_EKey;
awe6_interfaces_EKey.SUB_TYPE = function(value) { var $x = ["SUB_TYPE",99,value]; $x.__enum__ = awe6_interfaces_EKey; $x.toString = $estr; return $x; };
var awe6_interfaces_EMessage = $hxClasses["awe6.interfaces.EMessage"] = { __ename__ : true, __constructs__ : ["DISPOSE","INIT","PAUSE","RESUME","SUB_TYPE"] };
awe6_interfaces_EMessage.DISPOSE = ["DISPOSE",0];
awe6_interfaces_EMessage.DISPOSE.toString = $estr;
awe6_interfaces_EMessage.DISPOSE.__enum__ = awe6_interfaces_EMessage;
awe6_interfaces_EMessage.INIT = ["INIT",1];
awe6_interfaces_EMessage.INIT.toString = $estr;
awe6_interfaces_EMessage.INIT.__enum__ = awe6_interfaces_EMessage;
awe6_interfaces_EMessage.PAUSE = ["PAUSE",2];
awe6_interfaces_EMessage.PAUSE.toString = $estr;
awe6_interfaces_EMessage.PAUSE.__enum__ = awe6_interfaces_EMessage;
awe6_interfaces_EMessage.RESUME = ["RESUME",3];
awe6_interfaces_EMessage.RESUME.toString = $estr;
awe6_interfaces_EMessage.RESUME.__enum__ = awe6_interfaces_EMessage;
awe6_interfaces_EMessage.SUB_TYPE = function(value) { var $x = ["SUB_TYPE",4,value]; $x.__enum__ = awe6_interfaces_EMessage; $x.toString = $estr; return $x; };
var awe6_interfaces_EMouseButton = $hxClasses["awe6.interfaces.EMouseButton"] = { __ename__ : true, __constructs__ : ["LEFT","MIDDLE","RIGHT"] };
awe6_interfaces_EMouseButton.LEFT = ["LEFT",0];
awe6_interfaces_EMouseButton.LEFT.toString = $estr;
awe6_interfaces_EMouseButton.LEFT.__enum__ = awe6_interfaces_EMouseButton;
awe6_interfaces_EMouseButton.MIDDLE = ["MIDDLE",1];
awe6_interfaces_EMouseButton.MIDDLE.toString = $estr;
awe6_interfaces_EMouseButton.MIDDLE.__enum__ = awe6_interfaces_EMouseButton;
awe6_interfaces_EMouseButton.RIGHT = ["RIGHT",2];
awe6_interfaces_EMouseButton.RIGHT.toString = $estr;
awe6_interfaces_EMouseButton.RIGHT.__enum__ = awe6_interfaces_EMouseButton;
var awe6_interfaces_EMouseCursor = $hxClasses["awe6.interfaces.EMouseCursor"] = { __ename__ : true, __constructs__ : ["ARROW","AUTO","BUTTON","HAND","IBEAM","SUB_TYPE"] };
awe6_interfaces_EMouseCursor.ARROW = ["ARROW",0];
awe6_interfaces_EMouseCursor.ARROW.toString = $estr;
awe6_interfaces_EMouseCursor.ARROW.__enum__ = awe6_interfaces_EMouseCursor;
awe6_interfaces_EMouseCursor.AUTO = ["AUTO",1];
awe6_interfaces_EMouseCursor.AUTO.toString = $estr;
awe6_interfaces_EMouseCursor.AUTO.__enum__ = awe6_interfaces_EMouseCursor;
awe6_interfaces_EMouseCursor.BUTTON = ["BUTTON",2];
awe6_interfaces_EMouseCursor.BUTTON.toString = $estr;
awe6_interfaces_EMouseCursor.BUTTON.__enum__ = awe6_interfaces_EMouseCursor;
awe6_interfaces_EMouseCursor.HAND = ["HAND",3];
awe6_interfaces_EMouseCursor.HAND.toString = $estr;
awe6_interfaces_EMouseCursor.HAND.__enum__ = awe6_interfaces_EMouseCursor;
awe6_interfaces_EMouseCursor.IBEAM = ["IBEAM",4];
awe6_interfaces_EMouseCursor.IBEAM.toString = $estr;
awe6_interfaces_EMouseCursor.IBEAM.__enum__ = awe6_interfaces_EMouseCursor;
awe6_interfaces_EMouseCursor.SUB_TYPE = function(value) { var $x = ["SUB_TYPE",5,value]; $x.__enum__ = awe6_interfaces_EMouseCursor; $x.toString = $estr; return $x; };
var awe6_interfaces_EOverlayButton = $hxClasses["awe6.interfaces.EOverlayButton"] = { __ename__ : true, __constructs__ : ["BACK","MUTE","UNMUTE","PAUSE","UNPAUSE","SUB_TYPE"] };
awe6_interfaces_EOverlayButton.BACK = ["BACK",0];
awe6_interfaces_EOverlayButton.BACK.toString = $estr;
awe6_interfaces_EOverlayButton.BACK.__enum__ = awe6_interfaces_EOverlayButton;
awe6_interfaces_EOverlayButton.MUTE = ["MUTE",1];
awe6_interfaces_EOverlayButton.MUTE.toString = $estr;
awe6_interfaces_EOverlayButton.MUTE.__enum__ = awe6_interfaces_EOverlayButton;
awe6_interfaces_EOverlayButton.UNMUTE = ["UNMUTE",2];
awe6_interfaces_EOverlayButton.UNMUTE.toString = $estr;
awe6_interfaces_EOverlayButton.UNMUTE.__enum__ = awe6_interfaces_EOverlayButton;
awe6_interfaces_EOverlayButton.PAUSE = ["PAUSE",3];
awe6_interfaces_EOverlayButton.PAUSE.toString = $estr;
awe6_interfaces_EOverlayButton.PAUSE.__enum__ = awe6_interfaces_EOverlayButton;
awe6_interfaces_EOverlayButton.UNPAUSE = ["UNPAUSE",4];
awe6_interfaces_EOverlayButton.UNPAUSE.toString = $estr;
awe6_interfaces_EOverlayButton.UNPAUSE.__enum__ = awe6_interfaces_EOverlayButton;
awe6_interfaces_EOverlayButton.SUB_TYPE = function(value) { var $x = ["SUB_TYPE",5,value]; $x.__enum__ = awe6_interfaces_EOverlayButton; $x.toString = $estr; return $x; };
var awe6_interfaces_EScene = $hxClasses["awe6.interfaces.EScene"] = { __ename__ : true, __constructs__ : ["SPLASH","INTRO","SELECT_SESSION","INSTRUCTIONS","SETTINGS","MENU","AVATAR","SHOP","REWARDS","LEADERBOARD","GAME","INTERSTITIAL","RESULTS","EXIT","TEST","SUB_TYPE"] };
awe6_interfaces_EScene.SPLASH = ["SPLASH",0];
awe6_interfaces_EScene.SPLASH.toString = $estr;
awe6_interfaces_EScene.SPLASH.__enum__ = awe6_interfaces_EScene;
awe6_interfaces_EScene.INTRO = ["INTRO",1];
awe6_interfaces_EScene.INTRO.toString = $estr;
awe6_interfaces_EScene.INTRO.__enum__ = awe6_interfaces_EScene;
awe6_interfaces_EScene.SELECT_SESSION = ["SELECT_SESSION",2];
awe6_interfaces_EScene.SELECT_SESSION.toString = $estr;
awe6_interfaces_EScene.SELECT_SESSION.__enum__ = awe6_interfaces_EScene;
awe6_interfaces_EScene.INSTRUCTIONS = ["INSTRUCTIONS",3];
awe6_interfaces_EScene.INSTRUCTIONS.toString = $estr;
awe6_interfaces_EScene.INSTRUCTIONS.__enum__ = awe6_interfaces_EScene;
awe6_interfaces_EScene.SETTINGS = ["SETTINGS",4];
awe6_interfaces_EScene.SETTINGS.toString = $estr;
awe6_interfaces_EScene.SETTINGS.__enum__ = awe6_interfaces_EScene;
awe6_interfaces_EScene.MENU = ["MENU",5];
awe6_interfaces_EScene.MENU.toString = $estr;
awe6_interfaces_EScene.MENU.__enum__ = awe6_interfaces_EScene;
awe6_interfaces_EScene.AVATAR = ["AVATAR",6];
awe6_interfaces_EScene.AVATAR.toString = $estr;
awe6_interfaces_EScene.AVATAR.__enum__ = awe6_interfaces_EScene;
awe6_interfaces_EScene.SHOP = ["SHOP",7];
awe6_interfaces_EScene.SHOP.toString = $estr;
awe6_interfaces_EScene.SHOP.__enum__ = awe6_interfaces_EScene;
awe6_interfaces_EScene.REWARDS = ["REWARDS",8];
awe6_interfaces_EScene.REWARDS.toString = $estr;
awe6_interfaces_EScene.REWARDS.__enum__ = awe6_interfaces_EScene;
awe6_interfaces_EScene.LEADERBOARD = ["LEADERBOARD",9];
awe6_interfaces_EScene.LEADERBOARD.toString = $estr;
awe6_interfaces_EScene.LEADERBOARD.__enum__ = awe6_interfaces_EScene;
awe6_interfaces_EScene.GAME = ["GAME",10];
awe6_interfaces_EScene.GAME.toString = $estr;
awe6_interfaces_EScene.GAME.__enum__ = awe6_interfaces_EScene;
awe6_interfaces_EScene.INTERSTITIAL = ["INTERSTITIAL",11];
awe6_interfaces_EScene.INTERSTITIAL.toString = $estr;
awe6_interfaces_EScene.INTERSTITIAL.__enum__ = awe6_interfaces_EScene;
awe6_interfaces_EScene.RESULTS = ["RESULTS",12];
awe6_interfaces_EScene.RESULTS.toString = $estr;
awe6_interfaces_EScene.RESULTS.__enum__ = awe6_interfaces_EScene;
awe6_interfaces_EScene.EXIT = ["EXIT",13];
awe6_interfaces_EScene.EXIT.toString = $estr;
awe6_interfaces_EScene.EXIT.__enum__ = awe6_interfaces_EScene;
awe6_interfaces_EScene.TEST = ["TEST",14];
awe6_interfaces_EScene.TEST.toString = $estr;
awe6_interfaces_EScene.TEST.__enum__ = awe6_interfaces_EScene;
awe6_interfaces_EScene.SUB_TYPE = function(value) { var $x = ["SUB_TYPE",15,value]; $x.__enum__ = awe6_interfaces_EScene; $x.toString = $estr; return $x; };
var awe6_interfaces_ETextAlign = $hxClasses["awe6.interfaces.ETextAlign"] = { __ename__ : true, __constructs__ : ["JUSTIFY","LEFT","CENTER","RIGHT"] };
awe6_interfaces_ETextAlign.JUSTIFY = ["JUSTIFY",0];
awe6_interfaces_ETextAlign.JUSTIFY.toString = $estr;
awe6_interfaces_ETextAlign.JUSTIFY.__enum__ = awe6_interfaces_ETextAlign;
awe6_interfaces_ETextAlign.LEFT = ["LEFT",1];
awe6_interfaces_ETextAlign.LEFT.toString = $estr;
awe6_interfaces_ETextAlign.LEFT.__enum__ = awe6_interfaces_ETextAlign;
awe6_interfaces_ETextAlign.CENTER = ["CENTER",2];
awe6_interfaces_ETextAlign.CENTER.toString = $estr;
awe6_interfaces_ETextAlign.CENTER.__enum__ = awe6_interfaces_ETextAlign;
awe6_interfaces_ETextAlign.RIGHT = ["RIGHT",3];
awe6_interfaces_ETextAlign.RIGHT.toString = $estr;
awe6_interfaces_ETextAlign.RIGHT.__enum__ = awe6_interfaces_ETextAlign;
var awe6_interfaces_ETextStyle = $hxClasses["awe6.interfaces.ETextStyle"] = { __ename__ : true, __constructs__ : ["BUTTON","BODY","HEADLINE","SUBHEAD","SMALLPRINT","OVERSIZED","SUB_TYPE"] };
awe6_interfaces_ETextStyle.BUTTON = ["BUTTON",0];
awe6_interfaces_ETextStyle.BUTTON.toString = $estr;
awe6_interfaces_ETextStyle.BUTTON.__enum__ = awe6_interfaces_ETextStyle;
awe6_interfaces_ETextStyle.BODY = ["BODY",1];
awe6_interfaces_ETextStyle.BODY.toString = $estr;
awe6_interfaces_ETextStyle.BODY.__enum__ = awe6_interfaces_ETextStyle;
awe6_interfaces_ETextStyle.HEADLINE = ["HEADLINE",2];
awe6_interfaces_ETextStyle.HEADLINE.toString = $estr;
awe6_interfaces_ETextStyle.HEADLINE.__enum__ = awe6_interfaces_ETextStyle;
awe6_interfaces_ETextStyle.SUBHEAD = ["SUBHEAD",3];
awe6_interfaces_ETextStyle.SUBHEAD.toString = $estr;
awe6_interfaces_ETextStyle.SUBHEAD.__enum__ = awe6_interfaces_ETextStyle;
awe6_interfaces_ETextStyle.SMALLPRINT = ["SMALLPRINT",4];
awe6_interfaces_ETextStyle.SMALLPRINT.toString = $estr;
awe6_interfaces_ETextStyle.SMALLPRINT.__enum__ = awe6_interfaces_ETextStyle;
awe6_interfaces_ETextStyle.OVERSIZED = ["OVERSIZED",5];
awe6_interfaces_ETextStyle.OVERSIZED.toString = $estr;
awe6_interfaces_ETextStyle.OVERSIZED.__enum__ = awe6_interfaces_ETextStyle;
awe6_interfaces_ETextStyle.SUB_TYPE = function(value) { var $x = ["SUB_TYPE",6,value]; $x.__enum__ = awe6_interfaces_ETextStyle; $x.toString = $estr; return $x; };
var demo_Factory = function(p_context,p_isDebug,p_config) {
	awe6_core_drivers_createjs_Factory.call(this,p_context,p_isDebug,p_config);
};
$hxClasses["demo.Factory"] = demo_Factory;
demo_Factory.__name__ = true;
demo_Factory.__super__ = awe6_core_drivers_createjs_Factory;
demo_Factory.prototype = $extend(awe6_core_drivers_createjs_Factory.prototype,{
	_configurer: function(p_isPreconfig) {
		if(p_isPreconfig == null) p_isPreconfig = false;
		if(p_isPreconfig) {
			this.id = "Pathfinder";
			this.version = "0.1.0";
			this.author = "Robert Fell";
			this.isDecached = true;
			this.width = 1200;
			this.height = 600;
			this.bgColor = -16744193;
			this.startingSceneType = awe6_interfaces_EScene.TEST;
			this.targetFramerate = 60;
			this.isFixedUpdates = false;
		}
	}
	,createScene: function(p_type) {
		return new demo_Test(this._kernel,p_type,true,true);
	}
	,createTextStyle: function(p_type) {
		return new awe6_core_TextStyle(this._kernel.getConfig("settings.font.name"),14,16777215,null,null,awe6_interfaces_ETextAlign.CENTER);
	}
	,__class__: demo_Factory
});
var pathfinder_IMap = function() { };
$hxClasses["pathfinder.IMap"] = pathfinder_IMap;
pathfinder_IMap.__name__ = true;
pathfinder_IMap.prototype = {
	__class__: pathfinder_IMap
};
var demo_MapData = function(p_kernel,p_cols,p_rows) {
	this.cols = p_cols;
	this.rows = p_rows;
	this._context = new createjs.Container();
	awe6_core_Entity.call(this,p_kernel,null,this._context);
};
$hxClasses["demo.MapData"] = demo_MapData;
demo_MapData.__name__ = true;
demo_MapData.__interfaces__ = [pathfinder_IMap];
demo_MapData.__super__ = awe6_core_Entity;
demo_MapData.prototype = $extend(awe6_core_Entity.prototype,{
	_init: function() {
		awe6_core_Entity.prototype._init.call(this);
		this._shuffle();
	}
	,isWalkable: function(p_x,p_y) {
		return this._mapData[p_y * this.cols + p_x];
	}
	,_shuffle: function() {
		this._mapData = [];
		var l_t = this.rows * this.cols;
		var _g = 0;
		while(_g < l_t) {
			var i = _g++;
			this._mapData.push(Math.random() > 0.1);
		}
	}
	,__class__: demo_MapData
});
var demo_MapDisplay = function(p_kernel,p_cols,p_rows) {
	demo_MapData.call(this,p_kernel,p_cols,p_rows);
};
$hxClasses["demo.MapDisplay"] = demo_MapDisplay;
demo_MapDisplay.__name__ = true;
demo_MapDisplay.__super__ = demo_MapData;
demo_MapDisplay.prototype = $extend(demo_MapData.prototype,{
	_init: function() {
		demo_MapData.prototype._init.call(this);
		var l_shape = new createjs.Shape();
		this._graphics = l_shape.graphics;
		this._context.addChild(l_shape);
		this._drawMap();
	}
	,_drawMap: function() {
		this._graphics.clear();
		this._graphics.beginFill("#80DDFF");
		this._graphics.drawRect(0,0,this.cols * 10,this.rows * 10);
		this._graphics.endFill();
		var l_t = this.rows * this.cols;
		var _g = 0;
		while(_g < l_t) {
			var i = _g++;
			var l_r = Math.floor(i / this.cols);
			var l_c = i % this.cols;
			if(!this._mapData[i]) this._drawGrid(l_c,l_r,"#000000");
		}
		this._graphics.setStrokeStyle(1);
		this._graphics.beginStroke("#FFFFFF");
		this._graphics.moveTo(0,0);
		this._graphics.lineTo(0,this.rows * 10);
		this._graphics.lineTo(this.cols * 10,this.rows * 10);
		this._graphics.lineTo(this.cols * 10,0);
		this._graphics.lineTo(0,0);
		this._graphics.beginStroke("#FFFFFF");
		var _g1 = 1;
		var _g2 = this.rows;
		while(_g1 < _g2) {
			var i1 = _g1++;
			this._graphics.moveTo(0,i1 * 10);
			this._graphics.lineTo(this.cols * 10,i1 * 10);
		}
		var _g11 = 1;
		var _g3 = this.cols;
		while(_g11 < _g3) {
			var i2 = _g11++;
			this._graphics.moveTo(i2 * 10,0);
			this._graphics.lineTo(i2 * 10,this.rows * 10);
		}
	}
	,_drawGrid: function(p_x,p_y,p_color) {
		this._graphics.beginFill(p_color);
		this._graphics.drawRect(p_x * 10,p_y * 10,10,10);
		this._graphics.endFill();
	}
	,_drawPath: function(p_path) {
		var _g1 = 1;
		var _g = p_path.length - 1;
		while(_g1 < _g) {
			var i = _g1++;
			var l_grid = p_path[i];
			this._drawGrid(l_grid.x,l_grid.y,"#EEEEEE");
		}
	}
	,__class__: demo_MapDisplay
});
var demo_MapInteractive = function(p_kernel,p_cols,p_rows) {
	demo_MapDisplay.call(this,p_kernel,p_cols,p_rows);
};
$hxClasses["demo.MapInteractive"] = demo_MapInteractive;
demo_MapInteractive.__name__ = true;
demo_MapInteractive.__super__ = demo_MapDisplay;
demo_MapInteractive.prototype = $extend(demo_MapDisplay.prototype,{
	_init: function() {
		demo_MapDisplay.prototype._init.call(this);
		this._heuristicType = pathfinder_EHeuristic.PRODUCT;
		this.message = "Click any two map nodes.  Change Heuristic with keys 1-4.  Hold SHIFT to disable diagonals.  Hold CTRL to alter map.";
	}
	,_updater: function(p_deltaTime) {
		if(p_deltaTime == null) p_deltaTime = 0;
		demo_MapDisplay.prototype._updater.call(this,p_deltaTime);
		if(this._kernel.inputs.mouse.getIsButtonRelease()) this._onMouseRelease();
		this._handleKeyboard();
	}
	,_shuffle: function() {
		demo_MapDisplay.prototype._shuffle.call(this);
		this._pathfinder = new pathfinder_Pathfinder(this);
	}
	,_getGridCoordinate: function(p_x,p_y) {
		var l_col = p_x / 10 | 0;
		var l_row = p_y / 10 | 0;
		if(l_col < 0) l_col = 0;
		if(l_col >= this.cols) l_col = this.cols - 1;
		if(l_row < 0) l_row = 0;
		if(l_row >= this.rows) l_row = this.rows - 1;
		return new pathfinder_Coordinate(l_col,l_row);
	}
	,_handleKeyboard: function() {
		var l_prevHeuristicType = this._heuristicType;
		if(this._kernel.inputs.keyboard.getIsKeyRelease(awe6_interfaces_EKey.NUMBER_1)) this._heuristicType = pathfinder_EHeuristic.DIAGONAL;
		if(this._kernel.inputs.keyboard.getIsKeyRelease(awe6_interfaces_EKey.NUMBER_2)) this._heuristicType = pathfinder_EHeuristic.PRODUCT;
		if(this._kernel.inputs.keyboard.getIsKeyRelease(awe6_interfaces_EKey.NUMBER_3)) this._heuristicType = pathfinder_EHeuristic.EUCLIDIAN;
		if(this._kernel.inputs.keyboard.getIsKeyRelease(awe6_interfaces_EKey.NUMBER_4)) this._heuristicType = pathfinder_EHeuristic.MANHATTAN;
		if(l_prevHeuristicType != this._heuristicType) this.message = "Heuristic changed to: " + Std.string(this._heuristicType);
	}
	,_onMouseRelease: function() {
		var l_coordinate = this._getGridCoordinate(this._kernel.inputs.mouse.x,this._kernel.inputs.mouse.y);
		if(this._kernel.inputs.keyboard.getIsKeyDown(awe6_interfaces_EKey.CONTROL)) {
			this._mapData[l_coordinate.y * this.cols + l_coordinate.x] = !this._mapData[l_coordinate.y * this.cols + l_coordinate.x];
			this._drawMap();
			this._pathfinder.configure(this);
			return;
		}
		if(!this.isWalkable(l_coordinate.x,l_coordinate.y)) return;
		if(this._isStartSet) {
			this._drawGrid(l_coordinate.x,l_coordinate.y,"#00FF00");
			var l_path = this._pathfinder.createPath(this._start,l_coordinate,this._heuristicType,!this._kernel.inputs.keyboard.getIsKeyDown(awe6_interfaces_EKey.SHIFT));
			this.message = this._pathfinder.getInfo();
			if(l_path != null) this._drawPath(l_path);
		} else {
			this._drawMap();
			this._drawGrid(l_coordinate.x,l_coordinate.y,"#FF0000");
			this._start = l_coordinate;
			this.message = "Start node selected ... click to select destination node (hold shift to disable diagonals) ...";
		}
		this._isStartSet = !this._isStartSet;
	}
	,__class__: demo_MapInteractive
});
var demo_Test = function(p_kernel,p_type,p_isPauseable,p_isMuteable,p_isSessionSavedOnNext) {
	if(p_isSessionSavedOnNext == null) p_isSessionSavedOnNext = false;
	if(p_isMuteable == null) p_isMuteable = true;
	if(p_isPauseable == null) p_isPauseable = false;
	awe6_core_Scene.call(this,p_kernel,p_type,p_isPauseable,p_isMuteable,p_isSessionSavedOnNext);
};
$hxClasses["demo.Test"] = demo_Test;
demo_Test.__name__ = true;
demo_Test.__super__ = awe6_core_Scene;
demo_Test.prototype = $extend(awe6_core_Scene.prototype,{
	_init: function() {
		awe6_core_Scene.prototype._init.call(this);
		this._map = new demo_MapInteractive(this._kernel,Math.floor(this._kernel.factory.width / 10),Math.floor((this._kernel.factory.height - 40) / 10));
		this.addEntity(this._map,null,true,5);
		this._text = new awe6_core_drivers_createjs_extras_gui_Text(this._kernel,this._kernel.factory.width,30,"Test",this._kernel.factory.createTextStyle());
		this._text.setPosition(0,this._kernel.factory.height - this._text.height);
		this.addEntity(this._text,null,true,10);
	}
	,_updater: function(p_deltaTime) {
		if(p_deltaTime == null) p_deltaTime = 0;
		awe6_core_Scene.prototype._updater.call(this,p_deltaTime);
		this._text.set_text(this._map.message);
	}
	,__class__: demo_Test
});
var haxe_IMap = function() { };
$hxClasses["haxe.IMap"] = haxe_IMap;
haxe_IMap.__name__ = true;
var haxe_Http = function(url) {
	this.url = url;
	this.headers = new List();
	this.params = new List();
	this.async = true;
};
$hxClasses["haxe.Http"] = haxe_Http;
haxe_Http.__name__ = true;
haxe_Http.prototype = {
	request: function(post) {
		var me = this;
		me.responseData = null;
		var r = this.req = js_Browser.createXMLHttpRequest();
		var onreadystatechange = function(_) {
			if(r.readyState != 4) return;
			var s;
			try {
				s = r.status;
			} catch( e ) {
				if (e instanceof js__$Boot_HaxeError) e = e.val;
				s = null;
			}
			if(s != null) {
				var protocol = window.location.protocol.toLowerCase();
				var rlocalProtocol = new EReg("^(?:about|app|app-storage|.+-extension|file|res|widget):$","");
				var isLocal = rlocalProtocol.match(protocol);
				if(isLocal) if(r.responseText != null) s = 200; else s = 404;
			}
			if(s == undefined) s = null;
			if(s != null) me.onStatus(s);
			if(s != null && s >= 200 && s < 400) {
				me.req = null;
				me.onData(me.responseData = r.responseText);
			} else if(s == null) {
				me.req = null;
				me.onError("Failed to connect or resolve host");
			} else switch(s) {
			case 12029:
				me.req = null;
				me.onError("Failed to connect to host");
				break;
			case 12007:
				me.req = null;
				me.onError("Unknown host");
				break;
			default:
				me.req = null;
				me.responseData = r.responseText;
				me.onError("Http Error #" + r.status);
			}
		};
		if(this.async) r.onreadystatechange = onreadystatechange;
		var uri = this.postData;
		if(uri != null) post = true; else {
			var _g_head = this.params.h;
			var _g_val = null;
			while(_g_head != null) {
				var p;
				p = (function($this) {
					var $r;
					_g_val = _g_head[0];
					_g_head = _g_head[1];
					$r = _g_val;
					return $r;
				}(this));
				if(uri == null) uri = ""; else uri += "&";
				uri += encodeURIComponent(p.param) + "=" + encodeURIComponent(p.value);
			}
		}
		try {
			if(post) r.open("POST",this.url,this.async); else if(uri != null) {
				var question = this.url.split("?").length <= 1;
				r.open("GET",this.url + (question?"?":"&") + uri,this.async);
				uri = null;
			} else r.open("GET",this.url,this.async);
		} catch( e1 ) {
			if (e1 instanceof js__$Boot_HaxeError) e1 = e1.val;
			me.req = null;
			this.onError(e1.toString());
			return;
		}
		if(!Lambda.exists(this.headers,function(h) {
			return h.header == "Content-Type";
		}) && post && this.postData == null) r.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		var _g_head1 = this.headers.h;
		var _g_val1 = null;
		while(_g_head1 != null) {
			var h1;
			h1 = (function($this) {
				var $r;
				_g_val1 = _g_head1[0];
				_g_head1 = _g_head1[1];
				$r = _g_val1;
				return $r;
			}(this));
			r.setRequestHeader(h1.header,h1.value);
		}
		r.send(uri);
		if(!this.async) onreadystatechange(null);
	}
	,onData: function(data) {
	}
	,onError: function(msg) {
	}
	,onStatus: function(status) {
	}
	,__class__: haxe_Http
};
var haxe__$Int64__$_$_$Int64 = function(high,low) {
	this.high = high;
	this.low = low;
};
$hxClasses["haxe._Int64.___Int64"] = haxe__$Int64__$_$_$Int64;
haxe__$Int64__$_$_$Int64.__name__ = true;
haxe__$Int64__$_$_$Int64.prototype = {
	__class__: haxe__$Int64__$_$_$Int64
};
var haxe_Log = function() { };
$hxClasses["haxe.Log"] = haxe_Log;
haxe_Log.__name__ = true;
haxe_Log.trace = function(v,infos) {
	js_Boot.__trace(v,infos);
};
var haxe_Resource = function() { };
$hxClasses["haxe.Resource"] = haxe_Resource;
haxe_Resource.__name__ = true;
haxe_Resource.getString = function(name) {
	var _g = 0;
	var _g1 = haxe_Resource.content;
	while(_g < _g1.length) {
		var x = _g1[_g];
		++_g;
		if(x.name == name) {
			if(x.str != null) return x.str;
			var b = haxe_crypto_Base64.decode(x.data);
			return b.toString();
		}
	}
	return null;
};
var haxe_Timer = function(time_ms) {
	var me = this;
	this.id = setInterval(function() {
		me.run();
	},time_ms);
};
$hxClasses["haxe.Timer"] = haxe_Timer;
haxe_Timer.__name__ = true;
haxe_Timer.delay = function(f,time_ms) {
	var t = new haxe_Timer(time_ms);
	t.run = function() {
		t.stop();
		f();
	};
	return t;
};
haxe_Timer.stamp = function() {
	return new Date().getTime() / 1000;
};
haxe_Timer.prototype = {
	stop: function() {
		if(this.id == null) return;
		clearInterval(this.id);
		this.id = null;
	}
	,run: function() {
	}
	,__class__: haxe_Timer
};
var haxe_io_Bytes = function(data) {
	this.length = data.byteLength;
	this.b = new Uint8Array(data);
	this.b.bufferValue = data;
	data.hxBytes = this;
	data.bytes = this.b;
};
$hxClasses["haxe.io.Bytes"] = haxe_io_Bytes;
haxe_io_Bytes.__name__ = true;
haxe_io_Bytes.alloc = function(length) {
	return new haxe_io_Bytes(new ArrayBuffer(length));
};
haxe_io_Bytes.ofString = function(s) {
	var a = [];
	var i = 0;
	while(i < s.length) {
		var c = StringTools.fastCodeAt(s,i++);
		if(55296 <= c && c <= 56319) c = c - 55232 << 10 | StringTools.fastCodeAt(s,i++) & 1023;
		if(c <= 127) a.push(c); else if(c <= 2047) {
			a.push(192 | c >> 6);
			a.push(128 | c & 63);
		} else if(c <= 65535) {
			a.push(224 | c >> 12);
			a.push(128 | c >> 6 & 63);
			a.push(128 | c & 63);
		} else {
			a.push(240 | c >> 18);
			a.push(128 | c >> 12 & 63);
			a.push(128 | c >> 6 & 63);
			a.push(128 | c & 63);
		}
	}
	return new haxe_io_Bytes(new Uint8Array(a).buffer);
};
haxe_io_Bytes.prototype = {
	get: function(pos) {
		return this.b[pos];
	}
	,set: function(pos,v) {
		this.b[pos] = v & 255;
	}
	,getString: function(pos,len) {
		if(pos < 0 || len < 0 || pos + len > this.length) throw new js__$Boot_HaxeError(haxe_io_Error.OutsideBounds);
		var s = "";
		var b = this.b;
		var fcc = String.fromCharCode;
		var i = pos;
		var max = pos + len;
		while(i < max) {
			var c = b[i++];
			if(c < 128) {
				if(c == 0) break;
				s += fcc(c);
			} else if(c < 224) s += fcc((c & 63) << 6 | b[i++] & 127); else if(c < 240) {
				var c2 = b[i++];
				s += fcc((c & 31) << 12 | (c2 & 127) << 6 | b[i++] & 127);
			} else {
				var c21 = b[i++];
				var c3 = b[i++];
				var u = (c & 15) << 18 | (c21 & 127) << 12 | (c3 & 127) << 6 | b[i++] & 127;
				s += fcc((u >> 10) + 55232);
				s += fcc(u & 1023 | 56320);
			}
		}
		return s;
	}
	,toString: function() {
		return this.getString(0,this.length);
	}
	,__class__: haxe_io_Bytes
};
var haxe_crypto_Base64 = function() { };
$hxClasses["haxe.crypto.Base64"] = haxe_crypto_Base64;
haxe_crypto_Base64.__name__ = true;
haxe_crypto_Base64.decode = function(str,complement) {
	if(complement == null) complement = true;
	if(complement) while(HxOverrides.cca(str,str.length - 1) == 61) str = HxOverrides.substr(str,0,-1);
	return new haxe_crypto_BaseCode(haxe_crypto_Base64.BYTES).decodeBytes(haxe_io_Bytes.ofString(str));
};
var haxe_crypto_BaseCode = function(base) {
	var len = base.length;
	var nbits = 1;
	while(len > 1 << nbits) nbits++;
	if(nbits > 8 || len != 1 << nbits) throw new js__$Boot_HaxeError("BaseCode : base length must be a power of two.");
	this.base = base;
	this.nbits = nbits;
};
$hxClasses["haxe.crypto.BaseCode"] = haxe_crypto_BaseCode;
haxe_crypto_BaseCode.__name__ = true;
haxe_crypto_BaseCode.prototype = {
	initTable: function() {
		var tbl = [];
		var _g = 0;
		while(_g < 256) {
			var i = _g++;
			tbl[i] = -1;
		}
		var _g1 = 0;
		var _g2 = this.base.length;
		while(_g1 < _g2) {
			var i1 = _g1++;
			tbl[this.base.b[i1]] = i1;
		}
		this.tbl = tbl;
	}
	,decodeBytes: function(b) {
		var nbits = this.nbits;
		var base = this.base;
		if(this.tbl == null) this.initTable();
		var tbl = this.tbl;
		var size = b.length * nbits >> 3;
		var out = haxe_io_Bytes.alloc(size);
		var buf = 0;
		var curbits = 0;
		var pin = 0;
		var pout = 0;
		while(pout < size) {
			while(curbits < 8) {
				curbits += nbits;
				buf <<= nbits;
				var i = tbl[b.get(pin++)];
				if(i == -1) throw new js__$Boot_HaxeError("BaseCode : invalid encoded char");
				buf |= i;
			}
			curbits -= 8;
			out.set(pout++,buf >> curbits & 255);
		}
		return out;
	}
	,__class__: haxe_crypto_BaseCode
};
var haxe_ds_GenericCell = function(elt,next) {
	this.elt = elt;
	this.next = next;
};
$hxClasses["haxe.ds.GenericCell"] = haxe_ds_GenericCell;
haxe_ds_GenericCell.__name__ = true;
haxe_ds_GenericCell.prototype = {
	__class__: haxe_ds_GenericCell
};
var haxe_ds_GenericStack = function() {
};
$hxClasses["haxe.ds.GenericStack"] = haxe_ds_GenericStack;
haxe_ds_GenericStack.__name__ = true;
haxe_ds_GenericStack.prototype = {
	add: function(item) {
		this.head = new haxe_ds_GenericCell(item,this.head);
	}
	,remove: function(v) {
		var prev = null;
		var l = this.head;
		while(l != null) {
			if(l.elt == v) {
				if(prev == null) this.head = l.next; else prev.next = l.next;
				break;
			}
			prev = l;
			l = l.next;
		}
		return l != null;
	}
	,iterator: function() {
		var l = this.head;
		return { hasNext : function() {
			return l != null;
		}, next : function() {
			var k = l;
			l = k.next;
			return k.elt;
		}};
	}
	,__class__: haxe_ds_GenericStack
};
var haxe_ds_StringMap = function() {
	this.h = { };
};
$hxClasses["haxe.ds.StringMap"] = haxe_ds_StringMap;
haxe_ds_StringMap.__name__ = true;
haxe_ds_StringMap.__interfaces__ = [haxe_IMap];
haxe_ds_StringMap.prototype = {
	set: function(key,value) {
		if(__map_reserved[key] != null) this.setReserved(key,value); else this.h[key] = value;
	}
	,get: function(key) {
		if(__map_reserved[key] != null) return this.getReserved(key);
		return this.h[key];
	}
	,exists: function(key) {
		if(__map_reserved[key] != null) return this.existsReserved(key);
		return this.h.hasOwnProperty(key);
	}
	,setReserved: function(key,value) {
		if(this.rh == null) this.rh = { };
		this.rh["$" + key] = value;
	}
	,getReserved: function(key) {
		if(this.rh == null) return null; else return this.rh["$" + key];
	}
	,existsReserved: function(key) {
		if(this.rh == null) return false;
		return this.rh.hasOwnProperty("$" + key);
	}
	,remove: function(key) {
		if(__map_reserved[key] != null) {
			key = "$" + key;
			if(this.rh == null || !this.rh.hasOwnProperty(key)) return false;
			delete(this.rh[key]);
			return true;
		} else {
			if(!this.h.hasOwnProperty(key)) return false;
			delete(this.h[key]);
			return true;
		}
	}
	,keys: function() {
		var _this = this.arrayKeys();
		return HxOverrides.iter(_this);
	}
	,arrayKeys: function() {
		var out = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) out.push(key);
		}
		if(this.rh != null) {
			for( var key in this.rh ) {
			if(key.charCodeAt(0) == 36) out.push(key.substr(1));
			}
		}
		return out;
	}
	,__class__: haxe_ds_StringMap
};
var haxe_io_Error = $hxClasses["haxe.io.Error"] = { __ename__ : true, __constructs__ : ["Blocked","Overflow","OutsideBounds","Custom"] };
haxe_io_Error.Blocked = ["Blocked",0];
haxe_io_Error.Blocked.toString = $estr;
haxe_io_Error.Blocked.__enum__ = haxe_io_Error;
haxe_io_Error.Overflow = ["Overflow",1];
haxe_io_Error.Overflow.toString = $estr;
haxe_io_Error.Overflow.__enum__ = haxe_io_Error;
haxe_io_Error.OutsideBounds = ["OutsideBounds",2];
haxe_io_Error.OutsideBounds.toString = $estr;
haxe_io_Error.OutsideBounds.__enum__ = haxe_io_Error;
haxe_io_Error.Custom = function(e) { var $x = ["Custom",3,e]; $x.__enum__ = haxe_io_Error; $x.toString = $estr; return $x; };
var haxe_io_FPHelper = function() { };
$hxClasses["haxe.io.FPHelper"] = haxe_io_FPHelper;
haxe_io_FPHelper.__name__ = true;
haxe_io_FPHelper.i32ToFloat = function(i) {
	var sign = 1 - (i >>> 31 << 1);
	var exp = i >>> 23 & 255;
	var sig = i & 8388607;
	if(sig == 0 && exp == 0) return 0.0;
	return sign * (1 + Math.pow(2,-23) * sig) * Math.pow(2,exp - 127);
};
haxe_io_FPHelper.floatToI32 = function(f) {
	if(f == 0) return 0;
	var af;
	if(f < 0) af = -f; else af = f;
	var exp = Math.floor(Math.log(af) / 0.6931471805599453);
	if(exp < -127) exp = -127; else if(exp > 128) exp = 128;
	var sig = Math.round((af / Math.pow(2,exp) - 1) * 8388608) & 8388607;
	return (f < 0?-2147483648:0) | exp + 127 << 23 | sig;
};
haxe_io_FPHelper.i64ToDouble = function(low,high) {
	var sign = 1 - (high >>> 31 << 1);
	var exp = (high >> 20 & 2047) - 1023;
	var sig = (high & 1048575) * 4294967296. + (low >>> 31) * 2147483648. + (low & 2147483647);
	if(sig == 0 && exp == -1023) return 0.0;
	return sign * (1.0 + Math.pow(2,-52) * sig) * Math.pow(2,exp);
};
haxe_io_FPHelper.doubleToI64 = function(v) {
	var i64 = haxe_io_FPHelper.i64tmp;
	if(v == 0) {
		i64.low = 0;
		i64.high = 0;
	} else {
		var av;
		if(v < 0) av = -v; else av = v;
		var exp = Math.floor(Math.log(av) / 0.6931471805599453);
		var sig;
		var v1 = (av / Math.pow(2,exp) - 1) * 4503599627370496.;
		sig = Math.round(v1);
		var sig_l = sig | 0;
		var sig_h = sig / 4294967296.0 | 0;
		i64.low = sig_l;
		i64.high = (v < 0?-2147483648:0) | exp + 1023 << 20 | sig_h;
	}
	return i64;
};
var haxe_xml_Parser = function() { };
$hxClasses["haxe.xml.Parser"] = haxe_xml_Parser;
haxe_xml_Parser.__name__ = true;
haxe_xml_Parser.parse = function(str,strict) {
	if(strict == null) strict = false;
	var doc = Xml.createDocument();
	haxe_xml_Parser.doParse(str,strict,0,doc);
	return doc;
};
haxe_xml_Parser.doParse = function(str,strict,p,parent) {
	if(p == null) p = 0;
	var xml = null;
	var state = 1;
	var next = 1;
	var aname = null;
	var start = 0;
	var nsubs = 0;
	var nbrackets = 0;
	var c = str.charCodeAt(p);
	var buf = new StringBuf();
	var escapeNext = 1;
	var attrValQuote = -1;
	while(!(c != c)) {
		switch(state) {
		case 0:
			switch(c) {
			case 10:case 13:case 9:case 32:
				break;
			default:
				state = next;
				continue;
			}
			break;
		case 1:
			switch(c) {
			case 60:
				state = 0;
				next = 2;
				break;
			default:
				start = p;
				state = 13;
				continue;
			}
			break;
		case 13:
			if(c == 60) {
				buf.addSub(str,start,p - start);
				var child = Xml.createPCData(buf.b);
				buf = new StringBuf();
				parent.addChild(child);
				nsubs++;
				state = 0;
				next = 2;
			} else if(c == 38) {
				buf.addSub(str,start,p - start);
				state = 18;
				escapeNext = 13;
				start = p + 1;
			}
			break;
		case 17:
			if(c == 93 && str.charCodeAt(p + 1) == 93 && str.charCodeAt(p + 2) == 62) {
				var child1 = Xml.createCData(HxOverrides.substr(str,start,p - start));
				parent.addChild(child1);
				nsubs++;
				p += 2;
				state = 1;
			}
			break;
		case 2:
			switch(c) {
			case 33:
				if(str.charCodeAt(p + 1) == 91) {
					p += 2;
					if(HxOverrides.substr(str,p,6).toUpperCase() != "CDATA[") throw new js__$Boot_HaxeError("Expected <![CDATA[");
					p += 5;
					state = 17;
					start = p + 1;
				} else if(str.charCodeAt(p + 1) == 68 || str.charCodeAt(p + 1) == 100) {
					if(HxOverrides.substr(str,p + 2,6).toUpperCase() != "OCTYPE") throw new js__$Boot_HaxeError("Expected <!DOCTYPE");
					p += 8;
					state = 16;
					start = p + 1;
				} else if(str.charCodeAt(p + 1) != 45 || str.charCodeAt(p + 2) != 45) throw new js__$Boot_HaxeError("Expected <!--"); else {
					p += 2;
					state = 15;
					start = p + 1;
				}
				break;
			case 63:
				state = 14;
				start = p;
				break;
			case 47:
				if(parent == null) throw new js__$Boot_HaxeError("Expected node name");
				start = p + 1;
				state = 0;
				next = 10;
				break;
			default:
				state = 3;
				start = p;
				continue;
			}
			break;
		case 3:
			if(!(c >= 97 && c <= 122 || c >= 65 && c <= 90 || c >= 48 && c <= 57 || c == 58 || c == 46 || c == 95 || c == 45)) {
				if(p == start) throw new js__$Boot_HaxeError("Expected node name");
				xml = Xml.createElement(HxOverrides.substr(str,start,p - start));
				parent.addChild(xml);
				nsubs++;
				state = 0;
				next = 4;
				continue;
			}
			break;
		case 4:
			switch(c) {
			case 47:
				state = 11;
				break;
			case 62:
				state = 9;
				break;
			default:
				state = 5;
				start = p;
				continue;
			}
			break;
		case 5:
			if(!(c >= 97 && c <= 122 || c >= 65 && c <= 90 || c >= 48 && c <= 57 || c == 58 || c == 46 || c == 95 || c == 45)) {
				var tmp;
				if(start == p) throw new js__$Boot_HaxeError("Expected attribute name");
				tmp = HxOverrides.substr(str,start,p - start);
				aname = tmp;
				if(xml.exists(aname)) throw new js__$Boot_HaxeError("Duplicate attribute");
				state = 0;
				next = 6;
				continue;
			}
			break;
		case 6:
			switch(c) {
			case 61:
				state = 0;
				next = 7;
				break;
			default:
				throw new js__$Boot_HaxeError("Expected =");
			}
			break;
		case 7:
			switch(c) {
			case 34:case 39:
				buf = new StringBuf();
				state = 8;
				start = p + 1;
				attrValQuote = c;
				break;
			default:
				throw new js__$Boot_HaxeError("Expected \"");
			}
			break;
		case 8:
			switch(c) {
			case 38:
				buf.addSub(str,start,p - start);
				state = 18;
				escapeNext = 8;
				start = p + 1;
				break;
			case 62:
				if(strict) throw new js__$Boot_HaxeError("Invalid unescaped " + String.fromCharCode(c) + " in attribute value"); else if(c == attrValQuote) {
					buf.addSub(str,start,p - start);
					var val = buf.b;
					buf = new StringBuf();
					xml.set(aname,val);
					state = 0;
					next = 4;
				}
				break;
			case 60:
				if(strict) throw new js__$Boot_HaxeError("Invalid unescaped " + String.fromCharCode(c) + " in attribute value"); else if(c == attrValQuote) {
					buf.addSub(str,start,p - start);
					var val1 = buf.b;
					buf = new StringBuf();
					xml.set(aname,val1);
					state = 0;
					next = 4;
				}
				break;
			default:
				if(c == attrValQuote) {
					buf.addSub(str,start,p - start);
					var val2 = buf.b;
					buf = new StringBuf();
					xml.set(aname,val2);
					state = 0;
					next = 4;
				}
			}
			break;
		case 9:
			p = haxe_xml_Parser.doParse(str,strict,p,xml);
			start = p;
			state = 1;
			break;
		case 11:
			switch(c) {
			case 62:
				state = 1;
				break;
			default:
				throw new js__$Boot_HaxeError("Expected >");
			}
			break;
		case 12:
			switch(c) {
			case 62:
				if(nsubs == 0) parent.addChild(Xml.createPCData(""));
				return p;
			default:
				throw new js__$Boot_HaxeError("Expected >");
			}
			break;
		case 10:
			if(!(c >= 97 && c <= 122 || c >= 65 && c <= 90 || c >= 48 && c <= 57 || c == 58 || c == 46 || c == 95 || c == 45)) {
				if(start == p) throw new js__$Boot_HaxeError("Expected node name");
				var v = HxOverrides.substr(str,start,p - start);
				if(v != (function($this) {
					var $r;
					if(parent.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element but found " + parent.nodeType);
					$r = parent.nodeName;
					return $r;
				}(this))) throw new js__$Boot_HaxeError("Expected </" + (function($this) {
					var $r;
					if(parent.nodeType != Xml.Element) throw "Bad node type, expected Element but found " + parent.nodeType;
					$r = parent.nodeName;
					return $r;
				}(this)) + ">");
				state = 0;
				next = 12;
				continue;
			}
			break;
		case 15:
			if(c == 45 && str.charCodeAt(p + 1) == 45 && str.charCodeAt(p + 2) == 62) {
				var xml1 = Xml.createComment(HxOverrides.substr(str,start,p - start));
				parent.addChild(xml1);
				nsubs++;
				p += 2;
				state = 1;
			}
			break;
		case 16:
			if(c == 91) nbrackets++; else if(c == 93) nbrackets--; else if(c == 62 && nbrackets == 0) {
				var xml2 = Xml.createDocType(HxOverrides.substr(str,start,p - start));
				parent.addChild(xml2);
				nsubs++;
				state = 1;
			}
			break;
		case 14:
			if(c == 63 && str.charCodeAt(p + 1) == 62) {
				p++;
				var str1 = HxOverrides.substr(str,start + 1,p - start - 2);
				var xml3 = Xml.createProcessingInstruction(str1);
				parent.addChild(xml3);
				nsubs++;
				state = 1;
			}
			break;
		case 18:
			if(c == 59) {
				var s = HxOverrides.substr(str,start,p - start);
				if(s.charCodeAt(0) == 35) {
					var c1;
					if(s.charCodeAt(1) == 120) c1 = Std.parseInt("0" + HxOverrides.substr(s,1,s.length - 1)); else c1 = Std.parseInt(HxOverrides.substr(s,1,s.length - 1));
					buf.b += String.fromCharCode(c1);
				} else if(!haxe_xml_Parser.escapes.exists(s)) {
					if(strict) throw new js__$Boot_HaxeError("Undefined entity: " + s);
					buf.b += Std.string("&" + s + ";");
				} else buf.add(haxe_xml_Parser.escapes.get(s));
				start = p + 1;
				state = escapeNext;
			} else if(!(c >= 97 && c <= 122 || c >= 65 && c <= 90 || c >= 48 && c <= 57 || c == 58 || c == 46 || c == 95 || c == 45) && c != 35) {
				if(strict) throw new js__$Boot_HaxeError("Invalid character in entity: " + String.fromCharCode(c));
				buf.b += "&";
				buf.addSub(str,start,p - start);
				p--;
				start = p + 1;
				state = escapeNext;
			}
			break;
		}
		c = StringTools.fastCodeAt(str,++p);
	}
	if(state == 1) {
		start = p;
		state = 13;
	}
	if(state == 13) {
		if(p != start || nsubs == 0) {
			buf.addSub(str,start,p - start);
			var xml4 = Xml.createPCData(buf.b);
			parent.addChild(xml4);
			nsubs++;
		}
		return p;
	}
	if(!strict && state == 18 && escapeNext == 13) {
		buf.b += "&";
		buf.addSub(str,start,p - start);
		var xml5 = Xml.createPCData(buf.b);
		parent.addChild(xml5);
		nsubs++;
		return p;
	}
	throw new js__$Boot_HaxeError("Unexpected end");
};
var haxe_xml_Printer = function(pretty) {
	this.output = new StringBuf();
	this.pretty = pretty;
};
$hxClasses["haxe.xml.Printer"] = haxe_xml_Printer;
haxe_xml_Printer.__name__ = true;
haxe_xml_Printer.print = function(xml,pretty) {
	if(pretty == null) pretty = false;
	var printer = new haxe_xml_Printer(pretty);
	printer.writeNode(xml,"");
	return printer.output.b;
};
haxe_xml_Printer.prototype = {
	writeNode: function(value,tabs) {
		var _g = value.nodeType;
		switch(_g) {
		case 2:
			this.output.b += Std.string(tabs + "<![CDATA[");
			this.write(StringTools.trim((function($this) {
				var $r;
				if(value.nodeType == Xml.Document || value.nodeType == Xml.Element) throw new js__$Boot_HaxeError("Bad node type, unexpected " + value.nodeType);
				$r = value.nodeValue;
				return $r;
			}(this))));
			this.output.b += "]]>";
			if(this.pretty) this.output.b += "";
			break;
		case 3:
			var commentContent;
			if(value.nodeType == Xml.Document || value.nodeType == Xml.Element) throw new js__$Boot_HaxeError("Bad node type, unexpected " + value.nodeType);
			commentContent = value.nodeValue;
			commentContent = new EReg("[\n\r\t]+","g").replace(commentContent,"");
			commentContent = "<!--" + commentContent + "-->";
			if(tabs == null) this.output.b += "null"; else this.output.b += "" + tabs;
			this.write(StringTools.trim(commentContent));
			if(this.pretty) this.output.b += "";
			break;
		case 6:
			var $it0 = (function($this) {
				var $r;
				if(value.nodeType != Xml.Document && value.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element or Document but found " + value.nodeType);
				$r = HxOverrides.iter(value.children);
				return $r;
			}(this));
			while( $it0.hasNext() ) {
				var child = $it0.next();
				this.writeNode(child,tabs);
			}
			break;
		case 0:
			this.output.b += Std.string(tabs + "<");
			this.write((function($this) {
				var $r;
				if(value.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element but found " + value.nodeType);
				$r = value.nodeName;
				return $r;
			}(this)));
			var $it1 = value.attributes();
			while( $it1.hasNext() ) {
				var attribute = $it1.next();
				this.output.b += Std.string(" " + attribute + "=\"");
				this.write(StringTools.htmlEscape(value.get(attribute),true));
				this.output.b += "\"";
			}
			if(this.hasChildren(value)) {
				this.output.b += ">";
				if(this.pretty) this.output.b += "";
				var $it2 = (function($this) {
					var $r;
					if(value.nodeType != Xml.Document && value.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element or Document but found " + value.nodeType);
					$r = HxOverrides.iter(value.children);
					return $r;
				}(this));
				while( $it2.hasNext() ) {
					var child1 = $it2.next();
					this.writeNode(child1,this.pretty?tabs + "\t":tabs);
				}
				this.output.b += Std.string(tabs + "</");
				this.write((function($this) {
					var $r;
					if(value.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element but found " + value.nodeType);
					$r = value.nodeName;
					return $r;
				}(this)));
				this.output.b += ">";
				if(this.pretty) this.output.b += "";
			} else {
				this.output.b += "/>";
				if(this.pretty) this.output.b += "";
			}
			break;
		case 1:
			var nodeValue;
			if(value.nodeType == Xml.Document || value.nodeType == Xml.Element) throw new js__$Boot_HaxeError("Bad node type, unexpected " + value.nodeType);
			nodeValue = value.nodeValue;
			if(nodeValue.length != 0) {
				this.write(tabs + StringTools.htmlEscape(nodeValue));
				if(this.pretty) this.output.b += "";
			}
			break;
		case 5:
			this.write("<?" + (function($this) {
				var $r;
				if(value.nodeType == Xml.Document || value.nodeType == Xml.Element) throw new js__$Boot_HaxeError("Bad node type, unexpected " + value.nodeType);
				$r = value.nodeValue;
				return $r;
			}(this)) + "?>");
			break;
		case 4:
			this.write("<!DOCTYPE " + (function($this) {
				var $r;
				if(value.nodeType == Xml.Document || value.nodeType == Xml.Element) throw new js__$Boot_HaxeError("Bad node type, unexpected " + value.nodeType);
				$r = value.nodeValue;
				return $r;
			}(this)) + ">");
			break;
		}
	}
	,write: function(input) {
		if(input == null) this.output.b += "null"; else this.output.b += "" + input;
	}
	,hasChildren: function(value) {
		var $it0 = (function($this) {
			var $r;
			if(value.nodeType != Xml.Document && value.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element or Document but found " + value.nodeType);
			$r = HxOverrides.iter(value.children);
			return $r;
		}(this));
		while( $it0.hasNext() ) {
			var child = $it0.next();
			var _g = child.nodeType;
			switch(_g) {
			case 0:case 1:
				return true;
			case 2:case 3:
				if(StringTools.ltrim((function($this) {
					var $r;
					if(child.nodeType == Xml.Document || child.nodeType == Xml.Element) throw new js__$Boot_HaxeError("Bad node type, unexpected " + child.nodeType);
					$r = child.nodeValue;
					return $r;
				}(this))).length != 0) return true;
				break;
			default:
			}
		}
		return false;
	}
	,__class__: haxe_xml_Printer
};
var js__$Boot_HaxeError = function(val) {
	Error.call(this);
	this.val = val;
	this.message = String(val);
	if(Error.captureStackTrace) Error.captureStackTrace(this,js__$Boot_HaxeError);
};
$hxClasses["js._Boot.HaxeError"] = js__$Boot_HaxeError;
js__$Boot_HaxeError.__name__ = true;
js__$Boot_HaxeError.__super__ = Error;
js__$Boot_HaxeError.prototype = $extend(Error.prototype,{
	__class__: js__$Boot_HaxeError
});
var js_Boot = function() { };
$hxClasses["js.Boot"] = js_Boot;
js_Boot.__name__ = true;
js_Boot.__unhtml = function(s) {
	return s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
};
js_Boot.__trace = function(v,i) {
	var msg;
	if(i != null) msg = i.fileName + ":" + i.lineNumber + ": "; else msg = "";
	msg += js_Boot.__string_rec(v,"");
	if(i != null && i.customParams != null) {
		var _g = 0;
		var _g1 = i.customParams;
		while(_g < _g1.length) {
			var v1 = _g1[_g];
			++_g;
			msg += "," + js_Boot.__string_rec(v1,"");
		}
	}
	var d;
	if(typeof(document) != "undefined" && (d = document.getElementById("haxe:trace")) != null) d.innerHTML += js_Boot.__unhtml(msg) + "<br/>"; else if(typeof console != "undefined" && console.log != null) console.log(msg);
};
js_Boot.getClass = function(o) {
	if((o instanceof Array) && o.__enum__ == null) return Array; else {
		var cl = o.__class__;
		if(cl != null) return cl;
		var name = js_Boot.__nativeClassName(o);
		if(name != null) return js_Boot.__resolveNativeClass(name);
		return null;
	}
};
js_Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str2 = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i1 = _g1++;
					if(i1 != 2) str2 += "," + js_Boot.__string_rec(o[i1],s); else str2 += js_Boot.__string_rec(o[i1],s);
				}
				return str2 + ")";
			}
			var l = o.length;
			var i;
			var str1 = "[";
			s += "\t";
			var _g2 = 0;
			while(_g2 < l) {
				var i2 = _g2++;
				str1 += (i2 > 0?",":"") + js_Boot.__string_rec(o[i2],s);
			}
			str1 += "]";
			return str1;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js_Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
};
js_Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0;
		var _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js_Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js_Boot.__interfLoop(cc.__super__,cl);
};
js_Boot.__instanceof = function(o,cl) {
	if(cl == null) return false;
	switch(cl) {
	case Int:
		return (o|0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return typeof(o) == "boolean";
	case String:
		return typeof(o) == "string";
	case Array:
		return (o instanceof Array) && o.__enum__ == null;
	case Dynamic:
		return true;
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(o instanceof cl) return true;
				if(js_Boot.__interfLoop(js_Boot.getClass(o),cl)) return true;
			} else if(typeof(cl) == "object" && js_Boot.__isNativeObj(cl)) {
				if(o instanceof cl) return true;
			}
		} else return false;
		if(cl == Class && o.__name__ != null) return true;
		if(cl == Enum && o.__ename__ != null) return true;
		return o.__enum__ == cl;
	}
};
js_Boot.__cast = function(o,t) {
	if(js_Boot.__instanceof(o,t)) return o; else throw new js__$Boot_HaxeError("Cannot cast " + Std.string(o) + " to " + Std.string(t));
};
js_Boot.__nativeClassName = function(o) {
	var name = js_Boot.__toStr.call(o).slice(8,-1);
	if(name == "Object" || name == "Function" || name == "Math" || name == "JSON") return null;
	return name;
};
js_Boot.__isNativeObj = function(o) {
	return js_Boot.__nativeClassName(o) != null;
};
js_Boot.__resolveNativeClass = function(name) {
	return (Function("return typeof " + name + " != \"undefined\" ? " + name + " : null"))();
};
var js_Browser = function() { };
$hxClasses["js.Browser"] = js_Browser;
js_Browser.__name__ = true;
js_Browser.createXMLHttpRequest = function() {
	if(typeof XMLHttpRequest != "undefined") return new XMLHttpRequest();
	if(typeof ActiveXObject != "undefined") return new ActiveXObject("Microsoft.XMLHTTP");
	throw new js__$Boot_HaxeError("Unable to create XMLHttpRequest object.");
};
var js_html_compat_ArrayBuffer = function(a) {
	if((a instanceof Array) && a.__enum__ == null) {
		this.a = a;
		this.byteLength = a.length;
	} else {
		var len = a;
		this.a = [];
		var _g = 0;
		while(_g < len) {
			var i = _g++;
			this.a[i] = 0;
		}
		this.byteLength = len;
	}
};
$hxClasses["js.html.compat.ArrayBuffer"] = js_html_compat_ArrayBuffer;
js_html_compat_ArrayBuffer.__name__ = true;
js_html_compat_ArrayBuffer.sliceImpl = function(begin,end) {
	var u = new Uint8Array(this,begin,end == null?null:end - begin);
	var result = new ArrayBuffer(u.byteLength);
	var resultArray = new Uint8Array(result);
	resultArray.set(u);
	return result;
};
js_html_compat_ArrayBuffer.prototype = {
	slice: function(begin,end) {
		return new js_html_compat_ArrayBuffer(this.a.slice(begin,end));
	}
	,__class__: js_html_compat_ArrayBuffer
};
var js_html_compat_DataView = function(buffer,byteOffset,byteLength) {
	this.buf = buffer;
	if(byteOffset == null) this.offset = 0; else this.offset = byteOffset;
	if(byteLength == null) this.length = buffer.byteLength - this.offset; else this.length = byteLength;
	if(this.offset < 0 || this.length < 0 || this.offset + this.length > buffer.byteLength) throw new js__$Boot_HaxeError(haxe_io_Error.OutsideBounds);
};
$hxClasses["js.html.compat.DataView"] = js_html_compat_DataView;
js_html_compat_DataView.__name__ = true;
js_html_compat_DataView.prototype = {
	getInt8: function(byteOffset) {
		var v = this.buf.a[this.offset + byteOffset];
		if(v >= 128) return v - 256; else return v;
	}
	,getUint8: function(byteOffset) {
		return this.buf.a[this.offset + byteOffset];
	}
	,getInt16: function(byteOffset,littleEndian) {
		var v = this.getUint16(byteOffset,littleEndian);
		if(v >= 32768) return v - 65536; else return v;
	}
	,getUint16: function(byteOffset,littleEndian) {
		if(littleEndian) return this.buf.a[this.offset + byteOffset] | this.buf.a[this.offset + byteOffset + 1] << 8; else return this.buf.a[this.offset + byteOffset] << 8 | this.buf.a[this.offset + byteOffset + 1];
	}
	,getInt32: function(byteOffset,littleEndian) {
		var p = this.offset + byteOffset;
		var a = this.buf.a[p++];
		var b = this.buf.a[p++];
		var c = this.buf.a[p++];
		var d = this.buf.a[p++];
		if(littleEndian) return a | b << 8 | c << 16 | d << 24; else return d | c << 8 | b << 16 | a << 24;
	}
	,getUint32: function(byteOffset,littleEndian) {
		var v = this.getInt32(byteOffset,littleEndian);
		if(v < 0) return v + 4294967296.; else return v;
	}
	,getFloat32: function(byteOffset,littleEndian) {
		return haxe_io_FPHelper.i32ToFloat(this.getInt32(byteOffset,littleEndian));
	}
	,getFloat64: function(byteOffset,littleEndian) {
		var a = this.getInt32(byteOffset,littleEndian);
		var b = this.getInt32(byteOffset + 4,littleEndian);
		return haxe_io_FPHelper.i64ToDouble(littleEndian?a:b,littleEndian?b:a);
	}
	,setInt8: function(byteOffset,value) {
		if(value < 0) this.buf.a[byteOffset + this.offset] = value + 128 & 255; else this.buf.a[byteOffset + this.offset] = value & 255;
	}
	,setUint8: function(byteOffset,value) {
		this.buf.a[byteOffset + this.offset] = value & 255;
	}
	,setInt16: function(byteOffset,value,littleEndian) {
		this.setUint16(byteOffset,value < 0?value + 65536:value,littleEndian);
	}
	,setUint16: function(byteOffset,value,littleEndian) {
		var p = byteOffset + this.offset;
		if(littleEndian) {
			this.buf.a[p] = value & 255;
			this.buf.a[p++] = value >> 8 & 255;
		} else {
			this.buf.a[p++] = value >> 8 & 255;
			this.buf.a[p] = value & 255;
		}
	}
	,setInt32: function(byteOffset,value,littleEndian) {
		this.setUint32(byteOffset,value,littleEndian);
	}
	,setUint32: function(byteOffset,value,littleEndian) {
		var p = byteOffset + this.offset;
		if(littleEndian) {
			this.buf.a[p++] = value & 255;
			this.buf.a[p++] = value >> 8 & 255;
			this.buf.a[p++] = value >> 16 & 255;
			this.buf.a[p++] = value >>> 24;
		} else {
			this.buf.a[p++] = value >>> 24;
			this.buf.a[p++] = value >> 16 & 255;
			this.buf.a[p++] = value >> 8 & 255;
			this.buf.a[p++] = value & 255;
		}
	}
	,setFloat32: function(byteOffset,value,littleEndian) {
		this.setUint32(byteOffset,haxe_io_FPHelper.floatToI32(value),littleEndian);
	}
	,setFloat64: function(byteOffset,value,littleEndian) {
		var i64 = haxe_io_FPHelper.doubleToI64(value);
		if(littleEndian) {
			this.setUint32(byteOffset,i64.low);
			this.setUint32(byteOffset,i64.high);
		} else {
			this.setUint32(byteOffset,i64.high);
			this.setUint32(byteOffset,i64.low);
		}
	}
	,__class__: js_html_compat_DataView
};
var js_html_compat_Uint8Array = function() { };
$hxClasses["js.html.compat.Uint8Array"] = js_html_compat_Uint8Array;
js_html_compat_Uint8Array.__name__ = true;
js_html_compat_Uint8Array._new = function(arg1,offset,length) {
	var arr;
	if(typeof(arg1) == "number") {
		arr = [];
		var _g = 0;
		while(_g < arg1) {
			var i = _g++;
			arr[i] = 0;
		}
		arr.byteLength = arr.length;
		arr.byteOffset = 0;
		arr.buffer = new js_html_compat_ArrayBuffer(arr);
	} else if(js_Boot.__instanceof(arg1,js_html_compat_ArrayBuffer)) {
		var buffer = arg1;
		if(offset == null) offset = 0;
		if(length == null) length = buffer.byteLength - offset;
		if(offset == 0) arr = buffer.a; else arr = buffer.a.slice(offset,offset + length);
		arr.byteLength = arr.length;
		arr.byteOffset = offset;
		arr.buffer = buffer;
	} else if((arg1 instanceof Array) && arg1.__enum__ == null) {
		arr = arg1.slice();
		arr.byteLength = arr.length;
		arr.byteOffset = 0;
		arr.buffer = new js_html_compat_ArrayBuffer(arr);
	} else throw new js__$Boot_HaxeError("TODO " + Std.string(arg1));
	arr.subarray = js_html_compat_Uint8Array._subarray;
	arr.set = js_html_compat_Uint8Array._set;
	return arr;
};
js_html_compat_Uint8Array._set = function(arg,offset) {
	var t = this;
	if(js_Boot.__instanceof(arg.buffer,js_html_compat_ArrayBuffer)) {
		var a = arg;
		if(arg.byteLength + offset > t.byteLength) throw new js__$Boot_HaxeError("set() outside of range");
		var _g1 = 0;
		var _g = arg.byteLength;
		while(_g1 < _g) {
			var i = _g1++;
			t[i + offset] = a[i];
		}
	} else if((arg instanceof Array) && arg.__enum__ == null) {
		var a1 = arg;
		if(a1.length + offset > t.byteLength) throw new js__$Boot_HaxeError("set() outside of range");
		var _g11 = 0;
		var _g2 = a1.length;
		while(_g11 < _g2) {
			var i1 = _g11++;
			t[i1 + offset] = a1[i1];
		}
	} else throw new js__$Boot_HaxeError("TODO");
};
js_html_compat_Uint8Array._subarray = function(start,end) {
	var t = this;
	var a = js_html_compat_Uint8Array._new(t.slice(start,end));
	a.byteOffset = start;
	return a;
};
var pathfinder_Coordinate = function(p_x,p_y) {
	if(p_y == null) p_y = 0;
	if(p_x == null) p_x = 0;
	this.x = p_x;
	this.y = p_y;
};
$hxClasses["pathfinder.Coordinate"] = pathfinder_Coordinate;
pathfinder_Coordinate.__name__ = true;
pathfinder_Coordinate.prototype = {
	isEqualTo: function(p_coordinate) {
		return this.x == p_coordinate.x && this.y == p_coordinate.y;
	}
	,clone: function() {
		return new pathfinder_Coordinate(this.x,this.y);
	}
	,__class__: pathfinder_Coordinate
};
var pathfinder_EHeuristic = $hxClasses["pathfinder.EHeuristic"] = { __ename__ : true, __constructs__ : ["DIAGONAL","PRODUCT","EUCLIDIAN","MANHATTAN"] };
pathfinder_EHeuristic.DIAGONAL = ["DIAGONAL",0];
pathfinder_EHeuristic.DIAGONAL.toString = $estr;
pathfinder_EHeuristic.DIAGONAL.__enum__ = pathfinder_EHeuristic;
pathfinder_EHeuristic.PRODUCT = ["PRODUCT",1];
pathfinder_EHeuristic.PRODUCT.toString = $estr;
pathfinder_EHeuristic.PRODUCT.__enum__ = pathfinder_EHeuristic;
pathfinder_EHeuristic.EUCLIDIAN = ["EUCLIDIAN",2];
pathfinder_EHeuristic.EUCLIDIAN.toString = $estr;
pathfinder_EHeuristic.EUCLIDIAN.__enum__ = pathfinder_EHeuristic;
pathfinder_EHeuristic.MANHATTAN = ["MANHATTAN",3];
pathfinder_EHeuristic.MANHATTAN.toString = $estr;
pathfinder_EHeuristic.MANHATTAN.__enum__ = pathfinder_EHeuristic;
var pathfinder_Node = function(p_x,p_y,p_isWalkable) {
	if(p_isWalkable == null) p_isWalkable = true;
	this.isWalkable = p_isWalkable;
	pathfinder_Coordinate.call(this,p_x,p_y);
};
$hxClasses["pathfinder.Node"] = pathfinder_Node;
pathfinder_Node.__name__ = true;
pathfinder_Node.__super__ = pathfinder_Coordinate;
pathfinder_Node.prototype = $extend(pathfinder_Coordinate.prototype,{
	__class__: pathfinder_Node
});
var pathfinder_Pathfinder = function(p_map,p_timeOutDuration) {
	if(p_timeOutDuration == null) p_timeOutDuration = 10000;
	this.configure(p_map,p_timeOutDuration);
};
$hxClasses["pathfinder.Pathfinder"] = pathfinder_Pathfinder;
pathfinder_Pathfinder.__name__ = true;
pathfinder_Pathfinder.prototype = {
	configure: function(p_map,p_timeOutDuration) {
		if(p_timeOutDuration == null) p_timeOutDuration = 10000;
		this._map = p_map;
		this._timeOutDuration = p_timeOutDuration;
		this._nodes = [];
		this._cols = this._map.cols;
		this._rows = this._map.rows;
		var _g1 = 0;
		var _g = this._map.cols;
		while(_g1 < _g) {
			var l_ix = _g1++;
			var l_line = this._nodes[l_ix] = [];
			var _g3 = 0;
			var _g2 = this._map.rows;
			while(_g3 < _g2) {
				var l_iy = _g3++;
				l_line[l_iy] = new pathfinder_Node(l_ix,l_iy,this._map.isWalkable(l_ix,l_iy));
			}
		}
	}
	,_getCost: function(p_node1,p_node2,p_heuristic) {
		switch(p_heuristic[1]) {
		case 0:
			return this._getCostDiagonal(p_node1,p_node2);
		case 1:
			return this._getCostProduct(p_node1,p_node2);
		case 2:
			return this._getCostEuclidian(p_node1,p_node2);
		case 3:
			return this._getCostManhattan(p_node1,p_node2);
		}
	}
	,_getCostDiagonal: function(p_node1,p_node2) {
		var l_dx = Std["int"](Math.abs(p_node1.x - p_node2.x));
		var l_dy = Std["int"](Math.abs(p_node1.y - p_node2.y));
		var l_diag = Std["int"](Math.min(l_dx,l_dy));
		var l_straight = l_dx + l_dy;
		return 10 * (l_straight - 2 * l_diag) + 14 * l_diag;
	}
	,_getCostProduct: function(p_node1,p_node2) {
		var l_dx1 = Std["int"](Math.abs(p_node1.x - this._destNode.x));
		var l_dy1 = Std["int"](Math.abs(p_node1.y - this._destNode.y));
		var l_dx2 = Std["int"](Math.abs(this._startNode.x - this._destNode.x));
		var l_dy2 = Std["int"](Math.abs(this._startNode.y - this._destNode.y));
		var l_cross = Math.abs(l_dx1 * l_dy2 - l_dx2 * l_dy1) * .01;
		return this._getCostDiagonal(p_node1,p_node2) + l_cross;
	}
	,_getCostEuclidian: function(p_node1,p_node2) {
		var l_dx = Std["int"](Math.abs(p_node1.x - p_node2.x));
		var l_dy = Std["int"](Math.abs(p_node1.y - p_node2.y));
		return Math.sqrt(l_dx * l_dx + l_dy * l_dy) * 10;
	}
	,_getCostManhattan: function(p_node1,p_node2) {
		var l_dx = p_node1.x - p_node2.x;
		var l_dy = p_node1.y - p_node2.y;
		return ((l_dx > 0?l_dx:-l_dx) + (l_dy > 0?l_dy:-l_dy)) * 10;
	}
	,createPath: function(p_start,p_dest,p_heuristic,p_isDiagonalEnabled) {
		if(p_isDiagonalEnabled == null) p_isDiagonalEnabled = true;
		if(p_heuristic == null) p_heuristic = pathfinder_EHeuristic.PRODUCT;
		this._info = { heuristic : p_heuristic, timeElapsed : 0, pathLength : 0, isDiagonalEnabled : p_isDiagonalEnabled};
		if(!this._map.isWalkable(p_start.x,p_start.y) || !this._map.isWalkable(p_dest.x,p_dest.y) || p_start.isEqualTo(p_dest)) return null;
		this._openList = [];
		this._closedList = [];
		this._startNode = this._nodes[p_start.x][p_start.y];
		this._destNode = this._nodes[p_dest.x][p_dest.y];
		this._startNode.g = 0;
		this._startNode.f = this._getCost(this._startNode,this._destNode,p_heuristic);
		this._openList.push(this._startNode);
		return this._searchPath(p_heuristic,p_isDiagonalEnabled);
	}
	,_getPath: function() {
		var l_path = [];
		var l_node = this._destNode;
		l_path[0] = l_node.clone();
		do {
			l_node = l_node.parent;
			l_path.unshift(l_node.clone());
			if(l_node == this._startNode) break;
		} while(true);
		return l_path;
	}
	,_sort: function(p_x,p_y) {
		return p_x.f - p_y.f | 0;
	}
	,_searchPath: function(p_heuristic,p_isDiagonalEnabled) {
		if(p_isDiagonalEnabled == null) p_isDiagonalEnabled = true;
		var l_minX;
		var l_maxX;
		var l_minY;
		var l_maxY;
		var l_g;
		var l_f;
		var l_cost;
		var l_nextNode = null;
		var l_currentNode = this._startNode;
		var l_startTime = haxe_Timer.stamp();
		this._isCompleted = false;
		while(!this._isCompleted) {
			if(l_currentNode.x - 1 < 0) l_minX = 0; else l_minX = l_currentNode.x - 1;
			if(l_currentNode.x + 1 >= this._cols) l_maxX = this._cols - 1; else l_maxX = l_currentNode.x + 1;
			if(l_currentNode.y - 1 < 0) l_minY = 0; else l_minY = l_currentNode.y - 1;
			if(l_currentNode.y + 1 >= this._rows) l_maxY = this._rows - 1; else l_maxY = l_currentNode.y + 1;
			var _g1 = l_minY;
			var _g = l_maxY + 1;
			while(_g1 < _g) {
				var l_iy = _g1++;
				var _g3 = l_minX;
				var _g2 = l_maxX + 1;
				while(_g3 < _g2) {
					var l_ix = _g3++;
					l_nextNode = this._nodes[l_ix][l_iy];
					if(l_nextNode == l_currentNode || !l_nextNode.isWalkable) continue;
					l_cost = 10;
					if(!(l_currentNode.x == l_nextNode.x || l_currentNode.y == l_nextNode.y)) {
						if(!p_isDiagonalEnabled) continue;
						l_cost = 14;
					}
					l_g = l_currentNode.g + l_cost;
					l_f = l_g + this._getCost(l_nextNode,this._destNode,p_heuristic);
					if(Lambda.indexOf(this._openList,l_nextNode) != -1 || Lambda.indexOf(this._closedList,l_nextNode) != -1) {
						if(l_nextNode.f > l_f) {
							l_nextNode.f = l_f;
							l_nextNode.g = l_g;
							l_nextNode.parent = l_currentNode;
						}
					} else {
						l_nextNode.f = l_f;
						l_nextNode.g = l_g;
						l_nextNode.parent = l_currentNode;
						this._openList.push(l_nextNode);
					}
				}
				this._info.timeElapsed = Std["int"]((haxe_Timer.stamp() - l_startTime) * 1000);
				if(this._info.timeElapsed > this._timeOutDuration) return null;
			}
			this._closedList.push(l_currentNode);
			if(this._openList.length == 0) return null;
			this._openList.sort($bind(this,this._sort));
			l_currentNode = this._openList.shift();
			if(l_currentNode == this._destNode) this._isCompleted = true;
		}
		this._info.timeElapsed = Std["int"]((haxe_Timer.stamp() - l_startTime) * 1000);
		var l_path = this._getPath();
		this._info.pathLength = l_path.length;
		return l_path;
	}
	,getInfo: function() {
		if(this._isCompleted) return "Success using " + Std.string(this._info.heuristic) + (!this._info.isDiagonalEnabled?" (and diagonals disabled )":"") + " with a path length of " + this._info.pathLength + " taking " + this._info.timeElapsed + "ms"; else return "Fail";
	}
	,__class__: pathfinder_Pathfinder
};
function $iterator(o) { if( o instanceof Array ) return function() { return HxOverrides.iter(o); }; return typeof(o.iterator) == 'function' ? $bind(o,o.iterator) : o.iterator; }
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
if(Array.prototype.indexOf) HxOverrides.indexOf = function(a,o,i) {
	return Array.prototype.indexOf.call(a,o,i);
};
$hxClasses.Math = Math;
String.prototype.__class__ = $hxClasses.String = String;
String.__name__ = true;
$hxClasses.Array = Array;
Array.__name__ = true;
Date.prototype.__class__ = $hxClasses.Date = Date;
Date.__name__ = ["Date"];
var Int = $hxClasses.Int = { __name__ : ["Int"]};
var Dynamic = $hxClasses.Dynamic = { __name__ : ["Dynamic"]};
var Float = $hxClasses.Float = Number;
Float.__name__ = ["Float"];
var Bool = $hxClasses.Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = $hxClasses.Class = { __name__ : ["Class"]};
var Enum = { };
haxe_Resource.content = [{ name : "config", data : "PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjxkYXRhPg0KCTxzZXR0aW5ncz4NCgkJPGFzc2V0cz4NCgkJCTxwYWNrYWdlcyBkZWZhdWx0PSJhc3NldHMiIGF1ZGlvPSJhc3NldHMuYXVkaW8iIC8+DQoJCTwvYXNzZXRzPg0KCQk8ZnVsbFNjcmVlbj5kZWZhdWx0PC9mdWxsU2NyZWVuPg0KCQk8Zm9udCBuYW1lPSJvcmJpdHJvbi13ZWJmb250IiAvPg0KCQk8YXNjaWlBcnQ+DQogICAgICAgICAgICAgICAgIF9fICBfXyAgICBfX19fXyAgICAgICAgICAgX18gICAgICAgICANCiAgICBfX19fICBfX19fIF8vIC9fLyAvXyAgLyBfXyhfKV9fXyAgX19fXy8gL19fICBfX19fXw0KICAgLyBfXyBcLyBfXyBgLyBfXy8gX18gXC8gL18vIC8gX18gXC8gX18gIC8gXyBcLyBfX18vDQogIC8gL18vIC8gL18vIC8gL18vIC8gLyAvIF9fLyAvIC8gLyAvIC9fLyAvICBfXy8gLyAgICANCiAvIC5fX18vXF9fLF8vXF9fL18vIC9fL18vIC9fL18vIC9fL1xfXyxfL1xfX18vXy8gICAgIA0KL18vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgDQoJCTwvYXNjaWlBcnQ+DQoJPC9zZXR0aW5ncz4NCgk8Z3VpPg0KCQk8cHJlbG9hZGVyQ29tcGxldGU+VGFwIGFueXdoZXJlIHRvIHN0YXJ0PC9wcmVsb2FkZXJDb21wbGV0ZT4NCgk8L2d1aT4NCjwvZGF0YT4NCg"}];
var __map_reserved = {}
var ArrayBuffer = (Function("return typeof ArrayBuffer != 'undefined' ? ArrayBuffer : null"))() || js_html_compat_ArrayBuffer;
if(ArrayBuffer.prototype.slice == null) ArrayBuffer.prototype.slice = js_html_compat_ArrayBuffer.sliceImpl;
var DataView = (Function("return typeof DataView != 'undefined' ? DataView : null"))() || js_html_compat_DataView;
var Uint8Array = (Function("return typeof Uint8Array != 'undefined' ? Uint8Array : null"))() || js_html_compat_Uint8Array._new;
Xml.Element = 0;
Xml.PCData = 1;
Xml.CData = 2;
Xml.Comment = 3;
Xml.DocType = 4;
Xml.ProcessingInstruction = 5;
Xml.Document = 6;
haxe_crypto_Base64.CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
haxe_crypto_Base64.BYTES = haxe_io_Bytes.ofString(haxe_crypto_Base64.CHARS);
haxe_io_FPHelper.i64tmp = (function($this) {
	var $r;
	var x = new haxe__$Int64__$_$_$Int64(0,0);
	$r = x;
	return $r;
}(this));
haxe_xml_Parser.escapes = (function($this) {
	var $r;
	var h = new haxe_ds_StringMap();
	if(__map_reserved.lt != null) h.setReserved("lt","<"); else h.h["lt"] = "<";
	if(__map_reserved.gt != null) h.setReserved("gt",">"); else h.h["gt"] = ">";
	if(__map_reserved.amp != null) h.setReserved("amp","&"); else h.h["amp"] = "&";
	if(__map_reserved.quot != null) h.setReserved("quot","\""); else h.h["quot"] = "\"";
	if(__map_reserved.apos != null) h.setReserved("apos","'"); else h.h["apos"] = "'";
	$r = h;
	return $r;
}(this));
js_Boot.__toStr = {}.toString;
js_html_compat_Uint8Array.BYTES_PER_ELEMENT = 1;
Main.main();
})(typeof console != "undefined" ? console : {log:function(){}});
