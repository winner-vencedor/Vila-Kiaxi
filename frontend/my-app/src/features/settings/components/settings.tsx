'use client';

import Image from 'next/image';
import Link from 'next/link';
import UserPhoto from '@/assets/ildinha.png';
import { Account, Preferences } from './settings-Items';
import { ArrowRight, Edit2Icon } from 'lucide-react';
import PersonalDetails from './settings-Personal-Details';
import { Button } from '@base-ui/react';
import Modal from '@/shared/components/modal';
import { useState } from 'react';
import { BottomSheet } from '@/shared/components/custom/Bottom-Sheet/bottom-sheet';
import EditProfile from './profile/edit-profile';

export default function Settings() {
  const [openModal, setopenModal] = useState(false);
  const [openButtomSheet, setopenButtomSheet] = useState(false);

  return (
    <>
      <main className="flex flex-col gap-3 items-start md:grid md:grid-cols-2 md:p-3 md:gap-3">
        <div className="bg-input dark:bg-secondary text-card-foreground w-full py-5 px-2 rounded-2xl flex flex-col gap-3">
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
                onClick={() => setopenModal(true)}
                className={`bg-primary/50   rounded-md p-1  items-center hover:bg-primary/80 hidden md:flex  `}
              >
                <Edit2Icon className="w-3 h-3 text-foreground" />
                <p className="text-gray-900">editar</p>
              </Button>

              <div className="md:hidden">
                <Button
                  onClick={() => setopenButtomSheet(true)}
                  className={`bg-primary rounded-md p-1  items-center flex `}
                >
                  <Edit2Icon className="w-3 h-3 text-foreground" />
                  editar
                </Button>
              </div>
            </div>
          </div>
          <hr className="hidden md:block" />

          <PersonalDetails />
        </div>

        <div className=" w-full flex flex-col gap-3">
          <section className="">
            <p className="font-mono text-sm text-foreground">Account</p>
            <div className="flex flex-col gap-4 items-start justify-center py-5 px-2 rounded-2xl bg-input dark:bg-secondary">
              {Account.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    href={item.href}
                    key={item.id}
                    className="border-b border-border flex items-center justify-between gap-3 w-full text-foreground font-mono text-sm hover:text-primary hover:border-primary"
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
            <div className="flex flex-col gap-4 items-start justify-center py-5 px-2 rounded-2xl bg-input dark:bg-secondary dark:border-border">
              {Preferences.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    href={item.href}
                    key={item.id}
                    className="border-b border-border flex items-center justify-between gap-3 w-full text-foreground font-mono text-sm hover:text-primary hover:border-primary"
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
      {openModal && (
        <Modal open={openModal} onclose={() => setopenModal(false)}>
          <EditProfile onClose={() => setopenModal(false)} />
        </Modal>
      )}

      {openButtomSheet && (
        <BottomSheet
          open={openButtomSheet}
          onClose={() => setopenButtomSheet(false)}
        >
          <EditProfile onClose={() => setopenButtomSheet(false)} />
        </BottomSheet>
      )}
    </>
  );
}
