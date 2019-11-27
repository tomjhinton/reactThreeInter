import React from 'react'
const THREE = require('three')
import {noise} from 'perlin'



class Param extends React.Component {


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



    const light = new THREE.DirectionalLight( 0xffffff )
    light.position.set( 40, 25, 10 )
    light.castShadow = true
    scene.add(light)

    console.log(scene)

    const renderer = new THREE.WebGLRenderer()
    renderer.setSize( 900, 280)
    const display = document.getElementById('param')
    display.appendChild( renderer.domElement )
    //var controls = new OrbitControls( camera, renderer.domElement );
    var Alight = new THREE.AmbientLight( 0x404040 ) // soft white light
    scene.add( Alight )

    const camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 0.1, 3000 )

    camera.position.z = 30
    camera.position.x = -15
    camera.position.y = 2


    var spotLight = new THREE.SpotLight( 0xffffff )
    spotLight.position.set( 100, 100, 100 )

    spotLight.castShadow = true

    spotLight.shadow.mapSize.width = 1024
    spotLight.shadow.mapSize.height = 1024

    spotLight.shadow.camera.near = 500
    spotLight.shadow.camera.far = 4000
    spotLight.shadow.camera.fov = 30

    scene.add( spotLight )

    function klein(v, u, target) {
      u *= Math.PI
      v *= 2 * Math.PI
      u = u * 2

      let x
      let z

      if (u < Math.PI) {
        x = 3 * Math.cos(u) * (1 + Math.sin(u)) + (2 * (1 - Math.cos(u) / 2)) * Math.cos(u) * Math.cos(v)
        z = -8 * Math.sin(u) - 2 * (1 - Math.cos(u) / 2) * Math.sin(u) * Math.cos(v)
      } else {
        x = 3 * Math.cos(u) * (1 + Math.sin(u)) + (2 * (1 - Math.cos(u) / 2)) * Math.cos(v + Math.PI)
        z = -8 * Math.sin(u)
      }

      const y = -2 * (1 - Math.cos(u) / 2) * Math.sin(v)

      target.set(x, y, z).multiplyScalar(0.75)
    }

    var paraGeometry = new THREE.ParametricGeometry(klein, 8, 18)
    const material = new THREE.MeshPhongMaterial( { color: `rgba(${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},1)`, specular: `rgba(${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},1)` , shininess: 100, side: THREE.DoubleSide, opacity: 0.5,
      transparent: true } )
    var paraMesh = new THREE.Mesh(paraGeometry, material)
    paraMesh.position.set(0, 0, -10)

    paraMesh.scale.x = 40
    paraMesh.scale.y = 40
    paraMesh.scale.z = 4
    scene.add(paraMesh)
    function animate() {

      const time = performance.now() * 0.0005
      //paraMesh.rotation.x += 0.1
      paraMesh.rotation.x *= Math.sin(time)
      //      paraMesh.scale.y += 0.1
      //        paraMesh.scale.z += 0.1



      var k = 9
      for (var i = 0; i < paraMesh.geometry.vertices.length; i++) {
        var p = paraMesh.geometry.vertices[i]
        p.normalize().multiplyScalar(1 + 0.8 * noise.perlin3(p.x * k + time, p.y * k, p.z * k))
      }

      paraMesh.geometry.computeVertexNormals()
      paraMesh.geometry.normalsNeedUpdate = true
      paraMesh.geometry.verticesNeedUpdate = true

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
      <div id='param' width={900} height={280}>

      </div>
    )
  }
}

export default Param
