import loader from "../assets/loader.gif";

const Loader = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "3rem",
        backgroundColor: "#9c27b0",
        height: "100vh",
        width: "100vw",
      }}
    >
      <img src={loader} alt="loaderLazy" />
    </div>
  );
};

export default Loader;
