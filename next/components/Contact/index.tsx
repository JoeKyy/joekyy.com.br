import { FaLinkedin, FaGithub, FaWhatsapp } from "react-icons/fa";
import type { Locale } from "@/types";
import { getMessages, siteConfig } from "@/lib/data";

interface ContactProps {
  locale: Locale;
}

export function Contact({ locale }: ContactProps) {
  const messages = getMessages(locale);
  const { contact } = messages;

  const email = locale === "pt-br" ? siteConfig.emailPt : siteConfig.emailEn;

  return (
    <section
      id="contato"
      className="min-w-dvw min-h-dvh snap-start flex pt-[110px] lg:pt-0 lg:pl-[100px]"
    >
      {/* Section header sidebar */}
      <header className="hidden lg:block relative w-[50px] h-dvh shrink-0 bg-dark text-light">
        <h2 className="absolute top-0 left-0 right-0 bottom-0 w-[35px] h-[45px] mt-[45px] ml-[20px] mr-auto font-bold text-sm -rotate-90">
          {contact.title}
        </h2>
      </header>
      <header className="lg:hidden w-full p-4 bg-dark text-light">
        <h2 className="font-bold text-sm">{contact.title}</h2>
      </header>

      {/* Article content */}
      <article className="flex items-center w-full p-4">
        <div className="lg:w-5/12">
          <h3 className="font-bold text-lg my-4">
            <span className="border-b-[3px] border-dark">
              {contact.heading}
            </span>
          </h3>
          <p className="text-md">
            {contact.message}{" "}
            <strong>
              <a href={`mailto:${email}`}>{email}</a>
            </strong>
          </p>
          <ul className="flex mt-5 justify-around">
            {siteConfig.socialLinks.map((link) => (
              <li key={link.platform}>
                <a
                  title={link.platform}
                  target="_blank"
                  rel="noopener noreferrer"
                  href={link.url}
                  className="text-dark hover:text-dark/70 transition-colors text-2xl"
                >
                  {link.platform === "linkedin" && <FaLinkedin />}
                  {link.platform === "github" && <FaGithub />}
                  {link.platform === "whatsapp" && <FaWhatsapp />}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </article>
    </section>
  );
}
