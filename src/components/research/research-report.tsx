import { useState } from "react";
import {
  SectionContent,
  SectionTitle,
  SourcesContent,
} from "@/components/research/research-sections";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import type { ResearchReport as ResearchReportType } from "@/services/research-service";

export function ResearchReport({ report }: { report: ResearchReportType }) {
  const [activeSection, setActiveSection] = useState<number>(0);

  return (
    <Card className="w-full p-0">
      <div className="grid grid-cols-1 md:grid-cols-3">
        {/* sections */}
        <div className="border-r hidden md:block">
          <CardHeader className="py-4">
            <CardTitle className="text-xl">Sections</CardTitle>
          </CardHeader>
          <div className="flex flex-col">
            <SectionTitle
              title="Summary"
              active={activeSection === 0}
              onClick={() => setActiveSection(0)}
            />
            {report.sections.map((section, index) => (
              <SectionTitle
                key={index}
                title={section.title}
                active={activeSection === index + 1}
                onClick={() => setActiveSection(index + 1)}
              />
            ))}
            <SectionTitle
              title="Sources"
              active={activeSection === report.sections.length + 1}
              onClick={() => setActiveSection(report.sections.length + 1)}
            />
          </div>
        </div>

        {/* mobile view sections */}
        <div className="md:hidden px-6 pt-4">
          <Select
            value={activeSection.toString()}
            onValueChange={(value) => setActiveSection(Number(value))}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select section" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Sections</SelectLabel>
                <SelectItem value="0">Summary</SelectItem>
                {report.sections.map((section, index) => (
                  <SelectItem key={index} value={`${index + 1}`}>
                    {section.title}
                  </SelectItem>
                ))}
                <SelectItem value={`${report.sections.length + 1}`}>
                  Sources
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* content */}
        <div className="md:col-span-2">
          {activeSection === 0 && (
            <SectionContent title="Summary" content={report.summary} />
          )}
          {activeSection === report.sections.length + 1 && (
            <SourcesContent sources={report.sources} />
          )}
          {activeSection > 0 &&
            activeSection < report.sections.length + 1 &&
            report.sections[activeSection - 1].content && (
              <SectionContent
                title={report.sections[activeSection - 1].title}
                content={report.sections[activeSection - 1].content}
              />
            )}

          <div className="py-3 px-6 self-end flex justify-end gap-8">
            <Button
              onClick={() => setActiveSection((prev) => Math.max(prev - 1, 0))}
              disabled={activeSection === 0}
              variant="ghost"
              size="icon"
            >
              <ArrowLeftIcon className="size-5" />
            </Button>
            <Button
              onClick={() =>
                setActiveSection((prev) =>
                  Math.min(prev + 1, report.sections.length + 1)
                )
              }
              disabled={activeSection === report.sections.length + 1}
              variant="ghost"
              size="icon"
            >
              <ArrowRightIcon className="size-5" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
