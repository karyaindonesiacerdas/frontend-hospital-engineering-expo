import React from "react";
import Image from "next/image";
import Marquee from "react-fast-marquee";

export const RunningText = () => {
  return (
    <div className="bg-primary-600">
      <div className="max-w-7xl mx-auto text-white rounded-md overflow-hidden backdrop-filter backdrop-blur-xl">
        <Marquee
          speed={80}
          gradient={true}
          gradientColor={[0, 132, 140]}
          className="h-10 overflow-hidden"
          // style={{ height: "2.6vw" }}
        >
          <a
            href="http://www.chint.id/"
            target="_blank"
            rel="noreferrer"
            className="font-semibold uppercase text-xl leading-loose flex items-center space-x-3 mx-28 hover:text-gray-200"
          >
            <Image
              src="/sponsor/chint-electric.png"
              alt="Chint"
              height={80}
              width={80}
              objectFit="contain"
              className="bg-white"
            />
            <span>Chint Electric &quot;Empower The World&quot;</span>
          </a>
          <div className="mx-28 font-semibold">
            The 2nd day of the event will be held on October 16, 2021!
          </div>
        </Marquee>
      </div>
    </div>
  );
};
