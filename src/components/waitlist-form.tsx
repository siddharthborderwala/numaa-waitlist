"use client";

import * as React from "react";
import { z } from "zod/v4";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { captureException } from "@sentry/nextjs";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Spinner } from "./spinner";
import heart from "@/app/assets/heart.svg";

const schema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.email("Please enter a valid email address"),
});

type FormValues = z.infer<typeof schema>;

export function WaitlistForm() {
  const [response, setResponse] = React.useState<{
    message: string;
    success: boolean;
    data: unknown;
  } | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "" },
  });

  const onSubmit = async (values: FormValues) => {
    setResponse(null);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (!res.ok) {
        setResponse({
          message: data?.message ?? "Something went wrong. Please try again.",
          success: false,
          data,
        });
        return;
      }

      setResponse({
        message: data?.message ?? "Success!",
        success: true,
        data,
      });
      form.reset();
    } catch (error) {
      captureException(error);
      setResponse({
        message: "Something went wrong. Please try again.",
        success: false,
        data: null,
      });
    }
  };

  const isSubmitting = form.formState.isSubmitting;

  return response?.success === true ? (
    <div>
      <h1 className="text-primary text-3xl font-display text-center">
        Thank you!
      </h1>
      <p className="text-muted-foreground text-center mt-1">
        You will hear from us super soon.
      </p>
      <Image src={heart} alt="Heart" width={80} className="mx-auto my-12" />
      <Button variant="default" className="font-display w-full" asChild>
        <a
          href="https://www.instagram.com/numaadesign"
          target="_blank"
          rel="noopener"
        >
          Follow us on Instagram
        </a>
      </Button>
    </div>
  ) : (
    <Form {...form}>
      <h1 className="text-primary text-3xl font-display text-center">
        Join the waitlist
      </h1>
      <p className="text-muted-foreground text-center mt-1">
        Get an exclusive{" "}
        <u className="decoration-wavy font-display underline-offset-4 text-secondary">
          20% off
        </u>{" "}
        when we launch!
      </p>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full grid gap-4 mt-6"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground data-[error=true]:text-foreground">
                Name
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Emma Chamberlaine"
                  className="bg-white"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground data-[error=true]:text-foreground">
                Email
              </FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="emma@chamberlaine.com"
                  className="bg-white"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {response?.success === false ? (
          <p className="text-destructive text-sm" role="alert">
            {response.message}
          </p>
        ) : null}

        <Button
          type="submit"
          disabled={isSubmitting}
          variant="default"
          className="font-display w-full"
        >
          {isSubmitting ? <Spinner /> : "Sign Up"}
        </Button>
      </form>
    </Form>
  );
}

export default WaitlistForm;
