import { useEffect, useState } from "react"
import { social } from "../data/social"
import DevTreeInput from "../components/DevTreeInput"
import { isValidUrl } from "../utils"
import { toast } from "sonner"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateProfile } from "../api/AuthAPI"
import type { SocialNetwork, User } from "../types"

export default function LinkTreeView() {
  const [devTreeLinks, setDevtreeLinks] = useState(social)

  const queryClient = useQueryClient()
  const user : User = queryClient.getQueryData(['user'])!
  
  const { mutate } = useMutation({
    mutationFn: updateProfile,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: () => {
      console.log(user)
      toast.success('Actualizado correctamente')
    }
  })

  useEffect(() => {
    const updatedData = devTreeLinks.map(item => {
      const userlink = JSON.parse(user.links).find((link: SocialNetwork) => link.name === item.name)
      if (userlink) {
        return { ...item, url: userlink.url, enabled: userlink.enabled}
      }
      return item
    })
    
    setDevtreeLinks(updatedData)
  }, [])

  const handlerUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedLinks = devTreeLinks.map(link => link.name === e.target.name ? {...link, url: e.target.value} : link)
    console.log(updatedLinks)
    setDevtreeLinks(updatedLinks)

    queryClient.setQueryData(['user'], (prevData: User) => {
      return {
        ...prevData,
        links: JSON.stringify(updatedLinks)
      }
    })
  }

  const handlerEnableLink = (socialNetwork: string) => {
    const updatedLinks = devTreeLinks.map(link => {
      if (link.name === socialNetwork) {
        if (isValidUrl(link.url)) {
          return {...link, enabled: !link.enabled}
        } else {
          toast.error('URL no válida')
        }
      }
      return link
    })
    setDevtreeLinks(updatedLinks)

    queryClient.setQueryData(['user'], (prevData: User) => {
      return {
        ...prevData,
        links: JSON.stringify(updatedLinks)
      }
    })
  }

  return (
    <div className="space-y-5">
      {devTreeLinks.map( item => (
        <DevTreeInput
          key={item.name}
          item={item}
          handlerUrlChange={handlerUrlChange}
          handlerEnableLink={handlerEnableLink}
        />
      ))}
      <button
        className="bg-cyan-400 p-2 text-lg w-full uppercase text-slate-600 rounded font-bold"
        onClick={() => mutate(user)}
      >Guardar cambios</button>
    </div>
  )
}
