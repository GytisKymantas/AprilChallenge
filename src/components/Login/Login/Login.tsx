'use client';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { zodResolver } from '@hookform/resolvers/zod';
import { TLoginSchema } from '@/utils/types';
import { LoginSchema } from '@/utils/types';
import toast from 'react-hot-toast';
import { useStore } from '@/store/store';
import { useRouter } from 'next/navigation';

// TODO, check what refine is

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
    reset,
  } = useForm<TLoginSchema>({
    resolver: zodResolver(LoginSchema),
  });

  const router = useRouter();
  const { setHaveBeenLoggedIn } = useStore();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = () => {
      const loggedInUser = localStorage.getItem('loggedInUser');
      if (loggedInUser === 'admin@gmail.com') {
        setIsLoggedIn(true);
      }
    };

    checkLoginStatus();
  }, []);

  const onSubmit = async (data: TLoginSchema) => {
    if (
      getValues('email') === 'admin@gmail.com' &&
      getValues('password') === 'admin123'
    ) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log('success');
      router.push('/');
      localStorage.setItem('loggedInUser', getValues('email'));
      setIsLoggedIn(true);
      setHaveBeenLoggedIn(true);
      reset();
    } else {
      toast.error("Incorrect email or password'");
    }
  };

  return (
    <>
      <Container>
        {/* {errors.email ||
        (errors.password && <p>{toast.error(errors?.email?.message)}</p>)} */}
        <>
          <h1>Welcome back!</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <input
                {...register('email')}
                maxLength={50}
                placeholder='email'
              />
            </div>
            <input
              {...register('password')}
              maxLength={50}
              placeholder='password'
            />

            <button disabled={isSubmitting} type='submit'>
              Sign in
            </button>
            <div>
              <p>
                Don't have an account? <span>Sign up</span>
              </p>
              <p>Forgot password?</p>
            </div>
          </form>
        </>
      </Container>
    </>
  );
};

const Container = styled.div`
  position: absolute;
  padding: 20px;
  background: gray;
  border: 5px solid black;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
