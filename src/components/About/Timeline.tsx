import React from "react";

type TimelineEvent = {
  date: string;
  title: string;
  description: string;
  details: string[];
};

const Timeline: React.FC<{ events: TimelineEvent[] }> = ({ events }) => {
  return (
    <div className="relative border-l border-gray-200 dark:border-gray-700">
      {events.map((event, index) => (
        <div key={index} className="mb-10 ml-4">
          <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
          <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
            {event.date}
          </time>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {event.title}
          </h3>
          <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
            {event.description}
          </p>
          <ul className="list-disc list-inside pl-4 space-y-2">
            {event.details.map((detail, detailIndex) => (
              <li
                key={detailIndex}
                className="text-gray-600 dark:text-gray-300"
              >
                {detail}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Timeline;
