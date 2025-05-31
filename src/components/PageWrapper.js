import React from "react";

const PageWrapper = ({ children }) => {
  return (
    <div style={{ maxWidth: "700px", margin: "0 auto", padding: "2rem" }}>
      {children}
    </div>
  );
};

export default PageWrapper;
