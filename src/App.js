import React, { Component, Fragment } from 'react';
import {Panel, InputSection, AgeInput, CurrencyInput, InputRow, SliderWrapper, WasHelpful} from 'components'
import seedData from './seed'

export default class App extends Component {
  state = seedData
  componentDidMount() {
    if(localStorage.vouchedForState) {
      this.setState(JSON.parse(localStorage.vouchedForState))
    }
  }
  updateValue = (index, section) => e => {
    this.setState({[section]:this.state[section].map((item, i) =>
      i === index?
      {...item, [e.target.dataset.label]: e.target.value}
      : item)})
  }
  updateSliderValue = (val, name) => {
    console.log("updateSliderValue: ", val, name)
    // Slider value linking back to monthly savings is unfinished...
  }
  componentDidUpdate(prevProps, prevState) {
    localStorage.vouchedForState = JSON.stringify(this.state)
  }
  static getDerivedStateFromProps(props, state) {
    return {...state, monthlySaving: calculateMonthlySaving(state)}
  }
  render() {
    const {expenditures, incomes, monthlySaving} = this.state
    return (
      <div className="App">
        <Panel title='YOUR INCOME & SPEND'>
          <InputSection title='Annual income'>
            {
              incomes.map((item, i) =>
                <InputRow
                  key={item.name + i}
                  item={item}
                  updateValue={this.updateValue(i, 'incomes')}
                />
              )
            }
          </InputSection>
          <InputSection title='Monthly spending'>
            {
              expenditures.map((item, i) =>
                <InputRow
                  key={item.name + i}
                  item={item}
                  updateValue={this.updateValue(i, 'expenditures')}
                />
              )
            }
          </InputSection>
        </Panel>

        <Panel title='SPEND LESS' className='spend-less'>
          <h4 className='description'>
            Try reducing your monthly spending to see how your forecast could improve!
          </h4>
          {
            expenditures.map(expenditure =>
              <SliderWrapper
                key={expenditure.name}
                data={expenditure}
                updateSliderValue={this.updateSliderValue}
              />
            )
          }

          <h3 className='notice'>
            This means you're saving <span>£{Math.round(monthlySaving)}</span> per month
          </h3>

          <a href="https://www.google.com" className='link' target="_blank">Find ways to save</a>
          <WasHelpful/>
        </Panel>
      </div>
    );
  }
}

function calculateMonthlySaving(state) {
  const monthlySalary = parseInt(state.incomes[0].amount) / 12
  const montlyTotalExpenses = state.expenditures.reduce((acc, val) => acc + parseInt(val.amount),0)
  return monthlySalary - montlyTotalExpenses
}
