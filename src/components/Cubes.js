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
      const materialColor = new THREE.MeshPhongMaterial( { color: `rgba(${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},1)`, specular: `rgba(${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},1)` , shininess: 100, side: THREE.DoubleSide, opacity: 0.1,
        transparent: true } )
      const  box = new THREE.Mesh(boxGeo, materialColor)
      box.position.x = Math.random()*18
      box.position.y = Math.random()*18
      box.position.z = Math.random()*18


      cubes.push(box)
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

    var Alight = new THREE.AmbientLight( 0x404040 ) // soft white light
    scene.add( Alight )

    //console.log(scene)

    const renderer = new THREE.WebGLRenderer()
    renderer.setSize( 900, 280)
    const display = document.getElementById('cubes')
    display.appendChild( renderer.domElement )

    for(let i =0;i<200;i++){
      cubeCreate(i, i, i)
    }

    const camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 0.1, 3000 )

    camera.position.z = 80
    camera.position.x = 40
    camera.position.y = 20

    var controls = new OrbitControls( camera, renderer.domElement )

    controls.update()





    function animate() {
      scene.children.map(x=> {

        x.rotation.x += scene.children.indexOf(x)/5000
        x.rotation.y += scene.children.indexOf(x)/5000
        x.rotation.z += scene.children.indexOf(x)/5000
        if(x.scale.x < 50){
          x.scale.x+=0.1
          x.scale.y+=0.1
          x.scale.z+=0.1
        }





      })

      cubes.map(x=> {



        var time = performance.now() * 0.0005
        var k = 1
        for (var i = 0; i < x.geometry.vertices.length; i++) {
          var p = x.geometry.vertices[i]
          p.normalize().multiplyScalar(1 + 0.4 * noise.perlin3(p.x * k + time, p.y * k, p.z * k))
        }

        x.geometry.computeVertexNormals()
        x.geometry.normalsNeedUpdate = true
        x.geometry.verticesNeedUpdate = true

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
      controls.update()
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
