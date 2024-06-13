import Head from "next/head";
import { useEffect, useState } from "react";

const getAge = () =>
  Math.ceil(
    (new Date().getTime() - new Date("1990-04-14").getTime()) / (60 * 1000)
  );

const Leenk = ({ type, href, children }) => {
  let classes = "";
  if (type === "social") {
    classes = "px-2 py-1 rounded-sm";
  } else if (type === "cool") {
    classes = "px-1 py-1 rounded-sm";
  }

  return (
    <a className={`${type} ${classes}`} href={href}>
      {children}
    </a>
  );
};

export default function Home() {
  const [minutes, setMinutes] = useState(getAge());

  useEffect(() => {
    const id = setInterval(() => {
      setMinutes(getAge());
    }, 60 * 1000);

    return () => {
      clearInterval(id);
    };
  }, []);

  return (
    <div className="flex">
      <Head>
        <title>Amir Saboury&apos;s home page</title>
      </Head>

      <main className="flex flex-col mx-auto p-2 m-2">
        <div className="sm:w-2/3 md:w-1/2 lg:w-1/3 flex justify-around p-3 m-3 mx-auto">
          <img
            alt="Amir Saboury"
            className="rounded-full"
            src="/amir.saboury1.bw.jpg"
          ></img>
        </div>
        <div className="sm:w-2/3 md:w-2/3 lg:w-1/2 border-t border-gray-200 p-4 m-4 mx-auto text-center">
          <h1 className="mb-1">
            Hello <div className="inline-block animate-bounce">👋</div>
          </h1>
          <h5 className="mb-4">My name is Amir Saboury!</h5>
        </div>
        <div className="p-2 m-2 mx-auto">
          <h3 className="mb-2">
            I&apos;m currently located in Montréal.
            <br />I have been alive for around{" "}
            <Leenk
              href="https://howlongagogo.com/date/1990/april/14"
              type="cool"
            >
              {minutes.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} minutes
            </Leenk>{" "}
            now.
          </h3>
          <h3 className="leading-normal mb-2">
            I{" "}
            <Leenk href="https://amirs.dev" type="social">
              write code
            </Leenk>{" "}
            (
            <Leenk href="https://www.linkedin.com/in/saboury/" type="cool">
              previously as a staff developer
            </Leenk>{" "}
            at{" "}
            <a className="link" href="https://shopify.com">
              Shopify)
            </a>
            .
          </h3>
          <h3 className="mb-2">
            I&apos;m apparently a{" "}
            <Leenk href="https://www.enneagraminstitute.com/type-9" type="cool">
              Peacemaker
            </Leenk>{" "}
            & an{" "}
            <Leenk href="https://www.ipersonic.com/type/AT.html" type="cool">
              Analytical Thinker
            </Leenk>{" "}
            .
          </h3>
          <h3 className="leading-normal">
            I also{" "}
            <Leenk href="https://www.instagram.com/amir.saboury" type="social">
              take photos
            </Leenk>
            ,{" "}
            <Leenk href="https://twitter.com/as32" type="social">
              write tweets
            </Leenk>{" "}
            and answer to{" "}
            <Leenk href="mailto:amir.saboury@gmail.com" type="social">
              email
            </Leenk>
            .
          </h3>
        </div>
      </main>
    </div>
  );
}
