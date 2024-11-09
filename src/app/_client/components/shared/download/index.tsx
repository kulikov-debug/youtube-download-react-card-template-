"use client"
import { useRef, useState } from "react"
import Script from "next/script"
import { useTranslations } from "next-intl"
import { DownloadIcon } from "../../svgs/icons/download"


export const Download = () =>{
  const translate = useTranslations("general")
  const [ youtubeUrl, setYoutubeUrl ] = useState("")
  const [ downloadables, setDownloadables ] = useState<string[]>([])
  const scrollRef = useRef<HTMLDivElement>(null)

  const renderDownloadables = () =>{
    const mappedDownloadables = downloadables.map((downloadable, index) => (
      <div 
        key={`downloadable-${ index }-${downloadable}`}
        className="mb-10 flex justify-center w-full">
        <iframe className="lg:w-[650px]" id="cardApiIframe" width="100%" height="100%" style={{border: "none"}} src={`https://loader.to/api/card2/?url=${ downloadable }`}></iframe>
        <Script> {`iFrameResize({ log: false }, '#cardApiIframe')`} </Script>
      </div>
    ))

    return mappedDownloadables
  }

  const handleSubmit = async(event: React.FormEvent) =>{
    event.preventDefault()

    if ( !youtubeUrl ) return

    const baseUrl = "https://www.youtube.com/oembed";
    const encodedUrl = encodeURIComponent(youtubeUrl);
    const url = `${baseUrl}?url=${encodedUrl}&format=json`;

    const result = await fetch(url)

    setDownloadables(prev => prev.concat(youtubeUrl))
    setYoutubeUrl("")

    setTimeout(() =>{
      scrollRef.current?.scrollIntoView()
    }, 100)
  }

  return (
    <>
      <form 
        className="lg:flex lg:bg-white lg:dark:bg-dark_heading lg:items-center lg:shadow-md lg:rounded-3xl lg:py-4 lg:pr-4 mb-20"
        onSubmit={ handleSubmit }>
        <div className="mb-4 lg:mb-0 lg:w-full">
          <input
            className="font-light px-6 h-16 rounded-3xl bg-white dark:bg-dark_heading shadow-md lg:shadow-none w-full block outline-none"
            placeholder="Paste your url"
            value={youtubeUrl}
            onChange={(event) => setYoutubeUrl(event.target.value)} />
        </div>
        <button 
          className="text-white font-bold bg-purple_main w-full lg:w-auto lg:px-20 flex justify-center items-center h-16 rounded-2xl gap-x-2 hover:bg-opacity-80"
          type="submit"
          disabled={!youtubeUrl}>
          <div className="w-6 h-7">
            <DownloadIcon />
          </div>
          { translate("download") }
        </button>
      </form>
      { downloadables.length>0 && (
        <div 
          ref={scrollRef} 
          className="lg:px-20 mb-8">
          <div className="bg-white dark:bg-dark_heading rounded-2xl p-8 max-w-max mx-auto">
            { renderDownloadables() }
          </div>
        </div>
      ) }
    </>
  )
}