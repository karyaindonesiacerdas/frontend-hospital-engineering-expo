import React from "react";
import styles from "./BookingConsultation.module.css";

type Props = {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export const BookingConsultation = ({ onClick }: Props) => {
  return (
    <div className="animate-pulse group hover:animate-none">
      <div className={styles.wrapper}>
        <button className={styles.button} onClick={onClick}>
          <div className="absolute inset-0 group-hover:bg-black  group-hover:bg-opacity-80 group-hover:text-white"></div>
          {/* <svg
            className="z-10"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M15.1141 9.35688C14.7589 9.56999 14.6438 10.0307 14.8569 10.3859C15.07 10.7411 15.5307 10.8562 15.8859 10.6431L15.1141 9.35688ZM19.25 7.75H20C20 7.4798 19.8547 7.23048 19.6195 7.09735C19.3844 6.96422 19.0958 6.96786 18.8641 7.10688L19.25 7.75ZM19.25 16.25L18.8641 16.8931C19.0958 17.0321 19.3844 17.0358 19.6195 16.9026C19.8547 16.7695 20 16.5202 20 16.25H19.25ZM15.8859 13.3569C15.5307 13.1438 15.07 13.2589 14.8569 13.6141C14.6438 13.9693 14.7589 14.43 15.1141 14.6431L15.8859 13.3569ZM15.8859 10.6431L19.6359 8.39312L18.8641 7.10688L15.1141 9.35688L15.8859 10.6431ZM18.5 7.75V16.25H20V7.75H18.5ZM19.6359 15.6069L15.8859 13.3569L15.1141 14.6431L18.8641 16.8931L19.6359 15.6069ZM6.75 7.5H13.25V6H6.75V7.5ZM14.5 8.75V15.25H16V8.75H14.5ZM13.25 16.5H6.75V18H13.25V16.5ZM5.5 15.25V8.75H4V15.25H5.5ZM6.75 16.5C6.05964 16.5 5.5 15.9404 5.5 15.25H4C4 16.7688 5.23122 18 6.75 18V16.5ZM14.5 15.25C14.5 15.9404 13.9404 16.5 13.25 16.5V18C14.7688 18 16 16.7688 16 15.25H14.5ZM13.25 7.5C13.9404 7.5 14.5 8.05964 14.5 8.75H16C16 7.23122 14.7688 6 13.25 6V7.5ZM6.75 6C5.23122 6 4 7.23122 4 8.75H5.5C5.5 8.05964 6.05964 7.5 6.75 7.5V6Z"
            />
          </svg> */}
          <span className="font-bold group-hover:text-white z-10">
            Booking Konsultasi
          </span>
        </button>
      </div>
    </div>
  );
};
