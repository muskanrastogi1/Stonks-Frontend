import React from "react";
import PuffLoader from "react-spinners/PuffLoader";

function Loader(props) {
  return (
    <div
      style={{
        position: "absolute",
        top: "0",
        left: "0",
        height: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <PuffLoader size={135} color={"#2EC5B6"} loading={props.loading} />
    </div>
  );
}
export default Loader;
