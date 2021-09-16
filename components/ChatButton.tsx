import React from "react";

type Props = {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export const ChatButton = ({ onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className=" bg-primary-100 hover:bg-primary-200 transition-all duration-200 p-4 rounded-full shadow-2xl animate-bounce"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-12 w-12 text-primary-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
        />
      </svg>
    </button>
  );
};

// export interface ChatButtonProps
//   extends React.ComponentPropsWithoutRef<"button"> {}

// export const ChatButton = React.forwardRef<HTMLButtonElement, ChatButtonProps>(
//   (props, ref) => {
//     return (
//       <button
//         ref={ref}
//         className="animate-bounce bg-primary-100 hover:bg-primary-600 transition-all duration-200 p-4 rounded-full shadow-2xl"
//         {...props}
//       >
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           className="h-12 w-12 text-primary-600"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={2}
//             d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
//           />
//         </svg>
//       </button>
//     );
//   }
// );

// ChatButton.displayName = "ChatButton";
