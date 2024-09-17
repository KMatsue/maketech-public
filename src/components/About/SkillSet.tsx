import React from "react";

type Skill = {
  category: string;
  items: string[];
};

const SkillSet: React.FC<{ skills: Skill[] }> = ({ skills }) => {
  return (
    <div className="space-y-6">
      {skills.map((skill, index) => (
        <div key={index}>
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">
            {skill.category}
          </h3>
          <ul className="list-disc list-inside grid grid-cols-1 md:grid-cols-2 gap-2">
            {skill.items.map((item, itemIndex) => (
              <li key={itemIndex} className="text-gray-600 dark:text-gray-300">
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};
export default SkillSet;
