import React from 'react';

const ProfileImage = ({ email, size = 100 }) => {
    const url = getUserGravatarUrl(email);

    function getUserGravatarUrl(email) {
        const hash = email.trim().toLowerCase().replace(/\s/g, ""); // Hash the email (lowercase, trim spaces)
        return `https://www.gravatar.com/avatar/${hash}`;
      }

    return (
      <img src={url} alt="Profile Picture" width={size} height={size} />
    );
};

export default ProfileImage;
