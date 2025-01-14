'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();

  router.push('/');
  return <div>page</div>;
}
