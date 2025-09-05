import styled from "styled-components";
import Checkbox from "./Checkbox"; // Your existing checkbox component

const ControlsPanel = styled.div`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.98);
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12), 0 2px 6px rgba(0, 0, 0, 0.08);
  padding: 1.5rem;
  min-width: 220px;
  border: 1px solid rgba(34, 40, 49, 0.2);
  backdrop-filter: blur(8px);
`;

const PanelHeader = styled.h3`
  margin: 0 0 1.25rem 0;
  padding: 0;
  font-family: "Roboto", sans-serif;
  font-weight: 700;
  font-size: 1.2rem;
  color: #222831;
  text-align: center;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -0.5rem;
    left: 25%;
    width: 50%;
    height: 2px;
    background: linear-gradient(90deg, transparent, #222831, transparent);
  }
`;

const ControlsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ControlGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const GroupLabel = styled.span`
  font-family: "Roboto", sans-serif;
  font-weight: 600;
  font-size: 0.9rem;
  color: #555;
  margin-bottom: 0.25rem;
  padding-left: 0.5rem;
  border-left: 3px solid #222831;
`;

// Main component with your Checkbox
export default function MapControls({ controls, onControlChange }) {
  return (
    <ControlsPanel>
      <PanelHeader>Controles del Mapa</PanelHeader>
      <ControlsList>
        {controls.map((control) => (
          <Checkbox
            key={control.id}
            label={control.label}
            checked={control.checked}
            onChange={(e) => onControlChange(control.id, e.target.checked)}
          />
        ))}
      </ControlsList>
    </ControlsPanel>
  );
}
