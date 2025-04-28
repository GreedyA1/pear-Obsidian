import { List } from "@mui/material";
import { html } from "htm/react";
import FilesListItem from "../components/FilesListItem";

export default ({ files, hyperdrive, allowDeletion = false }) => {
  return html`
    <${List}>
      ${files
        .sort((a, b) => a.key.localeCompare(b.key))
        .map(
          (file) => html`
            <${FilesListItem}
              key=${file.key}
              file=${file}
              hyperdrive=${hyperdrive}
              allowDeletion=${allowDeletion}
            />
          `
        )}
    </${List}>
  `;
};
