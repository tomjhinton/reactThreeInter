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
    var raycaster = new THREE.Raycaster()
    var mouse = new THREE.Vector2()

    function torusCreate(){
      var boxGeo = new THREE.TorusGeometry(Math.random()*18+10, 2, Math.random()*80, 10)
      const materialColor = new THREE.MeshPhongMaterial( { color: `rgba(${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},1)`, specular: `rgba(${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},1)` , shininess: 100, side: THREE.DoubleSide } )
      const  box = new THREE.Mesh(boxGeo, materialColor)
      box.position.x = Math.random()*85
      box.position.y = Math.random()*35
      box.position.z = Math.random()*45
      scene.add(box)




    }

    function onMouseMove( event ) {
      //console.log(cube.position.x)
  // calculate mouse position in normalized device coordinates
  // (-1 to +1) for both components
      //
      mouse.x = ( event.offsetX / 900 ) * 2 - 1
      mouse.y = - ( event.offsetY / 180 ) * 2 + 1

    }
    const scene = new THREE.Scene()

    for(let i=0;i<100;i++){
      torusCreate()
    }

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

    const material = new THREE.MeshPhongMaterial( { color: 0x000FF0, specular: 0xf22fff , shininess: 100, side: THREE.DoubleSide } )



    const geometry = new THREE.BoxGeometry( 1, 1, 1 )

    const cube = new THREE.Mesh(geometry, material)
    console.log(cube)

    //  scene.add(cube)
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

        x.rotation.x += scene.children.indexOf(x)/5000
        x.rotation.y += scene.children.indexOf(x)/5000
        x.rotation.z += scene.children.indexOf(x)/5000



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
