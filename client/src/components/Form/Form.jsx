import './Form.css';

function Form({ children, className, action }) {
  return (
    <form action={action} className={`${className} form`}>
      {children}
    </form>
  );
}

export default Form;
