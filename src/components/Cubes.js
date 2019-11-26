import React from 'react'
const THREE = require('three')




class Cubes extends React.Component {


  constructor() {
    super()

    this.state = {
      time: {}

    }

    this.draw = this.draw.bind(this)

  }





  componentDidMount() {

    this.draw()
  }

  componentDidUpdate(){


  }



  draw(){
    var raycaster = new THREE.Raycaster()
    var mouse = new THREE.Vector2()

    function cubeCreate(){
      var boxGeo = new THREE.BoxGeometry(Math.random()*18, Math.random()*18, Math.random()*18)
      const materialColor = new THREE.MeshPhongMaterial( { color: `rgba(${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},1)`, specular: `rgba(${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},1)` , shininess: 100, side: THREE.DoubleSide } )
      const  box = new THREE.Mesh(boxGeo, materialColor)
      box.position.x = Math.random()*85
      box.position.y = Math.random()*35
      box.position.z = Math.random()*45
      scene.add(box)

    }



    function onMouseMove( event ) {

  // calculate mouse position in normalized device coordinates
  // (-1 to +1) for both components
      //cubeCreate()
      mouse.x = ( event.offsetX / 900 ) * 2 - 1
      mouse.y = - ( event.offsetY / 180 ) * 2 + 1
      // cube.position.x = mouse.x *100
      // cube.position.y = mouse.y *100
    }
    const scene = new THREE.Scene()

    const light = new THREE.DirectionalLight( 0xffffff )
    light.position.set( 40, 25, 10 )
    light.castShadow = true
    scene.add(light)

    console.log(scene)

    const renderer = new THREE.WebGLRenderer()
    renderer.setSize( 900, 280)
    const display = document.getElementById('cubes')
    display.appendChild( renderer.domElement )
    //var controls = new OrbitControls( camera, renderer.domElement );
    for(let i =0;i<100;i++){
      cubeCreate()
    }

    const camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 0.1, 3000 )

    camera.position.z = 80
    camera.position.x = 40
    camera.position.y = 20

    const material = new THREE.MeshPhongMaterial( { color: 0x000FF0, specular: 0xf22fff , shininess: 100, side: THREE.DoubleSide } )



    const geometry = new THREE.BoxGeometry( 1, 1, 1 )

    const cube = new THREE.Mesh(geometry, material)
    console.log(cube)

    scene.add(cube)

    function animate() {
      scene.children.map(x=> {

        x.rotation.x += scene.children.indexOf(x)/5000
        x.rotation.y += scene.children.indexOf(x)/5000
        x.rotation.z += scene.children.indexOf(x)/5000



      })
      raycaster.setFromCamera( mouse, camera );

	// calculate objects intersecting the picking ray
	   var intersects = raycaster.intersectObjects( scene.children )

	for ( var i = 0; i < intersects.length; i++ ) {
      console.log(intersects)
		// intersects[ 0 ].object.material.color.set( `rgba(${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},1)` );
    //
    // intersects[0].object.position.x +=10

	}


      /* render scene and camera */
      renderer.render(scene,camera)
      requestAnimationFrame(animate)
    }

    display.addEventListener( 'mousemove', onMouseMove, false )

    requestAnimationFrame(animate)



  }




  render() {



    return(
      <div id='cubes' width={900} height={280}>

      </div>
    )
  }
}

export default Cubes
