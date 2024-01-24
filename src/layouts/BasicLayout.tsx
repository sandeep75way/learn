import { Link, Outlet } from "react-router-dom";

function BasicLayout() {
    return <div>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Outlet />
    </div>
}
export default BasicLayout;