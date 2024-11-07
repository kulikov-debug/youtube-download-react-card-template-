import { useTranslations } from "next-intl"


type HeroProps = {
  vda: string
}

export const Hero = ({ vda }: HeroProps) =>{
  const translate = useTranslations(`homepage.${vda}.hero`)

  return (
    <div className="pt-24 pb-12 text-center">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-[51px] lg:text-[64px] font-black text-heading_main dark:text-white leading-tight mb-4">{ translate("title") }</h1>
        <p className="font-light text-xs text-gray-500 lg:text-base">{ translate("description") }</p>
      </div>
    </div>
  )
}