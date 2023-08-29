'use client';

import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react';
import { SearchResult, getCommitHistory, searchRepos } from './github-api';
import ActivityGraph from './components/graph';
import pageStyles from './styles/page.module.css';
import Search from './components/sidebar/autocomplete/input';
import Sidebar from './components/sidebar/sidebar';

export default function Home() {

  //const [results, setResults] = useState<SearchResult | undefined>(undefined)
  //const [commits, setCommits] = useState<any>(undefined)
  //useEffect(() => {
  //  searchRepos().then((results) => {
  //    setResults(results)
  //    if(results.items.length) {
  //      getCommitHistory(results.items[0]).then((commits) =>
  //        setCommits(commits)
  //      )
  //    }
  //  }
  //)},[])

  return (
    <div className='flex flex-row'>
      <div className='
        graph-section
        w-3/5
        h-screen
        pt-[71px]
        pb-[43px]
        pl-8
        pr-4
      '>
        <ActivityGraph />
      </div>
      <Sidebar />
      {/*{<pre className='m-4 border-red-600 border-1'>
        {JSON.stringify(commits, undefined, 2)}
      </pre>}*/}
      {/*{results?.items.map(item => (
        <pre key={item.id} className='m-4 border-black border-2'>{JSON.stringify(item, undefined, 2)}</pre>
      ))}*/}
    </div>
  )
}
