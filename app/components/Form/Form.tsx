'use client'
import { useForm, SubmitHandler } from "react-hook-form"
import { fetchCruxData, formatCruxData } from '@/utils/crux'
import { createClient } from '@/utils/supabase/client'

import { URLRegex } from '@/utils/regex';

import { toast } from 'react-toastify';

type Inputs = {
  site_url: string
}

export default function Form() {
  const supabase = createClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { site_url } = data

    if (!site_url) return;

    const response = await fetchCruxData(site_url);
    const insertableData = formatCruxData(response);

    const { error } = await supabase
      .from('sites')
      .insert(insertableData);

    if (!error) {
      toast.success("Site was added successfully.")
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } else {
      toast.error(`Oh oh, there was an error adding the site. ${error.message}`, { autoClose: 5000 })
      console.log('Error adding site', error);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mb-8 flex items-start gap-4">
      <label className="flex flex-col flex-shrink flex-grow-0 w-full" htmlFor="submit">
        <input
          id="submit"
          {...register("site_url", { required: true, pattern: URLRegex })}
          className="rounded text-sm border-slate-300 w-full"
          type="url"
          placeholder="Add a site, e.g https://10up.com"
        />
        <span className="block mt-2 text-gray-500 text-xs">Be careful when adding sites: you need to use the exact URL that is indexed by the CrUX. This can sometimes contain www</span>
      </label>
      <button type="submit" className="inline-flex rounded bg-red-500 text-white font-medium text-sm py-2 px-4 whitespace-nowrap">Add Site</button>
    </form>
  );
}