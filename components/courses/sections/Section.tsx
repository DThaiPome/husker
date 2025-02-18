import { Empty } from "@/components/Empty";
import { useSection } from "@/hooks/sections";
import { stringTimeToTime } from "@/lib/courses";
import { SectionInfo } from "@/types/courses";
import clsx from "clsx";
import { DayTable } from "./DayTable";

interface SectionProps {
  sectionInfo: SectionInfo;
}

export const Section = ({ sectionInfo }: SectionProps) => {
  const { section, isLoading } = useSection(sectionInfo);

  const showTime = section?.startTime && section.endTime;
  const showCampus = section?.campus.description !== "Boston";
  const showWaitlist =
    section?.seats.waitlist.available !== 0 && section?.seats.waitlist.capacity !== 0;

  return (
    <>
      {section && !isLoading ? (
        <>
          <div className="p-base rounded-lg bg-gray-100 dark:bg-gray-900 space-y-xs">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">
                {section?.faculty.map((professor) => professor.name).join("; ")}
              </h4>
              <p className="font-mono text-sm">{section.crn}</p>
            </div>

            <div className="flex flex-col space-y-xs items-start md:items-center md:space-y-0 md:flex-row md:justify-between">
              <div className="flex items-center space-x-base">
                <DayTable days={section.days} />

                {showTime && (
                  <div className="font-mono text-sm">
                    {stringTimeToTime(section.startTime)}-{stringTimeToTime(section.endTime)}
                  </div>
                )}
              </div>
              <div className="text-sm">
                {section.online ? (
                  "Online"
                ) : (
                  <>
                    {section.building.description} {section.building.room}
                    {showCampus && <>, {section.campus.description}</>}
                  </>
                )}
              </div>
            </div>

            <div className="pt-xs flex space-x-base">
              <div className="flex items-center space-x-1 text-lg font-mono font-bold">
                <span
                  className={clsx({
                    "text-yellow-600":
                      section.seats.available >= 5 && section.seats.available < 10,
                    "text-red-600": section.seats.available < 5,
                  })}
                >
                  {section.seats.available}
                </span>
                <span>/</span>
                <span>{section.seats.total}</span>
              </div>

              {showWaitlist && (
                <div className="flex items-center space-x-1 text-sm">
                  <span>{section.seats.waitlist.available}</span>
                  <span>/</span>
                  <span>{section.seats.waitlist.capacity}</span>
                  <span>waitlist</span>
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        <>
          <Empty className="p-base rounded-lg flex items-center justify-center font-medium text-gray h-32">
            <div className="flex items-center space-x-xs">
              <span>Loading section</span>
              <span className="text-sm font-mono">{sectionInfo.crn}</span>
            </div>
          </Empty>
        </>
      )}
    </>
  );
};
