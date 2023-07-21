const Button = ({ onClick, children, style }) => {
  return (
    <button className={style} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
