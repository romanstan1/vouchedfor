import React from 'react';

export const CurrencyInput = ({updateValue, value, label}) =>
<div className='input-box currency'>
  <h4>{label}:</h4>
  <input
    value={value}
    onChange={updateValue}
    data-label='amount'
    type="number" min="1" step="1" max="100000000"
  />
</div>

export const AgeInput = ({updateValue, value, label}) =>
  <div className='input-box age'>
    <h4>{label.replace(/_/g, " ")}:</h4>
    <input
      type="number"
      value={value}
      onChange={updateValue}
      data-label={label}
      min="1" step="1" max="140"
    />
  </div>

export const InputSection = ({title, children}) =>
  <div className="Input-section">
    <h3>{title}</h3>
    <div className="content">
      {children}
    </div>
  </div>

export const InputRow = ({item, index, updateValue}) =>
  <div className="input-row">
    <CurrencyInput
      updateValue={updateValue}
      value={item.amount}
      label={item.name}
    />
    <AgeInput
      updateValue={updateValue}
      value={item.from_age}
      label='from_age'
    />
    <AgeInput
      updateValue={updateValue}
      value={item.to_age}
      label='to_age'
    />
  </div>
