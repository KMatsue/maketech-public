import React from "react";

export interface HobbyItem {
  title: string;
  description: string;
}

const Hobbies: React.FC<{ hobbies: HobbyItem[]; summary?: string }> = ({
  hobbies,
  summary,
}) => {
  return (
    <div className="space-y-6">
      {hobbies.map((hobby, index) => (
        <div key={index} className="space-y-2">
          <h3 className="text-xl font-semibold text-foreground">
            {hobby.title}
          </h3>
          <p className="text-foreground leading-relaxed">{hobby.description}</p>
        </div>
      ))}
      {summary && (
        <div className="mt-2">
          <p className="text-foreground">{summary}</p>
        </div>
      )}
    </div>
  );
};

export default Hobbies;
