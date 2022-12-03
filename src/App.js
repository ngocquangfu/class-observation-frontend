import {public_route} from './router/Router'
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from './views/pages/authetication/login/Login';


function App() {
    const isLogin = localStorage.getItem("access_token") ? true : false;
    const role = JSON.parse(localStorage.getItem("role"));
    console.log(isLogin, " ", role);
    return (
      <div>
        <BrowserRouter>
          <Routes>
            {
              public_route.map(route => {
                const checkRole = isLogin && route.role.filter(i => role?.includes(i)).length > 0
                return (
                  <>
                    {!checkRole
                      ?
                      <Route path={"/login"} element={
                        <Login />
                      }>
                      </Route> :
                      <Route key={route.path} path={route.path} element={
                        <route.Com />
                      }>
                      </Route>
                    }
                  </>
                )
              })
            }
          </Routes>
        </BrowserRouter>
      </div >
    );
  }
  
  export default App;
  