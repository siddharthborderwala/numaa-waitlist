"use client";

import * as React from "react";
import { z } from "zod/v4";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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
import { captureException } from "@sentry/nextjs";
import { Spinner } from "./spinner";
import { cn } from "@/lib/utils";

const schema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.email("Please enter a valid email address"),
});

type FormValues = z.infer<typeof schema>;

export function WaitlistForm({ className }: { className?: string }) {
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

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("w-full grid gap-4", className)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground">Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="first and last name"
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
              <FormLabel className="text-foreground">Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="your email address"
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

        {response?.success === true ? (
          <p className="text-success text-sm">{response.message}</p>
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
