import React from 'react'
const THREE = require('three')
import {noise} from 'perlin'



class NoisePlane extends React.Component {


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



    function onMouseMove( event ) {
      //console.log(cube.position.x)
    // calculate mouse position in normalized device coordinates
    // (-1 to +1) for both components
      //
      mouse.x = ( event.offsetX / 900 ) * 2 - 1
      mouse.y = - ( event.offsetY / 180 ) * 2 + 1

    }
    const scene = new THREE.Scene()
    const planes = []

    function planeCreate(x, y, z){
      var geometry = new THREE.PlaneGeometry( 500, 200, 320, 20, 20)
      const material = new THREE.MeshPhongMaterial( { color: `rgba(${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},1)`, specular: `rgba(${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},1)` , shininess: 100, side: THREE.DoubleSide, opacity: 0.1,
        transparent: true } )

      var plane = new THREE.Mesh( geometry, material );

      plane.position.z = - Math.random()*18


      planes.push(plane)
      scene.add(plane)

    }


    for(let i =0;i< 10;i++){
      planeCreate()
    }

    const light = new THREE.DirectionalLight( 0xffffff )
    light.position.set( 40, 25, 10 )
    light.castShadow = true
    scene.add(light)

    console.log(scene)

    const renderer = new THREE.WebGLRenderer()
    renderer.setSize( 900, 280)
    const display = document.getElementById('noisePlane')
    display.appendChild( renderer.domElement )
    //var controls = new OrbitControls( camera, renderer.domElement );
    var Alight = new THREE.AmbientLight( 0x404040 ) // soft white light
    scene.add( Alight )

    const camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 0.1, 3000 )

    camera.position.z = 2
    //camera.position.x = 40
    //camera.position.y = 20


    var spotLight = new THREE.SpotLight( 0xffffff )
    spotLight.position.set( 100, 1000, 100 )

    spotLight.castShadow = true

    spotLight.shadow.mapSize.width = 1024
    spotLight.shadow.mapSize.height = 1024

    spotLight.shadow.camera.near = 500
    spotLight.shadow.camera.far = 4000
    spotLight.shadow.camera.fov = 30

    scene.add( spotLight )

    function animate() {


      planes.map(plane=> {
        var time = performance.now() * 0.0005
        var k = 9
        for (var i = 0; i < plane.geometry.vertices.length; i++) {
          var p = plane.geometry.vertices[i]
          p.normalize().multiplyScalar(1 + 0.4 * noise.perlin3(p.x * k + time, p.y * k, p.z * k))
        }

        plane.geometry.computeVertexNormals()
        plane.geometry.normalsNeedUpdate = true
        plane.geometry.verticesNeedUpdate = true

      })

      //scene.rotation.x +=0.01
      /* render scene and camera */
      renderer.render(scene,camera)
      requestAnimationFrame(animate)
    }

    display.addEventListener( 'mousemove', onMouseMove, false )

    requestAnimationFrame(animate)



  }




  render() {



    return(
      <div id='noisePlane' width={900} height={280}>

      </div>
    )
  }
}

export default NoisePlane
