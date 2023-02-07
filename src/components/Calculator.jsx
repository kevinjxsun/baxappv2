import React from 'react'
import { useState } from 'react'
import '../styles/Calculator.css'

let formData = {
    liters: '',
    output: '',
    scrap: '',
    bpm: 28,
    bagSize: 50
  }
  
  const convertTime = (num) => {
    if(num >= 1) {
      let hour = Math.floor(num)
      let min = (num - hour) * 60
      return `${hour} hours and ${Math.floor(min)} minutes`
    }
    if(num < 1) {
      let min = num * 60;
      return `${Math.floor(min)}min`
    }
  }
  
  
  const calculate = (totalLiters,output,scrap,bpm,bagSize) => {
    const currentBags = output - scrap;
    const currentLiters = (currentBags * bagSize) / 1000;
    const litersRemaining = totalLiters - currentLiters;
    const bagsRemaining = litersRemaining * 1000 / bagSize;
    const hoursRemaining = bagsRemaining / bpm / 60; // total in minutes
    const totalBags = totalLiters * 1000 / bagSize;
    const totalLit = totalLiters
    console.log(hoursRemaining)
    return {
      liters: Math.floor(litersRemaining),
      bags: Math.floor(bagsRemaining),
      hours: convertTime(hoursRemaining),
      total: Math.floor(totalBags),
      tLiters: totalLit,
      current: currentBags,
      currLiters: currentLiters 
    }
  }
  
  

//========================================================================


const Calculator = () => {

  const [form, setForm] = useState(formData)
  const [info, setInfo] = useState()
  const [error, setError] = useState(false)


  const handleSubmit = (e) => {
    e.preventDefault();
    const answer = calculate(form.liters,form.output,form.scrap,form.bpm,form.bagSize)

    if(((form.output - form.scrap) * form.bagSize / 1000) > (form.liters)) {
        setError(true)
    } else setError(false)

    setInfo(answer)
    console.log('info',info)
  }

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:e.target.value
    })
  }

  return (
    <div className='frame'>
        <form>
            <div className='inputs'>
                <label htmlFor='liters'>Liters</label>
                <input 
                    id='liters' 
                    name='liters' 
                    type='number'
                    value={form.liters}
                    onChange={handleChange}>    
                    </input>
            </div>
            <div className='inputs'>
                <label htmlFor='output'>Output</label>
                <input 
                    id='output' 
                    name='output' 
                    type='number'
                    value={form.output}
                    onChange={handleChange}>   
                    </input>
            </div>
            <div className='inputs'>
                <label htmlFor='scrap'>Scrap</label>
                <input 
                    id='scrap' 
                    name='scrap' 
                    type='number'
                    value={form.scrap}
                    onChange={handleChange}>    
                    </input>
            </div>
            <div className='inputs'>
                <label htmlFor='bagSize'>Bag Size</label>
                <select id='bagSize' name='bagSize' onChange={handleChange}>
                    <option value='50'>50ml</option>
                    <option value='100'>100ml</option>
                    <option value='200'>200ml</option>
                </select>
            </div>
            <div className='inputs'>
                <label htmlFor='bpm'>Bags Per Minute</label>
                <select id='bpm' name='bpm' onChange={handleChange}>
                    <option value='28'>28</option>
                    <option value='24'>24</option>
                </select>
            </div>
            <div className='button'>
                <button onClick={handleSubmit}>Calculate</button>
            </div>
        </form>
        <div className='results'>
            { !error && <div className='info'>
                <h3>{info && `${info.current} / ${info.total} Bags`}</h3>
                <h3>{info && `${info.currLiters} / ${info.tLiters} Liters`}</h3>
                <h3>{info && `${info.bags} Bags remaining`}</h3>
                <h3>{info && `${info.liters} Liters remaining`}</h3>
                <h3>{info && `est. ~ ${info.hours} `}</h3>
                
            </div>}
            <div>
                {error && <p className='error'>*You entered an output that would be greater than the total liters, please enter the correct info</p>}
            </div>
        </div>
    </div>
  )
}

export default Calculator