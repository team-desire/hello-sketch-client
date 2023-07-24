const Button = ({ onClick, children, style, disabled, id }) => {
  return (
    <button className={style} onClick={onClick} disabled={disabled} id={id}>
      {children}
    </button>
  );
};

export default Button;
