/* eslint-disable @next/next/no-img-element */
import React from "react";

type Props = {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export const ChatButton = ({ onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className=" bg-white bg-opacity-30 hover:bg-primary-50 transition-all duration-200 p-1.5 rounded-full shadow-2xl animate-bounce backdrop-filter backdrop-blur-lg"
    >
      <img className="w-20 h-20" src="/chat-icon.png" alt="Chat Icon" />
    </button>
  );
};
