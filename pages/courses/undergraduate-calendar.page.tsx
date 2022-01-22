import { BackButton } from "@/components/BackButton";
import { Button } from "@/components/Button";
import { Spacer } from "@/components/Spacer";
import { Title } from "@/components/title";

const UndergraduateCalendar = () => {
  const calendarLink = "/files/calendar-2021-2022.pdf";

  return (
    <>
      <div className="wrapper">
        <Spacer></Spacer>
        <BackButton href="/courses">Courses</BackButton>
        <Spacer size="sm"></Spacer>
        <Title>Undergraduate Calendar 2021-2022</Title>

        <Spacer></Spacer>
      </div>

      <object
        className="w-full"
        style={{
          height: "calc(100vh - 10rem)",
        }}
        data={calendarLink}
        type="application/pdf"
      >
        <embed src={calendarLink} type="application/pdf" />
      </object>

      <div className="wrapper">
        <Button href={calendarLink} icon="download">
          Download
        </Button>
      </div>
    </>
  );
};

export default UndergraduateCalendar;