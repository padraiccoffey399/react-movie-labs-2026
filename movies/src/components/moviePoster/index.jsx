import { useState } from "react";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

export default function MoviePoster({ src, title }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <Box sx={{ height: 500, position: "relative" }}>
      {!loaded && (
        <Skeleton
          variant="rectangular"
          animation="wave"
          sx={{ position: "absolute", inset: 0 }}
        />
      )}
      <Box
        component="img"
        src={src}
        alt={title}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
        sx={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          visibility: loaded ? "visible" : "hidden",
        }}
      />
    </Box>
  );
}

