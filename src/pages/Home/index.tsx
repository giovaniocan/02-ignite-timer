import { Play } from 'phosphor-react'
import { useForm } from 'react-hook-form' /* npm i @hookform/resolvers tem que baixar esse pacote para  a hook form possa integrar com o zod */
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { useState } from 'react'

import {
  Separator,
  CountdowmContainer,
  FormContainer,
  HomeContainer,
  StarTCountdowmButton,
  TaskInput,
  MinutesamountInput,
} from './styled'

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(5, 'o ciclo é de no minimo 5 minutos ')
    .max(60, 'o ciclo é de no maximo 60 minutos'),
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

interface Cycle {
  id: string
  task: string
  minutesAmount: number
}

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])

  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(
      newCycleFormValidationSchema,
    ) /* aqui estamos faazendo a validação, usando os parametros criado no newCycleformValidationtSchima */,
    defaultValues: {
      minutesAmount: 0,
      task: '',
    },
  })

  function handleCreateNewCycle(data: NewCycleFormData) {
    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmount: data.minutesAmount,
    }
    reset() // vai retornar ao valor original ali no defaultVAualues (onde eu mexi no hookform)
  }

  const task = watch('task')
  const isSubmiteDisable = !task
  return (
    <HomeContainer>
      <form action="" onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormContainer>
          <label htmlFor="task">vou trabalhar em</label>
          <TaskInput
            list="task-suggestion"
            placeholder="Dê um nome para o seu projeto"
            id="task"
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
            {...register('minutesAmount', { valueAsNumber: true })} // esse segundo parametro serve para deixar como numero, pois por natureza ele é uma string
          />

          <span>minutos.</span>
        </FormContainer>

        <CountdowmContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdowmContainer>

        <StarTCountdowmButton type="submit" disabled={isSubmiteDisable}>
          <Play size={24} />
          Começar
        </StarTCountdowmButton>
      </form>
    </HomeContainer>
  )
}
