import React from 'react'
const THREE = require('three')




class Grid extends React.Component {


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
    const geometryG = new THREE.Geometry(),
      geometryG2 = new THREE.Geometry(),
      materialG = new THREE.LineBasicMaterial({
        color: 'green'
      }),
      materialG2 = new THREE.LineBasicMaterial({
        color: 'cyan'
      })
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


    const size = 4000,
      size2  = 5000,
      steps = 40,
      steps2 = 60

    for (let i = -size; i <= size; i += steps) {
      //draw lines one way
      geometryG.vertices.push(new THREE.Vector3(-size, -0.04, i))
      geometryG.vertices.push(new THREE.Vector3(size, -0.04, i))

      //draw lines the other way
      geometryG.vertices.push(new THREE.Vector3(i, -0.04, -size))
      geometryG.vertices.push(new THREE.Vector3(i, -0.04, size))
    }

    for (let j = -size; j <= size; j += steps2) {
      //draw lines one way
      geometryG2.vertices.push(new THREE.Vector3(-size2, -0.04, j))
      geometryG2.vertices.push(new THREE.Vector3(size2, -0.04, j))

      //draw lines the other way
      geometryG2.vertices.push(new THREE.Vector3(j, -0.04, -size2))
      geometryG2.vertices.push(new THREE.Vector3(j, -0.04, size2))
    }

    const line = new THREE.Line(geometryG, materialG, THREE.LineSegments)
    const line2 = new THREE.Line(geometryG2, materialG2, THREE.LineSegments)

    line.position.y = - 200
    line2.position.y =  220
    line.rotation.z =180
    line2.rotation.z = -180




    scene.add(line, line2)


    const light = new THREE.DirectionalLight( 0xffffff )
    light.position.set( 40, 25, 10 )
    light.castShadow = true
    scene.add(light)

    console.log(scene)

    const renderer = new THREE.WebGLRenderer()
    renderer.setSize( 900, 280)
    const display = document.getElementById('grid')
    display.appendChild( renderer.domElement )
    //var controls = new OrbitControls( camera, renderer.domElement );


    const camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 0.1, 3000 )

    camera.position.z = 100
    camera.position.x = 40
    camera.position.y = 20


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
      scene.children.map(x=> {

        x.rotation.z += 0.01




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
      <div id='grid' width={900} height={280}>

      </div>
    )
  }
}

export default Grid
