import React from "react";

type Skill = {
  category: string;
  items: string[];
};

const SkillSet: React.FC<{ skills: Skill[] }> = ({ skills }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {skills.map((skill, index) => (
        <div
          key={index}
          className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow"
        >
          <h3 className="text-lg font-semibold mb-2">{skill.category}</h3>
          <ul className="list-disc list-inside">
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
