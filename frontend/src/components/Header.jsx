import { Link, Route } from "react-router-dom";
import logo from "../images/header_logo.svg";
export default function Header(props) {
	return (
		<header className="header">
			<img src={logo} alt="around the us" className="logo" />
			<Route path="/signin">
				<Link className="header__link" to="/signup">
					Sign up
				</Link>
			</Route>
			<Route path="/signup">
				<Link className="header__link" to="/signin">
					Log in
				</Link>
			</Route>
			<Route exact path="/">
				<div className="header__menu">
					<p className="header__email">{props.email}</p>
					<button type="button" className="header__logout" onClick={props.onLogout}>
						Log out
					</button>
				</div>
			</Route>
		</header>
	);
}
