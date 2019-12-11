//define('three', ['/widgets/MxWireBlueprint/lib/threejs/three.js'], function ( THREE ) { window.THREE = THREE; return THREE; });
require(
	{
		packages:[
			{
				name:'_Detector',
				location:'/widgets/MxWireBlueprint/lib/threejs/',
				main:'Detector'
			},
			{
				name:'_three',
				location:'/widgets/MxWireBlueprint/lib/threejs/110/',
				main:'three.min'
			},
			{
				name:'_module',
				location:'/widgets/MxWireBlueprint/lib/threejs/110/',
				main:'three.module'
			},
			{
				name:'_module',
				location:'/widgets/MxWireBlueprint/lib/threejs/110/',
				main:'three.module'
			},
			{
				name:'_SVGLoader',
				location:'/widgets/MxWireBlueprint/lib/threejs/110/',
				main:'SVGLoader'
			}
		]
	},
	[
		"dojo/_base/declare",
		"mxui/widget/_WidgetBase",
		"dijit/_TemplatedMixin",
		"mxui/dom",
		"dojo/dom",
		"dojo/dom-prop",
		"dojo/dom-geometry",
		"dojo/dom-class",
		"dojo/dom-style",
		"dojo/dom-construct",
		"dojo/_base/array",
		"dojo/_base/lang",
		"dojo/text",
		"dojo/html",
		"dojo/_base/event",
		"dojo/mouse",
		"dojo/on",
		//'_Detector',
		'_three',
		//'_module',
		//'_SVGLoader',
		//'_OrbitControls',
		"dojo/text!MxWireBlueprint/widget/template/MxWireBlueprint.html"
	],
	function(
		declare,
		_WidgetBase,
		_TemplatedMixin,
		dom,
		dojoDom,
		dojoProp,
		dojoGeometry,
		dojoClass,
		dojoStyle,
		dojoConstruct,
		dojoArray,
		lang,
		dojoText,
		dojoHtml,
		dojoEvent,
		mouse,
		on,
		//_Detector,
		_three,
		//_module,
		//_SVGLoader,
		//_OrbitControls,
		widgetTemplate
	){
		"use strict";
		return declare(
			"MxWireBlueprint.widget.MxWireBlueprint",
			[
				_WidgetBase,
				_TemplatedMixin
			],
			{
				templateString:widgetTemplate,
				widgetBase:null,
				_handles:null,
				_contextObj:null,
				//------------------------------
				//------------------------------
				//------------------------------
				_objectChangeHandler:null,
				//------------------------------
				constructor:function(){
					this._handles=[];
				},
				postCreate:function(){
					if(window.THREE==null)window.THREE=_three;
				},
				addModules:function(cb){
					if(window.THREE.SVGLoader==null){
						require(
							{
								packages:[
									{
										name:'_SVGLoader',
										location:'/widgets/MxWireBlueprint/lib/threejs/110/',
										main:'SVGLoader'
									},
									{
										name:'_OrbitControls',
										location:'/widgets/MxWireBlueprint/lib/threejs/110/',
										main:'OrbitControls'
									}

								]
							},
							[
								"_SVGLoader",
								"_OrbitControls",
							],
							dojo.hitch(this,function(
								_SVGLoader,
								_OrbitControls
							){
								dojo.hitch(this,cb)();
							})
						);

					}else{dojo.hitch(this,cb)()}
				},
				update:function(obj,callback){
                                        if(this._objectChangeHandler!==null) {
                                                this.unsubscribe(this._objectChangeHandler);
                                        }
                                        if(obj){
                                                this._objectChangeHandler=this.subscribe(
							{
								guid: obj.getGuid(),
								callback:dojo.hitch(this,function(){
									this._updateRendering(callback);
								})
							}
						);
                                        }else{}
					this._contextObj=obj;
					this._updateRendering(callback);
					this._executeCallback(callback,"update");
				},
				resize:function(box){
				},
				uninitialize:function(){
				},
				destroy:function () {
				},
				_updateRendering:function(callback){
					if(this._contextObj!=null){
						dojoStyle.set(this.domNode,"display","block");
						this.addModules(this.testsvg)
					} else {
						dojoStyle.set(this.domNode,"display","none");
					}
					this._executeCallback(callback,"_updateRendering");
				},
				_execMf:function(mf,guid,cb){
					if(mf&&guid){
						mx.ui.action(
							mf,
							{
								params: {
									applyto:"selection",
									guids:[guid]
								},
								callback:lang.hitch(this,function(objs){
									if(cb&&typeof cb==="function"){
										cb(objs);
									}
								}),
								error:function(error){
									console.debug(error.description);
								}
							},
							this
						);
					}
				},
				_executeCallback:function(cb,from){
					if(cb&&typeof cb==="function"){
						cb();
					}
				},
				testsvg:function(){
					var scene=new THREE.Scene();
					var camera=new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
					camera.position.z=8;
					var renderer=new THREE.WebGLRenderer(
						{
							antialias:true
						}
					);
					renderer.setClearColor("#000000");
					renderer.setSize(window.innerWidth,window.innerHeight);
					this.domNode.appendChild( renderer.domElement );
					var controls=new THREE.OrbitControls(camera,renderer.domElement);
					var loader=new THREE.SVGLoader();
					var group=new THREE.Group();
					loader.load(
						'/file?guid='+this._contextObj.getGuid()+"&cachebust="+(new Date().getTime()),
						dojo.hitch(this,function(data){
							var paths=data.paths;
							for(var i=0;i<paths.length;i++){
								var path=paths[i];
								var material=new THREE.MeshBasicMaterial(
									{
										color:path.color,
										side:THREE.DoubleSide,
										depthWrite:false
									}
								);
								var shapes=path.toShapes(true);
								for(var j=0;j<shapes.length;j++){
									var shape=shapes[j];
									var geometry=new THREE.ShapeBufferGeometry(shape);
									var mesh=new THREE.Mesh(geometry,material );
									group.add(mesh);
								}
							}
							window.group=group;
							scene.add( group );
							var box=new THREE.Box3().setFromObject( group);
							group.translateX(
							    -box.min.x
							)
							group.translateY(
							    -box.min.y
							)
							group.scale.x=(1/(box.max.x-box.min.x))
							group.scale.y=(1/(box.max.y-box.min.y))
							group.translateX(
							    -0.25
							)
							group.translateY(
							    -0.25
							)
						}),
						function(xhr){
							console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

						},
						function(error) {
							mx.ui.error( 'An error happened' );
						}
					);
					var render=function(){
						requestAnimationFrame( render );
						renderer.render(scene, camera);
					};
					render();
				}
			}
		);
	}
);
