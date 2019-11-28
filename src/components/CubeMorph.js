import React from 'react'
const THREE = require('three')
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import {noise} from 'perlin'

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
    var mouse = {
      x: -1000,
      y: 0
    }
    //console.log(mouse)
    const cubes = []
    function cubeCreate(x, y, z){
      var boxGeo = new THREE.BoxGeometry(1, 1, 1,10,10,10)
      const materialColor = new THREE.MeshPhongMaterial( { color: `rgba(${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},1)`, specular: `rgba(${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},1)` , shininess: 100, side: THREE.DoubleSide, opacity: 0.4,
        transparent: true ,
        morphTargets: true })

      for ( var i = 0; i < 64; i ++ ) {
        var vertices = []
        for ( var v = 0; v < boxGeo.vertices.length; v ++ ) {
          vertices.push( boxGeo.vertices[ v ].clone() )
          if ( v === i ) {
            vertices[ vertices.length - 1 ].x *= 2
            vertices[ vertices.length - 1 ].y *= 2
            vertices[ vertices.length - 1 ].z *= 2
          }
        }
        boxGeo.morphTargets.push( { name: 'target' + i, vertices: vertices } )
      }
      boxGeo = new THREE.BufferGeometry().fromGeometry( boxGeo )


      const  box = new THREE.Mesh(boxGeo, materialColor)
      box.position.x = Math.random()*18
      box.position.y = Math.random()*18
      box.position.z = Math.random()*18
      box.morphTargetInfluences[ 2 ] = Math.random()
      box.morphTargetInfluences[ 3 ] = Math.random()
      box.morphTargetInfluences[ 4 ] = Math.random()
      box.morphTargetInfluences[ 5 ] = Math.random()
      box.morphTargetInfluences[ 6 ] = Math.random()
      box.morphTargetInfluences[ 7 ] = Math.random()
      box.morphTargetInfluences[ 0 ] = Math.random()
      box.morphTargetInfluences[ 1 ] = 1
      box.morphTargetInfluences[ 4 ] =  1
      cubes.push(box)
      scene.add(box)

    }

    // cubes.map(cube=>{
      // cube.morphTargetInfluences[ 2 ] = 1
      // cube.morphTargetInfluences[ 3 ] = 1
      // cube.morphTargetInfluences[ 4 ] = 1
      // cube.morphTargetInfluences[ 5 ] = 1
      // cube.morphTargetInfluences[ 6 ] = 1
      // cube.morphTargetInfluences[ 7 ] = 1
      // cube.morphTargetInfluences[ 0 ] = 1
      // cube.morphTargetInfluences[ 1 ] = 1
    // })

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

    var Alight = new THREE.AmbientLight( 0x404040 ) // soft white light
    scene.add( Alight )

    //console.log(scene)

    const renderer = new THREE.WebGLRenderer()
    renderer.setSize( 900, 280)
    const display = document.getElementById('cubeMorph')
    display.appendChild( renderer.domElement )

    for(let i =0;i<200;i++){
      cubeCreate(i, i, i)
    }

    const camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 0.1, 3000 )

    camera.position.z = 20
    camera.position.x = 4
    camera.position.y = 10

    //var controls = new OrbitControls( camera, renderer.domElement )

    //controls.update()


    var time = Date.now() * 0.001

    let sign = 1
    function animate() {








      cubes.map(cube => {
        console.log(cube.morphTargetInfluences)
        cube.morphTargetInfluences.map(x=> x = x+0.1)
        cube.morphTargetInfluences[2] = Math.random()
        cube.morphTargetInfluences[3] = Math.random()
        cube.morphTargetInfluences[ 2 ] = Math.random()
        cube.morphTargetInfluences[ 3 ] = Math.random()
        cube.morphTargetInfluences[ 4 ] = Math.random()
        cube.morphTargetInfluences[ 5 ] = Math.random()
        cube.morphTargetInfluences[ 6 ] = Math.random()
        cube.morphTargetInfluences[ 7 ] = Math.random()
        cube.morphTargetInfluences[ 0 ] = Math.random()
        cube.morphTargetInfluences[ 1 ] = Math.random()

        //
        // var time = performance.now() * 0.0005
        // var k = 1
        // for (var i = 0; i < cube.geometry.vertices.length; i++) {
        //   var p = cube.geometry.vertices[i]
        //   p.normalize().multiplyScalar(1 + 0.4 * noise.perlin3(p.x * k + time, p.y * k, p.z * k))
        // }
        //
        cube.geometry.computeVertexNormals()
        cube.geometry.normalsNeedUpdate = true
        cube.geometry.verticesNeedUpdate = true

      })
      raycaster.setFromCamera( mouse, camera )

      // calculate objects intersecting the picking ray
      const intersects = raycaster.intersectObjects( scene.children, true )

      for ( var i = 0; i < intersects.length; i++ ) {
        //console.log(intersects)

        //intersects[ i ].object.material.color.set( 'red' )
        //
        // intersects[0].object.position.x +=10

      }


      /* render scene and camera */
      //controls.update()
      renderer.render(scene,camera)
      requestAnimationFrame(animate)
    }

    display.addEventListener( 'mousemove', onMouseMove, false )

    requestAnimationFrame(animate)



  }




  render() {



    return(
      <div id='cubeMorph' width={900} height={280}>

      </div>
    )
  }
}

export default Cubes
