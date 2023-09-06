import Header from "../Header/Header";
import BottomNav from "../BottomNav/BottomNav";
import Player from "../Player/Player";

const Layout = ({children, className=null}) => (
  <>
    <Header/>
    <div className={className} style={{minHeight: "100vh"}}>
      {children}
    </div>
    <div className="sticky-bottom mt-auto">
      <Player/>
      <BottomNav/>
    </div>
  </>
);


export default Layout;

