'use client';
import { useRouter } from 'next/navigation';
import React from 'react';
import { usePathname } from 'next/navigation';
import { pathStringToObject } from '@/utils/general';
import styled from 'styled-components';
import Link from 'next/link';
import { useStore } from '@/store/store';

export const Navigation = () => {
  const router = useRouter();
  const pathname = usePathname();
  const pathnameObject = pathStringToObject(pathname);
  const bam = useStore();

  const previousPath = Object.keys(pathnameObject);
  const currentPath = Object.values(pathnameObject);
  console.log(bam, 'bears');

  return (
    <Container>
      <Flex>
        <div>
          <button onClick={() => router.back()}>go back</button>
          <span>
            <Link href={`/`}>{previousPath}</Link>/{' '}
            <Link href={`/${currentPath}`}>{currentPath}</Link>
          </span>
        </div>

        <span>XcartX</span>
      </Flex>
    </Container>
  );
};

const Container = styled.div`
  background: azure;
  padding: 20px;
`;
const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
`;
