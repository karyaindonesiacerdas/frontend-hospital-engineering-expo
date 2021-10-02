import { useState, useEffect } from "react";
import { useTranslation } from "next-i18next";

const countDate = new Date("Oct 2, 2021 07:30:00").getTime();

export const CountDown = () => {
  const { t } = useTranslation("home");
  const [dates, setDates] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date().getTime();
      const gap = countDate - now;

      const second = 1000;
      const minute = second * 60;
      const hour = minute * 60;
      const day = hour * 24;

      const d = Math.floor(gap / day);
      const h = Math.floor((gap % day) / hour);
      const m = Math.floor((gap % hour) / minute);
      const s = Math.floor((gap % minute) / second);

      setDates(d);
      setHours(h);
      setMinutes(m);
      setSeconds(s);
    }, 1000);

    return () => clearInterval(intervalId);
  });

  if (countDate < new Date().getTime()) {
    return <div className="h-10 md:h-32"></div>;
  }

  return (
    <div className="mb-6 2xl:mb-10 py-6 2xl:py-10 px-6">
      <div className="text-center text-[#116368]  sm:text-lg md:text-xl uppercase font-medium tracking-wider">
        {t("countdown.tag")}
      </div>
      <div className="mt-4 grid grid-cols-4 md:gap-4 max-w-lg mx-auto">
        <div className="flex flex-col items-center text-[#116368] font-medium">
          <span id="day" className="text-3xl md:text-5xl">
            {dates}
          </span>
          <span className="md:mt-1 text-sm sm:text-md">
            {t("countdown.days")}
          </span>
        </div>
        <div className="flex flex-col items-center text-[#116368] font-medium">
          <span id="hour" className="text-3xl md:text-5xl">
            {hours}
          </span>
          <span className="md:mt-1 text-sm sm:text-md">
            {t("countdown.hours")}
          </span>
        </div>
        <div className="flex flex-col items-center text-[#116368] font-medium">
          <span id="minute" className="text-3xl md:text-5xl">
            {minutes}
          </span>
          <span className="md:mt-1 text-sm sm:text-md">
            {t("countdown.minutes")}
          </span>
        </div>
        <div className="flex flex-col items-center text-[#116368] font-medium">
          <span id="second" className="text-3xl md:text-5xl">
            {seconds}
          </span>
          <span className="md:mt-1 text-sm sm:text-md">
            {t("countdown.seconds")}
          </span>
        </div>
      </div>
    </div>
  );
};
