import React, { useState, useEffect } from "react";
import axiosWithAuth from "../util/axiosWithAuth";
import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property

useEffect(() => {
const getColors = () =>{
  axiosWithAuth()//Are they cool enough to access this component?

    .get(`/colors`) // Endpoint of Colors - line 119 - server.js
    .then(res => {
      console.log(res.data);
      setColorList(res.data)
    })
    .catch(err =>
      console.error("What's my error? ", err.message, err.res)
    );
  }
getColors()//useEffect is crying for a dependancy value ..oh yeah?!
// eslint-disable-next-line
},[])


  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
