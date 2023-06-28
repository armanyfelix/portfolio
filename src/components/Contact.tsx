'use client';

import {
  AtSymbolIcon,
  CheckCircleIcon,
  MapPinIcon,
  PaperAirplaneIcon,
  PhoneIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';
import { FC, useState } from 'react';

interface Props {
  sendEmail: (data: FormData) => Promise<void>;
}

const Contact: FC<Props> = ({ sendEmail }) => {
  const [sending, setSending] = useState<boolean>(false);
  const [error, setError] = useState<boolean | undefined>(undefined);

  const handleSendEmail = async (e: FormData) => {
    try {
      await sendEmail(e);
      setError(false);
      setSending(false);
    } catch {
      setError(true);
      setSending(false);
    }

    setTimeout(() => {
      setError(undefined);
    }, 5000);
  };

  return (
    <section id="contact" className=" py-24 antialiased lg:h-screen lg:py-1">
      <div className="flex min-h-screen w-full items-center justify-center">
        <div className="flex w-full max-w-4xl flex-col justify-between  space-y-6 rounded-xl border-2 border-opacity-30 p-8 shadow-lg backdrop-blur backdrop-filter sm:p-12 md:flex-row md:space-x-6 md:space-y-0">
          <div className="flex flex-col justify-between">
            <div>
              <h1 className="font-simplex text-5xl font-bold tracking-wide">Contact</h1>
              <p className="pb-9 pt-2 text-sm">
                If you are interested in working with me, please leave me a message.
                <br />I will answer you as soon as possible.
              </p>
            </div>
            <div className="mt-8 flex flex-col space-y-4 md:mt-0">
              <div className="inline-flex space-x-2">
                <PhoneIcon className="h-6 w-6" />
                <span>+(52) 664 212 2325</span>
              </div>
              <div className="inline-flex items-center space-x-2">
                <AtSymbolIcon className="h-6 w-6" />
                <span>luis.armany.felix@gmail.com</span>
              </div>
              <div className="inline-flex items-center space-x-2">
                <MapPinIcon className="h-6 w-6" />
                <span>Tijuana B.C. Mexico</span>
              </div>
            </div>
            <div className="mt-6 flex space-x-4">
              <Link href="https://www.linkedin.com/in/armany-felix">
                <Image src="/icons/linkedin.svg" width="40" height="40" alt="logo-linkedIn" />
              </Link>
              <Link href="https://github.com/armanyfelix/">
                <Image src="/icons/github.svg" width="40" height="40" alt="logo-github" />
              </Link>
            </div>
          </div>
          <div>
            <div className="box-border rounded-xl border-2 border-opacity-30 bg-opacity-10 p-8 shadow-lg backdrop-blur backdrop-contrast-150 backdrop-filter md:w-80">
              <form action={handleSendEmail} className="flex flex-col space-y-4">
                <input
                  type="text"
                  name="name"
                  className="w-full rounded-lg bg-opacity-50 px-4 py-2 font-semibold shadow-xl focus:shadow-inner"
                  placeholder="Name"
                  required
                />
                <input
                  type="email"
                  name="email"
                  className="w-full rounded-lg bg-opacity-50 px-4 py-2 font-semibold shadow-xl focus:shadow-inner"
                  placeholder="Email"
                  required
                />
                <textarea
                  name="message"
                  className="w-full rounded-lg bg-opacity-50 px-4 py-2 font-semibold shadow-xl focus:shadow-inner"
                  placeholder="Message"
                  required
                />
                <div className="justify-end text-right">
                  <button type="submit" className="btn-primary btn" onClick={() => setSending(true)}>
                    {sending ? (
                      <span className="loading loading-dots loading-md" />
                    ) : (
                      <PaperAirplaneIcon className="h-6 w-6" />
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {error ? (
        <button
          className="alert alert-error fixed left-3 right-3 top-20 z-50 w-auto"
          onClick={() => setError(undefined)}
        >
          <XCircleIcon className="h-9 w-9" />
          <span>Error! The mail could not be sent, please try a again later. 😬</span>
        </button>
      ) : (
        error === false && (
          <button
            className="alert alert-success fixed left-3 right-3 top-20 z-50 w-auto"
            onClick={() => setError(undefined)}
          >
            <CheckCircleIcon className="h-9 w-9" />
            <span>The mail was send successfully! I will answer you ASAP. 😜</span>
          </button>
        )
      )}
    </section>
  );
};

export default Contact;
