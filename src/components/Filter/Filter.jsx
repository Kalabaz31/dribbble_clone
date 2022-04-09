import React,{useState} from 'react'

import "./Filter.scss"

const Filter = () => {

  const [sortBtnClick, setSortBtnClick] = useState(false);
  return (
    <div className='app__filter'>
      <div className='sort-dropdown'>

        <button onClick={()=>setSortBtnClick(!sortBtnClick) } className={sortBtnClick ? "dropped" : ""}> Popular </button>

        <ul>
          <li><a href=""></a></li>
        </ul>
      </div>
    </div>
  )
}

export default Filter