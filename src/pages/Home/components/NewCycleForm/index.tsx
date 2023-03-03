import { FormContainer, MinutesamountInput, TaskInput } from './styled'
import { useFormContext } from 'react-hook-form'
import { useContext } from 'react'
import { CyclesContext } from '../../../../context/CyclesContext'

export function NewCycleForm() {
  const { activeCycle } = useContext(CyclesContext)
  const { register } = useFormContext()

  return (
    <FormContainer>
      <label htmlFor="task">vou trabalhar em</label>
      <TaskInput
        list="task-suggestion"
        placeholder="Dê um nome para o seu projeto"
        id="task"
        disabled={!!activeCycle} // esse exclamação transdorma em boolean
        {...register('task')}
      />

      <datalist id="task-suggestion">
        <option value="Projeto 1" />
      </datalist>

      <label htmlFor="minutesAmount">durante</label>
      <MinutesamountInput
        type="number"
        id="minutesAmount"
        placeholder="00"
        step={5}
        min={5}
        max={60}
        disabled={!!activeCycle}
        {...register('minutesAmount', { valueAsNumber: true })} // esse segundo parametro serve para deixar como numero, pois por natureza ele é uma string
      />

      <span>minutos.</span>
    </FormContainer>
  )
}
