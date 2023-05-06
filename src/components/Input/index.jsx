import "./input.scss";

export const Input = ({ type, placeholder, value, onchange }) => {
  const handleChange = (e) => {
    onchange(e.target.value);
  };

  return (
    <input type={type} placeholder={placeholder} value={value} onChange={(e) => handleChange(e)} />
  );
};
