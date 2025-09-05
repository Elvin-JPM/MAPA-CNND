import styled from "styled-components";
import { useId } from "react";

const CheckboxWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const NativeCheckbox = styled.input.attrs({ type: "checkbox" })`
  position: relative;
  width: 18px;
  height: 18px;
  margin: 0;
  cursor: pointer;

  /* Remove default styling */
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  /* Custom border */
  border: 2px solid #222831;
  border-radius: 3px;
  background: white;

  /* Custom checkmark */
  &:checked {
    background: #222831;
    position: relative;
  }

  &:checked::after {
    content: "";
    position: absolute;
    left: 4px;
    top: 1px;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }

  /* &:focus {
    outline: 2px solid #0066ff;
    outline-offset: 1px;
  } */
`;

const CheckboxLabel = styled.span`
  color: black;
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  font-size: 14px;
  user-select: none;
  position: relative;
  top: 0rem;
  right: 0rem;
  z-index: 1000;
`;

export default function Checkbox({ label, checked, onChange }) {
  const id = useId();

  const handleChange = (e) => {
    console.log("Checkbox clicked:", e.target.checked);
    onChange?.(e);
  };

  return (
    <CheckboxWrapper>
      <NativeCheckbox id={id} checked={checked} onChange={handleChange} />
      <CheckboxLabel htmlFor={id}>{label}</CheckboxLabel>
    </CheckboxWrapper>
  );
}
