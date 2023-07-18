"use client";

import UserCard from "./usercard";

export default function UserList({users, handleDelete}) {
    return (
      <div className="w-100 d-flex flex-row justify-content-start  flex-fill flex-wrap">
        {users.map((user) => (
          <div key={user.id}className="w-25 m-5" ><UserCard  user={user} handleDelete={handleDelete}/></div>
        ))}
      </div>
    );
  }
  