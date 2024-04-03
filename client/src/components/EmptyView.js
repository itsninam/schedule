import React from "react";

function EmptyView({ header, message, image, type }) {
  return (
    <section className={`empty-view ${type}`}>
      <img src={image} alt={header} />
      <h3>{header}</h3>
      <p>{message}</p>
    </section>
  );
}

export default EmptyView;
