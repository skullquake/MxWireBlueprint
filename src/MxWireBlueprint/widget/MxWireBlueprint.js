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
					console.log('----------------------------------------')
					//alert('here');//console.log(_three)

					if(window.THREE==null)window.THREE=_three;
/*
					require(
						{
							packages:[
								{
									name:'_OrbitControls',
									location:'/widgets/MxWireBlueprint/lib/threejs/',
									main:'OrbitControls'
								}
							]
						},
						[
							"_OrbitControls",
						],
						dojo.hitch(this,function(
							_OrbitControls
						){
							console.log('++++++++++++++++++++++++++++++++++++++++');
							console.log(_OrbitControls);
							console.log('++++++++++++++++++++++++++++++++++++++++');
							this.test2();
						})
					);
*/
					console.log('----------------------------------------')
				},
				addSvgLoader:function(cb){
					if(window.THREE.SVGLoader==null){
						require(
							{
								packages:[
									{
										name:'_SVGLoader',
										location:'/widgets/MxWireBlueprint/lib/threejs/110/',
										main:'SVGLoader'
									}
								]
							},
							[
								"_SVGLoader",
							],
							dojo.hitch(this,function(
								_SVGLoader
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
						this.addSvgLoader(this.testsvg)
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
				test:function(){
					// ------------------------------------------------
					// BASIC SETUP
					// ------------------------------------------------

					// Create an empty scene
					var scene = new THREE.Scene();

					// Create a basic perspective camera
					var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
					camera.position.z = 4;

					// Create a renderer with Antialiasing
					var renderer = new THREE.WebGLRenderer({antialias:true});

					// Configure renderer clear color
					renderer.setClearColor("#000000");

					// Configure renderer size
					renderer.setSize( window.innerWidth, window.innerHeight );

					// Append Renderer to DOM
					this.domNode.appendChild( renderer.domElement );

					// ------------------------------------------------
					// FUN STARTS HERE
					// ------------------------------------------------

					// Create a Cube Mesh with basic material
					var geometry = new THREE.BoxGeometry( 1, 1, 1 );
					var material = new THREE.MeshBasicMaterial( { color: "#433F81" } );
					var cube = new THREE.Mesh( geometry, material );

					// Add cube to Scene
					scene.add( cube );

					// Render Loop
					var render = function () {
					  requestAnimationFrame( render );

					  cube.rotation.x += 0.01;
					  cube.rotation.y += 0.01;

					  // Render the scene
					  renderer.render(scene, camera);
					};

					render();
				},
				testpath:function(){
					// ------------------------------------------------
					// BASIC SETUP
					// ------------------------------------------------

					// Create an empty scene
					var scene = new THREE.Scene();

					// Create a basic perspective camera
					var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
					camera.position.z = 4;

					// Create a renderer with Antialiasing
					var renderer = new THREE.WebGLRenderer({antialias:true});

					// Configure renderer clear color
					renderer.setClearColor("#000000");

					// Configure renderer size
					renderer.setSize( window.innerWidth, window.innerHeight );

					// Append Renderer to DOM
					this.domNode.appendChild( renderer.domElement );

					// ------------------------------------------------
					// FUN STARTS HERE
					// ------------------------------------------------

					// Create a Cube Mesh with basic material
					var geometry = new THREE.BoxGeometry( 1, 1, 1 );
					//var material = new THREE.MeshBasicMaterial( { color: "#880000" } );
					var material=new THREE.LineBasicMaterial(
						{
							color:0x10ff10,
							opacity:0.82,
							blending:THREE.AdditiveBlending,
							transparent:true
						}
					);
					var cube = new THREE.Mesh( geometry, material );

					// Add cube to Scene
					scene.add( cube );

					// Render Loop
					var render = function () {
					  requestAnimationFrame( render );

					  cube.rotation.x += 0.01;
					  cube.rotation.y += 0.01;

					  // Render the scene
					  renderer.render(scene, camera);
					};

					render();
				},
				testsvg:function(){





					// ------------------------------------------------
					// BASIC SETUP
					// ------------------------------------------------

					// Create an empty scene
					var scene = new THREE.Scene();


					// instantiate a loader
					// load a SVG resource
					// Create a basic perspective camera
					var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
					camera.position.z = 8;

					// Create a renderer with Antialiasing
					var renderer = new THREE.WebGLRenderer({antialias:true});

					// Configure renderer clear color
					renderer.setClearColor("#000000");

					// Configure renderer size
					renderer.setSize( window.innerWidth, window.innerHeight );

					// Append Renderer to DOM
					this.domNode.appendChild( renderer.domElement );

					// ------------------------------------------------
					// FUN STARTS HERE
					// ------------------------------------------------

					// Create a Cube Mesh with basic material
					var geometry = new THREE.BoxGeometry( 1, 1, 1 );
					//var material = new THREE.MeshBasicMaterial( { color: "#880000" } );
					var material=new THREE.LineBasicMaterial(
						{
							color:0x10ff10,
							opacity:0.82,
							blending:THREE.AdditiveBlending,
							transparent:true
						}
					);
					var cube = new THREE.Mesh( geometry, material );

					// Add cube to Scene
					scene.add( cube );


					var loader = new THREE.SVGLoader();
					var group = new THREE.Group();
					loader.load(
						// resource URL
						'/file?guid='+this._contextObj.getGuid()+"&cachebust="+(new Date().getTime()),
						// called when the resource is loaded
						dojo.hitch(this,function(data){
							console.log(data);
							var paths = data.paths;

							for ( var i = 0; i < paths.length; i ++ ) {

								var path = paths[ i ];
								var material = new THREE.MeshBasicMaterial( {
									color: path.color,
									side: THREE.DoubleSide,
									depthWrite: false
								} );
								/*
					var material=new THREE.LineBasicMaterial(
						{
							color:0x10ff10,
							opacity:0.82,
							blending:THREE.AdditiveBlending,
							transparent:true
						}
					);
								*/


								var shapes = path.toShapes( true );
								for ( var j = 0; j < shapes.length; j ++ ) {

									var shape = shapes[ j ];
									var geometry = new THREE.ShapeBufferGeometry( shape );
									var mesh = new THREE.Mesh( geometry, material );
									group.add( mesh );

								}
								window.g=group;

							}
							scene.add( group );
						}),
						// called when loading is in progresses
						function ( xhr ) {

							console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

						},
						// called when loading has errors
						function ( error ) {

							console.log( 'An error happened' );

						}
					);



					// Render Loop
					var render = function () {
					  requestAnimationFrame( render );

					  cube.rotation.x += 0.01;
					  cube.rotation.y += 0.01;
					  group.rotation.x += 0.01;
					  group.rotation.y += 0.01;

					  // Render the scene
					  renderer.render(scene, camera);
					};

					render();
				},


				test2:function(){
					//if (!Detector.webgl)
					//	Detector.addGetWebGLMessage();
					var camera, controls, scene, renderer;
					var init=dojo.hitch(this,function(){
						console.log(0)
						scene = new THREE.Scene();
						console.log(1)
						scene.background = new THREE.Color(0);
						console.log(2)

					// Create a Cube Mesh with basic material
					var geometry = new THREE.BoxGeometry( 1, 1, 1 );
					var material = new THREE.MeshBasicMaterial( { color: "#433F81" } );
					var cube = new THREE.Mesh( geometry, material );

					// Add cube to Scene
					scene.add( cube );
						var w=320;
						var h=240;



						renderer = new THREE.WebGLRenderer({antialias:true});
						console.log(3)
						renderer.setPixelRatio(window.devicePixelRatio);
						console.log(4)
						//renderer.setSize(window.innerWidth, window.innerHeight);
						renderer.setSize(w,h);
						console.log(5)

						var container = this.canvasContainer;//domNode;
						console.log(6)
						container.appendChild(renderer.domElement);
						console.log(7)

						//camera = new THREE.PerspectiveCamera(60,window.innerWidth / window.innerHeight,1,1000);
						camera = new THREE.PerspectiveCamera(60,w/h,1,1000);
						console.log(8)
						camera.position.set(400, 200, 0);
						console.log(9)

						// controls
						/*
						controls = new THREE.OrbitControls(camera,renderer.domElement);

						controls.enableDamping = true;
						// an animation loop is required when either damping or auto-rotation are enabled
						controls.dampingFactor = 0.25;

						controls.screenSpacePanning = false;

						controls.minDistance = 100;
						controls.maxDistance = 500;

						controls.maxPolarAngle = Math.PI / 2;

						// world
						*/
					  

						//Load the data.
						/*
var loader = new THREE.FileLoader();

//load a text file and output the result to the console
loader.load(
	// resource URL
		'/widgets/MxWireBlueprint/widget/Geodata.json',
	
	// onLoad callback
	function ( data ) {
		// output the text to the console
		alert(data);
		console.log( JSON.parse(data) )
	},

	// onProgress callback
	function ( xhr ) {
		console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
	},

	// onError callback
	function ( err ) {
		console.error( 'An error happened' );
	}
);
						*/
						var loader=new THREE.FileLoader();
						loader.load("/widgets/MxWireBlueprint/widget/geodata.json", function(data) {

							data = JSON.parse(data);
							var vi = 0;
							var points = new Array(data.geometry.length * 2);
							for (var i = 0; i < data.geometry.length; i++) {
								var ln = data.geometry[i];
								points[i * 2] = new THREE.Vector3(ln[0],0,ln[1]);
								points[(i * 2) + 1] = new THREE.Vector3(ln[2],0,ln[3]);
							}
							var ngeom = new THREE.BufferGeometry().setFromPoints(points);
							var nmesh = new THREE.LineSegments(ngeom,new THREE.LineBasicMaterial({
							  color:0x10ff10,
							  opacity:0.02,
							  blending:THREE.AdditiveBlending,
							  transparent:true}));
							
							//Compute the bounding box and center the model on the bounding box center.
							ngeom.computeBoundingBox();
							ngeom.boundingBox.getCenter(nmesh.position);
							nmesh.position.multiplyScalar(-1);
							
							//Make a 10x10 array of the geometries.
							var py=0;
							for (var i = 0; i < 100; i++) {
									var m = nmesh.clone();
								 //   m.position.x += i * 300;
								//	m.position.z += j * 300;
									m.position.y+=(py++)*0.2;
									scene.add(m);
								
							}
							console.log(i);
						});

						// lights
						/*
					  dont need lights....
					  var light = new THREE.DirectionalLight(0xffffff);
					  light.position.set(1, 1, 1);
					  scene.add(light);

					  var light = new THREE.DirectionalLight(0x002288);
					  light.position.set(-1, -1, -1);
					  scene.add(light);

					  var light = new THREE.AmbientLight(0x222222);
					  scene.add(light);
					*/
						//

						window.addEventListener("resize", onWindowResize, false);
					})

					var onWindowResize=dojo.hitch(this,function() {
						//camera.aspect = window.innerWidth / window.innerHeight;
						camera.aspect = w/h;
						camera.updateProjectionMatrix();

						//renderer.setSize(window.innerWidth, window.innerHeight);
						renderer.setSize(w,h);
					})

					var animate=dojo.hitch(this,function() {
						requestAnimationFrame(animate);

						//controls.update();
						// only required if controls.enableDamping = true, or if controls.autoRotate = true

						render();
					})

					var render=dojo.hitch(this,function() {
						renderer.render(scene, camera);
					})
					init();
					//render(); // remove when using next line for animation loop (requestAnimationFrame)
					animate();
				}
			}
		);
	}
);



