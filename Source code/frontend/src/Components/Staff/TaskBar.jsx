import React, { useState } from 'react';
import AssignVet from './AssignVet';
import ManageUser from './ManageUser';
import AddSchedule from './AddSchedule';

const TaskBar = () => {
  const STEPS = {
    ASSIGN_VET: 'assignVet',
    ADD_SCHEDULE: 'addSchedule',
    MANAGE_USER: 'manageUser'
  };

  const [currentStep, setCurrentStep] = useState(STEPS.ASSIGN_VET);

  const StepButton = ({ step, label }) => {
    const isActive = currentStep === step;

    return (
      <button
        className={`step-button ${isActive ? 'active' : ''}`}
        onClick={() => setCurrentStep(step)}
      >
        {label}
      </button>
    );
  };

  const renderComponent = () => {
    switch (currentStep) {
      case STEPS.ASSIGN_VET:
        return <AssignVet />;
      case STEPS.ADD_SCHEDULE:
        return <AddSchedule />;
      case STEPS.MANAGE_USER:
        return <ManageUser />;
      default:
        return null;
    }
  };

  return (
    <div className="taskbar-container">
      <div className="taskbar">
        <StepButton step={STEPS.ASSIGN_VET} label="Assign Vet" />
        <StepButton step={STEPS.ADD_SCHEDULE} label="Add Schedule" />
        <StepButton step={STEPS.MANAGE_USER} label="Manage User" />
      </div>
      <div className="content">
        {renderComponent()}
      </div>

      <style>
        {`
          .taskbar-container {
            display: flex;
          }

          .taskbar {
            display: flex;
            flex-direction: column;
            padding: 10px;
            margin: 5px;
            cursor: pointer;
          }

          .step-button {
            padding: 10px 20px;
            background-color: #f0f0f0;
            border: none;
            cursor: pointer;
            margin-bottom: 5px;
          }

          .step-button.active {
            background-color: #e0e0e0;
          }

          .content {
            flex-grow: 1;
            padding: 10px;
          }
        `}
      </style>
    </div>
  );
};

export default TaskBar;