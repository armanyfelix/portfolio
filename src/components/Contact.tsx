import { useRef, useState } from "react";
import CheckCircleIcon from "@/icons/CheckCircle.svg";
import ErrorCircleIcon from "@/icons/ErrorCircle.svg";
import PaperAirplaneIcon from "@/icons/PaperAirplane.svg";
import GithubIcon from "@/icons/Github.svg";
import LinkedinIcon from "@/icons/Linkedin.svg";
import EmailIcon from "@/icons/Email.svg";
import MapPinIcon from "@/icons/MapPin.svg";

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

  const onSubmit = async (data: any) => {
    try {
      const response = await fetch("/api/sendmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      // if (response.ok) {
      //   setSended("success");
      // } else {
      //   setSended("error");
      // }
    } catch (_error) {
      // setSended("error");
    }
  };

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
              <div className="inline-flex items-center space-x-2">
                <EmailIcon />
                <span>armanyfelix@proton.me</span>
              </div>
              <div className="inline-flex items-center space-x-2">
                <MapPinIcon />
                <span>Tijuana B.C. Mexico</span>
              </div>
            </div>
            <div className="mt-6 flex space-x-4">
              <a href="https://www.linkedin.com/in/armany-felix">
                <LinkedinIcon />
              </a>
              <a href="https://github.com/armanyfelix/">
                <GithubIcon />
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
                    className="input validator"
                    pattern="[A-Za-z][A-Za-z0-9\-]*"
                    minLength={3}
                    maxLength={30}
                    placeholder="Name"
                    required
                  />
                  <p className="validator-hint">
                    Must be 3 to 30 characters
                    <br />
                    containing only letters, numbers or dash
                  </p>

                  <label className="label">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="input validator"
                    placeholder="mail@site.com"
                    required
                  />
                  <p className="validator-hint">Enter valid email address</p>

                  <label className="label">Message</label>
                  <textarea
                    name="message"
                    className="textarea"
                    placeholder="Message"
                    rows={3}
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
                      <PaperAirplaneIcon />
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
          <ErrorCircleIcon />
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
            <CheckCircleIcon />
            <span>
              The mail was send successfully! I will answer you ASAP. ✌️😁
            </span>
          </button>
        )
      )}
    </section>
  );
}
