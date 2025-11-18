'use client'

import { useState } from 'react'
import { useTranslations } from 'hooks'
import { ChapterIntro } from 'ui'
import { Button } from 'shared'
import { useSaveAndReturn } from 'hooks'
import { useAtom } from 'jotai'
import { accountAtom } from 'state/state'

export const metadata = {
  title: 'chapter_ten.outro_six.title',
  navigation_title: 'chapter_ten.outro_six.nav_title',
  key: 'CH10OUT6',
}

export default function Outro6({ lang }) {
  const saveAndReturn = useSaveAndReturn()
  const t = useTranslations(lang)
  const [account] = useAtom(accountAtom)
  const [copied, setCopied] = useState(false)

  const copy = (text) => {
    navigator.clipboard.writeText(text)

    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const msgToEncrypt =
    process.env.NEXT_PUBLIC_BOSS2026_LINK ||
    'Uh oh! Holocat forgot to set the link. Please contact your BOSS Challenge administrator.'

  function asciiToHex(str) {
    return str
      .split('')
      .map((c) => c.charCodeAt(0).toString(16).padStart(2, '0'))
      .join('')
  }

  let xorHex

  if (account) {
    const privateKeyBigInt = BigInt('0x' + account.private_key)
    // console.log(`about to split msgToEncrypt ${msgToEncrypt}`)
    const msgToEncryptBigInt = BigInt('0x' + asciiToHex(msgToEncrypt))
    const xor = privateKeyBigInt ^ msgToEncryptBigInt
    xorHex = xor.toString(16)

    // Verification/debugging code
    // console.log(`private key as integer: ${privateKeyBigInt}`)
    // console.log(`message as integer: ${msgToEncryptBigInt}`)
    // console.log(`ciphertext as hex: ${xorHex}`)
    // const xorBigInt = BigInt("0x" + xorHex)
    // const decodedBigInt = privateKeyBigInt ^ xorBigInt
    // const decodedHex = decodedBigInt.toString(16)
    // const decodedAscii = Buffer.from(decodedHex, 'hex');
    // console.log(`decoded hex: ${decodedAscii}`)
  }

  return (
    <ChapterIntro className="my-8" heading={t('chapter_ten.outro_six.heading')}>
      <p className="mt-2 text-lg md:text-xl">
        {t('chapter_ten.outro_six.paragraph_one')}
      </p>

      <p className="mt-8 text-lg md:text-xl">
        {t('chapter_ten.outro_six.paragraph_two')}
      </p>

      <div className="mt-8 bg-[#00000033] px-5 py-1">
        <p className="mt-3 text-lg md:text-xl">
          {t('chapter_ten.outro_six.boss_instructions')}
        </p>

        <p className="mt-8 text-lg md:text-xl">
          {t('chapter_ten.outro_six.boss_instructions_two')}
        </p>

        <pre className="mb-5 mt-8 flex flex-col rounded-md border-2 border-dotted border-white/25 p-4">
          <code className="mb-2 whitespace-pre-wrap break-all text-base">
            {xorHex}
          </code>
          <Button round size="tiny" style="w-full" onClick={() => copy(xorHex)}>
            {copied ? t('shared.copy_acknowledged') : t('shared.copy')}
          </Button>
        </pre>
      </div>

      <p className="mt-8 text-lg md:text-xl">
        {t('chapter_ten.outro_six.paragraph_three')}
      </p>

      <p className="mt-8 text-lg md:text-xl">
        {t('chapter_ten.outro_six.paragraph_four')}
      </p>
      <Button href="https://bitcoindevs.xyz/" classes="mt-10 max-md:w-full">
        {t('shared.bitcoin_dev_project')}
      </Button>
    </ChapterIntro>
  )
}
