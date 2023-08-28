'use client';

import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react';
import { SearchResult, getCommitHistory, searchRepos } from './github-api';
import ActivityGraph from './components/graph';

export default function Home() {

  const [results, setResults] = useState<SearchResult | undefined>(undefined)
  const [commits, setCommits] = useState<any>(undefined)
  useEffect(() => {
    searchRepos().then((results) => {
      setResults(results)
      if(results.items.length) {
        getCommitHistory(results.items[0]).then((commits) =>
          setCommits(commits)
        )
      }
    }
  )},[])

  return (
    <>
      <ActivityGraph />
      {/*{<pre className='m-4 border-red-600 border-1'>
        {JSON.stringify(commits, undefined, 2)}
      </pre>}*/}
      {/*{results?.items.map(item => (
        <pre key={item.id} className='m-4 border-black border-2'>{JSON.stringify(item, undefined, 2)}</pre>
      ))}*/}
    </>
  )
}
