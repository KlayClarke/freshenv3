import React from "react";
import { User } from "../../atoms/usersAtom";

type WelcomeBackProps = {
  user: User;
};

const WelcomeBack: React.FC<WelcomeBackProps> = ({ user }) => {
  return (
    <div className="flex flex-1 flex-col items-center">
      <h2 className="text-blue-500 text-3xl md:text-4xl lg:text-6xl text-center font-semibold">
        Welcome back, {user.name.split(" ")[0]}!
      </h2>
    </div>
  );
};
export default WelcomeBack;
