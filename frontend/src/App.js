import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-pro-sidebar/dist/css/styles.css';
import './custom.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Admin from "./components/admin/Admin";
import Home from "./components/home/Home";
import {useState} from "react";
import DataContext from "./dataStore/dataStore";
import UserPanel from "./components/admin/admin-groups/UserPanel";
import SearchResults from "./components/users-comps/SearchResults";
import ContentPanel from "./components/admin/admin-groups/ContentPanel";
import EditAccount from '../src/components/Accounts/EditAccount';
import UserProfile from "./components/users-comps/UserProfile";
import CategoryPage from './components/Categories/CategoryPage';


function App() {

    //GROUNDING USER STATE IN THE APP
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  return (

      //APPLIES THE DATASTORE & BINDS TO ENTIRE APP
      //CREATES GLOBAL ACCESSIBILITY
      <DataContext.Provider
        value={{
            user, setUser
        }}>
          <Router>
              <Routes>

                {/*ROUTES FOR HOME NAV*/}
                <Route path="/" element={<Home/>}/>
                <Route path="/admin" element={<Admin/>}/>

                {/*ROUTES FOR ADMIN*/}
                <Route path="/userpanel" element={<UserPanel/>}/>
                <Route path="/contentpanel" element={<ContentPanel/>}/> 

                <Route path="/java" element={<CategoryPage title="Java" categoryid={1} />} />
                <Route path="/react" element={<CategoryPage title="React" categoryid={2} />} />
                <Route path="/sql" element={<CategoryPage title="SQL" categoryid={3}/>} />
                <Route path="/javascript" element={<CategoryPage title="JavaScript" categoryid={4} />} />
                <Route path="/html" element={<CategoryPage title="HTML" categoryid={5} />} />
                <Route path="/searchResults" element={<SearchResults/>}/>

                {/* Routes for Account */}
                <Route path="/account" element={<UserProfile username={user?user.username: ""}/>}/>
                <Route path="/editAccount" element={<EditAccount />} />
                <Route path="/userprofile/:username" element={<UserProfile username="" />} />
              </Routes>
          </Router>
      </DataContext.Provider>
  );
}

export default App;
