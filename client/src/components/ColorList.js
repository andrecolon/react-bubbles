import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axiosWithAuth from "../util/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  // console.log("Here is the data! ", colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const { id } = useParams();
  // const { push } = useHistory();

  
  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
   
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    // make a PUT request to edit the item

    axiosWithAuth()
      .put(`/colors/${colorToEdit.id}`, colorToEdit)
      .then(res => { 
        setColorToEdit(res.data) 
      axiosWithAuth()
          .get('/colors')
          .then(res => {
            console.log('BubblePage.js=>.get=>res.data', res.data)
            updateColors(res.data)
          })
      })
      .catch(err =>
        console.error(
          "ColorList.js: handleSubmit: ",
          err.message,
          err.response
        )
      );
  }


  const deleteColor = color => {
    axiosWithAuth()
      .delete(`/colors/${color.id}`)
      .then(res => {
        axiosWithAuth()
          .get('/colors')
          .then(res => {
            console.log('BubblePage.js=>.get=>res.data', res.data)
            updateColors(res.data)
          })
      })
      .catch(err =>
        console.error("ColorList.js: handleDelete: err: ", err.message, err.response)
      );
  };



  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;
