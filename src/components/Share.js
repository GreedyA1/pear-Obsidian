import CloseIcon from "@mui/icons-material/CLose";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { IconButton, Snackbar, Tooltip } from "@mui/material";
import { html } from "htm/react";
import { useState } from "react";

export default ({ topic }) => {
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleCopy = async (textToCopy) => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setOpenSnackbar(true);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const handleCloseSnackbar = (_, reason) => {
    if (reason === "clickaway") return;
    setOpenSnackbar(false);
  };

  return html`
       <${Tooltip} title="Copy to clipboard">
        <div>
        ${topic}
           <${IconButton}
          size="small"
          onClick=${() => handleCopy(topic)}
          edge="end"
          aria-label="copy"
        >
          <${ContentCopyIcon} fontSize="small" />
        </>
       </div>
      </${Tooltip}>

        <${Snackbar}
        open=${openSnackbar}
        autoHideDuration=${2000}
        onClose=${handleCloseSnackbar}
        message="Copied to clipboard"
        action=${html`
            <${IconButton}
                size="small"
                aria-label="close"
                color="inherit"
                onClick=${handleCloseSnackbar}
            >
                <${CloseIcon} fontSize="small" />
            </${IconButton}>
          `}
      />

  `;
};
