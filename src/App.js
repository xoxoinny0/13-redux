import React, { memo } from "react";
import { Routes, Route} from 'react-router-dom';

import MenuLink from './components/MenuLink';
import Counter from "./pages/Counter";
import Department from "./pages/Department";
import News from "./pages/News";
import MovieRank from "./pages/MovieRank";


const App = memo(() => {
  return (
    <div>
      <h1>13-redux</h1>
      <nav>
        <MenuLink to='/counter'>Counter</MenuLink>
        <MenuLink to='/department'>Department</MenuLink>
        <MenuLink to='/news'>News</MenuLink>
        <MenuLink to='/movierank'>MovieRank</MenuLink>
      </nav>
      <hr />
      <Routes>
        <Route path='counter' element={<Counter />}></Route>
        <Route path='department' element={<Department />}></Route>
        <Route path='news' element={<News />}></Route>
        <Route path='movierank' element={<MovieRank/>}></Route>
      </Routes>
    </div>
  );
});
  
export default App;
