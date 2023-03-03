import { HandPalm, Play } from 'phosphor-react'
import {
  FormProvider,
  useForm,
} from 'react-hook-form' /* npm i @hookform/resolvers tem que baixar esse pacote para  a hook form possa integrar com o zod */
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { useContext } from 'react'

import { NewCycleForm } from './components/NewCycleForm'
import { Countdowm } from './components/Countdowm'

import {
  HomeContainer,
  StarTCountdowmButton,
  StopCountdowmButton,
} from './styled'
import { CyclesContext } from '../../context/CyclesContext'

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(5, 'o ciclo é de no minimo 5 minutos ')
    .max(60, 'o ciclo é de no maximo 60 minutos'),
})

export function Home() {
  const { CreateNewCycle, InterruptCurrentCycle, activeCycle } =
    useContext(CyclesContext)

  type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(
      newCycleFormValidationSchema,
    ) /* aqui estamos faazendo a validação, usando os parametros criado no newCycleformValidationtSchima */,
    defaultValues: {
      minutesAmount: 0,
      task: '',
    },
  })

  const { handleSubmit, watch, reset } = newCycleForm

  function handleCreateNewCycle(data: NewCycleFormData) {
    CreateNewCycle(data)
    reset()
  }

  const task = watch('task')
  const isSubmiteDisable = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <Countdowm />
        {activeCycle ? (
          <StopCountdowmButton onClick={InterruptCurrentCycle} type="button">
            <HandPalm size={24} />
            Interromper
          </StopCountdowmButton>
        ) : (
          <StarTCountdowmButton type="submit" disabled={isSubmiteDisable}>
            <Play size={24} />
            Começar
          </StarTCountdowmButton>
        )}
      </form>
    </HomeContainer>
  )
}
