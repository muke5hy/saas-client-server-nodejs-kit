import { parseISO, format } from "date-fns";

// export default function Date({ dateString: string }) {

export type DateProp = {
  dateString: string;
};

const Date = (props: DateProp) => {
  console.log(props.dateString);
  const date = parseISO(props.dateString);
  return (
    <time dateTime={props.dateString}>{format(date, "LLLL d, yyyy")}</time>
  );
};

export { Date };
