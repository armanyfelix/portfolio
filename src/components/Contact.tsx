import {
  AtSymbolIcon,
  CheckCircleIcon,
  MapPinIcon,
  PaperAirplaneIcon,
  PhoneIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { useRef, useState } from "react";

interface Props {
  sendEmail?: (data: FormData) => Promise<void>;
}

export default function Contact({}: Props) {
  const form = useRef<any>(null);
  const [sending, setSending] = useState<boolean>(false);
  const [error, setError] = useState<boolean | undefined>(undefined);

  function validateEmail(email: string): boolean {
    const res =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return res.test(String(email).toLowerCase());
  }

  const handleSendEmail = async (e: FormData) => {
    try {
      setSending(true);
      // await sendEmail(e)
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
    <section id="contact" className="antialiased lg:h-screen lg:py-1">
      <div className="flex min-h-screen w-full items-center justify-center">
        <div className="rounded-box mx-3 flex w-full max-w-5xl flex-col justify-between space-y-6 border-opacity-30 bg-base-300 bg-opacity-30 p-6 shadow-lg backdrop-blur backdrop-filter sm:p-10 md:mx-6 md:flex-row md:space-x-4 md:space-y-0 md:p-12 lg:p-16">
          <div className="flex flex-col justify-between antialiased">
            <div>
              <h1 className="text-5xl font-bold tracking-wide text-secondary lg:text-7xl">
                Contact
              </h1>
              <p className="pt-2 text-lg font-bold">
                If you are interested in working with me, please send me a
                email.
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
              <a href="https://www.linkedin.com/in/armany-felix">
                {/* <Linkedin /> */}
                linkedin
              </a>
              <a href="https://github.com/armanyfelix/">
                {/* <Github /> */}
                git
              </a>
            </div>
          </div>
          <div>
            <div className="shadow-xl md:w-80">
              <form
                action={handleSendEmail}
                className="flex flex-col space-y-4"
                ref={form}
              >
                <fieldset className="fieldset bg-base-100 border-base-300 rounded-box border p-4">
                  {/* <legend className="fieldset-legend">Page details</legend> */}
                  <label className="label">Name</label>
                  <input
                    type="text"
                    name="name"
                    className="input"
                    placeholder="Name"
                    required
                  />

                  <label className="label">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="input"
                    placeholder="Email"
                    required
                  />

                  <label className="label">Message</label>
                  <textarea
                    name="message"
                    className="textarea"
                    placeholder="Message"
                    rows={4}
                    required
                  />
                </fieldset>
                <div className="justify-end text-right">
                  <button
                    type="submit"
                    className="btn btn-primary w-full"
                    onClick={() => {
                      if (
                        form.current &&
                        form.current["name"].value &&
                        validateEmail(form.current["email"]?.value) &&
                        form.current["message"].value
                      ) {
                        setSending(true);
                      }
                    }}
                  >
                    {sending ? (
                      <span className="loading loading-dots loading-lg" />
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
          className="alert alert-error fixed left-3 right-3 top-2 z-50 w-full"
          onClick={() => setError(undefined)}
        >
          <XCircleIcon className="h-9 w-9" />
          <span>
            Error! The mail could not be sent, please try a again later. 😬
          </span>
        </button>
      ) : (
        error === false && (
          <button
            className="alert alert-success fixed right-1/2 top-24 z-50 w-auto translate-x-1/2"
            onClick={() => setError(undefined)}
          >
            <CheckCircleIcon className="h-9 w-9" />
            <span>
              The mail was send successfully! I will answer you ASAP. ✌️😁
            </span>
          </button>
        )
      )}
    </section>
  );
}
