import React from 'react'

import Cubes from './Cubes'
import Grid from './Grid'



import Sidebar from './Sidebar'

const Home = () => {
  return(
    <section className="section">
      <div className='title'>🆒</div>
      <div className="container">
        <div className="columns">
          <div className="column is-one-quarter">
            <Sidebar />
          </div>
          <div className="column">
            <div className="container">
              <Cubes />
              <Grid />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


export default Home
