'use client'

import { useState } from 'react'
import Image from 'next/image'
import { getFaviconUrl } from '@/utils/favicon'
import { convertToSeconds } from '@/utils/vitals'
import type { Site } from '@/types'

enum SiteScores {
  LCP,
  INP,
  CLS,
}

type SiteScoreKeys = keyof typeof SiteScores;

export default function Table({ sites }: { sites: Site[] }) {
  const [rows, setRows] = useState(sites);
  const WEIGHTS = { LCP: 0.5, INP: 0.3, CLS: 0.2 };

  function calculateScore(data: Record<SiteScoreKeys, number>) {
    return data.LCP * WEIGHTS.LCP + data.INP * WEIGHTS.INP + data.CLS * WEIGHTS.CLS;
  }

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (value) {
      const filteredSites = sites.filter((site) => {
        const { site_name, site_url } = site;
        return site_name?.toLowerCase().includes(value.toLowerCase()) || site_url?.toLowerCase().includes(value.toLowerCase());
      });

      setRows(filteredSites);

    } else {
      setRows(sites);
    }
  };

  return (
    <div className="p-4 border border-slate-300 w-full rounded">
      <label className="block mb-2">
        <input className="rounded border border-slate-300 text-sm w-60" onChange={handleFilter} type="text" placeholder="Search 10up sites..." />
      </label>
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left text-sm py-2">Rank</th>
            <th className="text-left text-sm py-2">Site Name</th>
            <th className="text-left text-sm py-2">Site URL</th>
            <th className="text-center text-sm py-2">LCP</th>
            <th className="text-center text-sm py-2">INP</th>
            <th className="text-center text-sm py-2">CLS</th>
          </tr>
        </thead>
        <tbody>
          {rows && rows.sort(
            (a: Site, b: Site) => calculateScore(a.site_scores as Record<SiteScoreKeys, number>) - calculateScore(b.site_scores as Record<SiteScoreKeys, number>)
          ).map((site: Site, index: number) => {
            const { id, site_scores, site_name, site_url } = site

            const scores = site_scores as Record<SiteScoreKeys, number>;

            return (
              <tr className="even:bg-slate-100" key={id}>
                <td className="text-left text-sm p-2">{index + 1}</td>
                <td className="text-left text-sm p-2 flex items-center gap-2">
                  {site_url && (
                    <span className="rounded-full p-1 border">
                      <Image className="rounded-full" src={getFaviconUrl(site_url, 64)} width={18} height={18} alt={site_name || ''} />
                    </span>
                  )}
                  {site_name && site_name}
                </td>
                {site_url && (
                  <td className="text-left text-sm py-2">
                    <a className="underline underline-offset-2 decoration-dashed" href={site_url}>{site_url}</a>
                  </td>
                )}
                {site_scores && (
                  <>
                    <td className="text-center text-sm py-2">{convertToSeconds(scores.LCP).toFixed(1)}</td>
                    <td className="text-center text-sm py-2">{scores.INP}</td>
                    <td className="text-center text-sm py-2">{convertToSeconds(scores.CLS).toFixed(2)}</td>
                  </>
                )}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  );
}