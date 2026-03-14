import Image from 'next/image';
import type { Locale } from '@/types';
import { getMessages, getClients } from '@/lib/data';

interface ClientsProps {
  locale: Locale;
}

export function Clients({ locale }: ClientsProps) {
  const messages = getMessages(locale);
  const clients = getClients();
  const { clients: clientsMessages } = messages;

  return (
    <section
      id="clientes"
      className="min-w-dvw min-h-dvh snap-start flex pt-[110px] lg:pt-0 lg:pl-[100px]"
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
                  {clientsMessages.heading}
                </span>
              </h3>
              <p className="text-md">{clientsMessages.description}</p>
            </div>
            <div className="lg:w-3/4">
              <ul className="flex justify-center items-center content-center gap-[81px] shrink-0 flex-wrap p-8 px-4">
                {clients.map((client) => (
                  <li key={client.id}>
                    <Image
                      src={`/images/clients/${client.logo}`}
                      alt={client.name}
                      width={150}
                      height={80}
                      className="object-contain"
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
