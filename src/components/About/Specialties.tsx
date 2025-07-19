import React from "react";

const Specialties: React.FC<{ specialties: string[] }> = ({ specialties }) => {
  return (
    <ul className="list-disc list-inside space-y-2">
      {specialties.map((specialty, index) => (
        <li key={index} className="text-foreground">
          {specialty}
        </li>
      ))}
    </ul>
  );
};

export default Specialties;
