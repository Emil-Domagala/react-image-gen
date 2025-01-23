import { Component } from 'react';
import './Input.css';

function Input({ label, type, id, isTextarea }) {
  const Component = isTextarea ? 'textarea' : 'input';
  return (
    <p className="input-wrapper">
      <label htmlFor={id}>{label}</label>
      <Component type={type} id={id} name={id} />
    </p>
  );
}

export default Input;
