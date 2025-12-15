'use client'

import { useEffect } from 'react'

export default function ChatbotWidget() {
  useEffect(() => {
    // Kode embed Anda - PASTIKAN INI PERSIS
    const embedCode = `
      (function(){
        if(!window.chatbase||window.chatbase("getState")!=="initialized"){
          window.chatbase=(...arguments)=>{
            if(!window.chatbase.q){
              window.chatbase.q=[]
            }
            window.chatbase.q.push(arguments)
          };
          window.chatbase=new Proxy(window.chatbase,{
            get(target,prop){
              if(prop==="q"){
                return target.q
              }
              return(...args)=>target(prop,...args)
            }
          })
        }
        const onLoad=function(){
          const script=document.createElement("script");
          script.src="https://www.chatbase.co/embed.min.js";
          script.id="w8e1nwYvqdahvslijf8h8";
          script.domain="www.chatbase.co";
          document.body.appendChild(script)
        };
        if(document.readyState==="complete"){
          onLoad()
        }else{
          window.addEventListener("load",onLoad)
        }
      })()
    `
    
    // Execute script
    const scriptElement = document.createElement('script')
    scriptElement.textContent = embedCode
    document.head.appendChild(scriptElement)
    
    return () => {
      if (scriptElement.parentNode) {
        document.head.removeChild(scriptElement)
      }
      
      // Remove chatbase script if exists
      const chatbaseScript = document.getElementById('w8e1nwYvqdahvslijf8h8')
      if (chatbaseScript) {
        document.body.removeChild(chatbaseScript)
      }
      
      // Remove widget if exists
      const widget = document.querySelector('.chatbase-container')
      if (widget) {
        widget.remove()
      }
    }
  }, [])
  
  return null
}
