import Image from "next/image";
import type { Locale } from "@/types";
import { getMessages, getClients, getSiteConfig } from "@/lib/data";

interface ClientsProps {
  locale: Locale;
}

export async function Clients({ locale }: ClientsProps) {
  const messages = getMessages(locale);
  const [clients, config] = await Promise.all([getClients(), getSiteConfig(locale)]);
  const { clients: clientsMessages } = messages;

  const heading = locale === "pt-br"
    ? config.clientsHeadingPt || clientsMessages.heading
    : config.clientsHeadingEn || clientsMessages.heading;
  const description = locale === "pt-br"
    ? config.clientsDescriptionPt || clientsMessages.description
    : config.clientsDescriptionEn || clientsMessages.description;

  return (
    <section
      id="clientes"
      className="w-full lg:min-w-dvw min-h-dvh flex flex-col lg:flex-row pt-[110px] lg:pt-0 lg:pl-[100px]"
    >
      {/* Section header sidebar */}
      <header className="hidden lg:block relative w-[50px] h-dvh shrink-0 bg-dark text-light">
        <h2 className="absolute top-0 left-0 right-0 bottom-0 w-[35px] h-[45px] mt-[45px] ml-[20px] mr-auto font-bold text-sm -rotate-90">
          {clientsMessages.title}
        </h2>
      </header>
      <header className="lg:hidden w-full p-4 bg-dark text-light">
        <h2 className="font-bold text-sm">{clientsMessages.title}</h2>
      </header>

      {/* Article content */}
      <article className="flex items-center w-full p-4">
        <div className="w-full">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/4">
              <h3 className="font-bold text-lg my-4">
                <span className="border-b-[3px] border-dark">
                  {heading}
                </span>
              </h3>
              <p className="text-md">{description}</p>
            </div>
            <div className="lg:w-3/4">
              <ul className="flex justify-center items-center content-center gap-[81px] shrink-0 flex-wrap p-8 px-4">
                {clients.map((client) => (
                  <li key={client.id}>
                    <Image
                      src={client.logo.startsWith("http") ? client.logo : `/images/clients/${client.logo}`}
                      alt={client.name}
                      width={150}
                      height={80}
                      className="object-contain max-w-[150px] max-h-[80px] w-auto h-auto"
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}
