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
  const { push } = useHistory();

  
  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = (e, id) => {
    e.preventDefault();
   
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    // make a PUT request to edit the item

    axiosWithAuth()
      .put(`/color/${colors.id}`, colors)
      .then(res => {
        console.log(res.data)
        const newColors = colors.map(clr => {
          if (clr.id === colors.id) {
            return colors;
          }
          return colors;
        });
        // updateColors(res.data);
        setEditing(newColors)
        push(`/${colors.id}`);
      })
      .catch(err =>
        console.error(
          "ColorList.js: handleSubmit: ",
          err.message,
          err.response
        )
      );
    console.log("whats the value? ", e.target.value)
  }


  const deleteColor = color => {
    axiosWithAuth()
      .delete(`/colors/${color.id}`)
      .then(res => {
        setEditing(res.data);
        push(`/color`);
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
