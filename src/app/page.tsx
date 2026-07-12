import Radar from "@/components/Radar";


export default function Home() {
  return (
    <main style={{ 
      width: "100vw", 
      height: "100vh", 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "center",
      flexDirection: "column",
      position: "relative"
    }}>
      


      <Radar />

      <div style={{
        position: "absolute",
        bottom: "2rem",
        fontFamily: "var(--font-body)",
        color: "rgba(255,255,255,0.4)",
        letterSpacing: "2px",
        textTransform: "uppercase",
        fontSize: "0.8rem"
      }}>
        Scanning System...
      </div>
    </main>
  );
}
