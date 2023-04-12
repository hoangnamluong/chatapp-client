import format from "date-fns/format";

const DateTime = ({ timestamp, ...args }) => {
  return timestamp ? (
    <p {...args}>{format(Date.parse(timestamp), "dd MMM yyyy")}</p>
  ) : (
    <p {...args}>Unknown Date</p>
  );
};
export default DateTime;
