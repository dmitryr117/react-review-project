import React, { FC, useState } from 'react';
import EditProfilePic from '../../components/EditProfilePic';
import { ProfilePic } from '../../components/ProfilePic';

export const ProfilePage: FC = () => {
  const [editPicture, setEditPicture] = useState(false);

  return (
    <div>
      {editPicture ? (
        <EditProfilePic changeFcn={setEditPicture} />
      ) : (
        <ProfilePic changeFcn={setEditPicture} />
      )}
      Profile Page
    </div>
  );
};
