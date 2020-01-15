import React from "react";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import Branding from "../Branding/Branding";
import ShoppingCartPreview from "../shoppingCartPreview/shoppingCartPreview";

import "./navigation.css";

export class Navigation extends React.Component<RouteComponentProps> {
  constructor(props: Readonly<RouteComponentProps>) {
    super(props);
  }
  render() {
    return (
      <ul>
        <li className="branding">
          <Link to="/">
            <Branding />
          </Link>
        </li>
        <li className="shoppingCartPreview"></li>
      </ul>
    );
  }
}

export default withRouter(Navigation);
