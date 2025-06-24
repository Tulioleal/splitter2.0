import React from 'react'
import { Button } from './button'
import { Separator } from './separator'

interface StepperProps {
  steps: { title: string }[]
  currentStep: number
  onStepChange: (step: number) => void
  canMoveForward: boolean
  onNextSideEffect?: () => void
  children: React.ReactNode
}

const Stepper: React.FC<StepperProps> = ({
  steps,
  currentStep,
  onStepChange,
  onNextSideEffect,
  canMoveForward,
  children
}) => {
  function onNext() {
    if (currentStep != steps.length - 1) onStepChange(currentStep + 1)
    if (onNextSideEffect) onNextSideEffect()
  }
  return (
    <div className="w-full">
      <div className="flex items-center justify-around gap-2 mb-4 sm:gap-4">
        {steps.map((step, idx) => (
          <Button
            key={step.title}
            variant="ghost"
            type="button"
            className={`flex flex-row items-center p-0 focus:outline-none
              ${idx === currentStep ? 'text-black font-bold' : 'text-gray-400'}
            `}
            onClick={() => onStepChange && onStepChange(idx)}
            disabled={!canMoveForward || idx > currentStep + 1}
          >
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center border-2 ${
                idx === currentStep ? 'bg-black text-white border-black' : 'bg-gray-200 text-gray-500 border-gray-300'
              }`}
            >
              {idx + 1}
            </div>
            <span className="text-xs max-w-[70px] whitespace-pre-wrap sm:text-sm sm:max-w-none">{step.title}</span>
          </Button>
        ))}
      </div>
      <Separator className="my-4" />
      <div className="w-full min-h-[150px] flex flex-col justify-center children sm:min-h-[200px">{children}</div>
      <div className="flex justify-between mt-4">
        <Button
          type="button"
          onClick={() => onStepChange && onStepChange(currentStep - 1)}
          className={`${currentStep === 0 ? 'opacity-0 cursor-not-allowed' : ''} transition-opacity duration-400`}
        >
          Previous
        </Button>
        <Button type="button" onClick={() => canMoveForward && onNext()} className={`transition-opacity duration-400`}>
          {currentStep === steps.length - 1 ? 'Finish' : 'Next'}
        </Button>
      </div>
    </div>
  )
}

export default Stepper
