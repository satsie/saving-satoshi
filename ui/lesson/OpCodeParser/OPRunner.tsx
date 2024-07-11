import React, { useEffect, useState } from 'react'
import clsx from 'clsx'
import LanguageExecutor, { MainState } from './index'
import { OpCodeTypes } from './OPFunctions'

const OpRunner = () => {
  const [script, setScript] = useState('')
  const [initialStack, setInitialStack] = useState('')
  const [height, setHeight] = useState<number>(0)
  const [stackHistory, setStackHistory] = useState<MainState | []>([])

  useEffect(() => {}, [stackHistory, script, initialStack, height])

  const handleScriptChange = (event) => {
    if (stackHistory[0] !== undefined) {
      setStackHistory([])
    }
    setScript(event.target.value)
  }

  const handleInitialStackChange = (event) => {
    setInitialStack(event.target.value)
  }

  const handleHeightChange = (event) => {
    setHeight(parseInt(event.target.value))
  }

  const handleRun = () => {
    setStackHistory(
      LanguageExecutor.RunCode(script, initialStack, height).state
    )
  }

  const handleReset = () => {
    setStackHistory([])
  }

  console.log(stackHistory)

  return (
    <div className="flex flex-col px-8 text-white">
      <div className="mt-4 flex flex-col gap-1 border-b border-b-white">
        <p className="font-space-mono text-lg font-bold capitalize ">
          Your Script
        </p>
        <textarea
          className="overflow-wrap-normal w-full resize-none break-all border-none bg-transparent font-space-mono text-lg text-white focus:outline-none"
          onChange={handleScriptChange}
          autoComplete="off"
          placeholder="..."
          autoCapitalize="none"
          spellCheck="false"
          rows={5} // Increase rows based on text length
        />
      </div>

      <div className="mt-4 flex flex-col gap-1 border-b border-b-white py-5">
        <p className="font-space-mono text-lg font-bold capitalize">
          Initial stack
        </p>
        <input
          onChange={handleInitialStackChange}
          className="border-none bg-transparent font-space-mono text-lg focus:outline-none"
          type="text"
          placeholder="..."
        />
      </div>

      <div className="mt-4 flex flex-col gap-2 border-b border-b-white py-5">
        <p className="font-space-mono text-lg font-bold capitalize">
          Next Block Height
        </p>
        <input
          onChange={handleHeightChange}
          className="border-none bg-transparent text-lg focus:outline-none"
          placeholder="630001"
          type="number"
          min="1"
        />
      </div>

      <div className="flex gap-3">
        <button type="button" className="cursor-pointer" onClick={handleRun}>
          Run
        </button>
        <button onClick={handleReset}>Reset</button>
        <button>Step</button>
      </div>

      <div className="mt-4 flex flex-row gap-2.5 overflow-scroll">
        {stackHistory.length === 0 && (
          <div className="flex flex-col">
            <div className="flex min-h-[204px] min-w-[164px] flex-col rounded-b-[10px] bg-black bg-opacity-20 p-2.5">
              <div
                className="my-auto resize-none break-all border-none bg-transparent font-space-mono text-white focus:outline-none"
                style={{ whiteSpace: 'pre-wrap' }}
              >
                <div className="break-word text-center">
                  {'Your script \n code will be \n visualized \n here...'}
                </div>
              </div>
            </div>
          </div>
        )}
        {stackHistory.map(
          (stack, index) =>
            stack.negate === 0 && (
              <div key={`Overall-container${index}`} className="flex flex-col">
                <div
                  className={clsx(
                    'mx-auto my-[5px] w-[140px] rounded-[3px] border bg-transparent px-3 py-1 font-space-mono',
                    {
                      'border-[#EF960B] text-[#EF960B]':
                        stack.operation.tokenType === 'conditional',
                      'border-[#3DCFEF] text-[#3DCFEF]':
                        stack.operation.tokenType !== 'conditional',
                    }
                  )}
                >
                  {stack.operation.value}
                </div>
                <hr className="my-2 -ml-2.5 border-dashed" />
                <div
                  key={`Container${index}`}
                  className="flex h-[204px] min-w-[164px] flex-col overflow-y-auto rounded-b-[10px] bg-black bg-opacity-20 p-2.5"
                >
                  <div
                    key={index}
                    className="mt-auto resize-none break-all border-none bg-transparent font-space-mono text-white focus:outline-none"
                    style={{ whiteSpace: 'pre-wrap' }}
                  >
                    {stack?.stack
                      ?.slice()
                      .reverse()
                      .map((item, i) => (
                        <div
                          key={`item${i}`}
                          className="my-[5px] w-[140px] rounded-[3px] bg-white/15 px-3 py-1"
                        >
                          {JSON.stringify(
                            !isNaN(parseFloat(item)) && isFinite(item)
                              ? parseInt(item)
                              : item
                          )}
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            )
        )}
      </div>
    </div>
  )
}

export default OpRunner