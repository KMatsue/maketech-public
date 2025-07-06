"use client";
import React, { useState } from "react";

export type ProjectDetail = {
  title: string;
  period: string;
  summary?: string;
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

  const renderTechList = (techs: string[]) => {
    return (
      <div className="flex flex-wrap gap-2 mt-1 ml-4">
        {techs.map((tech, index) => (
          <span
            key={index}
            className="px-2 py-1 bg-muted rounded text-sm"
          >
            {tech}
          </span>
        ))}
      </div>
    );
  };

  const renderTechPreview = (item: ProjectDetail) => {
    const allTechs = [
      ...(item.technologies.frontend || []),
      ...(item.technologies.backend || []),
      ...(item.technologies.database || []),
    ].slice(0, 3);

    return (
      <div className="flex flex-wrap gap-1 mt-1">
        {allTechs.map((tech, index) => (
          <span
            key={index}
            className="px-1.5 py-0.5 bg-muted rounded text-xs"
          >
            {tech}
          </span>
        ))}
        {allTechs.length > 0 && (
          <span className="text-xs text-muted-foreground">...</span>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div
          key={index}
          className="border border-border-primary rounded-lg hover:border-border-secondary transition-colors"
        >
          <button
            className="w-full p-4 text-left"
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          >
            <div className="flex items-center">
              <div className="flex-grow">
                <div className="font-semibold text-lg">{item.title}</div>
                <div className="text-sm text-muted-foreground mt-1">
                  {item.period}
                </div>
                {item.summary && (
                  <p className="text-sm text-foreground mt-2">
                    {item.summary}
                  </p>
                )}
                {renderTechPreview(item)}
              </div>
              <span className="text-xl leading-none text-muted-foreground ml-4">
                {openIndex === index ? "−" : "+"}
              </span>
            </div>
          </button>

          {openIndex === index && (
            <div className="p-4 border-t border-border-primary space-y-4">
              <div>
                <strong>役割:</strong>{" "}
                <span className="whitespace-pre-line">{item.role}</span>
              </div>
              <div>
                <strong>概要:</strong>{" "}
                <span className="whitespace-pre-line">{item.description}</span>
              </div>
              <div>
                <strong>チーム規模:</strong>{" "}
                <span className="whitespace-pre-line">{item.teamSize}</span>
              </div>
              <div className="space-y-3">
                <strong>技術スタック:</strong>
                {item.technologies.frontend &&
                  item.technologies.frontend.length !== 0 && (
                    <div>
                      <div className="ml-4 text-sm font-medium">
                        フロントエンド:
                      </div>
                      {renderTechList(item.technologies.frontend)}
                    </div>
                  )}
                {item.technologies.backend &&
                  item.technologies.backend.length !== 0 && (
                    <div>
                      <div className="ml-4 text-sm font-medium">
                        バックエンド:
                      </div>
                      {renderTechList(item.technologies.backend)}
                    </div>
                  )}
                {item.technologies.database &&
                  item.technologies.database.length !== 0 && (
                    <div>
                      <div className="ml-4 text-sm font-medium">
                        データベース:
                      </div>
                      {renderTechList(item.technologies.database)}
                    </div>
                  )}
                {item.technologies.infrastructure &&
                  item.technologies.infrastructure.length !== 0 && (
                    <div>
                      <div className="ml-4 text-sm font-medium">インフラ:</div>
                      {renderTechList(item.technologies.infrastructure)}
                    </div>
                  )}
                {item.technologies.other &&
                  item.technologies.other.length !== 0 && (
                    <div>
                      <div className="ml-4 text-sm font-medium">その他:</div>
                      {renderTechList(item.technologies.other)}
                    </div>
                  )}
              </div>
              {item.achievements && item.achievements.length !== 0 && (
                <div>
                  <strong>主な成果:</strong>
                  <ul className="list-disc ml-6 mt-2 space-y-2">
                    {item.achievements.map((achievement, i) => (
                      <li key={i} className="whitespace-pre-line">
                        {achievement}
                      </li>
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
