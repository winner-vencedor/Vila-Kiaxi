'use client';

import Image from 'next/image';
import Link from 'next/link';
import UserPhoto from '@/assets/ildinha.png';
import { Account, Preferences } from './settings-Items';
import { ArrowRight, Edit2Icon } from 'lucide-react';
import PersonalDetails from './settings-Personal-Details';
import { useRouter } from 'next/navigation';
import { Button } from '@base-ui/react';

export default function Settings() {
  const router = useRouter();
  return (
    <div>
      <main className="flex flex-col gap-3 items-start md:grid md:grid-cols-2 md:p-3 md:gap-3">
        <div className="bg-gray-100 dark:bg-gray-600 text-card-foreground w-full py-5 px-2 rounded-2xl flex flex-col gap-3">
          <div className="flex justify-between p-3">
            <div className="flex gap-3 items-center ">
              <Image
                src={UserPhoto}
                alt=""
                className="w-13 h-13 rounded-full"
                priority
              />

              <div className="flex flex-col ">
                <h4 className="text-xl font-bold text-foreground">
                  Ilda Nhanga
                </h4>
                <span className="text-sm font-medium text-muted-foreground">
                  IldaGongaNhanga@gmail.com
                </span>
              </div>
            </div>
            <div>
              <Button
                className={`bg-gray-400 rounded-md p-1  items-center hidden md:flex`}
              >
                <Edit2Icon className="w-3 h-3 text-gray-900" />
                editar
              </Button>
               <Button
                className={`bg-gray-400 rounded-md p-1  items-center flex md:hidden`}
              >
                <Edit2Icon className="w-3 h-3 text-gray-900" />
                editar
              </Button>
            </div>
          </div>
          <hr className="hidden md:block" />

          <PersonalDetails />
        </div>

        <div className=" w-full flex flex-col gap-3">
          <section className="">
            <p className="font-mono text-sm text-foreground">Account</p>
            <div className="flex flex-col gap-4 items-start justify-center py-5 px-2 rounded-2xl bg-gray-100 dark:bg-gray-600">
              {Account.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    href={item.href}
                    key={item.id}
                    className="border-b border-border flex items-center justify-between gap-3 w-full text-foreground font-mono text-sm hover:text-emerald-700 hover:border-primary"
                  >
                    <div className="flex gap-3">
                      <Icon />
                      <span>{item.label}</span>
                    </div>
                    <div>
                      <ArrowRight />
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>

          <section>
            <p className="font-mono text-sm text-foreground">Preferences</p>
            <div className="flex flex-col gap-4 items-start justify-center py-5 px-2 rounded-2xl bg-gray-100 dark:bg-gray-600">
              {Preferences.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    href={item.href}
                    key={item.id}
                    className="border-b border-border flex items-center justify-between gap-3 w-full text-foreground font-mono text-sm hover:text-emerald-700 hover:border-primary"
                  >
                    <div className="flex gap-3">
                      <Icon />
                      <span>{item.label}</span>
                    </div>
                    <div>
                      <ArrowRight />
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
