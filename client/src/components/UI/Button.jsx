import './Button.css';

function Button({ children, className, type, onClick, isDisabled }) {
  return (
    <button disabled={isDisabled} onClick={onClick} type={type} className={`${className} button`}>
      {children}
    </button>
  );
}

export default Button;
