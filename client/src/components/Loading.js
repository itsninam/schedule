import React from "react";
import { Oval } from "react-loader-spinner";

function Loading() {
  return (
    <Oval
      visible={true}
      height="50"
      width="50"
      color="#612a91"
      secondaryColor="#c584e0"
      ariaLabel="oval-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
  );
}

export default Loading;
