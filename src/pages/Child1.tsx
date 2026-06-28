import React from "react";

const Child1 = React.memo(({ user, onSave }: any) => {
  console.log("child1 is rendered");

  return (
    <>
      <button onClick={onSave}>{user?.name}</button>
    </>
  );
});

export default Child1;
