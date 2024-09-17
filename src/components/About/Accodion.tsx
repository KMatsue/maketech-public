"use client";
import React, { useState } from "react";

export type ProjectDetail = {
  title: string;
  period: string;
  role: string;
  description: string;
  technologies: {
    frontend?: string[];
    backend?: string[];
    database?: string[];
    infrastructure?: string[];
    other?: string[];
  };
  teamSize: string;
  achievements?: string[];
};

const Accordion: React.FC<{ items: ProjectDetail[] }> = ({ items }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div
          key={index}
          className="border border-gray-200 dark:border-gray-700 rounded-lg"
        >
          <button
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full p-4 text-left"
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          >
            <div>
              <div className="font-semibold">{item.title}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {item.period}
              </div>
            </div>
            <span className="mt-2 sm:mt-0">
              {openIndex === index ? "−" : "+"}
            </span>
          </button>
          {openIndex === index && (
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              {/* <p>
                <strong>期間:</strong> {item.period}
              </p> */}
              <p>
                <strong>役割:</strong> {item.role}
              </p>
              <p>
                <strong>概要:</strong> {item.description}
              </p>
              <p>
                <strong>チーム規模:</strong> {item.teamSize}
              </p>
              <div className="mt-2">
                <strong>技術スタック:</strong>
                <ul className="list-disc list-inside ml-4">
                  {item.technologies.frontend &&
                    item.technologies.frontend.length !== 0 && (
                      <li>
                        フロントエンド: {item.technologies.frontend.join(", ")}
                      </li>
                    )}
                  {item.technologies.backend &&
                    item.technologies.backend.length !== 0 && (
                      <li>
                        バックエンド: {item.technologies.backend.join(", ")}
                      </li>
                    )}
                  {item.technologies.database &&
                    item.technologies.database.length !== 0 && (
                      <li>
                        データベース: {item.technologies.database.join(", ")}
                      </li>
                    )}
                  {item.technologies.infrastructure &&
                    item.technologies.infrastructure.length !== 0 && (
                      <li>
                        インフラ: {item.technologies.infrastructure.join(", ")}
                      </li>
                    )}
                  {item.technologies.other &&
                    item.technologies.other.length !== 0 && (
                      <li>その他: {item.technologies.other.join(", ")}</li>
                    )}
                </ul>
              </div>
              {item.achievements && item.achievements.length !== 0 && (
                <div className="mt-2">
                  <strong>主な成果:</strong>
                  <ul className="list-disc list-inside ml-4">
                    {item.achievements.map((achievement, i) => (
                      <li key={i}>{achievement}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Accordion;
