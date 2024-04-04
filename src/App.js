import { useDispatch } from 'react-redux';
import { Home, Login, Public, Personal, Album } from './containers/public';
import { Routes, Route } from 'react-router-dom';
import path from './utils/path';
import { useEffect } from 'react';
import * as actions from './store/actions';


const App = () => {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.getHome());
  }, [])
  

  return (
    <>
      <div className="">
        <Routes>
          <Route path={path.PUBLIC} element={<Public />}>
            <Route path={path.HOME} element={<Home />} />
            <Route path={path.LOGIN} element={<Login />} />
            <Route path={path.MY_MUSIC} element={<Personal />} />
            <Route path={path.PLAYLIST_TITLE_PID} element={<Album />} />
            <Route path={path.ALBUM_TITLE_PID} element={<Album />} />

            <Route path={path.STAR} element={<Home />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
