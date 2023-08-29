import Header from "../Header/Header";
import BottomNav from "../BottomNav/BottomNav";
import Player from "../Player/Player";

const Layout = ({children}) => (
  <>
    <Header/>
    <div style={{minHeight: "100vh"}}>
      {children}
    </div>
    <div className="sticky-bottom">
      <Player/>
      <BottomNav/>
    </div>
  </>
);


export default Layout;

