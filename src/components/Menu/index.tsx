import React, { useContext,useEffect } from 'react'
import { Menu as UikitMenu } from '@pancakeswap-libs/uikit'
import { useWeb3React } from '@web3-react/core'
import { allLanguages } from 'config/localisation/languageCodes'
import { LanguageContext } from 'contexts/Localisation/languageContext'
import useTheme from 'hooks/useTheme'
import useAuth from 'hooks/useAuth'
import { usePriceCakeBusd, useProfile } from 'state/hooks'
import img from "assets/newLogo.png"

import config from './config'

const Menu = (props) => {



  const { account } = useWeb3React()
  const { login, logout } = useAuth()
  const { selectedLanguage, setSelectedLanguage } = useContext(LanguageContext)
  const { isDark, toggleTheme } = useTheme()
  const cakePriceUsd = usePriceCakeBusd()
  const { profile } = useProfile()

  useEffect(() => {
   const ref = document.querySelectorAll('[aria-label="Pancake home page"]');
   if(ref[0].childElementCount>0){
     const imgNode = document.createElement("IMG");
     const textNode = document.createElement("h1");

     imgNode.setAttribute("src", img);
     imgNode.setAttribute("width", "35");
     imgNode.setAttribute("height", "35");
     textNode.innerText="PancakeSwap";
     textNode.style.fontSize="24px";
     textNode.style.paddingLeft="5px";
     if(isDark){
       textNode.style.color = "#fff";
     }else{
       textNode.style.color = "#000";
     }
     ref[0].replaceChild(imgNode,ref[0].childNodes[0])
     ref[0].replaceChild(textNode,ref[0].childNodes[1])

   }
   
  }, [isDark])

  return (
    <UikitMenu
      account={account}
      login={login}
      logout={logout}
      isDark={isDark}
      toggleTheme={toggleTheme}
      currentLang={selectedLanguage && selectedLanguage.code}
      langs={allLanguages}
      setLang={setSelectedLanguage}
      cakePriceUsd={cakePriceUsd.toNumber()}
      links={config}
      profile={{
        username: profile?.username,
        image: profile?.nft ? `/images/nftskc/${profile.nft?.images.sm}` : undefined,
        profileLink: '/profile',
        noProfileLink: '/profile',
        showPip: !profile?.username,
      }}
     
      
      {...props}
    />
  )
}

export default Menu
