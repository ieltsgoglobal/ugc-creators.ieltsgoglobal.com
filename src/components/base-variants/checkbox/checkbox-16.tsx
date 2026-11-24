'use client'

import { useId, useState } from 'react'


type CheckboxCopy = {
  description: string
  label: string
}

const checkboxCopy: CheckboxCopy = {
  label: 'Receive email notifications',
  description: 'You confirm that you have read and accepted the current usage guidelines.'
}

const Checkbox16 = () => {
  const id = useId()
  const [isChecked, setIsChecked] = useState<boolean>(true)

  const handleReset = () => {
    setIsChecked(false)
  }

  return (
    <div className='flex max-w-sm items-start gap-3.5'>
      <input
        type="checkbox"
        id={id}
        checked={isChecked}
        onChange={(event) => setIsChecked(event.currentTarget.checked)}
        className='mt-0.5 size-4 shrink-0 accent-sky-600'
      />
      <div className='grid gap-2.5'>
        <label htmlFor={id} className='text-sm leading-4 font-medium'>
          {checkboxCopy.label}
        </label>
        <p className='text-muted-foreground text-[13px] leading-5'>
          {checkboxCopy.description}
        </p>
        <div className='flex flex-wrap gap-2'>
          <button type='button' className='rounded-lg border border-input px-3 py-1 text-sm' onClick={handleReset}>
            Reset
          </button>
          <button
            type='button'
            disabled={!isChecked}
            className='rounded-lg bg-sky-600 px-3 py-1 text-sm text-white hover:bg-sky-700 disabled:opacity-50 dark:bg-sky-500 dark:text-slate-950 dark:hover:bg-sky-400'
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  )
}

export default Checkbox16
