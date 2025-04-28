/* global Pear */

import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { html } from "htm/react";

import Hypercore from "hypercore";
import crypto from "hypercore-crypto";
import { createRoot } from "react-dom/client";
import App from "./src/containers/App";
import { PeersProvider } from "./src/context/peers";
import { UserProvider } from "./src/context/user";

const { app } = await Pear.versions();
const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

const topic = crypto.randomBytes(32);
const core = new Hypercore("./core");
await core.ready();
console.log(core.discoveryKey);

const root = createRoot(document.querySelector("#root"));
root.render(html`
  <${ThemeProvider} theme=${theme}>
    <${CssBaseline} />
    <${UserProvider} config=${Pear.config}>
      <${PeersProvider}
        name="pear-obsidian"
        topic=${core.discoveryKey}
      >
        <${App} app="{app}" />
      </${PeersProvider}>
    </${UserProvider}>
  </${ThemeProvider}>
`);
