import React, { useContext } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../App";

export default function HallintaMenu({ hallinta }) {
  const { admin } = useContext(DataContext);
  let navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (reitti) => {
    setAnchorEl(null);
    navigate(reitti);
  };

  return (
    <div>
      {admin ? (
        <div>
          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            sx={{ my: 2, color: "white", display: "block" }}
          >
            Hallinta
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            {hallinta.map((sivu) => (
              <MenuItem
                key={sivu.reitti}
                onClick={() => handleClose(sivu.reitti)}
              >
                {sivu.otsikko}
              </MenuItem>
            ))}
          </Menu>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
