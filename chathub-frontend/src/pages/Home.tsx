import { getMe } from "@/api/auth.api"
import { useQuery } from "@tanstack/react-query"

const HomePage = () => {
    const { isPending, error, data } = useQuery({
    queryKey: ['user'],
    queryFn: () =>getMe(),
  })
  console.log('data',data);
  
  return (
    <div className=''>HomePage</div>
  )
}

export default HomePage