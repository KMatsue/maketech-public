import React from "react";

type TimelineEvent = {
  date: string;
  title: string;
  description: string;
  details: string[];
};

const Timeline: React.FC<{ events: TimelineEvent[] }> = ({ events }) => {
  return (
    <div className="relative border-l border-border-primary">
      {events.map((event, index) => (
        <div key={index} className="mb-10 ml-4">
          <div className="absolute w-3 h-3 bg-muted rounded-full mt-1.5 -left-1.5 border border-background"></div>
          <time className="mb-1 text-sm font-normal leading-none text-muted-foreground">
            {event.date}
          </time>
          <h3 className="text-lg font-semibold text-foreground">
            {event.title}
          </h3>
          <p className="mb-4 text-base font-normal text-muted-foreground">
            {event.description}
          </p>
          <ul className="list-disc list-inside pl-4 space-y-2">
            {event.details.map((detail, detailIndex) => (
              <li
                key={detailIndex}
                className="text-foreground"
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
