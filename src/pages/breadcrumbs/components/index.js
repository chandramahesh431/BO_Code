import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { pathArray } from "./constants";
import "../stylesheets/breadcrumbs.css";

const Breadcrumbs = (props) => {
  const [pathsArray, setPathArray] = useState(null);
  let location = useLocation();

  const routes = pathArray;

  const preparePaths = () => {
    let url = location.pathname;
    let res = url.split("/");
    let paths = [];
    for (let i = 1; i < res.length; i++) {
      try {
        let object = {
          name: routes.find(
            (x) => x.route.toLowerCase() === res[i].toLowerCase()
          ).name,
          route: routes.find(
            (x) => x.route.toLowerCase() === res[i].toLowerCase()
          ).url,
        };
        paths.push(object);
      } catch (ex) {}
    }
    if (res.length - 1 === paths.length) {
      setPathArray(JSON.stringify(paths));
    } else {
      console.warn("wrong url.");
    }
  };

  useEffect(() => {
    preparePaths();
  });

  return (
    <div className="breadscrum">
      <div>
        <ul id="bread">
          {pathsArray &&
            JSON.parse(pathsArray).map((item) => {
              return (
                <li style={{ listStyleType: "none" }}>
                  <Link id="Link" to={item.route}>
                    {item.name}
                  </Link>
                </li>
              );
            })}
        </ul>
      </div>
      <div></div>
    </div>
  );
};

export default Breadcrumbs;
