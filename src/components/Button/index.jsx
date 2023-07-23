const Button = ({ onClick, children, style, disabled }) => {
  return (
    <button className={style} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
