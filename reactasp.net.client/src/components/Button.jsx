const Button = ({ label, onClick, style }) => {
  return (
    <button style={style} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
