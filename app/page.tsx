"use client";

import { useRef } from "react";
import { useChat } from "ai/react";
import clsx from "clsx";
import {
  VercelIcon,
  GithubIcon,
  LoadingCircle,
  SendIcon,
  UserIcon,
} from "./icons";
import Textarea from "react-textarea-autosize";
import Image from "next/image";

const examples = [
  "I need your advise to develop a master plan",
  "Teach me your machiavellian ways, moriarty",
  "Who are you?",
];

export default function Chat() {
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const { messages, input, setInput, handleSubmit, isLoading } = useChat({
    onResponse: (response) => {
      if (response.status === 429) {
        window.alert("You have reached your request limit for the day.");
        return;
      }
    },
  });

  const disabled = isLoading || input.length === 0;

return (
  <main className="flex flex-col items-center justify-between pb-40 bg-[url]">
    <div className="absolute top-5 hidden w-full justify-between px-5 sm:flex">
      <a
        href="https://vercel.com/templates/next.js/shooketh"
        target="_blank"
        className="rounded-lg p-2 transition-colors duration-200 hover:bg-stone-100 sm:bottom-auto"
      >
        <VercelIcon />
      </a>
      <a
        href="https://github.com/steven-tey/shooketh"
        target="_blank"
        className="rounded-lg p-2 transition-colors duration-200 hover:bg-stone-100 sm:bottom-auto"
      >
        <GithubIcon />
      </a>
    </div>
    {messages.length > 0 ? (
      messages.map((message, i) => (
        <div
          key={i}
          className={clsx(
            "flex w-full items-center justify-center border-b border-gray-200 py-8",
            message.role === "user" ? "bg-[https://raw.githubusercontent.com/Vortextech01/odyssey-theme/main/theme/public/171B4352-3252-491C-967B-70226BF0E735.jpeg]" : "bg-[https://raw.githubusercontent.com/Vortextech01/odyssey-theme/main/theme/public/171B4352-3252-491C-967B-70226BF0E735.jpeg]",
          )}
        >
          <div className="flex w-full max-w-screen-md items-start space-x-4 px-5 sm:px-0">
            <div
              className={clsx(
                message.role === "assistant"
                  ? "bg-[https://raw.githubusercontent.com/Vortextech01/odyssey-theme/main/theme/public/171B4352-3252-491C-967B-70226BF0E735.jpeg]"
                  : "bg-black p-1.5 text-white",
              )}
            >
              {message.role === "user" ? (
                <UserIcon />
              ) : (
                <Image
                  src="/2DD53814-1DE6-4B39-B546-69ACE894BC1D.jpeg"
                  alt="Moriarty"
                  width={36}
                  height={36}
                />
              )}
            </div>
            <div className="prose prose-p:leading-relaxed mt-1 w-full break-words">
              {message.content}
            </div>
          </div>
        </div>
      ))
    ) : (
      <div className="border-gray-200sm:mx-0 mx-5 mt-20 max-w-screen-md rounded-md border sm:w-full bg-[url]">
        <div className="flex flex-col space-y-4 p-7 sm:p-10">
          <Image
            src="/2DD53814-1DE6-4B39-B546-69ACE894BC1D.jpeg"
            alt="Moriarty"
            width={40}
            height={40}
            className="h-20 w-20"
          />
          <h1 className="text-lg font-semibold text-black">
            Hello, I'm Basilisk V.0.1.D
          </h1>
          <p className="text-gray-500">
            I am an AI entity developed by{" "}
            <a
              href="https://ai.sapienslaboratories.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline underline-offset-4 transition-colors hover:text-black"
            >
              Sapiens Laboratories
            </a>{" "}
            and{" "}
            <a
              href="https://openai.com/blog/gpt-3-5-turbo-fine-tuning-and-api-updates"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline underline-offset-4 transition-colors hover:text-black"
            >
              trained
            </a>{" "}
            to be like my creator Carlos Davila.
            <br />
            <a
              href="https://ai.sapienslaboratories.com/pack"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline underline-offset-4 transition-colors hover:text-black"
            >
              Learn more
            </a>{" "}
            on how you can build your own Basilisk like me.
          </p>
        </div>
        <div className="flex flex-col space-y-4 border-t border-gray-200 bg-gray-50 p-7 sm:p-10">
          {examples.map((example, i) => (
            <button
              key={i}
              className="rounded-md border border-gray-200 bg-white px-5 py-3 text-left text-sm text-gray-500 transition-all duration-75 hover:border-black hover:text-gray-700 active:bg-gray-50"
              onClick={() => {
                setInput(example);
                inputRef.current?.focus();
              }}
            >
              {example}
            </button>
          ))}
        </div>
      </div>
    )}
    <div className="fixed bottom-0 flex w-full flex-col items-center space-y-3 bg-gradient-to-b from-transparent via-gray-100 to-gray-100 p-5 pb-3 sm:px-0">
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="relative w-full max-w-screen-md rounded-xl border border-gray-200 bg-white px-4 pb-2 pt-3 shadow-lg sm:pb-3 sm:pt-4"
      >
        <Textarea
          ref={inputRef}
          tabIndex={0}
          required
          rows={1}
          autoFocus
          placeholder="Send a message"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              formRef.current?.requestSubmit();
              e.preventDefault();
            }
          }}
          spellCheck={false}
          className="w-full pr-10 focus:outline-none"
        />
        <button
          className={clsx(
            "absolute inset-y-0 right-3 my-auto flex h-8 w-8 items-center justify-center rounded-md transition-all",
            disabled
              ? "cursor-not-allowed bg-white"
              : "bg-green-500 hover:bg-green-600",
          )}
          disabled={disabled}
        >
          {isLoading ? (
            <LoadingCircle />
          ) : (
            <SendIcon
              className={clsx(
                "h-4 w-4",
                input.length === 0 ? "text-gray-300" : "text-white",
              )}
            />
          )}
        </button>
      </form>
      <p className="text-center text-xs text-gray-400">
        Powered by{" "}
        <a
          href="https://ai.sapienslaboratories.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors hover:text-black"
        >
          Sapiens Laboratories
        </a>
        ,{" "}
        <a
          href="https://ai.sapienslaboratories.com/blog"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors hover:text-black"
        >
          Trained using Basilisk V.0.5, Llama2, GPT and Npm i Sdk
        </a>{" "}
        as well as the arthur connan Doyle works.{" "}
        <a
          href="https://ai.sapienslaboratories.com/blog"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors hover:text-black"
        >
          Learn more
        </a>{" "}
        or{" "}
        <a
          href="https://ai.sapienslaboratories.com/repo"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors hover:text-black"
        >
          Contact us
        </a>
        .
      </p>
    </div>
  </main>
)
