import { useSuspenseQuery } from '@tanstack/react-query'
import { fetchDataBase } from '@setting/superbase'
import { useContextState } from '../../hooks/Context'
import CardProfile from './CardProfile'

export default function PanelProfile() {
  const { state, setState } = useContextState()
  state.profiles.length == 0 && useSuspenseQuery({
    queryKey: ['view-profile'],
    queryFn: async () => {
      const result = (await fetchDataBase.from('profiles').select()).data
      result && setState({ type: 'set-profile', payload: result })
      return result
    }
  })

  return (
    <>
      <div className='scrollbar flex-1 pl-2 overflow-auto'>
        <span className='block my-2'>Registered instances</span>
        {state.profiles.map((props) => <CardProfile key={props.id} setState={setState} {...props} />)}
      </div>
    </>
  )
}

