import React from 'react';

interface Props {
  edit: boolean;
}

export const ProfilePic = ({ changeFcn }: any) => {
  return (
    <div>
      <h1>ProfilePic</h1>
      <button onClick={() => changeFcn(true)}>Edit Pic</button>
    </div>
  );
};
