import { createClient } from '@/utils/supabase/server'
import Table from '@/components/Table/Table'
import Form from '@/components/Form/Form'
import { ToastContainer } from 'react-toastify';
import type { Metadata } from 'next';

import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'

export const metadata: Metadata = {
  title: '10up Performance Ranking Dashboard',
  description: 'Ranking of 10up sites based on performance metrics',
}

export default async function Home() {
  const supabase = createClient()
  const { data: sites } = await supabase.from('sites').select()

  const displayResults = !sites ? (
    <p>No sites found...</p>
  ) : (
    <Table sites={sites} />
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <>
      <Header user={user} />
      <main className="container max-w-4xl mx-auto my-8">
        <div className="mb-6">
          <h1 className="text-7xl font-bold text-balance mb-10">Web Performance Rankings</h1>
          <p className="text-gray-500">
            Welcome, to the 10up Web Performance Ranking Dashboard.
            This site uses data from the CrUX API to rank the performance of our client sites. You&apos;ll need to
            sign in with a valid @10up.com email address to submit a site.
          </p>
          <details className="mt-4">
            <summary className="text-sm font-semibold mb-2">How are sites ranked?</summary>
            <p className="text-gray-500 text-xs mb-4">
              Sites are ranked based on a weighted average of their LCP, INP, and CLS scores. The weights are as follows:
            </p>
            <ul className="text-gray-500 text-xs">
              <li><span className="font-bold">LCP:</span> 50%</li>
              <li><span className="font-bold">INP:</span> 30%</li>
              <li><span className="font-bold">CLS:</span> 20%</li>
            </ul>
          </details>
        </div>
        {user && (
          <Form />
        )}
        {displayResults}

        <ToastContainer
          position="bottom-right"
          autoClose={2000}
          closeOnClick
          theme="colored"
        />
      </main>
      <Footer />
    </>
  );
}
