import { Box, Typography } from "@mui/material";
import { html } from "htm/react";
import Peer from "../components/Peer";
import Share from "../components/Share";
import usePeers from "../hooks/use-peers";

export default () => {
  const { peers, topic } = usePeers();

  return html`
    <${Box} sx=${{ margin: 1 }}>
      <${Typography} variant="h4"> Your peers </${Typography}>
      <${Share} topic=${topic}> </>
      
      ${Object.entries(peers).map(
        ([key, peer]) => html`
          <${Peer} key=${key} hyperdrive=${peer.hyperdrive} />
        `
      )}
    </${Box}>
  `;
};
