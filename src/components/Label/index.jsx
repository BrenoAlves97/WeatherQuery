import "./label.scss";

export const Label = ({ title, children }) => {
  return (
    <label>
      <span>{title}</span>
      {children}
    </label>
  );
};
