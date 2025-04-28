import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import { html } from "htm/react";
import { useEffect, useState } from "react";
import usePeers from "../hooks/use-peers";
import useUser from "../hooks/use-user";
import ControlPanel from "./ControlPanel";
import PeersPanel from "./PeersPanel";
import UserPanel from "./UserPanel";

export default ({ app }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { loaded: arePeersLoaded } = usePeers();
  const { loaded: isUserLoaded } = useUser();

  useEffect(() => {
    const isAllLoaded = arePeersLoaded && isUserLoaded;
    if (!isAllLoaded) return;
    setIsLoaded(true);
  }, [arePeersLoaded, isUserLoaded]);

  if (!isLoaded) {
    return html`
      <${Box}
        sx=${{
          display: "flex",
          height: "100vh",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <${CircularProgress} sx=${{ marginBottom: "20px" }} />
        <${Typography} variant="h3"> Loading </${Typography}>
      </${Box}>
    `;
  }
  return html`
    <${Grid} container spacing=${2}>
      <${Grid} item xs=${12}>
        <${ControlPanel} />
      </${Grid}>
      <${Grid} item xs=${6}>
        <${PeersPanel} />
      </${Grid}>
      <${Grid} item xs=${6}>
        <${UserPanel} />
      </${Grid}>
    </${Grid}>
  `;
};
