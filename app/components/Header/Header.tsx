import type { FC } from 'react';
import { fetchGravatar } from '@/utils/gravatar';
import Image from 'next/image';

import SignOut from '@/components/SignOut/SignOut';
import Link from 'next/link';

type User = {
  user: {
    email?: string | undefined;
  };
}

type UserProps = User | { user: null };

const Header: FC<UserProps> = ({ user }) => {

  const email = user?.email || '';

  return (
    <header className="py-6">
      <div className="container max-w-4xl mx-auto flex justify-between items-center">
        <div>
          <svg width="40" height="40" viewBox="0 0 158 158" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M78.7321 0.000111102C65.4635 -0.0221957 52.4052 3.31489 40.7741 9.70038C29.1429 16.0859 19.3177 25.3119 12.2138 36.5187C5.10998 47.7256 0.958818 60.5484 0.147197 73.7922C-0.664423 87.036 1.88991 100.27 7.57215 112.26L8.39215 113.12L57.0421 64.4701L41.7422 49.1801H108.302V115.74L93.0022 100.44L44.0822 149.36C54.7207 154.585 66.4017 157.339 78.2537 157.418C90.1056 157.497 101.822 154.899 112.53 149.817C123.237 144.734 132.658 137.3 140.09 128.067C147.523 118.835 152.774 108.043 155.452 96.4976C158.131 84.9521 158.167 72.9506 155.559 61.389C152.951 49.8273 147.765 39.004 140.389 29.7266C133.013 20.4492 123.637 12.9574 112.961 7.81012C102.285 2.66287 90.5843 -0.00687474 78.7321 0.000111102Z" fill="#DF2B26" />
          </svg>
        </div>
        <div className="flex gap-4">
          {!user && (
            <>
              <Link className="border border-red-500 bg-white text-red-500 py-2 px-4 rounded-md text-xs hover:bg-red-500 hover:text-white transition-colors" href="/login">
                Sign In
              </Link>
              <Link className="border border-transparent bg-red-500 text-white py-2 px-4 rounded-md text-xs hover:bg-white hover:text-red-500 hover:border-red-500 transition-colors" href="/signup">
                Sign Up
              </Link>
            </>
          )}
          {user && (
            <>
              <SignOut />
              <Image className="rounded-full" src={fetchGravatar(email)} alt={email} width={32} height={32} />
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;