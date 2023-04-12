const Avatar = ({ src }) => {
  return (
    <div
      className="avatar rounded-circle"
      style={{ backgroundImage: `url(${src})` }}
    ></div>
  );
};
export default Avatar;
