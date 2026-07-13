"use client";

import { useEffect, useState } from "react";
import Lottie from "lottie-react";

export default function VibeLottie({ url }: { url: string }) {
  const [animationData, setAnimationData] = useState<any>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("Network error");
        return res.json();
      })
      .then((data) => setAnimationData(data))
      .catch((err) => {
        console.error("Failed to load Lottie:", err);
        setError(true);
      });
  }, [url]);

  if (error) {
    return <div style={{ color: "red", fontSize: "0.8rem" }}>Error de Lottie</div>;
  }

  if (!animationData) {
    return (
      <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.8rem", animation: "pulse 1.5s infinite" }}>
        Descifrando sorpresa...
      </div>
    );
  }

  return <Lottie animationData={animationData} loop={true} style={{ height: "150px", width: "150px" }} />;
}
