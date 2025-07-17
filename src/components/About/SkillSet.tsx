import React from "react";

type SkillItem = {
  name: string;
  experience: string;
};

type Skill = {
  category: string;
  items: SkillItem[];
};

const SkillSet: React.FC<{ skills: Skill[] }> = ({ skills }) => {
  return (
    <div className="space-y-6">
      {skills.map((skill, index) => (
        <div key={index}>
          <h3 className="text-lg font-semibold mb-2 text-foreground">
            {skill.category}
          </h3>
          <ul className="list-disc list-inside grid grid-cols-1 md:grid-cols-2 gap-2">
            {skill.items.map((item, itemIndex) => (
              <li key={itemIndex} className="text-foreground">
                <span className="font-medium">{item.name}</span>
                <span className="text-muted-foreground ml-2">({item.experience})</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};
export default SkillSet;
